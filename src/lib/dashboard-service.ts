import { api } from "@/lib/api";
import { extractArray, extractObject } from "@/lib/api-helpers";
import type {
  ActiveSubscription,
  ApiKeyResource,
  ApiProduct,
  ApiUserResource,
  CreateProductDto,
  DailyUsage,
  RecommendationResource,
  SubscriptionPlan,
  UpdateProductDto,
} from "@/types/api-resources";

export const dashboardService = {
  async getProducts() {
    const response = await api.get("/v1/productos");
    return extractArray<ApiProduct>(response.data);
  },

  async createProduct(data: CreateProductDto) {
    const response = await api.post("/v1/productos", data);
    return extractObject<ApiProduct>(response.data);
  },

  async updateProduct(id: string, data: UpdateProductDto) {
    const response = await api.patch(`/v1/productos/${id}`, data);
    return extractObject<ApiProduct>(response.data);
  },

  async deleteProduct(id: string) {
    await api.delete(`/v1/productos/${id}`);
  },

  async getUsers() {
    const response = await api.get("/v1/usuarios");
    return extractArray<ApiUserResource>(response.data);
  },

  async getRecommendations(desde?: string) {
    const fallbackDate = new Date();
    fallbackDate.setDate(fallbackDate.getDate() - 30);

    const response = await api.get("/v1/recomendaciones", {
      params: {
        desde: desde ?? fallbackDate.toISOString(),
      },
    });
    return extractArray<RecommendationResource>(response.data);
  },

  async createRecommendation(cuil: string) {
    const response = await api.post("/v1/recomendaciones", { cuil });
    return response.data;
  },

  async getApiKeys() {
    const response = await api.get("/v1/clientes/api-keys");
    return extractArray<ApiKeyResource>(response.data);
  },

  async createApiKey() {
    const response = await api.post("/v1/clientes/api-keys");
    return extractObject<ApiKeyResource>(response.data);
  },

  async deactivateApiKey(apiKey: string) {
    await api.patch(`/v1/clientes/api-keys/${apiKey}/desactivar`);
  },

  async getPlans() {
    const response = await api.get("/v1/suscripciones");
    return extractArray<SubscriptionPlan>(response.data);
  },

  async getActiveSubscription() {
    const response = await api.get("/v1/suscripciones/activa");
    return extractObject<ActiveSubscription>(response.data);
  },

  async getUsageToday() {
    const response = await api.get("/v1/suscripciones/uso");
    return extractObject<DailyUsage>(response.data);
  },
};
