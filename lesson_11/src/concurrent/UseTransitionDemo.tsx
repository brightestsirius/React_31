import { useState, useTransition } from "react";

const items = Array.from({ length: 5000 }, (_, i) => `Item ${i}`);

export default function UseTransitionDemo() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState(items);
  const [isPending, startTransition] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setQuery(value);

    startTransition(() => {
      const res = items.filter((i) => i.toLowerCase().includes(value));
      setFiltered(res);
    });
  }

  return (
    <div>
      <input aria-label="search" value={query} onChange={onChange} />
      {isPending && <p>Updating list...</p>}
      <ul>
        {filtered.slice(0, 5).map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}