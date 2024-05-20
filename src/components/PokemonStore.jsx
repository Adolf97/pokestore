"use client";

import React, { useState, useEffect } from "react";
import { typeBgClasses, typeTextClasses } from "../lib/PokemonsThemes";
import { useBudget } from "../app/context/BudgetContext";

const PokemonStore = () => {
  const { budget, handlePurchaseMXN, handlePurchaseForEx, purchasedPokemons } = useBudget();

  const [allPokemons, setAllPokemons] = useState([]);
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  const [loadedPokemonsCount, setLoadedPokemonsCount] = useState(0);
  const [searchPokemon, setSearchPokemon] = useState("");

  const currencies = ["USD", "EUR", "JPY", "INR"];

  const getRandomPrice = () => {
    return (Math.random() * 200 + 100).toFixed(2);
  };

  const getRandomCurrency = () => {
    return currencies[Math.floor(Math.random() * currencies.length)];
  };

  const fetchPokemons = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1000`
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

      setAllPokemons(pokemonDetails);
      setDisplayedPokemons(pokemonDetails.slice(0, 10));
      setLoadedPokemonsCount(10);
    } catch (error) {
      console.error("Error fetching pokemons:", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  const loadMorePokemons = () => {
    const nextPokemons = allPokemons.slice(
      loadedPokemonsCount,
      loadedPokemonsCount + 10
    );
    setDisplayedPokemons((prevPokemons) => [...prevPokemons, ...nextPokemons]);
    setLoadedPokemonsCount((prevCount) => prevCount + 10);
  };

  const handleSearch = (event) => {
    setSearchPokemon(event.target.value);
  };

  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
  );

  const handleBuyInMXN = (pokemon) => {
    const priceMXN = pokemon.firstPrice.price;
    if (priceMXN > budget) {
      alert("Dinero insuficiente");
    } else if (pokemonAlreadyPurchased(pokemon)) {
      alert("Ya compraste este pokemon");
    } else {
      handlePurchaseMXN(pokemon);
      savePokemonToLocalStorage(pokemon);
    }
  };

  const handleBuyInForEx = async (pokemon, currency) => {
    try {
      const convertedPrice = await convertCurrencyToMXN(
        pokemon.secondPrice.price,
        currency
      );
      if (convertedPrice > budget) {
        alert("Dinero insuficiente");
      } else if (pokemonAlreadyPurchased(pokemon)) {
        alert("Ya compraste este pokemon");
      } else {
        handlePurchaseForEx(pokemon, convertedPrice);
        savePokemonToLocalStorage(pokemon, currency);
      }
    } catch (error) {
      console.error("Error converting currency:", error);
      alert("Error al convertir la moneda");
    }
  };

  const convertCurrencyToMXN = async (price, currency) => {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${currency}`
    );
    const data = await response.json();
    const convertedPrice = price * data.rates.MXN;
    return convertedPrice;
  };

  const savePokemonToLocalStorage = (pokemon) => {
    const savedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
    savedPokemons.push(pokemon);
    localStorage.setItem("pokemons", JSON.stringify(savedPokemons));
  };

  const pokemonAlreadyPurchased = (pokemon) => {
    const savedPokemons = JSON.parse(localStorage.getItem("pokemons")) || [];
    return savedPokemons.some((p) => p.id === pokemon.id);
  };

  return (
    <section>
      <div className="w-full md:w-[90vw] flex justify-between items-center mb-5">
        <input
          className="bg-[#0d0e12] w-auto rounded-lg border-[2px] border-[#181b21] hover:cursor-pointer text-[#fbfbfb] py-2 px-3 placeholder:text-[#fbfbfb]"
          type="search"
          placeholder="Enter a Pokemon name"
          value={searchPokemon}
          onChange={handleSearch}
        />
      </div>
      <div className="w-full md:w-[90vw] grid grid-cols-1 md:grid-cols-4 justify-between items-center gap-5 mb-8">
        {filteredPokemons.slice(0, loadedPokemonsCount).map((pokemon) => (
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
            <div className="absolute w-full h-[120px] bottom-0 right-0 py-2 px-4 flex flex-col bg-[#0d0e12] text-[#fbfbfb] group-hover:h-[210px] transition-all">
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
                  <span className="text-xl font-bold tracking-wider mr-1">
                    {pokemon.firstPrice.price}
                  </span>
                  <span className="text-base font-medium">
                    {pokemon.firstPrice.currency}
                  </span>
                </div>
                <div className="text-gray-400">
                  <span className="text-xs font-medium mr-1">
                    {pokemon.secondPrice.price}
                  </span>
                  <span className="text-xs font-medium">
                    {pokemon.secondPrice.currency}
                  </span>
                </div>
              </div>
              <div className="w-full">
                {pokemonAlreadyPurchased(pokemon) ? (
                  <>
                  <button disabled className="w-full text-white font-semibold py-2 rounded-lg text-sm tracking-wider bg-blue-500">Pokemon adquirido</button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleBuyInMXN(pokemon, "MXN")}
                      disabled={budget < pokemon.firstPrice.price}
                      className={`w-full text-white font-semibold py-2 rounded-lg text-sm tracking-wider mb-2 ${
                        pokemon.firstPrice.price > budget
                          ? "bg-[#999999]"
                          : "bg-gradient-to-r from-[#739443] to-[#6fb312]"
                      }`}
                    >
                      {pokemon.firstPrice.price > budget
                        ? "Dinero insuficiente"
                        : "Comprar en MXN"}
                    </button>
                    <button
                      onClick={() =>
                        handleBuyInForEx(pokemon, pokemon.secondPrice.currency)
                      }
                      disabled={budget < pokemon.secondPrice.price}
                      className={`w-full text-white font-semibold py-2 rounded-lg text-sm tracking-wider ${
                        pokemon.secondPrice.price > budget
                          ? "bg-[#999999]"
                          : "bg-gradient-to-r from-[#739443] to-[#6fb312]"
                      }`}
                    >
                      {pokemon.secondPrice.price > budget
                        ? "Dinero insuficiente"
                        : `Comprar en ${pokemon.secondPrice.currency}`}
                    </button>
                  </>
                )}
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
    </section>
  );
};

export default PokemonStore;
