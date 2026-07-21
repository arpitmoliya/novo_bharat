"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { ApiError, SeoGlobal, seoApi } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";

const textareaClass =
  "w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";
const selectClass =
  "h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90";

type Form = Partial<SeoGlobal>;

export default function SeoGlobalPage() {
  const [form, setForm] = useState<Form>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setForm(await seoApi.getGlobal());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to load SEO settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setSuccess(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      // Strip read-only fields before sending.
      const { id: _id, updatedAt: _updatedAt, ...payload } = form;
      void _id;
      void _updatedAt;
      const updated = await seoApi.updateGlobal(payload);
      setForm(updated);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save SEO settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="SEO — Global Settings" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        {error && (
          <div className="p-3 mb-4 text-sm rounded-lg text-error-700 bg-error-50 dark:bg-error-500/10 dark:text-error-400">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 mb-4 text-sm rounded-lg text-success-700 bg-success-50 dark:bg-success-500/10 dark:text-success-400">
            Settings saved.
          </div>
        )}

        {loading ? (
          <p className="py-8 text-center text-gray-500">Loading…</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <Label>Site Name</Label>
                <Input
                  defaultValue={form.siteName ?? ""}
                  onChange={(e) => set("siteName", e.target.value)}
                />
              </div>
              <div>
                <Label>Title Template</Label>
                <Input
                  defaultValue={form.titleTemplate ?? ""}
                  placeholder="%s | Novo Bharat"
                  onChange={(e) => set("titleTemplate", e.target.value)}
                />
                <p className="mt-1 text-xs text-gray-400">
                  Use %s where the page title should appear.
                </p>
              </div>
              <div>
                <Label>Default Title</Label>
                <Input
                  defaultValue={form.defaultTitle ?? ""}
                  onChange={(e) => set("defaultTitle", e.target.value)}
                />
              </div>
              <div>
                <Label>Canonical Base URL</Label>
                <Input
                  defaultValue={form.canonicalBaseUrl ?? ""}
                  placeholder="https://novobharat.com"
                  onChange={(e) => set("canonicalBaseUrl", e.target.value)}
                />
                <p className="mt-1 text-xs text-gray-400">
                  Used for canonical, Open Graph and sitemap URLs.
                </p>
              </div>
              <div className="sm:col-span-2">
                <Label>Default Meta Description</Label>
                <textarea
                  defaultValue={form.defaultDescription ?? ""}
                  onChange={(e) => set("defaultDescription", e.target.value)}
                  rows={2}
                  className={textareaClass}
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Default Keywords</Label>
                <textarea
                  defaultValue={form.defaultKeywords ?? ""}
                  onChange={(e) => set("defaultKeywords", e.target.value)}
                  rows={2}
                  placeholder="comma, separated, keywords"
                  className={textareaClass}
                />
              </div>
              <div>
                <Label>Default OG Image URL</Label>
                <Input
                  defaultValue={form.defaultOgImage ?? ""}
                  placeholder="/imgs/og-default.jpg"
                  onChange={(e) => set("defaultOgImage", e.target.value)}
                />
              </div>
              <div>
                <Label>Twitter Handle</Label>
                <Input
                  defaultValue={form.twitterHandle ?? ""}
                  placeholder="@novobharat"
                  onChange={(e) => set("twitterHandle", e.target.value)}
                />
              </div>
              <div>
                <Label>Twitter Card Type</Label>
                <select
                  value={form.twitterCardType ?? "summary_large_image"}
                  onChange={(e) => set("twitterCardType", e.target.value)}
                  className={selectClass}
                >
                  <option value="summary">summary</option>
                  <option value="summary_large_image">summary_large_image</option>
                </select>
              </div>
              <div className="flex items-center gap-6 sm:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.robotsDefaultIndex ?? true}
                    onChange={(e) => set("robotsDefaultIndex", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Allow indexing (index)
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={form.robotsDefaultFollow ?? true}
                    onChange={(e) => set("robotsDefaultFollow", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Follow links (follow)
                  </span>
                </label>
              </div>
              <div>
                <Label>Google Site Verification</Label>
                <Input
                  defaultValue={form.googleSiteVerification ?? ""}
                  onChange={(e) => set("googleSiteVerification", e.target.value)}
                />
              </div>
              <div>
                <Label>Bing Site Verification</Label>
                <Input
                  defaultValue={form.bingSiteVerification ?? ""}
                  onChange={(e) => set("bingSiteVerification", e.target.value)}
                />
              </div>
              <div>
                <Label>Google Analytics ID</Label>
                <Input
                  defaultValue={form.googleAnalyticsId ?? ""}
                  placeholder="G-XXXXXXXXXX"
                  onChange={(e) => set("googleAnalyticsId", e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button size="sm" onClick={handleSave} disabled={saving}>
                {saving ? "Saving…" : "Save Settings"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
