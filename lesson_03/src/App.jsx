import React, { useState } from "react";

import List from "./components/List/List";
import User from './components/User/User'

export default function App() {
  const [showList, setShowList] = useState(true);

  const removeList = () => setShowList(false);

  return <>
    {/* {showList && <List removeList={removeList} />} */}
    {/* <User /> */}
  </>;
}
