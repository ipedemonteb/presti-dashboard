import { useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, CreditCard, DollarSign, LoaderCircle, Search, Wallet } from "lucide-react";
import { dashboardService } from "@/lib/dashboard-service";
import type { ApiProduct, RecommendationResource } from "@/types/api-resources";
import type { ApiError } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function normalizeCuil(value: string) {
  return value.replace(/\D/g, "").slice(0, 11);
}

function getTextFromUnknown(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (typeof record.nombre === "string") return record.nombre;
    if (typeof record.productoNombre === "string") return record.productoNombre;
    if (typeof record.resultado === "string") return record.resultado;
  }

  return null;
}

function getRecommendationStatus(item: RecommendationResource) {
  const raw = (item.estado ?? getTextFromUnknown(item.resultado) ?? "").toLowerCase();

  if (raw.includes("aprob")) return "approved";
  if (raw.includes("rech") || raw.includes("deneg")) return "rejected";
  return "pending";
}

function getRecommendationTitle(item: RecommendationResource) {
  return item.productoNombre ?? getTextFromUnknown(item.producto) ?? getTextFromUnknown(item.resultado) ?? "Recomendacion generada";
}

function sortRecommendationsByDate(items: RecommendationResource[]) {
  return [...items].sort((a, b) => {
    const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return bTime - aTime;
  });
}

function getProductFromRecommendation(item: RecommendationResource) {
  return item.producto && typeof item.producto === "object" ? (item.producto as ApiProduct) : null;
}

function formatCurrency(value?: number | null) {
  if (typeof value !== "number") return "-";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

function getProductTypeLabel(product?: ApiProduct | null) {
  if (!product) return "Producto";
  if (product.tipo === "MICROPRESTAMO") return "Microprestamo";
  if (product.tipo === "TARJETA_CREDITO") return "Tarjeta de credito";
  return "Prestamo";
}

function getProductIcon(product?: ApiProduct | null) {
  if (!product) return DollarSign;
  if (product.tipo === "MICROPRESTAMO") return Wallet;
  if (product.tipo === "TARJETA_CREDITO") return CreditCard;
  return DollarSign;
}

export default function QueryPage() {
  const [cuil, setCuil] = useState("");
  const [results, setResults] = useState<RecommendationResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchedCuil, setSearchedCuil] = useState("");

  const summary = useMemo(() => {
    const approved = results.filter((item) => getRecommendationStatus(item) === "approved").length;
    const rejected = results.filter((item) => getRecommendationStatus(item) === "rejected").length;
    return {
      total: results.length,
      approved,
      rejected,
    };
  }, [results]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const normalizedCuil = normalizeCuil(cuil);

    if (normalizedCuil.length !== 11) {
      setError("Ingresa un CUIL valido de 11 digitos.");
      return;
    }

    setIsLoading(true);
    setResults([]);

    const requestStartedAt = new Date(Date.now() - 5_000).toISOString();

    try {
      await dashboardService.createRecommendation(normalizedCuil);
      const recommendations = await dashboardService.getRecommendations(requestStartedAt, normalizedCuil);
      const sortedRecommendations = sortRecommendationsByDate(recommendations);

      setSearchedCuil(normalizedCuil);
      setResults(sortedRecommendations.slice(0, 5));

      if (sortedRecommendations.length === 0) {
        setError("La consulta se ejecuto, pero todavia no devolvio recomendaciones visibles.");
      }
    } catch (err) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data;
      setError(apiError?.message ?? "No pudimos consultar recomendaciones para ese CUIL.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="max-w-5xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Query</h1>
          <p className="text-muted-foreground max-w-2xl">
            Consulta una recomendacion puntual por CUIL y revisa el resultado devuelto por la API.
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="query-cuil">CUIL del cliente</Label>
              <Input
                id="query-cuil"
                inputMode="numeric"
                placeholder="20123456789"
                value={cuil}
                onChange={(event) => setCuil(normalizeCuil(event.target.value))}
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground">
                Ingresa el CUIL sin guiones ni espacios para generar una nueva recomendacion.
              </p>
            </div>

            {error ? (
              <div className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="size-4 mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            ) : null}

            <Button type="submit" disabled={isLoading}>
              {isLoading ? <LoaderCircle className="mr-2 size-4 animate-spin" /> : <Search className="mr-2 size-4" />}
              Buscar
            </Button>
          </form>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">CUIL consultado</p>
            <p className="mt-2 text-2xl font-semibold">{searchedCuil || "-"}</p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Resultados obtenidos</p>
            <p className="mt-2 text-2xl font-semibold">{summary.total}</p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Aprobadas</p>
            <p className="mt-2 text-2xl font-semibold text-green-600">{summary.approved}</p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">Resultado de la consulta</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Se muestran las recomendaciones recientes encontradas para el CUIL consultado.
            </p>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12 text-muted-foreground">
                <LoaderCircle className="mr-2 size-5 animate-spin" />
                Generando recomendacion...
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
                Todavia no hay resultados para mostrar. Ejecuta una consulta para ver recomendaciones.
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((item, index) => {
                  const status = getRecommendationStatus(item);
                  const product = getProductFromRecommendation(item);
                  const ProductIcon = getProductIcon(product);

                  return (
                    <div key={item.id ?? `${searchedCuil}-${index}`} className="rounded-xl border p-5 transition-colors hover:bg-muted/40">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                              <ProductIcon className="size-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">{getRecommendationTitle(item)}</p>
                              <p className="text-sm text-muted-foreground">{getProductTypeLabel(product)}</p>
                            </div>
                          </div>

                          {product ? (
                            product.tipo === "TARJETA_CREDITO" ? (
                              <div className="grid gap-8 text-sm text-muted-foreground md:grid-cols-3">
                                <div>
                                  <p className="text-xs uppercase tracking-wide">Interes</p>
                                  <p className="mt-1 text-foreground">{product.interesMin ?? "-"}% - {product.interesMax ?? "-"}%</p>
                                </div>
                                <div>
                                  <p className="text-xs uppercase tracking-wide">Limite total</p>
                                  <p className="mt-1 text-foreground">{formatCurrency(product.limiteMontoTotalMin)} - {formatCurrency(product.limiteMontoTotalMax)}</p>
                                </div>
                                <div>
                                  <p className="text-xs uppercase tracking-wide">Cuotas</p>
                                  <p className="mt-1 text-foreground">{product.limiteCuotasMin ?? "-"} - {product.limiteCuotasMax ?? "-"}</p>
                                </div>
                              </div>
                            ) : (
                              <div className="grid gap-8 text-sm text-muted-foreground md:grid-cols-3">
                                <div>
                                  <p className="text-xs uppercase tracking-wide">Tasa</p>
                                  <p className="mt-1 text-foreground">{product.tasaMin ?? "-"}% - {product.tasaMax ?? "-"}%</p>
                                </div>
                                <div>
                                  <p className="text-xs uppercase tracking-wide">Monto</p>
                                  <p className="mt-1 text-foreground">{formatCurrency(product.montoMin)} - {formatCurrency(product.montoMax)}</p>
                                </div>
                                <div>
                                  <p className="text-xs uppercase tracking-wide">Cuotas</p>
                                  <p className="mt-1 text-foreground">{product.cuotasMin ?? "-"} - {product.cuotasMax ?? "-"}</p>
                                </div>
                              </div>
                            )
                          ) : null}
                        </div>

                        <div>
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${
                              status === "approved"
                                ? "bg-green-100 text-green-700"
                                : status === "rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            <CheckCircle2 className="size-4" />
                            {status === "approved" ? "Aprobada" : status === "rejected" ? "Rechazada" : "Pendiente"}
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
      </div>
    </div>
  );
}
