import { Target, Award, Sparkles } from "lucide-react";

export function LandingAbout() {
  return (
    <section id="about" className="bg-muted/50 scroll-mt-16">
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Construido por Expertos en Fintech, para Líderes Fintech
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                Presti fue fundada por un equipo de veteranos en tecnología financiera que comprendieron 
                los desafíos de tomar decisiones crediticias rápidas y precisas a escala. Combinamos 
                experiencia profunda en el sector con IA de vanguardia para ayudarte a reducir riesgos y maximizar oportunidades.
              </p>
              <p className="text-lg text-muted-foreground">
                Nuestra plataforma procesa millones de datos para brindarte insights accionables: 
                no solo análisis, sino recomendaciones concretas que te permiten identificar clientes ideales, 
                sugerir productos apropiados y construir una cartera sostenible.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4 p-6 rounded-lg border bg-card">
              <div className="flex items-center justify-center size-12 shrink-0 rounded-lg bg-primary/10">
                <Target className="size-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Nuestra Misión</h3>
                <p className="text-muted-foreground">
                  Democratizar el acceso a herramientas sofisticadas de riesgo crediticio, 
                  empoderando a fintechs de todos los tamaños para competir con instituciones tradicionales.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border bg-card">
              <div className="flex items-center justify-center size-12 shrink-0 rounded-lg bg-primary/10">
                <Award className="size-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Nuestro Enfoque</h3>
                <p className="text-muted-foreground">
                  Combinar analítica impulsada por IA con bases de datos completas e interfaces 
                  intuitivas para entregar insights que generan mejores resultados.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-6 rounded-lg border bg-card">
              <div className="flex items-center justify-center size-12 shrink-0 rounded-lg bg-primary/10">
                <Sparkles className="size-6 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Nuestra Visión</h3>
                <p className="text-muted-foreground">
                  Convertirnos en el motor de decisión de confianza para cada transacción de 
                  crédito en el ecosistema fintech, a nivel global.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
