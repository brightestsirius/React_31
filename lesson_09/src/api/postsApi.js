import axios from "axios";

const API = `https://694eda01b5bc648a93c1705e.mockapi.io/posts`;

const service = {
  get: (id) => axios(id ? `${API}/${id}` : API).then(({ data }) => data),
  put: (obj) => axios.put(`${API}/${obj.id}`, obj).then(({ data }) => data),
  delete: (id) => axios.delete(`${API}/${id}`).then(({ data }) => data),
  post: (obj) => axios.post(API, obj).then(({ data }) => data),
};

export default service;
