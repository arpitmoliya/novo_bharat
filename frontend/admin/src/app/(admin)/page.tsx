"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { categoriesApi, productsApi } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [productCount, setProductCount] = useState<number | null>(null);
  const [activeCount, setActiveCount] = useState<number | null>(null);
  const [categoryCount, setCategoryCount] = useState<number | null>(null);

  useEffect(() => {
    productsApi
      .list({ limit: 1 })
      .then((res) => setProductCount(res.total))
      .catch(() => setProductCount(0));
    productsApi
      .list({ limit: 100 })
      .then((res) => setActiveCount(res.data.filter((p) => p.isActive).length))
      .catch(() => setActiveCount(0));
    categoriesApi
      .list()
      .then((c) => setCategoryCount(c.length))
      .catch(() => setCategoryCount(0));
  }, []);

  const cards = [
    { label: "Total Products", value: productCount, href: "/products" },
    { label: "Active Products", value: activeCount, href: "/products" },
    { label: "Categories", value: categoryCount, href: "/categories" },
  ];

  return (
    <div>
      <PageBreadcrumb pageTitle="Dashboard" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:shadow-theme-md dark:border-gray-800 dark:bg-white/[0.03]"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold text-gray-800 dark:text-white/90">
              {c.value ?? "—"}
            </p>
          </Link>
        ))}
      </div>

      <div className="p-6 mt-6 text-sm text-gray-600 border border-gray-200 rounded-2xl bg-white dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
        Welcome to the NovoBharat admin panel. Manage your chemical catalog from the{" "}
        <Link href="/products" className="font-medium text-brand-500 hover:text-brand-600">
          Products
        </Link>{" "}
        and{" "}
        <Link href="/categories" className="font-medium text-brand-500 hover:text-brand-600">
          Categories
        </Link>{" "}
        sections.
      </div>
    </div>
  );
}
