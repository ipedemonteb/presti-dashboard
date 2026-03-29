import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router";

export function LandingPricing() {
  const plans = [
    {
      name: "Inicial",
      price: "$499",
      description: "Para equipos que empiezan a ordenar su operacion crediticia",
      features: [
        "Hasta 1,000 consultas/mes",
        "Dashboard de analytics",
        "Recomendaciones recientes",
        "Acceso estandar a API",
        "Soporte por email",
        "2 miembros del equipo",
        "Gestion de cartera basica"
      ],
      cta: "Prueba Gratuita",
      link: "/register"
    },
    {
      name: "Crecimiento",
      price: "$1,499",
      description: "Pensado para fintechs con mayor volumen y mas configuracion",
      features: [
        "Hasta 10,000 consultas/mes",
        "Analitica operativa ampliada",
        "Acceso completo a API",
        "Soporte prioritario",
        "10 miembros del equipo",
        "Politica crediticia configurable",
        "Gestion de productos",
        "Acceso API"
      ],
      cta: "Prueba Gratuita",
      link: "/register",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Personalizado",
      description: "Para operaciones con requerimientos de integracion y volumen dedicados",
      features: [
        "Consultas ilimitadas",
        "Integraciones dedicadas",
        "Configuracion operativa avanzada",
        "Acceso premium a datos",
        "Soporte dedicado",
        "Miembros ilimitados",
        "Integraciones personalizadas",
        "Monitoreo avanzado",
        "Acuerdos de servicio"
      ],
      cta: "Contactar Ventas",
      link: "#"
    }
  ];

  return (
    <section id="pricing" className="container mx-auto px-4 md:px-6 py-20 md:py-32 scroll-mt-16">
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Planes para cada etapa operativa
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Elige el nivel de acceso que mejor acompane tu volumen, tu equipo y tu nivel de integracion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`relative flex flex-col p-8 rounded-lg border bg-card ${
              plan.popular ? 'shadow-lg ring-2 ring-primary' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-1 rounded-full">
                Más Popular
              </div>
            )}
            
            <div className="space-y-4 mb-8">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== "Personalizado" && <span className="text-muted-foreground">/mes</span>}
              </div>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <Check className="size-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              className="w-full" 
              variant={plan.popular ? "default" : "outline"}
              size="lg"
              asChild={plan.link !== "#"}
            >
              {plan.link !== "#" ? (
                <Link to={plan.link}>{plan.cta}</Link>
              ) : (
                <button>{plan.cta}</button>
              )}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
