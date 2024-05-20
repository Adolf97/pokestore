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
    const price = parseFloat(pokemon.firstPrice.price);
    setBudget((prevBudget) => prevBudget - price);
    setPurchasedPokemons((prevPokemons) => {
      const newPokemons = [...prevPokemons, pokemon];
      localStorage.setItem("purchasedPokemons", JSON.stringify(newPokemons));
      return newPokemons;
    });
  };

  const handlePurchaseForEx = (pokemon, convertedPrice) => {
    if (convertedPrice <= budget) {
      setBudget((prevBudget) => prevBudget - convertedPrice);
      setPurchasedPokemons((prevPokemons) => {
        const newPokemons = [...prevPokemons, pokemon];
        localStorage.setItem("purchasedPokemons", JSON.stringify(newPokemons));
        return newPokemons;
      });
    } else {
      alert("Dinero insuficiente");
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
