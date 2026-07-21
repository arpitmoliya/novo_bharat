"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Pagination from "@/components/tables/Pagination";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { ApiError, Category, categoriesApi } from "@/lib/api";
import { useConfirm } from "@/hooks/useConfirm";
import { useCallback, useEffect, useState } from "react";

const PAGE_SIZE = 10;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [noindex, setNoindex] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { confirm, confirmModal } = useConfirm();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setCategories(await categoriesApi.list());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setSlug("");
    setDescription("");
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
    setOgImage("");
    setNoindex(false);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (c: Category) => {
    setEditing(c);
    setName(c.name);
    setSlug(c.slug);
    setDescription(c.description ?? "");
    setMetaTitle(c.metaTitle ?? "");
    setMetaDescription(c.metaDescription ?? "");
    setMetaKeywords(c.metaKeywords ?? "");
    setOgImage(c.ogImage ?? "");
    setNoindex(c.noindex ?? false);
    setFormError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setFormError(null);
    const payload = {
      name,
      slug: slug || undefined,
      description: description || undefined,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
      metaKeywords: metaKeywords || undefined,
      ogImage: ogImage || undefined,
      noindex,
    };
    try {
      if (editing) {
        await categoriesApi.update(editing.id, payload);
      } else {
        await categoriesApi.create(payload);
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (c: Category) => {
    const ok = await confirm({ message: `Delete category "${c.name}"?` });
    if (!ok) return;
    try {
      await categoriesApi.remove(c.id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete category");
    }
  };

  const totalPages = Math.max(1, Math.ceil(categories.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = categories.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div>
      <PageBreadcrumb pageTitle="Categories" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex justify-end mb-5">
          <Button size="sm" onClick={openCreate}>
            + Add Category
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
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Description</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    No categories yet.
                  </td>
                </tr>
              ) : (
                paginated.map((c) => (
                  <tr key={c.id} className="border-b border-gray-100 dark:border-gray-800/60">
                    <td className="px-4 py-3 text-gray-800 dark:text-white/90">{c.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{c.slug}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {c.description ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEdit(c)}
                        className="mr-3 text-sm font-medium text-brand-500 hover:text-brand-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c)}
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

        {!loading && categories.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 mt-5 sm:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(currentPage * PAGE_SIZE, categories.length)} of {categories.length}
            </p>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
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
        className="max-w-[500px] m-4 p-6 lg:p-8"
      >
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
          {editing ? "Edit Category" : "Add Category"}
        </h3>

        {formError && (
          <div className="p-3 mb-4 text-sm rounded-lg text-error-700 bg-error-50 dark:bg-error-500/10 dark:text-error-400">
            {formError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Label>Name *</Label>
            <Input defaultValue={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Slug</Label>
            <Input
              defaultValue={slug}
              placeholder="auto-generated from name"
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <textarea
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
            />
          </div>

          <div className="border-t border-gray-100 pt-3 dark:border-gray-800">
            <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
              SEO (optional)
            </p>
            <div className="space-y-3">
              <div>
                <Label>Meta Title</Label>
                <Input
                  defaultValue={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                />
              </div>
              <div>
                <Label>Meta Description</Label>
                <textarea
                  defaultValue={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>
              <div>
                <Label>Meta Keywords</Label>
                <Input
                  defaultValue={metaKeywords}
                  placeholder="comma, separated"
                  onChange={(e) => setMetaKeywords(e.target.value)}
                />
              </div>
              <div>
                <Label>OG Image URL</Label>
                <Input
                  defaultValue={ogImage}
                  onChange={(e) => setOgImage(e.target.value)}
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={noindex}
                  onChange={(e) => setNoindex(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Hide from search engines (noindex)
                </span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving || !name.trim()}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
