import React from "react";
import useBearsStore from "../../store/useBearsStore";

export default function BearsStatistics() {
  const bears = useBearsStore((s) => s.bears);

  return <div>Bears Statistics: {bears}</div>;
}
