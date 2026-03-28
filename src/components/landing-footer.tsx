import { Button } from "@/components/ui/button";

export function LandingFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="flex flex-col space-y-2">
            <span className="text-2xl font-bold">presti</span>
            <p className="text-sm text-muted-foreground">
              Motor de decisión potenciado por IA para fintechs modernas.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Producto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#features" className="hover:text-foreground transition-colors">Funcionalidades</a></li>
              <li><a href="#pricing" className="hover:text-foreground transition-colors">Precios</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Integraciones</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#about" className="hover:text-foreground transition-colors">Nosotros</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Carreras</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Recursos</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentación</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Términos de Servicio</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Presti. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                LinkedIn
              </Button>
              <Button variant="ghost" size="sm">
                Twitter
              </Button>
              <Button variant="ghost" size="sm">
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
