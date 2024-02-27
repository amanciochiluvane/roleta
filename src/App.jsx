import { useState } from 'react';
import './App.css';

function App() {
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const addName = (name) => {
    setNames([...names, name]);
  };

  const removeName = (nameToRemove) => {
    setNames(names.filter(name => name !== nameToRemove));
  };

  const spinWheel = () => {
    if (names.length === 0) {
      alert("Por favor, introduza pelo menos um nome.");
      return;
    }
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * names.length);
    const winner = names[randomIndex];
    setTimeout(() => {
      setSelectedName(winner);
      setNames(names.filter(name => name !== winner));
      setIsSpinning(false);
    }, 3000); // Tempo de "girar" a roleta (3 segundos)
  };

  return (
    <div className="App">
      <h1>Sorteio Campeonato OAC</h1>
      <div className="input-container">
        <input type="text" placeholder="Digite um nome" onKeyDown={(e) => {
          if (e.key === 'Enter') {
            addName(e.target.value);
            e.target.value = '';
          }
        }} />
        <button onClick={() => addName(document.querySelector('input').value)}>Adicionar</button>
      </div>
      <div className="names-list">
        <h2>Equipas:</h2>
        <ul>
          {names.map((name, index) => (
            <li key={index}>
              {name}
              <button onClick={() => removeName(name)}>Apagar</button>
            </li>
          ))}
        </ul>
      </div>
      <button className="spin-button" onClick={spinWheel} disabled={isSpinning}>
        {isSpinning ? "Rodando..." : "Sortear"}
      </button>
      {selectedName && (
        <div className="winner">
          <h2>Sorteado:</h2>
          <p>{selectedName}</p>
        </div>
      )}
    </div>
  );
}

export default App;
