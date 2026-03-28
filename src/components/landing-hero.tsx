import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, RefreshCcw } from "lucide-react";
import { Link } from "react-router";

export function LandingHero() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-20 md:py-32">
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm">
          <Brain className="size-4" />
          <span>Motor de Decisión Potenciado por IA</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
          Decisiones Inteligentes
          <span className="text-muted-foreground"> para Fintechs Modernas</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
          Más que perfilado de clientes. Un motor de decisión completo que combina IA, 
          datos históricos y aprendizaje continuo para brindarte acciones concretas y minimizar riesgos.
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
            <h3 className="font-semibold">Motor de Decisión IA</h3>
            <p className="text-sm text-muted-foreground text-center">
              Acciones concretas basadas en datos históricos y algoritmos avanzados de aprendizaje
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/10">
              <BarChart3 className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold">Simulación de Escenarios</h3>
            <p className="text-sm text-muted-foreground text-center">
              Visualiza cómo cambios en parámetros afectan tus variables clave en tiempo real
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 p-6 rounded-lg border bg-card">
            <div className="flex items-center justify-center size-12 rounded-full bg-primary/10">
              <RefreshCcw className="size-6 text-primary" />
            </div>
            <h3 className="font-semibold">Aprendizaje Continuo</h3>
            <p className="text-sm text-muted-foreground text-center">
              Sistema actualizable que aprende de tus resultados para mejorar las recomendaciones
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
