import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, CheckCircle, AlertTriangle, Info, TrendingUp } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      type: "alert",
      icon: AlertTriangle,
      title: "Tasa de rechazo alta detectada",
      description: "La tasa de rechazo en préstamos personales aumentó 15% en las últimas 48 horas. Considera revisar los parámetros de scoring.",
      time: "Hace 30 minutos",
      unread: true,
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Optimización aplicada con éxito",
      description: "Los nuevos parámetros de scoring mejoraron la tasa de aprobación en un 8%.",
      time: "Hace 2 horas",
      unread: true,
    },
    {
      type: "info",
      icon: Info,
      title: "Nueva actualización del modelo",
      description: "El modelo de IA fue actualizado con los últimos 1,000 casos de feedback. Precisión mejorada en 3%.",
      time: "Hace 5 horas",
      unread: false,
    },
    {
      type: "insight",
      icon: TrendingUp,
      title: "Patrón detectado en cartera",
      description: "Clientes de sector tecnología muestran 25% menos morosidad. Considera ajustar scoring para este segmento.",
      time: "Hace 1 día",
      unread: false,
    },
    {
      type: "alert",
      icon: AlertTriangle,
      title: "Umbral de riesgo alcanzado",
      description: "15 clientes superaron el umbral de riesgo crítico. Se requiere revisión manual.",
      time: "Hace 1 día",
      unread: false,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notificaciones</h1>
          <p className="text-muted-foreground">
            Alertas, actualizaciones y recomendaciones del sistema.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <CheckCircle className="mr-2 h-4 w-4" />
          Marcar todas como leídas
        </Button>
      </div>

      {/* Notification Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Notificaciones sin leer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">En las últimas 24 horas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insights</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Esta semana</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Todas las Notificaciones</CardTitle>
          <CardDescription>
            Ordenadas por más recientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <div
                  key={index}
                  className={`flex gap-4 border-b pb-4 last:border-0 last:pb-0 ${
                    notification.unread ? "bg-muted/30 -mx-6 px-6 py-4" : ""
                  }`}
                >
                  <div className={`mt-1 rounded-full p-2 h-fit ${
                    notification.type === "alert" ? "bg-red-100 text-red-600" :
                    notification.type === "success" ? "bg-green-100 text-green-600" :
                    notification.type === "insight" ? "bg-blue-100 text-blue-600" :
                    "bg-gray-100 text-gray-600"
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {notification.time}
                        </p>
                      </div>
                      {notification.unread && (
                        <div className="h-2 w-2 rounded-full bg-blue-600 mt-2" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
