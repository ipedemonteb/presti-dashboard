import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, RefreshCcw } from "lucide-react";
import { Link } from "react-router";

export function LandingHero() {
  return (
    <section className="container border-b-1 mx-auto px-4 md:px-6 py-20 md:pb-32 md:pt-14">
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
          <Brain className="size-4" />
          <span>Motor de decision crediticia para fintechs</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
          Evalua perfiles,
          <span className="text-muted-foreground"> configura politicas y ofrece mejores productos</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          presti centraliza analiticas, reglas de elegibilidad, configuracion de productos y seguimiento de cartera
          para que tu equipo tome decisiones crediticias con mas contexto y menos friccion.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Button size="lg" className="gap-2" asChild>
            <Link to="/register">
              Prueba Gratuita
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            Agendar Demo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 w-full max-w-4xl">
          <div className="flex flex-col items-center gap-3 p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/10">
              <Brain className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold">Recomendaciones accionables</h3>
            <p className="text-sm text-muted-foreground text-center">
              Genera recomendaciones recientes a partir del perfil del cliente y la oferta configurada.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/10">
              <BarChart3 className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold">Analiticas operativas</h3>
            <p className="text-sm text-muted-foreground text-center">
              Sigue uso diario, productos activos, clientes cargados y desempeño general desde un solo dashboard.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/10">
              <RefreshCcw className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold">Politica y cartera</h3>
            <p className="text-sm text-muted-foreground text-center">
              Ajusta reglas crediticias y monitorea cambios relevantes en la cartera consultada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
