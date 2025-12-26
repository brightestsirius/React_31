import React, { useState } from "react";
import List from "./components/List/List";

export default function App() {
  const [showList, setShowList] = useState(true);

  const removeList = () => setShowList((prevState) => !prevState);
  return (
    <>
      <button onClick={removeList}>Remove list</button>
      {showList && <List />}
    </>
  );
}
