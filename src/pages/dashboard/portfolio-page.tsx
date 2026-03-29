import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  CheckCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";
import { dashboardService } from "@/lib/dashboard-service";
import { formatRelativeDate, getNumber } from "@/lib/api-helpers";
import type { PortfolioChangeResource } from "@/types/api-resources";
import type { ApiError } from "@/types/auth";

type ChangeType = "mejora" | "deterioro" | "sin_cambios";

type ClientChange = {
  id: string;
  identifier: string;
  previousSituation: string;
  currentSituation: string;
  changeType: ChangeType;
  changeLabel: string;
  detectedAt: string;
};

function formatSituation(value: string | number | undefined) {
  if (typeof value === "number") return `Situacion ${value}`;
  if (typeof value === "string" && value.trim()) return value;
  return "Sin dato";
}

function resolveChangeType(item: PortfolioChangeResource): ChangeType {
  const explicit = (item.changeType ?? item.tipoCambio ?? "").toLowerCase();

  if (explicit.includes("mejor")) return "mejora";
  if (explicit.includes("deterior") || explicit.includes("empeor")) return "deterioro";

  const previous = typeof item.situacionAnterior === "number" ? item.situacionAnterior : null;
  const current = typeof item.situacionNueva === "number"
    ? item.situacionNueva
    : typeof item.situacionActual === "number"
      ? item.situacionActual
      : null;

  if (previous !== null && current !== null) {
    if (current < previous) return "mejora";
    if (current > previous) return "deterioro";
  }

  return "sin_cambios";
}

function resolveChangeLabel(previous: number | null, current: number | null, changeType: ChangeType) {
  if (previous !== null && current !== null && previous !== current) {
    const diff = Math.abs(current - previous);
    return `${changeType === "mejora" ? "-" : "+"}${diff}`;
  }

  if (changeType === "mejora") return "Mejora";
  if (changeType === "deterioro") return "Deterioro";
  return "Sin cambios";
}

function mapPortfolioChange(item: PortfolioChangeResource, index: number): ClientChange {
  const previous = typeof item.situacionAnterior === "number" ? item.situacionAnterior : null;
  const current = typeof item.situacionNueva === "number"
    ? item.situacionNueva
    : typeof item.situacionActual === "number"
      ? item.situacionActual
      : null;
  const changeType = resolveChangeType(item);

  return {
    id: item.id ?? `${item.cuil ?? "portfolio"}-${index}`,
    identifier: item.cuil ?? item.dni ?? "Sin dato",
    previousSituation: formatSituation(item.situacionAnterior),
    currentSituation: formatSituation(item.situacionNueva ?? item.situacionActual),
    changeType,
    changeLabel: resolveChangeLabel(previous, current, changeType),
    detectedAt: formatRelativeDate(item.detectadoAt ?? item.fechaCambio ?? item.updatedAt ?? item.createdAt),
  };
}

export default function PortfolioPage() {
  const [filterType, setFilterType] = useState<ChangeType | "all">("all");
  const [portfolioChanges, setPortfolioChanges] = useState<ClientChange[]>([]);
  const [portfolioSize, setPortfolioSize] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [portfolioResponse, sizeResponse] = await Promise.allSettled([
          dashboardService.getPortfolio(),
          dashboardService.getPortfolioSize(),
        ]);

        if (portfolioResponse.status === "fulfilled") {
          setPortfolioChanges(portfolioResponse.value.map(mapPortfolioChange));
        } else {
          setPortfolioChanges([]);
        }

        if (sizeResponse.status === "fulfilled") {
          setPortfolioSize(
            getNumber(sizeResponse.value?.tamanio, getNumber(sizeResponse.value?.total, getNumber(sizeResponse.value?.cantidad, 0)))
          );
        } else {
          setPortfolioSize(0);
        }

        if (portfolioResponse.status === "rejected" && sizeResponse.status === "rejected") {
          const apiError = (portfolioResponse.reason as { response?: { data?: ApiError } })?.response?.data;
          setError(apiError?.message ?? "No pudimos cargar la cartera.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadPortfolio();
  }, []);

  const filteredClients = useMemo(() => {
    return filterType === "all"
      ? portfolioChanges
      : portfolioChanges.filter((client) => client.changeType === filterType);
  }, [filterType, portfolioChanges]);

  const stats = useMemo(() => {
    const totalBase = portfolioSize || portfolioChanges.length;
    const improved = portfolioChanges.filter((client) => client.changeType === "mejora").length;
    const deteriorated = portfolioChanges.filter((client) => client.changeType === "deterioro").length;

    return {
      totalClients: totalBase,
      improved,
      deteriorated,
    };
  }, [portfolioChanges, portfolioSize]);

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Cartera</h1>
          <p className="text-muted-foreground">
            Seguimiento de cambios en la situacion crediticia de clientes monitoreados
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Datos provistos por la API de cartera</span>
        </div>
      </div>

      {error ? (
        <div className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="size-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Monitoreados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">Cantidad total registrada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mejoras Detectadas</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.improved}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalClients > 0 ? `${((stats.improved / stats.totalClients) * 100).toFixed(1)}% del total` : "Sin datos"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deterioros Detectados</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.deteriorated}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalClients > 0 ? `${((stats.deteriorated / stats.totalClients) * 100).toFixed(1)}% del total` : "Sin datos"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Filtrar por:</span>
        <div className="flex gap-2">
          <Button variant={filterType === "all" ? "default" : "outline"} size="sm" onClick={() => setFilterType("all")}>Todos</Button>
          <Button variant={filterType === "mejora" ? "default" : "outline"} size="sm" onClick={() => setFilterType("mejora")}>
            <ArrowUpCircle className="h-4 w-4 mr-1 text-green-600" />
            Mejoras
          </Button>
          <Button variant={filterType === "deterioro" ? "default" : "outline"} size="sm" onClick={() => setFilterType("deterioro")}>
            <ArrowDownCircle className="h-4 w-4 mr-1 text-red-600" />
            Deterioros
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Cambios en situacion crediticia</CardTitle>
            <CardDescription>
              Eventos detectados por la API de cartera
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground">
              <LoaderCircle className="h-5 w-5 mr-2 animate-spin" />
              Cargando cambios de cartera...
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay cambios en esta categoria</h3>
              <p className="text-muted-foreground">
                No se detectaron {filterType === "mejora" ? "mejoras" : filterType === "deterioro" ? "deterioros" : "movimientos"} en la cartera.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <div key={client.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-semibold text-base">CUIL: {client.identifier}</p>
                        </div>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          client.changeType === "mejora"
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : client.changeType === "deterioro"
                              ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                              : "bg-muted text-muted-foreground"
                        }`}>
                          {client.changeType === "mejora" ? <ArrowUpCircle className="h-3 w-3" /> : client.changeType === "deterioro" ? <ArrowDownCircle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                          {client.changeLabel}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        <div>
                          <p className="text-xs text-muted-foreground">Situacion anterior</p>
                          <p className="font-medium">{client.previousSituation}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Situacion nueva</p>
                          <p className="font-medium text-lg">{client.currentSituation}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Detectado</p>
                          <p className="text-sm">{client.detectedAt}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
