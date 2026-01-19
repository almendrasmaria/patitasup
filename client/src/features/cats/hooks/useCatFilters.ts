import { useMemo, useState } from "react";
import type { Cat } from "../model";

export const useCatSearch = (cats: Cat[]) => {
  const [query, setQuery] = useState("");

  const filteredCats = useMemo(() => {
    const q = query.trim().toLowerCase();

    return cats.filter((c) =>
      !q ? true : c.rescueInstagram.toLowerCase().includes(q)
    );
  }, [cats, query]);

  return {
    query,
    setQuery,
    filteredCats,
  };
};