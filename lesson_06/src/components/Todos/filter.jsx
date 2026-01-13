import React from "react";
import {useSearchParams} from 'react-router'

import { TODOS_FILTER } from "../../constants/todos";

export default function TodosFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get(`filter`);

  const handleSelect = (e) => setSearchParams({filter: e.target.value})

  return (
    <label>
      {" "}
      Select todos filter:{" "}
      <select onChange={handleSelect} defaultValue={filter}>
        {TODOS_FILTER.map((item) => (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
    </label>
  );
}
