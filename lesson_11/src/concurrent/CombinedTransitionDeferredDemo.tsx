import { useDeferredValue, useMemo, useState, useTransition } from "react";

const ITEMS = Array.from({ length: 5000 }, (_, i) => `Flight ${i}`);

export default function CombinedTransitionDeferredDemo() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(ITEMS);

  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setQuery(value);

    startTransition(() => {
      const result = ITEMS.filter((item) =>
        item.toLowerCase().includes(deferredQuery.toLowerCase())
      );
      setFiltered(result);
    });
  }

  const visibleItems = useMemo(() => filtered.slice(0, 10), [filtered]);

  return (
    <div style={{ padding: 16 }}>
      <h2>useTransition + useDeferredValue</h2>

      <input
        value={query}
        onChange={handleChange}
        placeholder="Search flights..."
        style={{ padding: 8, width: 240 }}
      />

      {isPending && <p>Updating results…</p>}

      <ul>
        {visibleItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}