import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownCircle,
  ArrowUpCircle,
  CheckCircle2,
  DollarSign,
  LoaderCircle,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { dashboardService } from "@/lib/dashboard-service";
import { getNumber } from "@/lib/api-helpers";
import type { ApiUserResource, DailyUsage, RecommendationResource, ApiProduct } from "@/types/api-resources";
import type { ApiError } from "@/types/auth";
import { Button } from "@/components/ui/button";

function isApprovedRecommendation(item: RecommendationResource) {
  const value = (item.estado ?? getTextFromUnknown(item.resultado) ?? "").toLowerCase();
  return value.includes("aprob");
}

function getRecommendationStatus(item: RecommendationResource) {
  const value = (item.estado ?? getTextFromUnknown(item.resultado) ?? "").toLowerCase();

  if (value.includes("aprob")) return "approved";
  if (value.includes("rech") || value.includes("deneg")) return "rejected";
  return "pending";
}

function getTextFromUnknown(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof record.nombre === "string") {
      return record.nombre;
    }

    if (typeof record.productoNombre === "string") {
      return record.productoNombre;
    }

    if (typeof record.resultado === "string") {
      return record.resultado;
    }

    if (typeof record.id === "string") {
      return `Producto ${record.id}`;
    }
  }

  return null;
}

function getRecommendationLabel(item: RecommendationResource) {
  return (
    item.productoNombre ??
    getTextFromUnknown(item.producto) ??
    getTextFromUnknown(item.resultado) ??
    "Recomendacion generada"
  );
}

export default function AnalyticsPage() {
  const [users, setUsers] = useState<ApiUserResource[]>([]);
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationResource[]>([]);
  const [usage, setUsage] = useState<DailyUsage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const portfolioSnapshot = [
    {
      id: "1",
      cliente: "Maria Gonzalez",
      documento: "35.234.567",
      variacion: "+10.8%",
      estado: "mejora" as const,
      detalle: "Cancelo deuda de tarjeta y mejoro su score mensual.",
    },
    {
      id: "2",
      cliente: "Juan Perez",
      documento: "28.456.789",
      variacion: "-5.6%",
      estado: "deterioro" as const,
      detalle: "Aparecio nueva deuda informada y requiere revision.",
    },
    {
      id: "3",
      cliente: "Ana Martinez",
      documento: "41.567.890",
      variacion: "+5.1%",
      estado: "mejora" as const,
      detalle: "Sostuvo pagos consistentes en los ultimos meses.",
    },
    {
      id: "4",
      cliente: "Carlos Lopez",
      documento: "32.678.901",
      variacion: "-11.9%",
      estado: "deterioro" as const,
      detalle: "Presento incumplimiento reciente en producto vigente.",
    },
  ];

  const loadData = async () => {
    setError("");

    const [usersResult, productsResult, recommendationsResult, usageResult] = await Promise.allSettled([
      dashboardService.getUsers(),
      dashboardService.getProducts(),
      dashboardService.getRecommendations(),
      dashboardService.getUsageToday(),
    ]);

    if (usersResult.status === "fulfilled") {
      setUsers(usersResult.value);
    }

    if (productsResult.status === "fulfilled") {
      setProducts(productsResult.value);
    }

    if (recommendationsResult.status === "fulfilled") {
      setRecommendations(recommendationsResult.value);
    } else {
      setRecommendations([]);
    }

    if (usageResult.status === "fulfilled") {
      setUsage(usageResult.value);
    }

    const failures = [usersResult, productsResult, usageResult].filter(
      (result) => result.status === "rejected"
    );

    if (failures.length > 0) {
      const firstError = failures[0] as PromiseRejectedResult;
      const apiError = (firstError.reason as { response?: { data?: ApiError } })?.response?.data;
      setError(apiError?.message ?? "No pudimos cargar parte de las metricas del dashboard.");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    void loadData();
  }, []);

  const stats = useMemo(() => {
    const consultas = getNumber(usage?.consultasHoy, getNumber(usage?.total, getNumber(usage?.used, 0)));
    const totalRecommendations = recommendations.length;
    const approved = recommendations.filter((item) => isApprovedRecommendation(item)).length;
    const approvalRate = totalRecommendations > 0 ? (approved / totalRecommendations) * 100 : 0;
    const montoPromedio = products.length > 0
      ? Math.round(
          products.reduce((sum, product) => sum + getNumber(product.montoMax, getNumber(product.limiteMontoTotalMax, 0)), 0) /
            products.length
        )
      : 0;

    return [
      {
        name: "Consultas de hoy",
        value: consultas.toLocaleString("es-AR"),
        change: usage?.limiteDiario ? `de ${usage.limiteDiario}` : "en uso",
        trend: "up" as const,
        icon: Activity,
      },
      {
        name: "Tasa de aprobacion",
        value: `${approvalRate.toFixed(1)}%`,
        change: `${approved}/${totalRecommendations || 0}`,
        trend: approvalRate >= 50 ? "up" as const : "down" as const,
        icon: CheckCircle2,
      },
      {
        name: "Monto maximo promedio",
        value: montoPromedio
          ? new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(montoPromedio)
          : "Sin dato",
        change: `${products.length} productos`,
        trend: "up" as const,
        icon: DollarSign,
      },
      {
        name: "Usuarios cargados",
        value: users.length.toLocaleString("es-AR"),
        change: `${products.length} productos activos`,
        trend: "up" as const,
        icon: Users,
      },
    ];
  }, [products, recommendations, usage, users]);

  const portfolioMetrics = useMemo(() => {
    const improved = portfolioSnapshot.filter((item) => item.estado === "mejora").length;
    const deteriorated = portfolioSnapshot.filter((item) => item.estado === "deterioro").length;

    return {
      monitored: portfolioSnapshot.length,
      improved,
      deteriorated,
    };
  }, [portfolioSnapshot]);

  const recentRecommendations = useMemo(() => recommendations.slice(0, 5), [recommendations]);

  return (
    <div className="p-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Vision general de actividad, productos y recomendaciones.
        </p>
      </div>

      {error ? (
        <div className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertTriangle className="size-4 mt-0.5 shrink-0" />
          <span>{error}</span>
          <Button variant="outline" size="sm" className="ml-auto" onClick={() => {
            setIsLoading(true);
            void loadData();
          }}>
            Reintentar
          </Button>
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-lg border bg-card p-10 text-muted-foreground flex items-center justify-center">
          <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
          Cargando metricas...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.name} className="p-6 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                      {stat.trend === "up" ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
                      {stat.change}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.name}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-lg border bg-card">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Recomendaciones recientes</h2>
              </div>
              <div className="p-6">
                {recentRecommendations.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                    Todavia no hay recomendaciones recientes para mostrar.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentRecommendations.map((recommendation, index) => {
                      const status = getRecommendationStatus(recommendation);

                      return (
                        <div
                          key={recommendation.id ?? `${recommendation.usuarioCuil ?? "rec"}-${index}`}
                          className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                        >
                          <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 shrink-0">
                            <Users className="size-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-medium text-primary">
                                {getRecommendationLabel(recommendation)}
                              </p>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  status === "approved"
                                    ? "bg-green-100 text-green-700"
                                    : status === "rejected"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {status === "approved"
                                  ? "Aprobado"
                                  : status === "rejected"
                                    ? "Rechazado"
                                    : "Pendiente"}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border bg-card">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Resumen de cartera</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Clientes monitoreados</p>
                      <p className="text-2xl font-bold">{portfolioMetrics.monitored}</p>
                    </div>
                    <Users className="size-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Mejoraron</p>
                      <p className="text-2xl font-bold text-green-600">{portfolioMetrics.improved}</p>
                    </div>
                    <ArrowUpCircle className="size-5 text-green-600" />
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Empeoraron</p>
                      <p className="text-2xl font-bold text-red-600">{portfolioMetrics.deteriorated}</p>
                    </div>
                    <ArrowDownCircle className="size-5 text-red-600" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Este bloque de cartera es estatico por ahora y se puede conectar despues a una fuente real de seguimiento historico.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
