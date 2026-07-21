"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { ApiError, SeoPage, seoApi } from "@/lib/api";
import { useConfirm } from "@/hooks/useConfirm";
import { useCallback, useEffect, useState } from "react";

const textareaClass =
  "w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";
const selectClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";

const CHANGEFREQS = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
];

type Form = Partial<SeoPage>;

const emptyForm: Form = {
  path: "",
  label: "",
  title: "",
  description: "",
  keywords: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  twitterTitle: "",
  twitterDescription: "",
  twitterImage: "",
  noindex: false,
  nofollow: false,
  includeInSitemap: true,
  sitemapPriority: 0.5,
  sitemapChangefreq: "weekly",
};

export default function SeoPagesPage() {
  const [pages, setPages] = useState<SeoPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<SeoPage | null>(null);
  const [form, setForm] = useState<Form>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { confirm, confirmModal } = useConfirm();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setPages(await seoApi.listPages());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load SEO pages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (p: SeoPage) => {
    setEditing(p);
    setForm({ ...p });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setFormError(null);
    try {
      if (editing) {
        // path is immutable on update — exclude it and read-only fields.
        const { id: _id, path: _path, createdAt: _c, updatedAt: _u, ...payload } = form;
        void _id;
        void _path;
        void _c;
        void _u;
        await seoApi.updatePage(editing.id, payload);
      } else {
        await seoApi.createPage(form);
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Failed to save page");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p: SeoPage) => {
    const ok = await confirm({ message: `Delete SEO config for "${p.path}"?` });
    if (!ok) return;
    try {
      await seoApi.removePage(p.id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete page");
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="SEO — Pages" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex justify-end mb-5">
          <Button size="sm" onClick={openCreate}>
            + Add Page
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
                <th className="px-4 py-3 font-medium">Path</th>
                <th className="px-4 py-3 font-medium">Label</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Index</th>
                <th className="px-4 py-3 font-medium">Sitemap</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    Loading…
                  </td>
                </tr>
              ) : pages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No pages configured yet.
                  </td>
                </tr>
              ) : (
                pages.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 dark:border-gray-800/60">
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-white/90">
                      {p.path}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {p.label ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {p.title ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      {p.noindex ? (
                        <span className="text-error-500">noindex</span>
                      ) : (
                        <span className="text-success-600">index</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {p.includeInSitemap ? `yes (${p.sitemapPriority})` : "no"}
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
      </div>

      {confirmModal}

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        className="max-w-[700px] m-4 p-6 lg:p-8"
      >
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90">
          {editing ? `Edit SEO — ${editing.path}` : "Add SEO Page"}
        </h3>

        {formError && (
          <div className="p-3 mb-4 text-sm rounded-lg text-error-700 bg-error-50 dark:bg-error-500/10 dark:text-error-400">
            {formError}
          </div>
        )}

        <div className="max-h-[60vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Path *</Label>
              <Input
                defaultValue={form.path ?? ""}
                placeholder="/about"
                disabled={!!editing}
                onChange={(e) => set("path", e.target.value)}
              />
              {editing && (
                <p className="mt-1 text-xs text-gray-400">Path cannot be changed.</p>
              )}
            </div>
            <div>
              <Label>Label</Label>
              <Input
                defaultValue={form.label ?? ""}
                placeholder="About Us"
                onChange={(e) => set("label", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Title</Label>
              <Input
                defaultValue={form.title ?? ""}
                onChange={(e) => set("title", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Meta Description</Label>
              <textarea
                defaultValue={form.description ?? ""}
                onChange={(e) => set("description", e.target.value)}
                rows={2}
                className={textareaClass}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Keywords</Label>
              <Input
                defaultValue={form.keywords ?? ""}
                placeholder="comma, separated"
                onChange={(e) => set("keywords", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Canonical URL</Label>
              <Input
                defaultValue={form.canonicalUrl ?? ""}
                placeholder="Leave blank to use base URL + path"
                onChange={(e) => set("canonicalUrl", e.target.value)}
              />
            </div>

            <div className="sm:col-span-2 mt-2 border-t border-gray-100 pt-3 dark:border-gray-800">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Open Graph / Social</p>
            </div>
            <div>
              <Label>OG Title</Label>
              <Input
                defaultValue={form.ogTitle ?? ""}
                onChange={(e) => set("ogTitle", e.target.value)}
              />
            </div>
            <div>
              <Label>OG Image URL</Label>
              <Input
                defaultValue={form.ogImage ?? ""}
                onChange={(e) => set("ogImage", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>OG Description</Label>
              <textarea
                defaultValue={form.ogDescription ?? ""}
                onChange={(e) => set("ogDescription", e.target.value)}
                rows={2}
                className={textareaClass}
              />
            </div>
            <div>
              <Label>Twitter Title</Label>
              <Input
                defaultValue={form.twitterTitle ?? ""}
                onChange={(e) => set("twitterTitle", e.target.value)}
              />
            </div>
            <div>
              <Label>Twitter Image URL</Label>
              <Input
                defaultValue={form.twitterImage ?? ""}
                onChange={(e) => set("twitterImage", e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Twitter Description</Label>
              <textarea
                defaultValue={form.twitterDescription ?? ""}
                onChange={(e) => set("twitterDescription", e.target.value)}
                rows={2}
                className={textareaClass}
              />
            </div>

            <div className="sm:col-span-2 mt-2 border-t border-gray-100 pt-3 dark:border-gray-800">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Indexing & Sitemap</p>
            </div>
            <div className="flex items-center gap-6 sm:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.noindex ?? false}
                  onChange={(e) => set("noindex", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">noindex</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.nofollow ?? false}
                  onChange={(e) => set("nofollow", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">nofollow</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.includeInSitemap ?? true}
                  onChange={(e) => set("includeInSitemap", e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">In sitemap</span>
              </label>
            </div>
            <div>
              <Label>Sitemap Priority (0–1)</Label>
              <Input
                type="number"
                step={0.1}
                min="0"
                max="1"
                defaultValue={String(form.sitemapPriority ?? 0.5)}
                onChange={(e) => set("sitemapPriority", Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Change Frequency</Label>
              <select
                value={form.sitemapChangefreq ?? "weekly"}
                onChange={(e) => set("sitemapChangefreq", e.target.value)}
                className={selectClass}
              >
                {CHANGEFREQS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving || !(form.path ?? "").trim()}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
