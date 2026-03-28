import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Play, RotateCcw, TrendingUp, TrendingDown, DollarSign, Users, Percent } from "lucide-react";
import { useState } from "react";

export default function SimulationsPage() {
  const [simulationRun, setSimulationRun] = useState(false);

  const runSimulation = () => {
    setSimulationRun(true);
  };

  const resetSimulation = () => {
    setSimulationRun(false);
  };

  const simulationResults = {
    baseline: {
      approvalRate: 68.4,
      avgAmount: 15420,
      totalClients: 1234,
      profitability: 24.5,
    },
    simulated: {
      approvalRate: 72.1,
      avgAmount: 17800,
      totalClients: 1456,
      profitability: 28.3,
    }
  };

  const calculateChange = (baseline: number, simulated: number) => {
    const change = ((simulated - baseline) / baseline * 100).toFixed(1);
    return { value: change, isPositive: parseFloat(change) >= 0 };
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Simulaciones</h1>
        <p className="text-muted-foreground">
          Experimenta con diferentes parámetros y visualiza el impacto en tus métricas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulation Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Parámetros de Simulación</h2>
            </div>
            <div className="p-4 space-y-4">
              {/* Score mínimo */}
              <div className="space-y-2">
                <Label htmlFor="sim_min_score">Score mínimo aprobación</Label>
                <Input
                  id="sim_min_score"
                  type="number"
                  defaultValue="600"
                  placeholder="650"
                />
                <p className="text-xs text-muted-foreground">Actual: 650 puntos</p>
              </div>

              {/* Tasa de interés */}
              <div className="space-y-2">
                <Label htmlFor="sim_rate">Tasa bajo riesgo</Label>
                <div className="flex gap-2">
                  <Input
                    id="sim_rate"
                    type="number"
                    defaultValue="16.5"
                    placeholder="18.5"
                  />
                  <div className="flex items-center justify-center px-3 rounded-md border bg-muted text-muted-foreground text-sm">
                    %
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Actual: 18.5%</p>
              </div>

              {/* Monto máximo */}
              <div className="space-y-2">
                <Label htmlFor="sim_max_amount">Monto máximo</Label>
                <div className="flex gap-2">
                  <Input
                    id="sim_max_amount"
                    type="number"
                    defaultValue="600000"
                    placeholder="500000"
                  />
                  <div className="flex items-center justify-center px-3 rounded-md border bg-muted text-muted-foreground text-sm">
                    $
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Actual: $500,000</p>
              </div>

              {/* Plazo máximo */}
              <div className="space-y-2">
                <Label htmlFor="sim_max_term">Plazo máximo</Label>
                <div className="flex gap-2">
                  <Input
                    id="sim_max_term"
                    type="number"
                    defaultValue="72"
                    placeholder="60"
                  />
                  <div className="flex items-center justify-center px-3 rounded-md border bg-muted text-muted-foreground text-sm">
                    meses
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Actual: 60 meses</p>
              </div>

              {/* Período de simulación */}
              <div className="space-y-2">
                <Label htmlFor="sim_period">Período a simular</Label>
                <select 
                  id="sim_period" 
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option>Últimos 30 días</option>
                  <option>Últimos 3 meses</option>
                  <option>Últimos 6 meses</option>
                  <option>Último año</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button onClick={runSimulation} className="flex-1">
                  <Play className="size-4 mr-2" />
                  Ejecutar
                </Button>
                <Button variant="outline" onClick={resetSimulation}>
                  <RotateCcw className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Saved Simulations */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Simulaciones Guardadas</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                <button className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-medium text-sm">Escenario conservador</p>
                  <p className="text-xs text-muted-foreground">Hace 2 días</p>
                </button>
                <button className="w-full text-left p-3 rounded-lg border hover:bg-muted transition-colors">
                  <p className="font-medium text-sm">Expansión agresiva</p>
                  <p className="text-xs text-muted-foreground">Hace 1 semana</p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-6">
          {simulationRun ? (
            <>
              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Approval Rate */}
                <div className="p-5 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
                      <Percent className="size-5 text-primary" />
                    </div>
                    <div className={`text-sm font-medium ${
                      calculateChange(simulationResults.baseline.approvalRate, simulationResults.simulated.approvalRate).isPositive 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}>
                      {calculateChange(simulationResults.baseline.approvalRate, simulationResults.simulated.approvalRate).isPositive ? "+" : ""}
                      {calculateChange(simulationResults.baseline.approvalRate, simulationResults.simulated.approvalRate).value}%
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Tasa de aprobación</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{simulationResults.simulated.approvalRate}%</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {simulationResults.baseline.approvalRate}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Average Amount */}
                <div className="p-5 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
                      <DollarSign className="size-5 text-primary" />
                    </div>
                    <div className={`text-sm font-medium ${
                      calculateChange(simulationResults.baseline.avgAmount, simulationResults.simulated.avgAmount).isPositive 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}>
                      {calculateChange(simulationResults.baseline.avgAmount, simulationResults.simulated.avgAmount).isPositive ? "+" : ""}
                      {calculateChange(simulationResults.baseline.avgAmount, simulationResults.simulated.avgAmount).value}%
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Monto promedio</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">${simulationResults.simulated.avgAmount.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${simulationResults.baseline.avgAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Clients */}
                <div className="p-5 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
                      <Users className="size-5 text-primary" />
                    </div>
                    <div className={`text-sm font-medium ${
                      calculateChange(simulationResults.baseline.totalClients, simulationResults.simulated.totalClients).isPositive 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}>
                      {calculateChange(simulationResults.baseline.totalClients, simulationResults.simulated.totalClients).isPositive ? "+" : ""}
                      {calculateChange(simulationResults.baseline.totalClients, simulationResults.simulated.totalClients).value}%
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Clientes aprobados</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{simulationResults.simulated.totalClients.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {simulationResults.baseline.totalClients.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Profitability */}
                <div className="p-5 rounded-lg border bg-card">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10">
                      <TrendingUp className="size-5 text-primary" />
                    </div>
                    <div className={`text-sm font-medium ${
                      calculateChange(simulationResults.baseline.profitability, simulationResults.simulated.profitability).isPositive 
                        ? "text-green-600" 
                        : "text-red-600"
                    }`}>
                      {calculateChange(simulationResults.baseline.profitability, simulationResults.simulated.profitability).isPositive ? "+" : ""}
                      {calculateChange(simulationResults.baseline.profitability, simulationResults.simulated.profitability).value}%
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Rentabilidad estimada</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold">{simulationResults.simulated.profitability}%</span>
                      <span className="text-sm text-muted-foreground line-through">
                        {simulationResults.baseline.profitability}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Impact Summary */}
              <div className="rounded-lg border bg-card">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-semibold">Resumen de Impacto</h2>
                </div>
                <div className="p-4 space-y-3">
                  <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="size-5 text-green-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-green-900 dark:text-green-100">Mejoras proyectadas</p>
                        <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                          <li>• Incremento del 18% en clientes aprobados</li>
                          <li>• Aumento del 15.4% en rentabilidad</li>
                          <li>• Mayor diversificación de cartera</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="size-5 text-yellow-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-yellow-900 dark:text-yellow-100">Riesgos a considerar</p>
                        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                          <li>• Posible aumento de morosidad en 2-3%</li>
                          <li>• Mayor exposición a clientes de riesgo medio</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <Button className="flex-1">
                      Aplicar cambios
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Guardar simulación
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-lg border bg-card p-16">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="flex items-center justify-center size-16 rounded-full bg-muted">
                    <Play className="size-8 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center space-y-2">
                  <h3 className="text-xl font-semibold">Ejecuta una simulación</h3>
                  <p className="text-muted-foreground max-w-md mx-auto text-center">
                    Ajusta los parámetros en el panel izquierdo y ejecuta la simulación 
                    para ver cómo los cambios afectarían tus métricas clave.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
