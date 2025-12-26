import React, { useState, useEffect } from "react";

const API = `https://694eda01b5bc648a93c1705e.mockapi.io/posts`;

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const request = await fetch(API),
        response = await request.json();

      setPosts(response.slice(0, 10));
    } catch (err) {
      console.log(err);
    }
  };

  const changeTitle = async (item) => {
    const title = prompt(`Enter new title`, `Lorem ipsum`);

    try {
      const request = await fetch(`${API}/${item.id}`, {
          method: `PUT`,
          body: JSON.stringify({ title }),
          headers: {
            "Content-type": "application/json",
          },
        }),
        response = await request.json();

      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteItem = async (item) => {
    try{
        await fetch(`${API}/${item.id}`, {method: `DELETE`});
        fetchPosts();
    } catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return posts.length ? (
    <ul>
      {posts.map((item) => (
        <li key={item.id}>
          {item.title}{" "}
          <button onClick={() => changeTitle(item)}>Change title</button>{" "}
          <button onClick={() => deleteItem(item)}>Delete</button>
        </li>
      ))}
    </ul>
  ) : null;
}
