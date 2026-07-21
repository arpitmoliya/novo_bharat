"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Pagination from "@/components/tables/Pagination";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import {
  ApiError,
  Category,
  Product,
  categoriesApi,
  productsApi,
} from "@/lib/api";
import { useConfirm } from "@/hooks/useConfirm";
import { useCallback, useEffect, useState } from "react";

const PAGE_SIZE = 10;

interface FormState {
  name: string;
  casNumber: string;
  gmpStatus: string;
  regulatoryStatus: string;
  packing: string;
  categoryId: string;
  imageUrl: string;
  description: string;
  isActive: boolean;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;
  noindex: boolean;
}

const EMPTY_FORM: FormState = {
  name: "",
  casNumber: "",
  gmpStatus: "WHO-GMP",
  regulatoryStatus: "Available",
  packing: "",
  categoryId: "",
  imageUrl: "",
  description: "",
  isActive: true,
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  ogImage: "",
  noindex: false,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { confirm, confirmModal } = useConfirm();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productsApi.list({
        search: search.trim() || undefined,
        page,
        limit: PAGE_SIZE,
      });
      setProducts(res.data);
      setTotal(res.total);
      setTotalPages(Math.max(1, res.totalPages));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load products");
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    categoriesApi.list().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  // Keep the page within range if the total shrinks (e.g. after deletes).
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      casNumber: p.casNumber ?? "",
      gmpStatus: p.gmpStatus ?? "",
      regulatoryStatus: p.regulatoryStatus ?? "",
      packing: p.packing ?? "",
      categoryId: p.categoryId ? String(p.categoryId) : "",
      imageUrl: p.imageUrl ?? "",
      description: p.description ?? "",
      isActive: p.isActive,
      metaTitle: p.metaTitle ?? "",
      metaDescription: p.metaDescription ?? "",
      metaKeywords: p.metaKeywords ?? "",
      ogImage: p.ogImage ?? "",
      noindex: p.noindex ?? false,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setFormError(null);
    const payload = {
      name: form.name,
      casNumber: form.casNumber || undefined,
      gmpStatus: form.gmpStatus || undefined,
      regulatoryStatus: form.regulatoryStatus || undefined,
      packing: form.packing || undefined,
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      imageUrl: form.imageUrl || undefined,
      description: form.description || undefined,
      isActive: form.isActive,
      metaTitle: form.metaTitle || undefined,
      metaDescription: form.metaDescription || undefined,
      metaKeywords: form.metaKeywords || undefined,
      ogImage: form.ogImage || undefined,
      noindex: form.noindex,
    };
    try {
      if (editing) {
        await productsApi.update(editing.id, payload);
      } else {
        await productsApi.create(payload);
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p: Product) => {
    const ok = await confirm({
      message: `Delete "${p.name}"? This cannot be undone.`,
    });
    if (!ok) return;
    try {
      await productsApi.remove(p.id);
      // If we just removed the last row on a page beyond the first, step back.
      if (products.length === 1 && page > 1) {
        setPage((pg) => pg - 1);
      } else {
        await load();
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete product");
    }
  };

  const regulatoryBadge = (value: string | null) => {
    if (!value) return <span className="text-gray-400">—</span>;
    const isAvailable = value.toLowerCase() === "available";
    return (
      <span
        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
          isAvailable
            ? "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400"
            : "bg-warning-50 text-warning-700 dark:bg-warning-500/15 dark:text-warning-400"
        }`}
      >
        {value}
      </span>
    );
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Products" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:max-w-xs">
            <Input
              placeholder="Search name, CAS no., GMP, packing…"
              defaultValue={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <Button size="sm" onClick={openCreate}>
            + Add Product
          </Button>
        </div>

        {error && (
          <div className="p-3 mb-4 text-sm rounded-lg text-error-700 bg-error-50 dark:bg-error-500/10 dark:text-error-400">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-200 dark:border-gray-800 dark:text-gray-400">
                <th className="px-4 py-3 font-medium">Product Name</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">CAS No.</th>
                <th className="px-4 py-3 font-medium">GMP Status</th>
                <th className="px-4 py-3 font-medium">Regulatory</th>
                <th className="px-4 py-3 font-medium">Packing</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-gray-100 dark:border-gray-800/60"
                  >
                    <td className="px-4 py-3 text-gray-800 dark:text-white/90">
                      {p.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {p.category?.name ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {p.casNumber ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      {p.gmpStatus ? (
                        <span className="inline-flex rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
                          {p.gmpStatus}
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{regulatoryBadge(p.regulatoryStatus)}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {p.packing ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEdit(p)}
                        className="mr-3 text-sm font-medium text-brand-500 hover:text-brand-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="text-sm font-medium text-error-500 hover:text-error-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {!loading && total > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 mt-5 sm:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {(Math.min(page, totalPages) - 1) * PAGE_SIZE + 1}–
              {Math.min(Math.min(page, totalPages) * PAGE_SIZE, total)} of {total}
            </p>
            {totalPages > 1 && (
              <Pagination
                currentPage={Math.min(page, totalPages)}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        )}
      </div>

      {confirmModal}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        className="max-w-[600px] m-4 p-6 lg:p-8"
      >
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
          {editing ? "Edit Product" : "Add Product"}
        </h3>

        {formError && (
          <div className="p-3 mb-4 text-sm rounded-lg text-error-700 bg-error-50 dark:bg-error-500/10 dark:text-error-400">
            {formError}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Product Name *</Label>
            <Input
              defaultValue={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            />
          </div>
          <div>
            <Label>Category</Label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm((f) => ({ ...f, categoryId: e.target.value }))}
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">— None —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>CAS No.</Label>
            <Input
              defaultValue={form.casNumber}
              onChange={(e) => setForm((f) => ({ ...f, casNumber: e.target.value }))}
            />
          </div>
          <div>
            <Label>GMP Status</Label>
            <Input
              defaultValue={form.gmpStatus}
              placeholder="WHO-GMP"
              onChange={(e) => setForm((f) => ({ ...f, gmpStatus: e.target.value }))}
            />
          </div>
          <div>
            <Label>Regulatory</Label>
            <select
              value={form.regulatoryStatus}
              onChange={(e) =>
                setForm((f) => ({ ...f, regulatoryStatus: e.target.value }))
              }
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            >
              <option value="">— Not specified —</option>
              <option value="Available">Available</option>
              <option value="On Request">On Request</option>
            </select>
          </div>
          <div>
            <Label>Packing</Label>
            <Input
              defaultValue={form.packing}
              placeholder="25 kg HDPE Drum"
              onChange={(e) => setForm((f) => ({ ...f, packing: e.target.value }))}
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Image URL</Label>
            <Input
              defaultValue={form.imageUrl}
              onChange={(e) => setForm((f) => ({ ...f, imageUrl: e.target.value }))}
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Description</Label>
            <textarea
              defaultValue={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <input
              id="isActive"
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <Label htmlFor="isActive" className="mb-0">
              Active (visible on website)
            </Label>
          </div>

          <div className="sm:col-span-2 border-t border-gray-100 pt-3 dark:border-gray-800">
            <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              SEO (optional)
            </p>
          </div>
          <div className="sm:col-span-2">
            <Label>Meta Title</Label>
            <Input
              defaultValue={form.metaTitle}
              onChange={(e) => setForm((f) => ({ ...f, metaTitle: e.target.value }))}
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Meta Description</Label>
            <textarea
              defaultValue={form.metaDescription}
              onChange={(e) =>
                setForm((f) => ({ ...f, metaDescription: e.target.value }))
              }
              rows={2}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>
          <div>
            <Label>Meta Keywords</Label>
            <Input
              defaultValue={form.metaKeywords}
              placeholder="comma, separated"
              onChange={(e) => setForm((f) => ({ ...f, metaKeywords: e.target.value }))}
            />
          </div>
          <div>
            <Label>OG Image URL</Label>
            <Input
              defaultValue={form.ogImage}
              onChange={(e) => setForm((f) => ({ ...f, ogImage: e.target.value }))}
            />
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <input
              id="noindex"
              type="checkbox"
              checked={form.noindex}
              onChange={(e) => setForm((f) => ({ ...f, noindex: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <Label htmlFor="noindex" className="mb-0">
              Hide from search engines (noindex)
            </Label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving || !form.name.trim()}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
