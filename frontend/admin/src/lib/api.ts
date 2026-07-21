// Lightweight API client for the NovoBharat admin backend (NestJS).

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3003/api";

const TOKEN_KEY = "nb_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 204) return undefined as T;

  const text = await res.text();
  const body = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message =
      (body && (Array.isArray(body.message) ? body.message.join(", ") : body.message)) ||
      res.statusText;
    throw new ApiError(message, res.status);
  }
  return body as T;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(data) }),
  patch: <T>(path: string, data: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(data) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

// ---- Domain types ----

export interface AuthUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

// SEO fields shared by Category and Product (per-entity overrides).
export interface EntitySeoFields {
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  ogImage: string | null;
  noindex: boolean;
}

export interface Category extends EntitySeoFields {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Product extends EntitySeoFields {
  id: number;
  name: string;
  slug: string;
  casNumber: string | null;
  gmpStatus: string | null;
  regulatoryStatus: string | null;
  packing: string | null;
  description: string | null;
  imageUrl: string | null;
  isActive: boolean;
  categoryId: number | null;
  category?: Category | null;
  createdAt: string;
  updatedAt: string;
}

export interface Brochure {
  id: number;
  title: string;
  fileUrl: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ---- Endpoints ----

export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ accessToken: string; user: AuthUser }>("/auth/login", {
      email,
      password,
    }),
  me: () => api.get<AuthUser>("/auth/me"),
};

export const categoriesApi = {
  list: () => api.get<Category[]>("/categories"),
  create: (data: Partial<Category>) => api.post<Category>("/categories", data),
  update: (id: number, data: Partial<Category>) =>
    api.patch<Category>(`/categories/${id}`, data),
  remove: (id: number) => api.delete<void>(`/categories/${id}`),
};

export const productsApi = {
  list: (params: { search?: string; categoryId?: number; page?: number; limit?: number } = {}) => {
    const q = new URLSearchParams();
    if (params.search) q.set("search", params.search);
    if (params.categoryId) q.set("categoryId", String(params.categoryId));
    if (params.page) q.set("page", String(params.page));
    if (params.limit) q.set("limit", String(params.limit));
    const qs = q.toString();
    return api.get<Paginated<Product>>(`/products${qs ? `?${qs}` : ""}`);
  },
  create: (data: Partial<Product>) => api.post<Product>("/products", data),
  update: (id: number, data: Partial<Product>) =>
    api.patch<Product>(`/products/${id}`, data),
  remove: (id: number) => api.delete<void>(`/products/${id}`),
};

export const brochuresApi = {
  list: () => api.get<Brochure[]>("/brochures"),
  create: (data: Partial<Brochure>) => api.post<Brochure>("/brochures", data),
  update: (id: number, data: Partial<Brochure>) =>
    api.patch<Brochure>(`/brochures/${id}`, data),
  remove: (id: number) => api.delete<void>(`/brochures/${id}`),
};

// ---- SEO ----

export interface SeoGlobal {
  id: number;
  siteName: string;
  titleTemplate: string;
  defaultTitle: string;
  defaultDescription: string | null;
  defaultKeywords: string | null;
  canonicalBaseUrl: string | null;
  defaultOgImage: string | null;
  twitterHandle: string | null;
  twitterCardType: string;
  robotsDefaultIndex: boolean;
  robotsDefaultFollow: boolean;
  googleSiteVerification: string | null;
  bingSiteVerification: string | null;
  googleAnalyticsId: string | null;
  updatedAt: string;
}

export interface SeoPage {
  id: number;
  path: string;
  label: string | null;
  title: string | null;
  description: string | null;
  keywords: string | null;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  noindex: boolean;
  nofollow: boolean;
  includeInSitemap: boolean;
  sitemapPriority: number;
  sitemapChangefreq: string;
  createdAt: string;
  updatedAt: string;
}

export const seoApi = {
  getGlobal: () => api.get<SeoGlobal>("/seo/global"),
  updateGlobal: (data: Partial<SeoGlobal>) =>
    api.patch<SeoGlobal>("/seo/global", data),
  listPages: () => api.get<SeoPage[]>("/seo/pages"),
  createPage: (data: Partial<SeoPage>) => api.post<SeoPage>("/seo/pages", data),
  updatePage: (id: number, data: Partial<SeoPage>) =>
    api.patch<SeoPage>(`/seo/pages/${id}`, data),
  removePage: (id: number) => api.delete<void>(`/seo/pages/${id}`),
};
