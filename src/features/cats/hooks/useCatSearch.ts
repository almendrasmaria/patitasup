"use client";

import { useMemo, useState } from "react";
import type { Cat } from "../types";

export function useCatSearch(cats: Cat[]) {
  const [query, setQuery] = useState("");

  const filteredCats = useMemo(() => {
    const qRaw = query.trim().toLowerCase();
    if (!qRaw) return cats;

    const q = qRaw.startsWith("@") ? qRaw.slice(1) : qRaw;

    return cats.filter((cat) => {
      const refugeRaw = (cat.rescueInstagram ?? "").trim().toLowerCase();
      const refuge = refugeRaw.startsWith("@") ? refugeRaw.slice(1) : refugeRaw;

      return refuge.startsWith(q);
    });
  }, [cats, query]);

  return {
    query,
    setQuery,
    filteredCats,
  };
}
