"use client"
import React, { useState, useEffect } from 'react';

const PokemonStore = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loadedPokemonsCount, setLoadedPokemonsCount] = useState(0);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${loadedPokemonsCount}`);
      const data = await response.json();
      setPokemons(prevPokemons => [...prevPokemons, ...data.results]);
      setLoadedPokemonsCount(prevCount => prevCount + 10);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokemons();
  }, []);

  const loadMorePokemons = () => {
    fetchPokemons();
  }

  return (
    <div>
      <h1>Pokemon Store</h1>
      <div className='w-full'>
        {pokemons.map((pokemon, index) => (
          <div key={index}>
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
      <button onClick={loadMorePokemons}>Cargar más</button>
    </div>
  );
}

export default PokemonStore;

