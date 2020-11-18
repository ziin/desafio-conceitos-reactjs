import React from "react";
import useRepositories from "./useRepositories";
import "./styles.css";

function App() {
  const {
    repositories,
    loading,
    deleteRepository,
    addRepository,
  } = useRepositories();

  return (
    <div>
      <ul data-testid="repository-list">
        {loading && <Loading />}

        {repositories.map((repo) => (
          <ListItem
            key={repo.id}
            {...repo}
            deleteRepository={deleteRepository}
          />
        ))}
      </ul>

      <button onClick={addRepository}>Adicionar</button>
    </div>
  );
}

const Loading = () => <li key="loading">Carregando repositórios...</li>;

const ListItem = ({ id, title, deleteRepository }) => (
  <li>
    {title}
    <button onClick={() => deleteRepository(id)}>Remover</button>
  </li>
);

export default App;
