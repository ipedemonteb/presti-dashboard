import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Pencil, Save, X } from "lucide-react";
import { dashboardService } from "@/lib/dashboard-service";
import type { CreditPolicy } from "@/types/api-resources";
import type { ApiError } from "@/types/auth";

type PolicyForm = {
  maxSituacionCrediticiaPermitida: string;
  maxEntidadesConDeuda: string;
  maxDeudaTotalExterna: string;
  mesesHistorialLimpioRequerido: string;
};

const initialPolicyForm: PolicyForm = {
  maxSituacionCrediticiaPermitida: "2",
  maxEntidadesConDeuda: "3",
  maxDeudaTotalExterna: "350000",
  mesesHistorialLimpioRequerido: "6",
};

function mapPolicyToForm(policy: CreditPolicy): PolicyForm {
  return {
    maxSituacionCrediticiaPermitida: String(policy.maxSituacionCrediticiaPermitida),
    maxEntidadesConDeuda: String(policy.maxEntidadesConDeuda),
    maxDeudaTotalExterna: String(policy.maxDeudaTotalExterna),
    mesesHistorialLimpioRequerido: String(policy.mesesHistorialLimpioRequerido),
  };
}

function mapFormToPolicy(form: PolicyForm): CreditPolicy {
  return {
    maxSituacionCrediticiaPermitida: Number(form.maxSituacionCrediticiaPermitida),
    maxEntidadesConDeuda: Number(form.maxEntidadesConDeuda),
    maxDeudaTotalExterna: Number(form.maxDeudaTotalExterna),
    mesesHistorialLimpioRequerido: Number(form.mesesHistorialLimpioRequerido),
  };
}

export default function ParametersPage() {
  const [modified, setModified] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [policyForm, setPolicyForm] = useState<PolicyForm>(initialPolicyForm);
  const [savedPolicy, setSavedPolicy] = useState<PolicyForm>(initialPolicyForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPolicy = async () => {
      try {
        setError("");
        const response = await dashboardService.getCreditPolicy();

        if (response) {
          const mapped = mapPolicyToForm(response);
          setPolicyForm(mapped);
          setSavedPolicy(mapped);
        }
      } catch (err) {
        const apiError = (err as { response?: { data?: ApiError } }).response?.data;
        setError(apiError?.message ?? "No pudimos cargar la politica crediticia.");
      } finally {
        setIsLoading(false);
      }
    };

    void loadPolicy();
  }, []);

  const handleCancel = () => {
    setPolicyForm(savedPolicy);
    setModified(false);
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof PolicyForm, value: string) => {
    setPolicyForm((current) => ({ ...current, [field]: value }));
    setModified(true);
  };

  const recentChanges = useMemo(
    () => [
      {
        parameter: "Situacion crediticia maxima permitida",
        value: `<= ${policyForm.maxSituacionCrediticiaPermitida}`,
        note: "Define el umbral principal de entrada al motor de decision.",
      },
      {
        parameter: "Maximo de entidades con deuda",
        value: policyForm.maxEntidadesConDeuda,
        note: "Controla el sobreendeudamiento distribuido entre distintas entidades.",
      },
      {
        parameter: "Deuda total externa maxima",
        value: `ARS ${Number(policyForm.maxDeudaTotalExterna).toLocaleString("es-AR")}`,
        note: "Excluye perfiles con deuda total superior al umbral definido.",
      },
      {
        parameter: "Meses de historial limpio requeridos",
        value: `${policyForm.mesesHistorialLimpioRequerido} meses`,
        note: "Asegura consistencia y no solo una foto puntual del cliente.",
      },
    ],
    [policyForm]
  );

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError("");
      const payload = mapFormToPolicy(policyForm);
      const updated = await dashboardService.updateCreditPolicy(payload);

      if (updated) {
        const mapped = mapPolicyToForm(updated);
        setPolicyForm(mapped);
        setSavedPolicy(mapped);
      } else {
        setSavedPolicy(policyForm);
      }

      setModified(false);
      setIsEditing(false);
    } catch (err) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data;
      setError(apiError?.message ?? "No pudimos guardar la politica crediticia.");
    } finally {
      setIsSaving(false);
    }
  };

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

      {error ? (
        <div className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="size-4 mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      {isLoading ? (
        <div className="rounded-lg border bg-card p-8 text-sm text-muted-foreground">
          Cargando politica crediticia...
        </div>
      ) : (
        <>

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
                disabled={!modified || isSaving}
                onClick={() => void handleSave()}
              >
                <Save className="size-4 mr-2" />
                {isSaving ? "Guardando..." : "Guardar cambios"}
              </Button>
            </div>
          ) : null}
        </div>
      </div>
        </>
      )}
    </div>
  );
}
