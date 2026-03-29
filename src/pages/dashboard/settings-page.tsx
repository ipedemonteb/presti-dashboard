import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/auth-provider";
import { dashboardService } from "@/lib/dashboard-service";
import { formatRelativeDate, getNumber } from "@/lib/api-helpers";
import type { ActiveSubscription, ApiKeyResource, DailyUsage, SubscriptionPlan } from "@/types/api-resources";
import type { ApiError } from "@/types/auth";
import { AlertCircle, Bell, Building2, Key, LoaderCircle, Palette, Shield, User } from "lucide-react";

function getApiKeyValue(resource: ApiKeyResource) {
  return resource.apiKey ?? resource.key ?? resource.clave ?? "Sin valor";
}

function maskApiKey(value: string) {
  if (value.length <= 10) return value;
  return `${value.slice(0, 8)}****************${value.slice(-4)}`;
}

function getPlanName(plan?: ActiveSubscription | SubscriptionPlan | null) {
  if (!plan) return "Sin plan";
  const planName = "plan" in plan ? plan.plan : undefined;
  const displayName = "name" in plan ? plan.name : undefined;
  const raw = plan.tipo ?? plan.nombre ?? planName ?? displayName ?? "Plan sin nombre";
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [apiKeys, setApiKeys] = useState<ApiKeyResource[]>([]);
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [activeSubscription, setActiveSubscription] = useState<ActiveSubscription | null>(null);
  const [usage, setUsage] = useState<DailyUsage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [error, setError] = useState("");

  const loadSettingsData = async () => {
    try {
      setError("");
      const [apiKeysData, plansData, activeData, usageData] = await Promise.all([
        dashboardService.getApiKeys(),
        dashboardService.getPlans(),
        dashboardService.getActiveSubscription(),
        dashboardService.getUsageToday(),
      ]);

      setApiKeys(apiKeysData);
      setPlans(plansData);
      setActiveSubscription(activeData);
      setUsage(usageData);
    } catch (err) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data;
      setError(apiError?.message ?? "No pudimos cargar la configuracion conectada a la API.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadSettingsData();
  }, []);

  const currentUsage = useMemo(() => {
    if (!usage) return 0;
    return getNumber(usage.consultasHoy, getNumber(usage.total, getNumber(usage.used, 0)));
  }, [usage]);

  const dailyLimit = useMemo(() => {
    if (!usage && !activeSubscription) return 0;
    return getNumber(usage?.limiteDiario, getNumber(activeSubscription?.limites?.maxConsultasDiarias ?? activeSubscription?.limiteDiario, 0));
  }, [activeSubscription, usage]);

  const handleCreateApiKey = async () => {
    try {
      setIsGeneratingKey(true);
      setError("");
      const created = await dashboardService.createApiKey();
      if (created) {
        setApiKeys((current) => [created, ...current]);
      } else {
        await loadSettingsData();
      }
    } catch (err) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data;
      setError(apiError?.message ?? "No pudimos generar una nueva API key.");
    } finally {
      setIsGeneratingKey(false);
    }
  };

  const handleDeactivateApiKey = async (apiKey: string) => {
    try {
      setError("");
      await dashboardService.deactivateApiKey(apiKey);
      setApiKeys((current) =>
        current.map((item) =>
          getApiKeyValue(item) === apiKey ? { ...item, activo: false, active: false } : item
        )
      );
    } catch (err) {
      const apiError = (err as { response?: { data?: ApiError } }).response?.data;
      setError(apiError?.message ?? "No pudimos desactivar la API key.");
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Configuracion</h1>
        <p className="text-muted-foreground">
          Gestiona tu cuenta, empresa y accesos conectados a la plataforma.
        </p>
      </div>

      {error ? (
        <div className="flex items-start gap-2 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="size-4 mt-0.5 shrink-0" />
          <span>{error}</span>
          <Button variant="outline" size="sm" className="ml-auto" onClick={() => {
            setIsLoading(true);
            void loadSettingsData();
          }}>
            Reintentar
          </Button>
        </div>
      ) : null}

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <CardTitle>Informacion de acceso</CardTitle>
            </div>
            <CardDescription>
              Datos disponibles desde la sesion actual.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" value={user?.nombre ?? ""} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={user?.email ?? ""} readOnly />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              <CardTitle>Suscripcion</CardTitle>
            </div>
            <CardDescription>
              Estado del plan, limites y uso actual del cliente autenticado.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="flex items-center text-sm text-muted-foreground">
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Cargando suscripcion...
              </div>
            ) : (
              <>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Plan activo</p>
                    <p className="mt-1 text-lg font-semibold">{getPlanName(activeSubscription)}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Consultas de hoy</p>
                    <p className="mt-1 text-lg font-semibold">{currentUsage}</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-sm text-muted-foreground">Limite diario</p>
                    <p className="mt-1 text-lg font-semibold">{dailyLimit || "Sin dato"}</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              <CardTitle>API e integraciones</CardTitle>
            </div>
            <CardDescription>
              API keys del cliente autenticado y accesos para integraciones.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Button onClick={() => void handleCreateApiKey()} disabled={isGeneratingKey}>
                {isGeneratingKey ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                Generar API key
              </Button>
              <Button variant="outline" asChild>
                <a href="https://presti-api.onrender.com/api/docs" target="_blank" rel="noreferrer">
                  Ver documentacion API
                </a>
              </Button>
            </div>

            {isLoading ? (
              <div className="flex items-center text-sm text-muted-foreground">
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                Cargando API keys...
              </div>
            ) : apiKeys.length === 0 ? (
              <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                Todavia no hay API keys generadas para este cliente.
              </div>
            ) : (
              <div className="space-y-3">
                {apiKeys.map((item, index) => {
                  const value = getApiKeyValue(item);
                  const isActive = item.activo ?? item.active ?? true;

                  return (
                    <div key={`${value}-${index}`} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <p className="font-medium">{maskApiKey(value)}</p>
                        <div className="mt-1 flex gap-3 text-xs text-muted-foreground">
                          <span>{isActive ? "Activa" : "Desactivada"}</span>
                          <span>Creada: {formatRelativeDate(item.createdAt)}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={!isActive}
                        onClick={() => void handleDeactivateApiKey(value)}
                      >
                        Desactivar
                      </Button>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <CardTitle>Notificaciones</CardTitle>
            </div>
            <CardDescription>
              Preferencias locales de visualizacion del dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertas de riesgo</p>
                <p className="text-sm text-muted-foreground">Seguimiento de reglas y recomendaciones.</p>
              </div>
              <Button variant="outline" size="sm">Activado</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Resumen diario</p>
                <p className="text-sm text-muted-foreground">Estado de uso y actividad del cliente.</p>
              </div>
              <Button variant="outline" size="sm">Activado</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Seguridad</CardTitle>
            </div>
            <CardDescription>
              Acciones disponibles desde el frontend actual.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>La API publicada hoy expone autenticacion por JWT y administracion de API keys.</p>
            <p>Todavia no hay endpoints documentados para cambio de contrasena, 2FA o sesiones activas.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <CardTitle>Apariencia</CardTitle>
            </div>
            <CardDescription>
              El tema se controla desde el selector del header del dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>Usa el toggle del encabezado para cambiar entre modo claro, oscuro o sistema.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
