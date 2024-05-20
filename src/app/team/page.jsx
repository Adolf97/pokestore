"use client";

import React, { useState, useEffect } from "react";
import { typeBgClasses, typeTextClasses } from "../../lib/PokemonsThemes";
import { useBudget } from "../context/BudgetContext";

const TeamPage = () => {
  const { purchasedPokemons } = useBudget();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0
    purchasedPokemons.forEach((pokemon) => {
      total += pokemon.priceInMXN
    })
    setTotalPrice(total);
  }, [purchasedPokemons]);

  // const typeBgClasses = {
  //   grass: "bg-gradient-to-t from-grassbg to-[#14171b]",
  //   poison: "bg-gradient-to-t from-poisonbg to-[#14171b]",
  //   water: "bg-gradient-to-t from-waterbg to-[#14171b]",
  //   fire: "bg-gradient-to-t from-firebg to-[#14171b]",
  //   bug: "bg-gradient-to-t from-bugbg to-[#14171b]",
  //   normal: "bg-gradient-to-t from-normalbg to-[#14171b]",
  //   electric: "bg-gradient-to-t from-electricbg to-[#14171b]",
  //   ground: "bg-gradient-to-t from-groundbg to-[#14171b]",
  //   fairy: "bg-gradient-to-t from-fairybg to-[#14171b]",
  //   fighting: "bg-gradient-to-t from-fightingbg to-[#14171b]",
  //   psychic: "bg-gradient-to-t from-psychicbg to-[#14171b]",
  //   rock: "bg-gradient-to-t from-rockbg to-[#14171b]",
  //   ghost: "bg-gradient-to-t from-ghostbg to-[#14171b]",
  //   ice: "bg-gradient-to-t from-icebg to-[#14171b]",
  //   dragon: "bg-gradient-to-t from-dragonbg to-[#14171b]",
  // };

  // const typeTextClasses = {
  //   grass: "text-grasstxt",
  //   poison: "text-poisontxt",
  //   water: "text-watertxt",
  //   fire: "text-firetxt",
  //   bug: "text-bugtxt",
  //   normal: "text-normaltxt",
  //   electric: "text-electrictxt",
  //   ground: "text-groundtxt",
  //   fairy: "text-fairytxt",
  //   fighting: "text-fightingtxt",
  //   psychic: "text-psychictxt",
  //   rock: "text-rocktxt",
  //   ghost: "text-ghosttxt",
  //   ice: "text-icetxt",
  //   dragon: "text-dragontxt",
  // };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-3 md:px-10 py-20 bg-[#0d0e12]">
      <div className="w-full md:w-[90vw] flex justify-between items-center mb-8">
        <h2 className="text-[#fbfbfb] text-xl">Mi Equipo</h2>
        <div className="text-yellow-500 flex justify-center items-center">
          <h2>Valor del Equipo:</h2>
          <h2 className="ml-2">${totalPrice.toFixed(2)} MXN</h2>
        </div>
      </div>
      <div className="w-full md:w-[90vw] grid grid-cols-1 md:grid-cols-4 justify-between items-center gap-5 mb-8">
        {purchasedPokemons.map((pokemon) => (
          <div
            key={pokemon.id}
            className="group relative flex flex-col justify-center items-center w-full h-auto rounded-lg border-[2px] border-[#181b21] overflow-hidden"
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
            <div className="absolute w-full h-[190px] bottom-0 right-0 py-2 px-4 flex flex-col justify-between bg-[#0d0e12] text-[#fbfbfb] transition-all">
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
              <div className="flex flex-wrap gap-2 mb-2">
                {pokemon.abilities.map((ab, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 bg-[#282c34] rounded-full mt-1 ml-1 text-xs font-medium`}
                  >
                    {ab}
                  </span>
                ))}
              </div>
              <h3 className="text-sm text-yellow-500">${pokemon.priceInMXN.toFixed(2)} MXN</h3>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TeamPage;
