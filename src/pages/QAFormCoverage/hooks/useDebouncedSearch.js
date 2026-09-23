import { useEffect, useState } from "react";

// Shared search-box behavior — debounced 300ms per the spec, resets to
// page 1 on every committed change. Used by every searchable clients
// table in this feature (Assigned / Unassigned, on both the Clients
// drill-down page and the Overview page's Unassigned Clients tab).
export default function useDebouncedSearch(setPage) {
  const [searchInput, setSearchInput] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    const handle = setTimeout(() => {
      const trimmed = searchInput.trim();
      if (trimmed !== searchFilter) {
        setSearchFilter(trimmed);
        setPage(1);
      }
    }, 300);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  return { searchInput, setSearchInput, searchFilter };
}
