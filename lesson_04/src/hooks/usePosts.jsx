import React, { useState, useEffect } from "react";

import service from "../services/post";

export default function usePosts() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await service.get();
      setPosts(response);
    } catch (err) {
      console.log(err);
    }
  };

  const changeTitle = async (item) => {
    const title = prompt(`Enter new title`, `Lorem ipsum`);

    try {
      await service.put(item.id, { title });
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (item) => {
    try {
      await service.delete(item.id);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async (data) => {
    try {
      await service.post(data);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, changeTitle, deleteItem, addItem };
}
