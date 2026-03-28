import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  AlertTriangle,
  CheckCircle2,
  Activity
} from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    {
      name: "Consultas del mes",
      value: "2,847",
      change: "+12.3%",
      trend: "up",
      icon: Activity,
    },
    {
      name: "Tasa de aprobación",
      value: "68.4%",
      change: "+4.1%",
      trend: "up",
      icon: CheckCircle2,
    },
    {
      name: "Monto promedio",
      value: "$15,420",
      change: "-2.4%",
      trend: "down",
      icon: DollarSign,
    },
    {
      name: "Clientes activos",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: Users,
    },
  ];

  const recentRecommendations = [
    {
      id: 1,
      client: "María González",
      company: "Tech Solutions SA",
      recommendation: "Préstamo Personal - $50,000",
      confidence: 92,
      status: "approved",
      date: "Hace 2 horas"
    },
    {
      id: 2,
      client: "Carlos Martínez",
      company: "Innovate Corp",
      recommendation: "Línea de Crédito - $100,000",
      confidence: 85,
      status: "pending",
      date: "Hace 4 horas"
    },
    {
      id: 3,
      client: "Ana Rodríguez",
      company: "StartUp Labs",
      recommendation: "Rechazar solicitud",
      confidence: 78,
      status: "rejected",
      date: "Hace 6 horas"
    },
    {
      id: 4,
      client: "Luis Fernández",
      company: "Growth Finance",
      recommendation: "Préstamo PYME - $75,000",
      confidence: 88,
      status: "approved",
      date: "Hace 1 día"
    },
  ];

  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "Parámetro de riesgo actualizado",
      description: "El umbral de riesgo crediticio fue modificado por el sistema de aprendizaje.",
      time: "Hace 30 min"
    },
    {
      id: 2,
      type: "info",
      title: "Nueva tendencia detectada",
      description: "Incremento del 15% en solicitudes de préstamos personales.",
      time: "Hace 2 horas"
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Visión general de tus métricas y recomendaciones
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="p-6 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center justify-center size-12 rounded-lg bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="size-4" />
                  ) : (
                    <TrendingDown className="size-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Recommendations */}
        <div className="lg:col-span-2 rounded-lg border bg-card">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Recomendaciones Recientes</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentRecommendations.map((rec) => (
                <div key={rec.id} className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 shrink-0">
                    <Users className="size-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-medium">{rec.client}</p>
                        <p className="text-sm text-muted-foreground">{rec.company}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        rec.status === "approved" 
                          ? "bg-green-100 text-green-700" 
                          : rec.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {rec.status === "approved" ? "Aprobado" : rec.status === "rejected" ? "Rechazado" : "Pendiente"}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-primary">{rec.recommendation}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Confianza: {rec.confidence}%</span>
                      <span>•</span>
                      <span>{rec.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-lg border bg-card">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Alertas</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`size-5 shrink-0 ${
                      alert.type === "warning" ? "text-yellow-600" : "text-blue-600"
                    }`} />
                    <div className="space-y-1">
                      <p className="font-medium text-sm">{alert.title}</p>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
