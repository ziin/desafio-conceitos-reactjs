const { useState, useEffect } = require("react");
const {
  getAllRepositories,
  deleteRepository,
  addRepository,
} = require("./services/api");

const defaultState = {
  loading: false,
  data: [],
};

export default function useRepositories() {
  const [{ data, loading }, setState] = useState(defaultState);

  async function loadRepositories() {
    setState(({ data }) => ({ data, loading: true }));
    try {
      const repositories = await getAllRepositories();
      setState({ loading: false, data: repositories });
    } catch (error) {
      setState({ loading: false, data: [] });
    }
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const repository = await addRepository({
        url: "https://github.com/josepholiveira",
        title: "Desafio ReactJS",
        techs: ["React", "Node.js"],
      });
      setState({
        loading,
        data: [...data, repository],
      });
    } catch (error) {}
  }

  async function handleDeleteRepository(id) {
    setState({ loading, data: data.filter((repo) => repo.id !== id) });
    try {
      await deleteRepository(id);
    } catch (error) {
      const repositories = await getAllRepositories();
      setState({ loading: false, data: repositories });
    }
  }

  return {
    repositories: data,
    loading,
    addRepository: handleAddRepository,
    deleteRepository: handleDeleteRepository,
  };
}
