"use client";

// Filterable API catalogue — fetches the full active product list once, then
// filters client-side (search + category + availability). Matches Figma Product
// Page: bordered filter panel, chip row, 3-col cards, Load More.
import { useEffect, useMemo, useState } from "react";
import { Category, Product, publicApi } from "@/lib/api";
import ButtonLink from "@/components/ui/ButtonLink";
import FilterChip from "@/components/ui/FilterChip";
import SearchInput from "@/components/ui/SearchInput";
import SelectInput from "@/components/ui/SelectInput";
import Tag from "@/components/ui/Tag";

type Availability = "all" | "available" | "on-request";

const PAGE_SIZE = 9;

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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    let cancelled = false;
    const fetchAllProducts = async () => {
      const LIMIT = 100;
      const first = await publicApi.products({ page: 1, limit: LIMIT });
      let all = first.data;
      for (let p = 2; p <= first.totalPages; p++) {
        const next = await publicApi.products({ page: p, limit: LIMIT });
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

  // Reset pagination when filters change.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, activeCategory, availability]);

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

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="flex flex-col gap-8">
      {/* Filter panel — light blue outline, search + availability, then chips */}
      <div className="flex flex-col gap-4 rounded-[20px] border-8 border-blue/25 bg-white p-4 sm:gap-5 sm:p-5 md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput
            placeholder="Search molecule name or CAS number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search products"
          />
          <SelectInput
            className="w-full shrink-0 sm:w-auto sm:min-w-45"
            value={availability}
            onChange={(e) => setAvailability(e.target.value as Availability)}
            aria-label="Filter by availability"
          >
            <option value="all">All Availability</option>
            <option value="available">Available</option>
            <option value="on-request">On Request</option>
          </SelectInput>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <FilterChip
            active={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          >
            All Categories
          </FilterChip>
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              active={activeCategory === c.id}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.name}
            </FilterChip>
          ))}
        </div>
      </div>

      <div
        className="font-body text-[clamp(0.9rem,1vw,1.125rem)] text-gray"
        aria-live="polite"
      >
        {loading
          ? "Loading catalogue…"
          : error
            ? "Unable to load the catalogue right now."
            : `${filtered.length} ${filtered.length === 1 ? "molecule" : "molecules"}`}
      </div>

      {!loading && !error && visible.length > 0 && (
        <>
          <div className="mx-auto grid max-w-140 grid-cols-1 gap-5 md:mx-0 md:max-w-none md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {visible.map((p) => {
              const kind = availabilityKind(p.regulatoryStatus);
              return (
                <article
                  key={p.id}
                  className="flex flex-col rounded-[20px] bg-transparent transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex flex-col gap-3 rounded-[20px] border border-b-[0.5px] border-black/20 bg-white p-5">
                    <h3 className="m-0 font-heading text-xl leading-snug font-semibold tracking-tight text-black sm:text-2xl">
                      {p.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {p.category?.name ? (
                        <Tag color="gold">{p.category.name}</Tag>
                      ) : null}
                      {p.gmpStatus ? (
                        <Tag color="blue">{p.gmpStatus}</Tag>
                      ) : null}
                      {p.regulatoryStatus ? (
                        <Tag color={kind === "on-request" ? "gold" : "green"}>
                          {p.regulatoryStatus}
                        </Tag>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col gap-4 rounded-[20px] border border-t-[0.5px] border-black/10 bg-f6 p-5">
                    <div className="flex flex-col">
                      {p.casNumber && (
                        <div className="flex items-center justify-between gap-4 border-b border-black/10 py-2.5 first:pt-0 last:border-b-0 last:pb-0">
                          <span className="font-body text-base text-gray">
                            CAS No :
                          </span>
                          <span className="font-body text-right text-base text-blue">
                            {p.casNumber}
                          </span>
                        </div>
                      )}
                      {p.packing && (
                        <div className="flex items-center justify-between gap-4 border-b border-black/10 py-2.5 first:pt-0 last:border-b-0 last:pb-0">
                          <span className="font-body text-base text-gray">
                            Pack Size :
                          </span>
                          <span className="font-body text-right text-base text-blue">
                            {p.packing}
                          </span>
                        </div>
                      )}
                    </div>
                    <ButtonLink
                      href="/contact"
                      variant="ghost"
                      showArrow
                      className="self-start"
                    >
                      Request Quote
                    </ButtonLink>
                  </div>
                </article>
              );
            })}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                className="inline-flex items-center cursor-pointer gap-2.5 font-body text-base font-medium tracking-tight text-blue transition-opacity hover:opacity-80"
              >
                {loading ? (
                  <span
                    className="inline-block size-5 animate-spin rounded-full border-2 border-blue/30 border-t-blue"
                    aria-hidden="true"
                  />
                ) : (
                  <span>Load More</span>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="rounded-[20px] bg-f6 px-6 py-15 text-center font-body text-[clamp(1rem,1.1vw,1.25rem)] text-gray">
          No molecules match your filters. Try a different search or category.
        </div>
      )}
    </div>
  );
}
