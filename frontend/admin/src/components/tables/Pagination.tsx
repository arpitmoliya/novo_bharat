type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Build the exact list of page numbers to render. For small page counts show
  // every page; for large counts collapse the middle with ellipses. Page numbers
  // are always clamped to [1, totalPages] so out-of-range numbers never appear.
  const pages: (number | "ellipsis")[] = [];
  if (totalPages <= 7) {
    for (let p = 1; p <= totalPages; p++) pages.push(p);
  } else {
    const window = 1; // pages on each side of the current page
    for (let p = 1; p <= totalPages; p++) {
      const isEdge = p === 1 || p === totalPages;
      const inWindow = p >= currentPage - window && p <= currentPage + window;
      if (isEdge || inWindow) {
        pages.push(p);
      } else if (pages[pages.length - 1] !== "ellipsis") {
        pages.push("ellipsis");
      }
    }
  }

  return (
    <div className="flex items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
      >
        Previous
      </button>
      <div className="flex items-center gap-2">
        {pages.map((p, idx) =>
          p === "ellipsis" ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-4 py-2 rounded ${
                currentPage === p
                  ? "bg-brand-500 text-white"
                  : "text-gray-700 dark:text-gray-400"
              } flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500`}
            >
              {p}
            </button>
          ),
        )}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
