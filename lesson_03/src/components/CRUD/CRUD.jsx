import React, { useState, useEffect } from "react";

//🟢🟡🔴💚💔
const API = `https://jsonplaceholder.typicode.com/users`;

export default function CRUD() {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState(null);

  const fetchList = async () => {
    try {
      const request = await fetch(API),
        response = await request.json();

      setList(response);
    } catch (err) {
      console.log(err);
    }
  };

  const changeEmail = async (item) => {
    const email = prompt(`Enter user email`, `EXAMPLE@gmail.com`);
    try {
      const request = await fetch(`${API}/${item.id}`, {
          method: `PATCH`,
          body: JSON.stringify({ email }),
          headers: {
            "Content-type": "application/json",
          },
        }),
        response = await request.json();

      setList((prevState) =>
        prevState.map((item) => {
          if (item.id === response.id) item = response;
          return item;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (item) => {
    try {
      await fetch(`${API}/${item.id}`, { method: `DELETE` });

      setList((prevState) =>
        prevState.filter((element) => {
          return element.id !== item.id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const setNewItemUsername = (e) => {
    setNewItem((prevState) => ({ ...prevState, username: e.target.value }));
  };

  const setNewItemEmail = (e) => {
    setNewItem((prevState) => ({ ...prevState, email: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (newItem) {
        const request = await fetch(API, {
            method: `POST`,
            body: JSON.stringify(newItem),
            headers: {
              "Content-type": "application/json",
            },
          }),
          response = await request.json();

        setList((prevState) => [...prevState, response]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input type="text" onChange={setNewItemUsername} />
        </label>
        <label>
          Email: <input type="email" onChange={setNewItemEmail} />
        </label>
        <button>Create</button>
      </form>

      {list.length ? (
        <ul>
          {list.map((item) => (
            <li key={item.id}>
              Username: {item.username}
              <br></br>
              Email: {item.email}{" "}
              <button onClick={() => changeEmail(item)}>Change email</button>
              <br></br>
              <button onClick={() => removeItem(item)}>Remove user</button>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
