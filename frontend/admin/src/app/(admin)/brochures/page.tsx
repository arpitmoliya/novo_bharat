"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Pagination from "@/components/tables/Pagination";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { ApiError, Brochure, brochuresApi } from "@/lib/api";
import { useConfirm } from "@/hooks/useConfirm";
import { useCallback, useEffect, useState } from "react";

const PAGE_SIZE = 10;

export default function BrochuresPage() {
  const [brochures, setBrochures] = useState<Brochure[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Brochure | null>(null);
  const [title, setTitle] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { confirm, confirmModal } = useConfirm();

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setBrochures(await brochuresApi.list());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load brochures");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setFileUrl("");
    setDescription("");
    setIsActive(true);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (b: Brochure) => {
    setEditing(b);
    setTitle(b.title);
    setFileUrl(b.fileUrl);
    setDescription(b.description ?? "");
    setIsActive(b.isActive);
    setFormError(null);
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setFormError(null);
    const payload = {
      title,
      fileUrl,
      description: description || undefined,
      isActive,
    };
    try {
      if (editing) {
        await brochuresApi.update(editing.id, payload);
      } else {
        await brochuresApi.create(payload);
      }
      setModalOpen(false);
      await load();
    } catch (err) {
      setFormError(err instanceof ApiError ? err.message : "Failed to save brochure");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (b: Brochure) => {
    const ok = await confirm({ message: `Delete brochure "${b.title}"?` });
    if (!ok) return;
    try {
      await brochuresApi.remove(b.id);
      await load();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete brochure");
    }
  };

  const totalPages = Math.max(1, Math.ceil(brochures.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = brochures.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div>
      <PageBreadcrumb pageTitle="Brochures" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex justify-end mb-5">
          <Button size="sm" onClick={openCreate}>
            + Add Brochure
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
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">File</th>
                <th className="px-4 py-3 font-medium">Status</th>
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
              ) : brochures.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                    No brochures yet.
                  </td>
                </tr>
              ) : (
                paginated.map((b) => (
                  <tr key={b.id} className="border-b border-gray-100 dark:border-gray-800/60">
                    <td className="px-4 py-3 text-gray-800 dark:text-white/90">{b.title}</td>
                    <td className="px-4 py-3">
                      <a
                        href={b.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-500 hover:text-brand-600 break-all"
                      >
                        {b.fileUrl}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          b.isActive
                            ? "bg-success-50 text-success-700 dark:bg-success-500/15 dark:text-success-400"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                        }`}
                      >
                        {b.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEdit(b)}
                        className="mr-3 text-sm font-medium text-brand-500 hover:text-brand-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b)}
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

        {!loading && brochures.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 mt-5 sm:flex-row">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–
              {Math.min(currentPage * PAGE_SIZE, brochures.length)} of {brochures.length}
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
          {editing ? "Edit Brochure" : "Add Brochure"}
        </h3>

        {formError && (
          <div className="p-3 mb-4 text-sm rounded-lg text-error-700 bg-error-50 dark:bg-error-500/10 dark:text-error-400">
            {formError}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Label>Title *</Label>
            <Input defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <Label>PDF File URL *</Label>
            <Input
              defaultValue={fileUrl}
              placeholder="/catalogue/NovoBharat.pdf"
              onChange={(e) => setFileUrl(e.target.value)}
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
          <div className="flex items-center gap-2">
            <input
              id="brochureActive"
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
            />
            <Label htmlFor="brochureActive" className="mb-0">
              Active (visible on website)
            </Label>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={saving || !title.trim() || !fileUrl.trim()}
          >
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
