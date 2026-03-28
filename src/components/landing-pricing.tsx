import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router";

export function LandingPricing() {
  const plans = [
    {
      name: "Inicial",
      price: "$499",
      description: "Perfecto para fintechs en etapa temprana",
      features: [
        "Hasta 1,000 consultas/mes",
        "Recomendaciones IA básicas",
        "Acceso estándar a base de datos",
        "Soporte por email",
        "2 miembros del equipo",
        "Gestión de cartera básica"
      ],
      cta: "Prueba Gratuita",
      link: "/register"
    },
    {
      name: "Crecimiento",
      price: "$1,499",
      description: "Ideal para operaciones en expansión",
      features: [
        "Hasta 10,000 consultas/mes",
        "Analítica IA avanzada",
        "Acceso completo a base de datos",
        "Soporte prioritario",
        "10 miembros del equipo",
        "Parámetros personalizables",
        "Simulación de escenarios",
        "Acceso API"
      ],
      cta: "Prueba Gratuita",
      link: "/register",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Personalizado",
      description: "Para operaciones de préstamo a gran escala",
      features: [
        "Consultas ilimitadas",
        "Solución white-label",
        "Modelos IA dedicados",
        "Acceso premium a datos",
        "Soporte 24/7 dedicado",
        "Miembros ilimitados",
        "Integraciones personalizadas",
        "Monitoreo avanzado",
        "Garantía SLA"
      ],
      cta: "Contactar Ventas",
      link: "#"
    }
  ];

  return (
    <section id="pricing" className="container mx-auto px-4 md:px-6 py-20 md:py-32 scroll-mt-16">
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Precios Simples y Transparentes
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Elige el plan que se ajuste a tus necesidades. Todos los planes incluyen 14 días de prueba gratuita.
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
