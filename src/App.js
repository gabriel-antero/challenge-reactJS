import React, { useState, useEffect } from "react";
import axios from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    axios.get('/repositories').then(repository => setRepositories(repository.data));

  }, [])

  async function handleAddRepository() {

   const repository = await axios.post('/repositories', {
      title: `Novo item ${Date.now()}`,
      url: 'https://github.com/gabriel-antero',
      techs: 'ReactJS, React Native e NodeJS',
    })
    
    setRepositories([...repositories, repository.data])
  }

  async function handleRemoveRepository(id) {

    await axios.delete(`/repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
             </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
