import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle,
  ArrowUpCircle,
  ArrowDownCircle,
  RefreshCcw,
  Calendar
} from "lucide-react";
import { useState } from "react";

type ChangeType = "mejora" | "deterioro" | "sin_cambios";

interface ClientChange {
  id: string;
  name: string;
  dni: string;
  previousScore: number;
  currentScore: number;
  changeType: ChangeType;
  changePercentage: number;
  lastQuery: string;
  lastUpdate: string;
  details: string;
}

export default function PortfolioPage() {
  const [filterType, setFilterType] = useState<ChangeType | "all">("all");

  const clientChanges: ClientChange[] = [
    {
      id: "1",
      name: "María González",
      dni: "35.234.567",
      previousScore: 650,
      currentScore: 720,
      changeType: "mejora",
      changePercentage: 10.8,
      lastQuery: "15 Mar 2026",
      lastUpdate: "28 Mar 2026",
      details: "Canceló deuda con tarjeta de crédito"
    },
    {
      id: "2",
      name: "Juan Pérez",
      dni: "28.456.789",
      previousScore: 720,
      currentScore: 680,
      changeType: "deterioro",
      changePercentage: -5.6,
      lastQuery: "10 Mar 2026",
      lastUpdate: "28 Mar 2026",
      details: "Nueva deuda registrada en BCRA"
    },
    {
      id: "3",
      name: "Ana Martínez",
      dni: "41.567.890",
      previousScore: 780,
      currentScore: 820,
      changeType: "mejora",
      changePercentage: 5.1,
      lastQuery: "12 Mar 2026",
      lastUpdate: "28 Mar 2026",
      details: "Pagos consistentes últimos 6 meses"
    },
    {
      id: "4",
      name: "Carlos López",
      dni: "32.678.901",
      previousScore: 590,
      currentScore: 520,
      changeType: "deterioro",
      changePercentage: -11.9,
      lastQuery: "08 Mar 2026",
      lastUpdate: "28 Mar 2026",
      details: "Incumplimiento en préstamo personal"
    },
    {
      id: "5",
      name: "Laura Rodríguez",
      dni: "38.789.012",
      previousScore: 700,
      currentScore: 750,
      changeType: "mejora",
      changePercentage: 7.1,
      lastQuery: "20 Mar 2026",
      lastUpdate: "28 Mar 2026",
      details: "Reducción de ratio deuda/ingreso"
    },
    {
      id: "6",
      name: "Roberto Fernández",
      dni: "29.890.123",
      previousScore: 640,
      currentScore: 610,
      changeType: "deterioro",
      changePercentage: -4.7,
      lastQuery: "18 Mar 2026",
      lastUpdate: "28 Mar 2026",
      details: "Atraso en pago de servicio"
    },
  ];

  const filteredClients = filterType === "all" 
    ? clientChanges 
    : clientChanges.filter(c => c.changeType === filterType);

  const stats = {
    totalClients: clientChanges.length,
    improved: clientChanges.filter(c => c.changeType === "mejora").length,
    deteriorated: clientChanges.filter(c => c.changeType === "deterioro").length,
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Cartera</h1>
          <p className="text-muted-foreground">
            Seguimiento de cambios en la situación crediticia de clientes consultados
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Última actualización: 28 Mar 2026</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Monitoreados</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalClients}</div>
            <p className="text-xs text-muted-foreground">En base de datos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mejoras Detectadas</CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.improved}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.improved / stats.totalClients) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deterioros Detectados</CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.deteriorated}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.deteriorated / stats.totalClients) * 100).toFixed(1)}% del total
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">Filtrar por:</span>
        <div className="flex gap-2">
          <Button
            variant={filterType === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("all")}
          >
            Todos
          </Button>
          <Button
            variant={filterType === "mejora" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("mejora")}
          >
            <ArrowUpCircle className="h-4 w-4 mr-1 text-green-600" />
            Mejoras
          </Button>
          <Button
            variant={filterType === "deterioro" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterType("deterioro")}
          >
            <ArrowDownCircle className="h-4 w-4 mr-1 text-red-600" />
            Deterioros
          </Button>
        </div>
      </div>

      {/* Client Changes List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Cambios en Situación Crediticia</CardTitle>
              <CardDescription>
                Clientes con variaciones detectadas en el último proceso mensual
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Actualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredClients.map((client) => (
              <div 
                key={client.id} 
                className="p-4 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-semibold text-base">{client.name}</p>
                        <p className="text-sm text-muted-foreground">DNI: {client.dni}</p>
                      </div>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        client.changeType === "mejora" 
                          ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                      }`}>
                        {client.changeType === "mejora" ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : (
                          <TrendingDown className="h-3 w-3" />
                        )}
                        {client.changePercentage > 0 ? "+" : ""}{client.changePercentage}%
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Score Anterior</p>
                        <p className="font-medium">{client.previousScore}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Score Actual</p>
                        <p className="font-medium text-lg">{client.currentScore}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Última Consulta</p>
                        <p className="text-sm">{client.lastQuery}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Actualización</p>
                        <p className="text-sm">{client.lastUpdate}</p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <p className="text-sm">
                        <span className="text-muted-foreground">Detalle: </span>
                        <span>{client.details}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay cambios en esta categoría</h3>
              <p className="text-muted-foreground">
                No se detectaron {filterType === "mejora" ? "mejoras" : "deterioros"} en el último proceso
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
