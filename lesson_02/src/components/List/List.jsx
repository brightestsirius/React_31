import React, { useState, useEffect } from "react";

// 🟢 componentDidMount
// 🟡 componentDidUpdate
// 🔴 componentWillUnmount

export default function List() {
  const [list, setList] = useState([`cat`, `dog`, `lion`]);

  useEffect(() => {
    console.log(`🟢 in componentDidMount for List`);

    setTimeout(() => {
      setList((prevState) => [...prevState, `TIGER`]);
    }, 1000);
  }, []);


  useEffect( ()=>{
    console.log(`🟡 in componentDidUpdate for list`, list)
  }, [list] )

  const removeLastItem = () => {
    setList(prevState => prevState.slice(0,-1))
  }

  return (
    <>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <button onClick={removeLastItem}>Remove last item</button>
    </>
  );
}
