import React from 'react';
import './App.css';
import CharactersList from './components/CharactersList';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Star wars</h1>
        <h4>Liste des personnages</h4>
        <CharactersList/>
      </header>
      
    </div>
  );
}

export default App;
