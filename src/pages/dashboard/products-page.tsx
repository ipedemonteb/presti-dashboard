import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardService } from "@/lib/dashboard-service";
import type { ApiProduct, ApiProductType, CreateProductDto } from "@/types/api-resources";
import type { ApiError } from "@/types/auth";
import { AlertCircle, CreditCard, DollarSign, Edit, LoaderCircle, Plus, Trash2, Wallet } from "lucide-react";

type ProductType = "prestamo" | "microprestamo" | "tarjeta";

type FormState = {
  name: string;
  interestMin: string;
  interestMax: string;
  installmentsMin: string;
  installmentsMax: string;
  amountMin: string;
  amountMax: string;
  creditInterestMin: string;
  creditInterestMax: string;
  singlePaymentMin: string;
  singlePaymentMax: string;
  installmentLimitMin: string;
  installmentLimitMax: string;
};

const productTypes = [
  { value: "prestamo", label: "Prestamo", icon: DollarSign },
  { value: "microprestamo", label: "Microprestamo", icon: Wallet },
  { value: "tarjeta", label: "Tarjeta de Credito", icon: CreditCard },
] as const;

const emptyFormState: FormState = {
  name: "",
  interestMin: "",
  interestMax: "",
  installmentsMin: "",
  installmentsMax: "",
  amountMin: "",
  amountMax: "",
  creditInterestMin: "",
  creditInterestMax: "",
  singlePaymentMin: "",
  singlePaymentMax: "",
  installmentLimitMin: "",
  installmentLimitMax: "",
};

function mapApiTypeToUi(type: ApiProductType): ProductType {
  if (type === "MICROPRESTAMO") return "microprestamo";
  if (type === "TARJETA_CREDITO") return "tarjeta";
  return "prestamo";
}

function mapUiTypeToApi(type: ProductType): ApiProductType {
  if (type === "microprestamo") return "MICROPRESTAMO";
  if (type === "tarjeta") return "TARJETA_CREDITO";
  return "PRESTAMO";
}

function toNumber(value: string) {
  if (!value.trim()) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function formatCurrency(value?: number | null) {
  if (typeof value !== "number") return "-";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ProductType | "">("");
  const [editingProduct, setEditingProduct] = useState<ApiProduct | null>(null);
  const [formData, setFormData] = useState<FormState>(emptyFormState);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const loadProducts = async () => {
    try {
      setError("");
      const data = await dashboardService.getProducts();
      setProducts(data);
    } catch (err) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data;
      setError(apiError?.message ?? "No pudimos cargar los productos.");
    } finally {
      setIsPageLoading(false);
    }
  };

  useEffect(() => {
    void loadProducts();
  }, []);

  const resetForm = () => {
    setFormData(emptyFormState);
    setSelectedType("");
    setEditingProduct(null);
    setSubmitError("");
  };

  const handleOpenDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: ApiProduct) => {
    setEditingProduct(product);
    setSelectedType(mapApiTypeToUi(product.tipo));
    setSubmitError("");

    if (product.tipo === "TARJETA_CREDITO") {
      setFormData({
        ...emptyFormState,
        name: product.nombre,
        creditInterestMin: product.interesMin?.toString() ?? "",
        creditInterestMax: product.interesMax?.toString() ?? "",
        singlePaymentMin: product.limiteMontoTotalMin?.toString() ?? "",
        singlePaymentMax: product.limiteMontoTotalMax?.toString() ?? "",
        installmentLimitMin: product.limiteCuotasMin?.toString() ?? "",
        installmentLimitMax: product.limiteCuotasMax?.toString() ?? "",
      });
    } else {
      setFormData({
        ...emptyFormState,
        name: product.nombre,
        interestMin: product.tasaMin?.toString() ?? "",
        interestMax: product.tasaMax?.toString() ?? "",
        installmentsMin: product.cuotasMin?.toString() ?? "",
        installmentsMax: product.cuotasMax?.toString() ?? "",
        amountMin: product.montoMin?.toString() ?? "",
        amountMax: product.montoMax?.toString() ?? "",
      });
    }

    setIsDialogOpen(true);
  };

  const payload = useMemo<CreateProductDto | null>(() => {
    if (!selectedType || !formData.name.trim()) {
      return null;
    }

    const base: CreateProductDto = {
      nombre: formData.name.trim(),
      activo: true,
      tipo: mapUiTypeToApi(selectedType),
    };

    if (selectedType === "tarjeta") {
      return {
        ...base,
        interesMin: toNumber(formData.creditInterestMin),
        interesMax: toNumber(formData.creditInterestMax),
        limiteMontoTotalMin: toNumber(formData.singlePaymentMin),
        limiteMontoTotalMax: toNumber(formData.singlePaymentMax),
        limiteCuotasMin: toNumber(formData.installmentLimitMin),
        limiteCuotasMax: toNumber(formData.installmentLimitMax),
      };
    }

    return {
      ...base,
      tasaMin: toNumber(formData.interestMin),
      tasaMax: toNumber(formData.interestMax),
      cuotasMin: toNumber(formData.installmentsMin),
      cuotasMax: toNumber(formData.installmentsMax),
      montoMin: toNumber(formData.amountMin),
      montoMax: toNumber(formData.amountMax),
    };
  }, [formData, selectedType]);

  const handleSaveProduct = async () => {
    if (!payload) return;

    try {
      setIsSaving(true);
      setSubmitError("");

      if (editingProduct) {
        const updated = await dashboardService.updateProduct(editingProduct.id, payload);
        if (updated) {
          setProducts((current) =>
            current.map((product) => (product.id === editingProduct.id ? updated : product))
          );
        } else {
          await loadProducts();
        }
      } else {
        const created = await dashboardService.createProduct(payload);
        if (created) {
          setProducts((current) => [created, ...current]);
        } else {
          await loadProducts();
        }
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (err) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data;
      setSubmitError(apiError?.message ?? "No pudimos guardar el producto.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      setError("");
      await dashboardService.deleteProduct(id);
      setProducts((current) => current.filter((product) => product.id !== id));
    } catch (err) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data;
      setError(apiError?.message ?? "No pudimos eliminar el producto.");
    }
  };

  const getProductIcon = (type: ApiProductType) => {
    const uiType = mapApiTypeToUi(type);
    return productTypes.find((productType) => productType.value === uiType)?.icon ?? DollarSign;
  };

  const getProductLabel = (type: ApiProductType) => {
    if (type === "MICROPRESTAMO") return "Microprestamo";
    if (type === "TARJETA_CREDITO") return "Tarjeta de Credito";
    return "Prestamo";
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Productos</h1>
          <p className="text-muted-foreground">
            Configura los productos financieros que ofreces y sus rangos de valores.
          </p>
        </div>

        <Dialog
          open={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar producto" : "Agregar nuevo producto"}
              </DialogTitle>
              <DialogDescription>
                Carga el tipo y los rangos que usara el motor de decision.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {submitError ? (
                <div className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertCircle className="size-4 mt-0.5 shrink-0" />
                  <span>{submitError}</span>
                </div>
              ) : null}

              <div className="space-y-2">
                <Label htmlFor="product-name">Nombre del producto</Label>
                <Input
                  id="product-name"
                  placeholder="Ej: Prestamo Personal Plus"
                  value={formData.name}
                  onChange={(e) => setFormData((current) => ({ ...current, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="product-type">Tipo de producto</Label>
                <Select
                  value={selectedType}
                  onValueChange={(value) => setSelectedType(value as ProductType)}
                  disabled={!!editingProduct}
                >
                  <SelectTrigger id="product-type">
                    <SelectValue placeholder="Selecciona un tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {selectedType && selectedType !== "tarjeta" ? (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Rangos de valores</h3>

                  <div className="space-y-2">
                    <Label>Tasa de interes anual (%)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="interest-min" className="text-xs text-muted-foreground">Minimo</Label>
                        <Input id="interest-min" type="number" step="0.1" value={formData.interestMin} onChange={(e) => setFormData((current) => ({ ...current, interestMin: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="interest-max" className="text-xs text-muted-foreground">Maximo</Label>
                        <Input id="interest-max" type="number" step="0.1" value={formData.interestMax} onChange={(e) => setFormData((current) => ({ ...current, interestMax: e.target.value }))} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Cantidad de cuotas</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="installments-min" className="text-xs text-muted-foreground">Minimo</Label>
                        <Input id="installments-min" type="number" value={formData.installmentsMin} onChange={(e) => setFormData((current) => ({ ...current, installmentsMin: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="installments-max" className="text-xs text-muted-foreground">Maximo</Label>
                        <Input id="installments-max" type="number" value={formData.installmentsMax} onChange={(e) => setFormData((current) => ({ ...current, installmentsMax: e.target.value }))} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Monto</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="amount-min" className="text-xs text-muted-foreground">Minimo</Label>
                        <Input id="amount-min" type="number" value={formData.amountMin} onChange={(e) => setFormData((current) => ({ ...current, amountMin: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="amount-max" className="text-xs text-muted-foreground">Maximo</Label>
                        <Input id="amount-max" type="number" value={formData.amountMax} onChange={(e) => setFormData((current) => ({ ...current, amountMax: e.target.value }))} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}

              {selectedType === "tarjeta" ? (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Rangos de valores</h3>

                  <div className="space-y-2">
                    <Label>Tasa de interes anual (%)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="credit-interest-min" className="text-xs text-muted-foreground">Minimo</Label>
                        <Input id="credit-interest-min" type="number" step="0.1" value={formData.creditInterestMin} onChange={(e) => setFormData((current) => ({ ...current, creditInterestMin: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="credit-interest-max" className="text-xs text-muted-foreground">Maximo</Label>
                        <Input id="credit-interest-max" type="number" step="0.1" value={formData.creditInterestMax} onChange={(e) => setFormData((current) => ({ ...current, creditInterestMax: e.target.value }))} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Limite de consumo en un pago</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="single-payment-min" className="text-xs text-muted-foreground">Minimo</Label>
                        <Input id="single-payment-min" type="number" value={formData.singlePaymentMin} onChange={(e) => setFormData((current) => ({ ...current, singlePaymentMin: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="single-payment-max" className="text-xs text-muted-foreground">Maximo</Label>
                        <Input id="single-payment-max" type="number" value={formData.singlePaymentMax} onChange={(e) => setFormData((current) => ({ ...current, singlePaymentMax: e.target.value }))} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Limite de cuotas</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="installment-limit-min" className="text-xs text-muted-foreground">Minimo</Label>
                        <Input id="installment-limit-min" type="number" value={formData.installmentLimitMin} onChange={(e) => setFormData((current) => ({ ...current, installmentLimitMin: e.target.value }))} />
                      </div>
                      <div>
                        <Label htmlFor="installment-limit-max" className="text-xs text-muted-foreground">Maximo</Label>
                        <Input id="installment-limit-max" type="number" value={formData.installmentLimitMax} onChange={(e) => setFormData((current) => ({ ...current, installmentLimitMax: e.target.value }))} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSaving}>
                Cancelar
              </Button>
              <Button onClick={() => void handleSaveProduct()} disabled={!payload || isSaving}>
                {isSaving ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                {editingProduct ? "Guardar cambios" : "Agregar producto"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error ? (
        <div className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="size-4 mt-0.5 shrink-0" />
          <span>{error}</span>
          <Button variant="outline" size="sm" className="ml-auto" onClick={() => {
            setIsPageLoading(true);
            void loadProducts();
          }}>
            Reintentar
          </Button>
        </div>
      ) : null}

      {isPageLoading ? (
        <Card>
          <CardContent className="flex items-center justify-center py-16 text-muted-foreground">
            <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
            Cargando productos...
          </CardContent>
        </Card>
      ) : products.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No hay productos configurados</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              Crea tu primer producto para empezar a usar recomendaciones sobre oferta financiera.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = getProductIcon(product.tipo);

            return (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-md leading-snug">{product.nombre}</CardTitle>
                        <CardDescription>{getProductLabel(product.tipo)}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon-sm" onClick={() => handleEditProduct(product)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => void handleDeleteProduct(product.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {product.tipo === "TARJETA_CREDITO" ? (
                    <>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Interes</p>
                        <p className="font-medium">{product.interesMin ?? "-"}% - {product.interesMax ?? "-"}%</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Limite total</p>
                        <p className="font-medium">{formatCurrency(product.limiteMontoTotalMin)} - {formatCurrency(product.limiteMontoTotalMax)}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Cuotas</p>
                        <p className="font-medium">{product.limiteCuotasMin ?? "-"} - {product.limiteCuotasMax ?? "-"}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Tasa</p>
                        <p className="font-medium">{product.tasaMin ?? "-"}% - {product.tasaMax ?? "-"}%</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Cuotas</p>
                        <p className="font-medium">{product.cuotasMin ?? "-"} - {product.cuotasMax ?? "-"} meses</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Monto</p>
                        <p className="font-medium">{formatCurrency(product.montoMin)} - {formatCurrency(product.montoMax)}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
