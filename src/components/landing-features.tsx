import { Database, TrendingUp, Sliders, RefreshCcw, FolderKanban, Activity } from "lucide-react";

export function LandingFeatures() {
  const features = [
    {
      icon: Database,
      title: "Recomendaciones de productos",
      description: "Consulta perfiles y obten sugerencias mas alineadas al riesgo y a la oferta disponible en tu fintech."
    },
    {
      icon: RefreshCcw,
      title: "Configuracion simple",
      description: "Administra productos, API keys, limites de uso y reglas de negocio desde una sola interfaz."
    },
    {
      icon: FolderKanban,
      title: "Gestión de Cartera",
      description: "Da seguimiento a clientes monitoreados y visualiza mejoras o deterioros en su situacion crediticia."
    },
    {
      icon: Sliders,
      title: "Politica crediticia configurable",
      description: "Define criterios de elegibilidad como situacion BCRA, deuda externa e historial limpio sin mezclarlo con productos."
    },
    {
      icon: Activity,
      title: "Uso y suscripcion",
      description: "Consulta el uso del dia, el plan activo y los accesos de integracion disponibles para tu equipo."
    },
    {
      icon: TrendingUp,
      title: "Vision operativa clara",
      description: "Combina clientes, productos y recomendaciones en un dashboard pensado para decision crediticia diaria."
    }
  ];

  return (
    <section id="features" className="container mx-auto px-4 md:px-6 py-20 md:py-32 scroll-mt-16">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Todo lo necesario para operar con mas criterio
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Una plataforma enfocada en elegibilidad, oferta y seguimiento para equipos fintech.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="flex flex-col gap-4 p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10">
                <Icon className="size-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
