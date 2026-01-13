import axios from "axios";

const API = `https://jsonplaceholder.typicode.com/todos`;

const service = {
  get: (id) => axios(id ? `${API}/${id}` : API).then(({ data }) => data),
  put: (id, obj) => axios.put(`${API}/${id}`, obj).then(({ data }) => data),
  delete: (id) => axios.delete(`${API}/${id}`).then(({ data }) => data),
  post: (obj) => axios.post(API, obj).then(({ data }) => data),
};

export default service;
