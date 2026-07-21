// Public-site API client for the NovoBharat backend.

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3003/api";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  casNumber: string | null;
  gmpStatus: string | null;
  regulatoryStatus: string | null;
  packing: string | null;
  category?: { id: number; name: string } | null;
  categoryId: number | null;
}

export interface Paginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface InquiryPayload {
  fullName: string;
  company: string;
  country: string;
  email: string;
  phone?: string;
  molecule: string;
  quantity: string;
  market?: string;
  notes?: string;
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export const publicApi = {
  categories: () => get<Category[]>("/categories"),
  products: (params: {
    search?: string;
    categoryId?: number;
    page?: number;
    limit?: number;
  }) => {
    const q = new URLSearchParams();
    if (params.search) q.set("search", params.search);
    if (params.categoryId) q.set("categoryId", String(params.categoryId));
    if (params.page) q.set("page", String(params.page));
    if (params.limit) q.set("limit", String(params.limit));
    const qs = q.toString();
    return get<Paginated<Product>>(`/products${qs ? `?${qs}` : ""}`);
  },
  submitInquiry: (payload: InquiryPayload) =>
    post<{ ok: boolean }>("/inquiries", payload),
};
