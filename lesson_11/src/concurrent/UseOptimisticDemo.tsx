import { useOptimistic, useState } from "react";

export default function UseOptimisticDemo() {
  const [items, setItems] = useState<string[]>([]);
  const [optimisticItems, addOptimistic] = useOptimistic(
    items,
    (state, newItem: string) => [...state, newItem]
  );

  async function addItem() {
    const value = `Item ${items.length + 1}`;
    addOptimistic(value);

    // fake server delay
    await new Promise((r) => setTimeout(r, 300));
    setItems((prev) => [...prev, value]);
  }

  return (
    <div>
      <button onClick={addItem}>Add</button>
      <ul>
        {optimisticItems.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}