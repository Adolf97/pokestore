"use client";

import React, { useState, useEffect } from "react";
import { typeBgClasses, typeTextClasses } from "@/lib/PokemonsThemes";

const PokemonStore = () => {
  const [pokemons, setPokemons] = useState([]);
  const [loadedPokemonsCount, setLoadedPokemonsCount] = useState(0);

  const currencies = ["USD", "EUR", "JYP", "INR"];

  const getRandomPrice = () => {
    return (Math.random() * 300).toFixed(2);
  };

  const getRandomCurrency = () => {
    return currencies[Math.floor(Math.random() * currencies.length)];
  };

  const fetchPokemons = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${loadedPokemonsCount}`
      );
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
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
            firstPrice: {
              price: getRandomPrice(),
              currency: "MXN",
            },
            secondPrice: {
              price: getRandomPrice(),
              currency: getRandomCurrency(),
            },
          };
        })
      );
      setPokemons((prevPokemons) => [...prevPokemons, ...pokemonDetails]);
      setLoadedPokemonsCount((prevCount) => prevCount + 10);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const loadMorePokemons = () => {
    fetchPokemons();
  };

  return (
    <div>
      <div className="w-full md:w-[90vw] grid grid-cols-4 justify-between items-center gap-5 mb-8">
        {pokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="group relative flex flex-col justify-center items-center w-full h-auto rounded-lg border-[2px] border-[#181b21] overflow-hidden hover:cursor-pointer"
          >
            <div
              className={`w-full h-full flex justify-center pt-5 pb-52 
              ${typeBgClasses[pokemon.types[0]]}
              `}
            >
              <img
                className="w-36 h-36"
                src={pokemon.image}
                alt={pokemon.name}
              />
            </div>
            <div className="absolute w-full h-[120px] bottom-0 right-0 py-3 px-4 flex flex-col bg-[#0d0e12] text-[#fbfbfb] group-hover:h-[180px] transition-all">
              <h3 className="capitalize text-sm mb-2">{pokemon.name}</h3>
              <div className="flex gap-2 mb-2">
                {pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 bg-[#282c34] rounded-full mt-1 ml-1 text-xs font-medium
                      ${typeTextClasses[type]}
                      `}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <div className="w-full flex justify-between items-end mb-5">
                <div>
                  <span className="text-xl font-bold tracking-wider mr-1">{pokemon.firstPrice.price}</span>
                  <span className="text-base font-medium">{pokemon.firstPrice.currency}</span>
                </div>
                <div className="text-gray-400">
                  <span className="text-xs font-medium mr-1">{pokemon.secondPrice.price}</span>
                  <span className="text-xs font-medium">{pokemon.secondPrice.currency}</span>
                </div>
              </div>
              <div className="w-full">
                <button className="w-full bg-gradient-to-r from-[#739443] to-[#6fb312] text-white font-semibold py-2 px-4 rounded-lg text-sm tracking-wider">Comprar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full md:w-[90vw] flex justify-center">
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
