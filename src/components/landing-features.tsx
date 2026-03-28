import { Database, TrendingUp, Sliders, RefreshCcw, FolderKanban, Activity } from "lucide-react";

export function LandingFeatures() {
  const features = [
    {
      icon: Database,
      title: "Motor de Decisión IA",
      description: "Acciones concretas basadas en datos históricos y machine learning. No solo análisis, sino recomendaciones específicas."
    },
    {
      icon: RefreshCcw,
      title: "Aprendizaje Continuo",
      description: "Sistema actualizable que incorpora los resultados de tus operaciones para mejorar continuamente las predicciones."
    },
    {
      icon: FolderKanban,
      title: "Gestión de Cartera",
      description: "Seguimiento parcial de clientes consultados, permitiendo trazabilidad y análisis de tu portfolio activo."
    },
    {
      icon: Sliders,
      title: "Simulación de Escenarios",
      description: "Experimenta con parámetros y visualiza impactos en tiempo real antes de tomar decisiones críticas."
    },
    {
      icon: Activity,
      title: "Monitoreo de Recomendaciones",
      description: "Seguimiento continuo de nuestras sugerencias con alertas para optimizar tus parámetros según resultados."
    },
    {
      icon: TrendingUp,
      title: "Analíticas Predictivas",
      description: "Proyecciones de comportamiento crediticio y tendencias basadas en patrones históricos y actuales."
    }
  ];

  return (
    <section id="features" className="container mx-auto px-4 md:px-6 py-20 md:py-32 scroll-mt-16">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Todo lo que Necesitas para Prestar Mejor
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Un ecosistema completo diseñado para fintechs que buscan decisiones más inteligentes
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
