import React, {useMemo, memo} from "react";

import ListItem from "./ListItem";

export default memo(function List({ posts, changeTitle, deleteItem }) {

  const sortedList = useMemo(() => posts.sort((a,b) => b.completed-a.completed), [posts])

  return sortedList.length ? (
    <ul>
      {posts.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          changeTitle={changeTitle}
          deleteItem={deleteItem}
        />
      ))}
    </ul>
  ) : null;
})