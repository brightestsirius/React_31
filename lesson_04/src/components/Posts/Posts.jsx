import React, { useState } from "react";
import "./style.sass";

import Form from "./Form";
import List from "./List";
import ColorPicker from "./../ColorPicker/ColorPicker";

import usePosts from "../../hooks/usePosts";

export default function Posts() {
  const { posts, changeTitle, deleteItem, addItem } = usePosts();
  const [color, setColor] = useState(`#663399`);

  return (
    <>
      <ColorPicker color={color} setColor={setColor} />
      <Form addItem={addItem} />
      <List posts={posts} changeTitle={changeTitle} deleteItem={deleteItem} />
    </>
  );
}