import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link to="/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="size-4" />
            <span>Volver al inicio de sesión</span>
          </Link>
          <span className="text-2xl font-bold">presti</span>
          <div className="w-[180px]" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {!submitted ? (
            <>
              <div className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center size-16 rounded-full bg-primary/10">
                    <Mail className="size-8 text-primary" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  ¿Olvidaste tu contraseña?
                </h1>
                <p className="text-muted-foreground">
                  No te preocupes. Ingresa tu email y te enviaremos instrucciones para recuperar tu cuenta.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Enviar instrucciones
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                ¿Recordaste tu contraseña?{" "}
                <Link to="/login" className="font-medium text-foreground hover:underline">
                  Volver al inicio de sesión
                </Link>
              </p>
            </>
          ) : (
            <>
              <div className="text-center space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center justify-center size-16 rounded-full bg-primary/10">
                    <Mail className="size-8 text-primary" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Revisa tu email
                </h1>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    Te hemos enviado un enlace de recuperación a tu correo electrónico.
                  </p>
                  <p className="text-muted-foreground">
                    Si no lo encuentras, revisa tu carpeta de spam o correo no deseado.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <Button asChild className="w-full" size="lg">
                  <Link to="/login">Volver al inicio de sesión</Link>
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full" 
                  size="lg"
                  onClick={() => setSubmitted(false)}
                >
                  Enviar nuevamente
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
