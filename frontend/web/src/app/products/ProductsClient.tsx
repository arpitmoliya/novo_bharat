"use client";

// Filterable API catalogue — fetches the full active product list once, then
// filters client-side (search + category + availability) with no page reload.
// Styled with the fx- design system: gradient filter panel, chip filters, and
// the two-tone product cards used on the Home "Our Products" section.
import { useEffect, useMemo, useState } from "react";
import { Category, Product, publicApi } from "@/lib/api";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";

type Availability = "all" | "available" | "on-request";

function availabilityKind(status: string | null): Availability {
  const s = (status ?? "").toLowerCase();
  if (s.includes("request")) return "on-request";
  if (s) return "available";
  return "all";
}

export default function ProductsClient() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");
  const [availability, setAvailability] = useState<Availability>("all");

  useEffect(() => {
    let cancelled = false;
    // The API caps page size at 100, so page through to load the whole catalogue.
    const fetchAllProducts = async () => {
      const PAGE_SIZE = 100;
      const first = await publicApi.products({ page: 1, limit: PAGE_SIZE });
      let all = first.data;
      for (let p = 2; p <= first.totalPages; p++) {
        const next = await publicApi.products({ page: p, limit: PAGE_SIZE });
        all = all.concat(next.data);
      }
      return all;
    };

    (async () => {
      setLoading(true);
      try {
        const [cats, all] = await Promise.all([
          publicApi.categories(),
          fetchAllProducts(),
        ]);
        if (cancelled) return;
        setCategories(cats);
        setProducts(all);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((p) => {
      if (activeCategory !== "all" && p.categoryId !== activeCategory)
        return false;
      if (
        availability !== "all" &&
        availabilityKind(p.regulatoryStatus) !== availability
      )
        return false;
      if (term) {
        const haystack =
          `${p.name} ${p.casNumber ?? ""} ${p.gmpStatus ?? ""}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
  }, [products, search, activeCategory, availability]);

  return (
    <div className="flex flex-col gap-7">
      {/* Filter / search bar */}
      <div className="flex flex-col gap-5 rounded-[20px] bg-(image:--gradient-soft) p-[clamp(20px,2vw,28px)]">
        <div className="search-box">
          <svg viewBox="0 0 24 24" strokeWidth={1.8} aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search molecule name or CAS number…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            className={`filter-chip${activeCategory === "all" ? " is-active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`filter-chip${activeCategory === c.id ? " is-active" : ""}`}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.name}
            </button>
          ))}

          <span className="flex-1" />

          <select
            className="select-box"
            value={availability}
            onChange={(e) => setAvailability(e.target.value as Availability)}
            aria-label="Filter by availability"
          >
            <option value="all">All Availability</option>
            <option value="available">In Stock</option>
            <option value="on-request">On Order</option>
          </select>
        </div>
      </div>

      <div className="result-count" aria-live="polite">
        {loading
          ? "Loading catalogue…"
          : error
            ? "Unable to load the catalogue right now."
            : `${filtered.length} ${filtered.length === 1 ? "molecule" : "molecules"}`}
      </div>

      {/* Product cards grid — two-tone cards */}
      {!loading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-6 mx-auto max-w-140 md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const kind = availabilityKind(p.regulatoryStatus);
            return (
              <article key={p.id} className="flex flex-col rounded-[20px]">
                <div className="flex flex-col gap-3 rounded-[20px] border border-black/20 bg-white p-5">
                  <h3 className="m-0 font-heading text-[clamp(1.4rem,2vw,2rem)] leading-[1.2] font-normal tracking-[-0.02em] text-black">
                    {p.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {p.category?.name && (
                      <span className="tag tag-gold">{p.category.name}</span>
                    )}
                    {p.gmpStatus && (
                      <span className="tag tag-blue">{p.gmpStatus}</span>
                    )}
                    {p.regulatoryStatus && (
                      <span
                        className={`tag ${kind === "on-request" ? "tag-gold" : "tag-green"}`}
                      >
                        {p.regulatoryStatus}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 rounded-[20px] border border-black/10 bg-f6 p-5">
                  <div className="flex flex-col">
                    {p.casNumber && (
                      <div className="flex items-center justify-between gap-4 border-b border-b-black/10 py-2.5 first:pt-0 last:border-b-0 last:pb-0">
                        <span className="font-heading text-[clamp(1rem,1.05vw,1.25rem)] leading-[1.2] font-normal tracking-[-0.02em] text-gray">
                          CAS No :
                        </span>
                        <span className="font-heading text-[clamp(1rem,1.05vw,1.25rem)] leading-[1.2] font-normal tracking-[-0.02em] text-right text-blue">
                          {p.casNumber}
                        </span>
                      </div>
                    )}
                    {p.packing && (
                      <div className="flex items-center justify-between gap-4 border-b border-b-black/10 py-2.5 first:pt-0 last:border-b-0 last:pb-0">
                        <span className="font-heading text-[clamp(1rem,1.05vw,1.25rem)] leading-[1.2] font-normal tracking-[-0.02em] text-gray">
                          Pack Size:
                        </span>
                        <span className="font-heading text-[clamp(1rem,1.05vw,1.25rem)] leading-[1.2] font-normal tracking-[-0.02em] text-right text-blue">
                          {p.packing}
                        </span>
                      </div>
                    )}
                  </div>
                  <a href="/contact" className="btn btn-ghost self-start">
                    Request Quote
                    <ArrowRightIcon />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty-state">
          No molecules match your filters. Try a different search or category.
        </div>
      )}
    </div>
  );
}
