import { Suspense } from "react";

function SlowComponent() {
  throw new Promise((r) => setTimeout(r, 300));
}

export default function SuspenseDemo() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SlowComponent />
    </Suspense>
  );
}