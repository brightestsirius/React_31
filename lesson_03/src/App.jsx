import React, { useState } from "react";
import List from "./components/List/List";
import User from "./components/User/User";
import CRUD from './components/CRUD/CRUD'

export default function App() {
  const [showList, setShowList] = useState(true);

  const removeList = () => setShowList((prevState) => !prevState);

  return (
    <>
      {/* <button onClick={removeList}>Remove List</button>
      {showList && <List />} */}
      {/* <User /> */}
      <CRUD />
    </>
  );
}
