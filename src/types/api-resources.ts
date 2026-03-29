export type ApiProductType = "PRESTAMO" | "MICROPRESTAMO" | "TARJETA_CREDITO";

export interface ApiProduct {
  id: string;
  nombre: string;
  activo: boolean;
  tipo: ApiProductType;
  tasaMin?: number | null;
  tasaMax?: number | null;
  montoMin?: number | null;
  montoMax?: number | null;
  cuotasMin?: number | null;
  cuotasMax?: number | null;
  limiteCuotasMin?: number | null;
  limiteCuotasMax?: number | null;
  limiteMontoTotalMin?: number | null;
  limiteMontoTotalMax?: number | null;
  interesMin?: number | null;
  interesMax?: number | null;
}

export interface CreateProductDto {
  nombre: string;
  activo: boolean;
  tipo: ApiProductType;
  tasaMin?: number;
  tasaMax?: number;
  montoMin?: number;
  montoMax?: number;
  cuotasMin?: number;
  cuotasMax?: number;
  limiteCuotasMin?: number;
  limiteCuotasMax?: number;
  limiteMontoTotalMin?: number;
  limiteMontoTotalMax?: number;
  interesMin?: number;
  interesMax?: number;
}

export type UpdateProductDto = Partial<CreateProductDto>;

export interface ApiKeyResource {
  id?: string;
  apiKey?: string;
  key?: string;
  clave?: string;
  activo?: boolean;
  active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscriptionPlan {
  id?: string;
  nombre?: string;
  name?: string;
  descripcion?: string;
  precio?: number;
  price?: number;
  limiteDiario?: number;
  limiteMensual?: number;
}

export interface ActiveSubscription {
  id?: string;
  nombre?: string;
  plan?: string;
  estado?: string;
  activa?: boolean;
  fechaInicio?: string;
  fechaFin?: string;
  limiteDiario?: number;
  limiteMensual?: number;
}

export interface DailyUsage {
  consultasHoy?: number;
  total?: number;
  used?: number;
  remaining?: number;
  limiteDiario?: number;
}

export interface CreditPolicy {
  maxSituacionCrediticiaPermitida: number;
  maxEntidadesConDeuda: number;
  maxDeudaTotalExterna: number;
  mesesHistorialLimpioRequerido: number;
}

export interface ApiUserResource {
  id?: string;
  cuil?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
}

export interface RecommendationResource {
  id?: string;
  usuarioCuil?: string;
  usuarioNombre?: string;
  nombre?: string;
  usuario?: ApiUserResource | Record<string, unknown>;
  productoNombre?: string;
  producto?: string | ApiProduct | Record<string, unknown>;
  resultado?: string | Record<string, unknown>;
  estado?: string;
  score?: number;
  confianza?: number;
  createdAt?: string;
}

export interface PortfolioChangeResource {
  id?: string;
  cuil?: string;
  dni?: string;
  nombre?: string;
  usuarioNombre?: string;
  usuario?: ApiUserResource | Record<string, unknown>;
  situacionAnterior?: number | string;
  situacionActual?: number | string;
  situacionNueva?: number | string;
  scoreAnterior?: number;
  scoreActual?: number;
  changeType?: string;
  tipoCambio?: string;
  detalle?: string;
  descripcion?: string;
  motivo?: string;
  createdAt?: string;
  updatedAt?: string;
  fechaCambio?: string;
  detectadoAt?: string;
}

export interface PortfolioSizeResource {
  total?: number;
  tamanio?: number;
  cantidad?: number;
}
