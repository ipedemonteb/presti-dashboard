import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Cartera</h1>
        <p className="text-muted-foreground">
          Gestión parcial de clientes consultados y seguimiento de recomendaciones.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recomendaciones Aprobadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">72.3% tasa de aprobación</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Seguimiento</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">Clientes con productos activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Pendientes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">Requieren atención inmediata</p>
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <Card>
        <CardHeader>
          <CardTitle>Clientes Recientes</CardTitle>
          <CardDescription>
            Últimos clientes consultados y sus recomendaciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "María González", product: "Préstamo Personal", status: "Aprobado", date: "Hace 2 horas" },
              { name: "Juan Pérez", product: "Tarjeta de Crédito", status: "En Revisión", date: "Hace 5 horas" },
              { name: "Ana Martínez", product: "Crédito Hipotecario", status: "Rechazado", date: "Hace 1 día" },
              { name: "Carlos López", product: "Préstamo Automotriz", status: "Aprobado", date: "Hace 1 día" },
              { name: "Laura Rodríguez", product: "Línea de Crédito", status: "Aprobado", date: "Hace 2 días" },
            ].map((client, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-muted-foreground">{client.product}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    client.status === "Aprobado" ? "text-green-600" :
                    client.status === "Rechazado" ? "text-red-600" :
                    "text-yellow-600"
                  }`}>
                    {client.status}
                  </p>
                  <p className="text-xs text-muted-foreground">{client.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
