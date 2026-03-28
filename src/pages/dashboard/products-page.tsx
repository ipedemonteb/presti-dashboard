import { useState } from "react";
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
import { Plus, CreditCard, Wallet, DollarSign, Trash2, Edit } from "lucide-react";

type ProductType = "prestamo" | "microprestamo" | "tarjeta";

interface Product {
  id: string;
  type: ProductType;
  name: string;
  // Préstamo y Microprétamo
  interestRate?: { min: number; max: number };
  installments?: { min: number; max: number };
  amount?: { min: number; max: number };
  // Tarjeta de Crédito
  creditInterestRate?: { min: number; max: number };
  singlePaymentLimit?: { min: number; max: number };
  installmentLimit?: { min: number; max: number };
}

const productTypes = [
  { value: "prestamo", label: "Préstamo", icon: DollarSign },
  { value: "microprestamo", label: "Micropréstamo", icon: Wallet },
  { value: "tarjeta", label: "Tarjeta de Crédito", icon: CreditCard },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<ProductType | "">("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    // Préstamo/Micropréstamo
    interestMin: "",
    interestMax: "",
    installmentsMin: "",
    installmentsMax: "",
    amountMin: "",
    amountMax: "",
    // Tarjeta
    creditInterestMin: "",
    creditInterestMax: "",
    singlePaymentMin: "",
    singlePaymentMax: "",
    installmentLimitMin: "",
    installmentLimitMax: "",
  });

  const resetForm = () => {
    setFormData({
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
    });
    setSelectedType("");
    setEditingProduct(null);
  };

  const handleOpenDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setSelectedType(product.type);
    
    if (product.type === "tarjeta") {
      setFormData({
        name: product.name,
        interestMin: "",
        interestMax: "",
        installmentsMin: "",
        installmentsMax: "",
        amountMin: "",
        amountMax: "",
        creditInterestMin: product.creditInterestRate?.min.toString() || "",
        creditInterestMax: product.creditInterestRate?.max.toString() || "",
        singlePaymentMin: product.singlePaymentLimit?.min.toString() || "",
        singlePaymentMax: product.singlePaymentLimit?.max.toString() || "",
        installmentLimitMin: product.installmentLimit?.min.toString() || "",
        installmentLimitMax: product.installmentLimit?.max.toString() || "",
      });
    } else {
      setFormData({
        name: product.name,
        interestMin: product.interestRate?.min.toString() || "",
        interestMax: product.interestRate?.max.toString() || "",
        installmentsMin: product.installments?.min.toString() || "",
        installmentsMax: product.installments?.max.toString() || "",
        amountMin: product.amount?.min.toString() || "",
        amountMax: product.amount?.max.toString() || "",
        creditInterestMin: "",
        creditInterestMax: "",
        singlePaymentMin: "",
        singlePaymentMax: "",
        installmentLimitMin: "",
        installmentLimitMax: "",
      });
    }
    
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleSaveProduct = () => {
    if (!selectedType || !formData.name) return;

    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      type: selectedType as ProductType,
      name: formData.name,
    };

    if (selectedType === "tarjeta") {
      newProduct.creditInterestRate = {
        min: parseFloat(formData.creditInterestMin),
        max: parseFloat(formData.creditInterestMax),
      };
      newProduct.singlePaymentLimit = {
        min: parseFloat(formData.singlePaymentMin),
        max: parseFloat(formData.singlePaymentMax),
      };
      newProduct.installmentLimit = {
        min: parseFloat(formData.installmentLimitMin),
        max: parseFloat(formData.installmentLimitMax),
      };
    } else {
      newProduct.interestRate = {
        min: parseFloat(formData.interestMin),
        max: parseFloat(formData.interestMax),
      };
      newProduct.installments = {
        min: parseFloat(formData.installmentsMin),
        max: parseFloat(formData.installmentsMax),
      };
      newProduct.amount = {
        min: parseFloat(formData.amountMin),
        max: parseFloat(formData.amountMax),
      };
    }

    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? newProduct : p)));
    } else {
      setProducts([...products, newProduct]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const getProductIcon = (type: ProductType) => {
    const productType = productTypes.find((pt) => pt.value === type);
    return productType ? productType.icon : DollarSign;
  };

  const getProductLabel = (type: ProductType) => {
    const productType = productTypes.find((pt) => pt.value === type);
    return productType ? productType.label : type;
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Productos</h1>
          <p className="text-muted-foreground">
            Configura los productos financieros que ofreces y sus rangos de valores
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Producto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}
              </DialogTitle>
              <DialogDescription>
                Selecciona el tipo de producto y define los rangos de valores
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Nombre del producto */}
              <div className="space-y-2">
                <Label htmlFor="product-name">Nombre del producto</Label>
                <Input
                  id="product-name"
                  placeholder="Ej: Préstamo Personal Plus"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {/* Tipo de producto */}
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

              {/* Formulario dinámico según tipo */}
              {selectedType && selectedType !== "tarjeta" && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Rangos de valores</h3>
                  
                  {/* Tasa de interés */}
                  <div className="space-y-2">
                    <Label>Tasa de interés anual (%)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="interest-min" className="text-xs text-muted-foreground">
                          Mínimo
                        </Label>
                        <Input
                          id="interest-min"
                          type="number"
                          step="0.1"
                          placeholder="15.0"
                          value={formData.interestMin}
                          onChange={(e) =>
                            setFormData({ ...formData, interestMin: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="interest-max" className="text-xs text-muted-foreground">
                          Máximo
                        </Label>
                        <Input
                          id="interest-max"
                          type="number"
                          step="0.1"
                          placeholder="45.0"
                          value={formData.interestMax}
                          onChange={(e) =>
                            setFormData({ ...formData, interestMax: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cuotas */}
                  <div className="space-y-2">
                    <Label>Cantidad de cuotas</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="installments-min" className="text-xs text-muted-foreground">
                          Mínimo
                        </Label>
                        <Input
                          id="installments-min"
                          type="number"
                          placeholder="3"
                          value={formData.installmentsMin}
                          onChange={(e) =>
                            setFormData({ ...formData, installmentsMin: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="installments-max" className="text-xs text-muted-foreground">
                          Máximo
                        </Label>
                        <Input
                          id="installments-max"
                          type="number"
                          placeholder="60"
                          value={formData.installmentsMax}
                          onChange={(e) =>
                            setFormData({ ...formData, installmentsMax: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Monto */}
                  <div className="space-y-2">
                    <Label>Monto ($)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="amount-min" className="text-xs text-muted-foreground">
                          Mínimo
                        </Label>
                        <Input
                          id="amount-min"
                          type="number"
                          placeholder="5000"
                          value={formData.amountMin}
                          onChange={(e) =>
                            setFormData({ ...formData, amountMin: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="amount-max" className="text-xs text-muted-foreground">
                          Máximo
                        </Label>
                        <Input
                          id="amount-max"
                          type="number"
                          placeholder="500000"
                          value={formData.amountMax}
                          onChange={(e) =>
                            setFormData({ ...formData, amountMax: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedType === "tarjeta" && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Rangos de valores</h3>
                  
                  {/* Tasa de interés */}
                  <div className="space-y-2">
                    <Label>Tasa de interés anual (%)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="credit-interest-min" className="text-xs text-muted-foreground">
                          Mínimo
                        </Label>
                        <Input
                          id="credit-interest-min"
                          type="number"
                          step="0.1"
                          placeholder="35.0"
                          value={formData.creditInterestMin}
                          onChange={(e) =>
                            setFormData({ ...formData, creditInterestMin: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="credit-interest-max" className="text-xs text-muted-foreground">
                          Máximo
                        </Label>
                        <Input
                          id="credit-interest-max"
                          type="number"
                          step="0.1"
                          placeholder="75.0"
                          value={formData.creditInterestMax}
                          onChange={(e) =>
                            setFormData({ ...formData, creditInterestMax: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Límite en un pago */}
                  <div className="space-y-2">
                    <Label>Límite de consumo en un pago ($)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="single-payment-min" className="text-xs text-muted-foreground">
                          Mínimo
                        </Label>
                        <Input
                          id="single-payment-min"
                          type="number"
                          placeholder="10000"
                          value={formData.singlePaymentMin}
                          onChange={(e) =>
                            setFormData({ ...formData, singlePaymentMin: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="single-payment-max" className="text-xs text-muted-foreground">
                          Máximo
                        </Label>
                        <Input
                          id="single-payment-max"
                          type="number"
                          placeholder="200000"
                          value={formData.singlePaymentMax}
                          onChange={(e) =>
                            setFormData({ ...formData, singlePaymentMax: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Límite en cuotas */}
                  <div className="space-y-2">
                    <Label>Límite de consumo en cuotas ($)</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="installment-limit-min" className="text-xs text-muted-foreground">
                          Mínimo
                        </Label>
                        <Input
                          id="installment-limit-min"
                          type="number"
                          placeholder="50000"
                          value={formData.installmentLimitMin}
                          onChange={(e) =>
                            setFormData({ ...formData, installmentLimitMin: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="installment-limit-max" className="text-xs text-muted-foreground">
                          Máximo
                        </Label>
                        <Input
                          id="installment-limit-max"
                          type="number"
                          placeholder="500000"
                          value={formData.installmentLimitMax}
                          onChange={(e) =>
                            setFormData({ ...formData, installmentLimitMax: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveProduct} disabled={!selectedType || !formData.name}>
                {editingProduct ? "Guardar Cambios" : "Agregar Producto"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de productos */}
      {products.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No hay productos configurados</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              Comienza agregando tu primer producto financiero para que el motor de decisión
              pueda hacer recomendaciones personalizadas
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const Icon = getProductIcon(product.type);
            return (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <CardDescription>{getProductLabel(product.type)}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {product.type === "tarjeta" ? (
                    <>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Tasa de interés</p>
                        <p className="font-medium">
                          {product.creditInterestRate?.min}% - {product.creditInterestRate?.max}%
                        </p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Límite un pago</p>
                        <p className="font-medium">
                          ${product.singlePaymentLimit?.min.toLocaleString()} - $
                          {product.singlePaymentLimit?.max.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Límite en cuotas</p>
                        <p className="font-medium">
                          ${product.installmentLimit?.min.toLocaleString()} - $
                          {product.installmentLimit?.max.toLocaleString()}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Tasa de interés</p>
                        <p className="font-medium">
                          {product.interestRate?.min}% - {product.interestRate?.max}%
                        </p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Cuotas</p>
                        <p className="font-medium">
                          {product.installments?.min} - {product.installments?.max} meses
                        </p>
                      </div>
                      <div className="text-sm">
                        <p className="text-muted-foreground">Monto</p>
                        <p className="font-medium">
                          ${product.amount?.min.toLocaleString()} - $
                          {product.amount?.max.toLocaleString()}
                        </p>
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
