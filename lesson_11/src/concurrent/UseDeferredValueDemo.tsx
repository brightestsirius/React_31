import { useDeferredValue, useMemo, useState } from "react";

const items = Array.from({ length: 3000 }, (_, i) => `Post ${i}`);

export default function UseDeferredValueDemo() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(() => {
    return items.filter((i) =>
      i.toLowerCase().includes(deferredQuery.toLowerCase())
    );
  }, [deferredQuery]);

  return (
    <div>
      <input
        aria-label="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query !== deferredQuery && <p>Updating results...</p>}

      <ul>
        {filtered.slice(0, 5).map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}