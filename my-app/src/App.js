import React, { useState } from 'react';
import './App.css';



function App() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);

      if (!response.ok) {
        throw new Error('Could not fetch resource');
      }

      const data = await response.json();
      const pokemonSprite = data.sprites.front_default;
      setPokemonSprite(pokemonSprite);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Could not fetch resource');
      setPokemonSprite('');
    }
  };  

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="pokemonName"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokémon name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p className="error">{error}</p>}
      {pokemonSprite && (
        <div>
          <img id="pokemonSprite" src={pokemonSprite} alt={pokemonName} />
        </div>
      )}
    </div>
  );
}

export default App;