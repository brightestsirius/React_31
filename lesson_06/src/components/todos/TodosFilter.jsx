import React from "react";
import {useSearchParams} from 'react-router'

import {
  TODOS_FILTER_ALL,
  TODOS_FILTER_COMPLETED,
  TODOS_FILTER_UNCOMPLETED,
} from "../../constants/toods.constants";

export default function TodosFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get(`filter`);

  const handleChange = (e) => {
    setSearchParams({filter: e.target.value})
  }

  return (
    <label>
      Select todos filter:{" "}
      <select onChange={handleChange} defaultValue={filter}>
        <option value={TODOS_FILTER_ALL}>All</option>
        <option value={TODOS_FILTER_COMPLETED}>Completed</option>
        <option value={TODOS_FILTER_UNCOMPLETED}>Uncompleted</option>
      </select>
    </label>
  );
}
