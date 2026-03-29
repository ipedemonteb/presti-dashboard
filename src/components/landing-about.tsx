import { Target, Award, Sparkles } from "lucide-react";

export function LandingAbout() {
  return (
    <section id="about" className="bg-muted/50 scroll-mt-16">
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Una capa operativa para decidir con mejor contexto
            </h2>
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                presti ayuda a fintechs a ordenar el proceso de evaluacion crediticia en un solo lugar:
                clientes, productos, recomendaciones, politica y cartera. La idea no es sumar mas ruido,
                sino dar una superficie clara para decidir mejor.
              </p>
              <p className="text-lg text-muted-foreground">
                En vez de repartir decisiones entre planillas, reglas manuales y herramientas aisladas,
                la plataforma concentra la logica comercial y de riesgo para que el equipo pueda operar,
                ajustar criterios y seguir resultados con menos friccion.
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
                  Darle a las fintechs una herramienta simple para convertir datos crediticios en decisiones operables.
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
                  Separar con claridad politicas, productos y seguimiento para que cada decision sea entendible y ajustable.
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
                  Convertirnos en la capa de decision crediticia que acompane la operacion diaria de las fintechs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
