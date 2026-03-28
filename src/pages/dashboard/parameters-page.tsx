import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, RotateCcw, TrendingUp, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ParametersPage() {
  const [modified, setModified] = useState(false);

  const parameterSections = [
    {
      title: "Scoring Crediticio",
      description: "Parámetros que afectan el cálculo del score de crédito",
      parameters: [
        { id: "min_score", label: "Score mínimo aprobación", value: "650", unit: "puntos", info: "Score crediticio mínimo para aprobar automáticamente" },
        { id: "max_score", label: "Score máximo riesgo", value: "850", unit: "puntos", info: "Score máximo considerado" },
        { id: "weight_history", label: "Peso historial crediticio", value: "35", unit: "%", info: "Importancia del historial en el score final" },
        { id: "weight_income", label: "Peso ingresos", value: "25", unit: "%", info: "Importancia de los ingresos en el score" },
      ]
    },
    {
      title: "Límites de Préstamo",
      description: "Montos y plazos permitidos para préstamos",
      parameters: [
        { id: "min_amount", label: "Monto mínimo", value: "5000", unit: "$", info: "Monto mínimo permitido para préstamos" },
        { id: "max_amount", label: "Monto máximo", value: "500000", unit: "$", info: "Monto máximo permitido para préstamos" },
        { id: "min_term", label: "Plazo mínimo", value: "6", unit: "meses", info: "Plazo mínimo para devolución" },
        { id: "max_term", label: "Plazo máximo", value: "60", unit: "meses", info: "Plazo máximo para devolución" },
      ]
    },
    {
      title: "Tasas de Interés",
      description: "Configuración de tasas según perfil de riesgo",
      parameters: [
        { id: "rate_low_risk", label: "Tasa bajo riesgo", value: "18.5", unit: "%", info: "Tasa anual para clientes de bajo riesgo" },
        { id: "rate_medium_risk", label: "Tasa riesgo medio", value: "28.0", unit: "%", info: "Tasa anual para clientes de riesgo medio" },
        { id: "rate_high_risk", label: "Tasa alto riesgo", value: "42.0", unit: "%", info: "Tasa anual para clientes de alto riesgo" },
      ]
    },
    {
      title: "Umbrales de Decisión",
      description: "Umbrales para decisiones automáticas del motor de IA",
      parameters: [
        { id: "auto_approve_threshold", label: "Umbral auto-aprobación", value: "85", unit: "%", info: "Confianza mínima para aprobar automáticamente" },
        { id: "auto_reject_threshold", label: "Umbral auto-rechazo", value: "30", unit: "%", info: "Confianza máxima para rechazar automáticamente" },
        { id: "manual_review_min", label: "Revisión manual desde", value: "31", unit: "%", info: "Mínimo para revisión manual" },
        { id: "manual_review_max", label: "Revisión manual hasta", value: "84", unit: "%", info: "Máximo para revisión manual" },
      ]
    }
  ];

  const recentChanges = [
    {
      parameter: "Score mínimo aprobación",
      oldValue: "600",
      newValue: "650",
      changedBy: "Sistema IA",
      date: "Hace 2 días",
      impact: "+8% en tasa de recupero"
    },
    {
      parameter: "Tasa bajo riesgo",
      oldValue: "16.5%",
      newValue: "18.5%",
      changedBy: "Juan Pérez",
      date: "Hace 1 semana",
      impact: "+2.1% en rentabilidad"
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Parámetros</h1>
          <p className="text-muted-foreground">
            Personaliza los parámetros del motor de decisión
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setModified(false)}>
            <RotateCcw className="size-4 mr-2" />
            Restablecer
          </Button>
          <Button disabled={!modified} onClick={() => setModified(false)}>
            <Save className="size-4 mr-2" />
            Guardar cambios
          </Button>
        </div>
      </div>

      {/* Parameter Sections */}
      <div className="space-y-6">
        {parameterSections.map((section) => (
          <div key={section.title} className="rounded-lg border bg-card">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold mb-1">{section.title}</h2>
              <p className="text-sm text-muted-foreground">{section.description}</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.parameters.map((param) => (
                  <div key={param.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={param.id}>{param.label}</Label>
                      <button className="text-muted-foreground hover:text-foreground" title={param.info}>
                        <AlertCircle className="size-4" />
                      </button>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id={param.id}
                        type="number"
                        defaultValue={param.value}
                        className="flex-1"
                        onChange={() => setModified(true)}
                      />
                      <div className="flex items-center justify-center px-3 rounded-md border bg-muted text-muted-foreground text-sm min-w-[80px]">
                        {param.unit}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{param.info}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Changes */}
      <div className="rounded-lg border bg-card">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Cambios Recientes</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentChanges.map((change, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg border">
                <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 shrink-0">
                  <TrendingUp className="size-5 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium">{change.parameter}</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="line-through">{change.oldValue}</span> → <span className="font-medium text-foreground">{change.newValue}</span>
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Por {change.changedBy}</span>
                    <span>•</span>
                    <span>{change.date}</span>
                    <span>•</span>
                    <span className="text-green-600 font-medium">{change.impact}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
