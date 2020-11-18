import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export const getAllRepositories = async () => {
  const { data } = await api.get("/repositories");
  return data;
};

export const addRepository = async (repository) => {
  const { data } = await api.post("/repositories", repository);
  return data;
};

export const deleteRepository = async (id) =>
  await api.delete(`/repositories/${id}`);

export default api;
