"use client";
import React, { useState, useEffect } from "react";

const PokemonStore = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loadedPokemonsCount, setLoadedPokemonsCount] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const fetchPokemons = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${loadedPokemonsCount}`
      );
      const data = await response.json();
      const monedas = ['MXN','USD','EUR','GBP','JPY'];
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          const arregloMonedasAleatorias = Array.from({ length: 2 }, () => Math.floor(Math.random() * monedas.length));
          const monedasAleatorias = arregloMonedasAleatorias.map((index) => monedas[index]);
          return {
            id: data.id,
            name: data.name,
            image: data.sprites.front_default,
            types: data.types.map((type) => type.type.name),
            abilities: data.abilities.map((ability) => ability.ability.name),
            stats: data.stats.map((stat) => ({
              name: stat.stat.name,
              base_stat: stat.base_stat,
            })),
            monedas: monedasAleatorias
          };
        })
      );
      setPokemons((prevPokemons) => [...prevPokemons, ...pokemonDetails]);
      setLoadedPokemonsCount((prevCount) => prevCount + 10);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const loadMorePokemons = () => {
    fetchPokemons();
  };

  const openModal = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  return (
    <div>
      <div className="w-full md:w-[90vw] flex flex-col md:flex-row flex-wrap justify-between items-center gap-5 mb-8">
        {selectedPokemon && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black/50 z-10 flex justify-center items-center"
            onClick={() => setSelectedPokemon(null)}
          >
            <div
              className={`w-2/3 rounded-md flex px-10 py-10 text-white
            ${selectedPokemon.types[0] === "grass" && "bg-green-400"}
            ${selectedPokemon.types[0] === "fire" && "bg-red-400"}
            ${selectedPokemon.types[0] === "water" && "bg-blue-400"}
            ${selectedPokemon.types[0] === "bug" && "bg-yellow-400"}
            ${selectedPokemon.types[0] === "normal" && "bg-gray-400"}
            ${selectedPokemon.types[0] === "poison" && "bg-purple-400"}
            ${selectedPokemon.types[0] === "electric" && "bg-yellow-400"}
            ${selectedPokemon.types[0] === "ground" && "bg-yellow-400"}
            ${selectedPokemon.types[0] === "fairy" && "bg-pink-400"}
            ${selectedPokemon.types[0] === "fighting" && "bg-red-400"}
            ${selectedPokemon.types[0] === "psychic" && "bg-pink-400"}
            ${selectedPokemon.types[0] === "rock" && "bg-yellow-400"}
            ${selectedPokemon.types[0] === "ghost" && "bg-purple-400"}
            ${selectedPokemon.types[0] === "ice" && "bg-blue-400"}
            ${selectedPokemon.types[0] === "dragon" && "bg-purple-400"}
            `}
            >
              <div className="w-1/3 flex flex-col justify-center items-center">
                <img
                  className="w-40 h-40"
                  src={selectedPokemon.image}
                  alt={selectedPokemon.name}
                />
                <span className="text-2xl font-semibold">
                  {selectedPokemon.name}
                </span>
              </div>
              <div className="flex flex-col w-2/3">
                <div className="w-full flex gap-5">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Type(s)</h3>
                    {selectedPokemon.types.map((type, index) => (
                      <p
                        key={index}
                        className={`text-sm font-semibold bg-gray-200 rounded-full px-3 py-1 mb-3 outline-4 ${
                          type === "grass" && "text-green-400"
                        } ${type === "fire" && "text-red-400"}
                            ${type === "water" && "text-blue-400"}
                            ${type === "bug" && "text-yellow-400"}
                            ${type === "normal" && "text-gray-400"}
                            ${type === "poison" && "text-purple-400"}
                            ${type === "electric" && "text-yellow-400"}
                            ${type === "ground" && "text-yellow-400"}
                            ${type === "fairy" && "text-pink-400"}
                            ${type === "fighting" && "text-red-400"}
                            ${type === "psychic" && "text-pink-400"}
                            ${type === "rock" && "text-gray-400"}
                            ${type === "ghost" && "text-purple-400"}
                            ${type === "ice" && "text-blue-400"}
                            ${type === "dragon" && "text-purple-400"}
                            `}
                      >
                        {type}
                      </p>
                    ))}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Abilities</h3>
                    {selectedPokemon.abilities.map((ability, index) => (
                      <p
                        key={index}
                        className="text-sm text-gray-700 font-semibold bg-gray-200 rounded-full px-3 py-1 mb-3"
                      >
                        {ability}
                      </p>
                    ))}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold mb-3">Stats</h3>
                    <div className="flex flex-wrap gap-3 justify-between">
                      {selectedPokemon.stats.map((stat, index) => (
                        <p
                          key={index}
                          className="text-sm text-gray-700 font-semibold bg-gray-200 rounded-full px-3 py-1 mb-3"
                        >
                          {stat.name}: {stat.base_stat}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-full flex">
                  <span>{selectedPokemon.monedas}</span>
                  <button
                    className="bg-gray-200 rounded-full px-3 py-1 mb-3"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            onClick={() => openModal(pokemon)}
            className="relative flex flex-col justify-center items-center bg-white min-w-[200px] max-w-[200px] py-5 rounded-md border border-gray-200 shadow-md hover:cursor-pointer"
          >
            <div>
              <img
                className="w-32 h-32"
                src={pokemon.image}
                alt={pokemon.name}
              />
            </div>
            <p className="font-semibold uppercase mb-3">{pokemon.name}</p>
            <div className="flex gap-2">
              {pokemon.types.map((type, index) => (
                <p
                  key={index}
                  className="text-xs font-semibold bg-gray-200 rounded-full px-2 py-1 text-gray-800"
                >
                  {type}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full md:w-[80vw] flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
          onClick={loadMorePokemons}
        >
          Cargar más
        </button>
      </div>
    </div>
  );
};

export default PokemonStore;
