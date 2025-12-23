import React from "react";

export default function CounterStatistics({ counter, actionCount }) {
  return <>
  <h4>Counter statistics: {counter}</h4>
  <h4>Action statistics: {actionCount}</h4>
  </>;
}