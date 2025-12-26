import React, { useState } from "react";

import List from "./components/List/List";
import User from "./components/User/User";
import Posts from "./components/Posts/Posts";

export default function App() {
  const [showList, setShowList] = useState(true);
  const removeList = () => setShowList(false);

  const [showUser, setShowUser] = useState(true);
  const removeUser = () => setShowUser(false);

  return (
    <>
      {/* {showList && <List removeComponent={removeList} />} */}
      {/* {showUser && <User removeComponent={removeUser} />} */}
      <Posts />
    </>
  );
}
