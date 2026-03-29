import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router";

export function LandingPricing() {
  const plans = [
    {
      name: "Pro",
      price: "USD 299",
      description: "Para fintechs chicas o equipos que estan validando el producto con un volumen acotado.",
      features: [
        "Hasta 5.000 evaluaciones incluidas por mes",
        "Suscripcion mensual fija",
        "Acceso a funciones principales de la plataforma",
        "Cargo variable por consultas excedentes",
        "Pensado para validar el producto con bajo volumen"
      ],
      cta: "Crear cuenta",
      link: "/register"
    },
    {
      name: "Business",
      price: "USD 1.090",
      description: "Para empresas en crecimiento con mayor volumen operativo y necesidad de profundizar analitica y monitoreo.",
      features: [
        "Mayor volumen incluido que el plan Pro",
        "Costo marginal mas bajo por consulta adicional",
        "Orientado a empresas en crecimiento",
        "Mayor profundidad de analitica, simulacion y monitoreo"
      ],
      cta: "Crear cuenta",
      link: "/register",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Desde USD 3.000",
      description: "Para clientes de gran escala o con integraciones criticas dentro del flujo de originacion.",
      features: [
        "Altos volumenes incluidos y pricing por volumen",
        "Condiciones comerciales personalizadas",
        "Integraciones criticas dentro del flujo de originacion",
        "Soporte dedicado",
        "Acuerdos de nivel de servicio",
        "Precios definidos segun necesidad del cliente"
      ],
      cta: "Contactar Ventas",
      link: "#"
    }
  ];

  return (
    <section id="pricing" className="container mx-auto px-4 md:px-6 py-20 md:py-32 scroll-mt-16">
      <div className="flex flex-col items-center text-center space-y-4 mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          Pricing alineado al valor que genera tu operacion
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          La propuesta combina una suscripcion mensual por acceso a la infraestructura de decision y un componente variable segun uso de la API.
        </p>
        <p className="text-sm text-muted-foreground max-w-3xl">
          La suscripcion cubre dashboard, reglas de negocio, parametrizacion del motor, simulacion y seguimiento de cartera. El uso variable acompaña el crecimiento de evaluaciones y consultas en produccion.
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
                {plan.name !== "Enterprise" && <span className="text-muted-foreground">/mes</span>}
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

      <div className="mx-auto mt-10 max-w-4xl rounded-lg border bg-card px-6 py-5 text-sm text-muted-foreground">
        Cada plan incluye una base mensual por acceso a plataforma y un cargo adicional por excedente de evaluaciones. Esto permite una barrera de entrada razonable para equipos chicos y una captura de valor creciente cuando presti se vuelve parte central de la operatoria.
      </div>
    </section>
  );
}
