"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState(0);
  const [purchasedPokemons, setPurchasedPokemons] = useState([]);

  useEffect(() => {
    const initialBudget = Math.floor(Math.random() * (900 - 700 + 1)) + 700;
    setBudget(initialBudget);

    const storedPokemons =
      JSON.parse(localStorage.getItem("purchasedPokemons")) || [];
    setPurchasedPokemons(storedPokemons);
  }, []);

  const handlePurchaseMXN = (pokemon) => {
    const priceInMXN = parseFloat(pokemon.firstPrice.price);
    const pokemonToSave = { ...pokemon, priceInMXN };
    setBudget((prevBudget) => prevBudget - priceInMXN);
    setPurchasedPokemons((prevPokemons) => {
      const newPokemons = [...prevPokemons, pokemonToSave];
      localStorage.setItem("purchasedPokemons", JSON.stringify(newPokemons));
      return newPokemons;
    });
  };

  const handlePurchaseForEx = (pokemon, convertedPrice) => {
    try {
      const priceInMXN = parseFloat(convertedPrice);
      if (priceInMXN <= budget) {
        setBudget((prevBudget) => prevBudget - priceInMXN);
        const pokemonToSave = { ...pokemon, priceInMXN };
        setPurchasedPokemons((prevPokemons) => {
          const newPokemons = [...prevPokemons, pokemonToSave];
          localStorage.setItem(
            "purchasedPokemons",
            JSON.stringify(newPokemons)
          );
          return newPokemons;
        });
      } else {
        alert("Dinero insuficiente");
      }
    } catch (error) {
      console.error("Error converting currency:", error);
      alert("Error al convertir la moneda");
    }
  };

  const addRandomBudget = () => {
    const randomAmount = Math.floor(Math.random() * (900 - 700 + 1)) + 700;
    setBudget((prevBudget) => prevBudget + randomAmount);
  };

  return (
    <BudgetContext.Provider
      value={{
        budget,
        purchasedPokemons,
        handlePurchaseMXN,
        handlePurchaseForEx,
        addRandomBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
