import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Building2, Bell, Shield, Key, Palette } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Configuración</h1>
        <p className="text-muted-foreground">
          Gestiona tu cuenta, empresa y preferencias del sistema.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Información Personal</CardTitle>
            </div>
            <CardDescription>
              Actualiza tu información de perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input id="firstName" defaultValue="Juan" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input id="lastName" defaultValue="Pérez" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="juan.perez@empresa.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" type="tel" defaultValue="+54 11 1234-5678" />
            </div>
            <Button>Guardar Cambios</Button>
          </CardContent>
        </Card>

        {/* Company Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <CardTitle>Información de Empresa</CardTitle>
            </div>
            <CardDescription>
              Datos de tu organización
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nombre de la Empresa</Label>
              <Input id="companyName" defaultValue="Fintech Solutions SA" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="industry">Industria</Label>
                <Input id="industry" defaultValue="Servicios Financieros" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">Tamaño</Label>
                <Input id="size" defaultValue="50-100 empleados" />
              </div>
            </div>
            <Button>Actualizar Información</Button>
          </CardContent>
        </Card>

        {/* Notifications Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Preferencias de Notificaciones</CardTitle>
            </div>
            <CardDescription>
              Configura cómo y cuándo recibir notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertas de riesgo</p>
                <p className="text-sm text-muted-foreground">Notificaciones sobre umbrales de riesgo críticos</p>
              </div>
              <Button variant="outline" size="sm">Activado</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Actualizaciones del modelo</p>
                <p className="text-sm text-muted-foreground">Información sobre mejoras en el modelo de IA</p>
              </div>
              <Button variant="outline" size="sm">Activado</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Insights semanales</p>
                <p className="text-sm text-muted-foreground">Resumen semanal de patrones detectados</p>
              </div>
              <Button variant="outline" size="sm">Desactivado</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email diario</p>
                <p className="text-sm text-muted-foreground">Resumen diario de actividad</p>
              </div>
              <Button variant="outline" size="sm">Activado</Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Seguridad</CardTitle>
            </div>
            <CardDescription>
              Gestiona la seguridad de tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Autenticación de dos factores</p>
                <p className="text-sm text-muted-foreground">Agrega una capa extra de seguridad</p>
              </div>
              <Button variant="outline" size="sm">Configurar</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cambiar contraseña</p>
                <p className="text-sm text-muted-foreground">Última actualización hace 3 meses</p>
              </div>
              <Button variant="outline" size="sm">Cambiar</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Sesiones activas</p>
                <p className="text-sm text-muted-foreground">3 dispositivos conectados</p>
              </div>
              <Button variant="outline" size="sm">Ver Detalles</Button>
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              <CardTitle>API y Integraciones</CardTitle>
            </div>
            <CardDescription>
              Gestiona tus claves API y conexiones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">API Key Principal</p>
                <p className="text-sm text-muted-foreground font-mono">pk_live_**********************8f3a</p>
              </div>
              <Button variant="outline" size="sm">Regenerar</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Webhook URL</p>
                <p className="text-sm text-muted-foreground">https://api.tuempresa.com/webhooks/presti</p>
              </div>
              <Button variant="outline" size="sm">Editar</Button>
            </div>
            <Button>Ver Documentación API</Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <CardTitle>Apariencia</CardTitle>
            </div>
            <CardDescription>
              Personaliza la interfaz del dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tema</p>
                <p className="text-sm text-muted-foreground">Claro, oscuro o automático</p>
              </div>
              <Button variant="outline" size="sm">Claro</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Densidad</p>
                <p className="text-sm text-muted-foreground">Espaciado entre elementos</p>
              </div>
              <Button variant="outline" size="sm">Normal</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
