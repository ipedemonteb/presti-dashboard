import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Pencil, Save, X } from "lucide-react";

type PolicyForm = {
  maxSituacionCrediticiaPermitida: string;
  maxEntidadesConDeuda: string;
  maxDeudaTotalExterna: string;
  mesesHistorialLimpioRequerido: string;
  permitirDeudaIrregularVigente: string;
};

const initialPolicyForm: PolicyForm = {
  maxSituacionCrediticiaPermitida: "2",
  maxEntidadesConDeuda: "3",
  maxDeudaTotalExterna: "350000",
  mesesHistorialLimpioRequerido: "6",
  permitirDeudaIrregularVigente: "no",
};

export default function ParametersPage() {
  const [modified, setModified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [policyForm, setPolicyForm] = useState<PolicyForm>(initialPolicyForm);

  const handleCancel = () => {
    setPolicyForm(initialPolicyForm);
    setModified(false);
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof PolicyForm, value: string) => {
    setPolicyForm((current) => ({ ...current, [field]: value }));
    setModified(true);
  };

  const recentChanges = [
    {
      parameter: "Situacion crediticia maxima permitida",
      value: `<= ${policyForm.maxSituacionCrediticiaPermitida}`,
      note: "Define el umbral principal de entrada al motor de decision.",
    },
    {
      parameter: "Meses de historial limpio requeridos",
      value: `${policyForm.mesesHistorialLimpioRequerido} meses`,
      note: "Asegura consistencia y no solo una foto puntual del cliente.",
    },
    {
      parameter: "Deuda irregular vigente",
      value: policyForm.permitirDeudaIrregularVigente === "si" ? "Permitida" : "No permitida",
      note: "Regla binaria de descarte rapido para automatizacion.",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Parámetros</h1>
          <p className="text-muted-foreground">
            Define la politica crediticia de la fintech sin superponerse con la configuracion de productos.
          </p>
        </div>
        <Button onClick={() => setIsEditing(true)} disabled={isEditing}>
          <Pencil className="size-4 mr-2" />
          Editar
        </Button>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold mb-1">Elegibilidad crediticia</h2>
            <p className="text-sm text-muted-foreground">
              Reglas que determinan si un cliente puede entrar a evaluacion segun su situacion en BCRA y su historial.
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="max-situacion">Maxima situacion crediticia permitida</Label>
                  <button className="text-muted-foreground hover:text-foreground" title="Aprobar solo clientes con situacion BCRA igual o mejor a este umbral.">
                    <AlertCircle className="size-4" />
                  </button>
                </div>
                <Input
                  id="max-situacion"
                  type="number"
                  min="1"
                  max="6"
                  value={policyForm.maxSituacionCrediticiaPermitida}
                  disabled={!isEditing}
                  onChange={(event) => handleFieldChange("maxSituacionCrediticiaPermitida", event.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Regla principal del motor. Ejemplo: operar solo con situacion menor o igual a 2.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="deuda-irregular">Permitir deuda irregular vigente</Label>
                  <button className="text-muted-foreground hover:text-foreground" title="Si el cliente hoy tiene deuda en mora o irregular, esta regla define si puede seguir evaluandose o no.">
                    <AlertCircle className="size-4" />
                  </button>
                </div>
                <Select
                  value={policyForm.permitirDeudaIrregularVigente}
                  onValueChange={(value) => handleFieldChange("permitirDeudaIrregularVigente", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger id="deuda-irregular">
                    <SelectValue placeholder="Selecciona una politica" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No permitir</SelectItem>
                    <SelectItem value="si">Permitir</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Regla binaria para automatizar rechazo inmediato ante deuda irregular actual.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="historial-limpio">Meses de historial limpio requeridos</Label>
                  <button className="text-muted-foreground hover:text-foreground" title="Cantidad minima de meses sin caer en situacion irregular.">
                    <AlertCircle className="size-4" />
                  </button>
                </div>
                <Input
                  id="historial-limpio"
                  type="number"
                  min="0"
                  step="1"
                  value={policyForm.mesesHistorialLimpioRequerido}
                  disabled={!isEditing}
                  onChange={(event) => handleFieldChange("mesesHistorialLimpioRequerido", event.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Mide consistencia del comportamiento crediticio, no solo la foto actual del cliente.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <h2 className="text-xl font-semibold mb-1">Endeudamiento externo</h2>
            <p className="text-sm text-muted-foreground">
              Reglas para limitar sobreendeudamiento y definir si el cliente es elegible antes de ofrecer productos.
            </p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="max-entidades">Maximo de entidades con deuda</Label>
                  <button className="text-muted-foreground hover:text-foreground" title="Limita el sobreendeudamiento distribuido entre varias entidades.">
                    <AlertCircle className="size-4" />
                  </button>
                </div>
                <Input
                  id="max-entidades"
                  type="number"
                  min="0"
                  step="1"
                  value={policyForm.maxEntidadesConDeuda}
                  disabled={!isEditing}
                  onChange={(event) => handleFieldChange("maxEntidadesConDeuda", event.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Ejemplo: rechazar si el cliente ya tiene deuda informada en mas de 3 entidades.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="max-deuda-total">Maxima deuda total externa</Label>
                  <button className="text-muted-foreground hover:text-foreground" title="Define un umbral de exclusion basado en deuda total BCRA acumulada.">
                    <AlertCircle className="size-4" />
                  </button>
                </div>
                <div className="flex gap-2">
                  <Input
                    id="max-deuda-total"
                    type="number"
                    min="0"
                    step="1000"
                    value={policyForm.maxDeudaTotalExterna}
                    disabled={!isEditing}
                    onChange={(event) => handleFieldChange("maxDeudaTotalExterna", event.target.value)}
                  />
                  <div className="flex min-w-[80px] items-center justify-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">
                    ARS
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  No define el monto del producto; define si el cliente entra o no a evaluacion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">Resumen de politica actual</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentChanges.map((item) => (
              <div key={item.parameter} className="rounded-lg border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-medium">{item.parameter}</p>
                    <p className="text-sm text-muted-foreground">{item.note}</p>
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isEditing ? (
            <div className="mt-6 flex items-center justify-end gap-3 border-t pt-6">
              <Button variant="outline" onClick={handleCancel}>
                <X className="size-4 mr-2" />
                Cancelar
              </Button>
              <Button
                disabled={!modified}
                onClick={() => {
                  setModified(false);
                  setIsEditing(false);
                }}
              >
                <Save className="size-4 mr-2" />
                Guardar cambios
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
