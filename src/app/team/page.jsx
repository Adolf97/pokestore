import React from 'react'
import { useBudget } from "../app/context/BudgetContext";

const TeamPage = () => {
  const { purchasedPokemons } = useBudget()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-3 md:px-10 py-20 bg-[#0d0e12]">
      <h1 className='text-[#fbfbfb] text-xl'>Mi Equipo</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        {purchasedPokemons.map(pokemon => (
          <div key={pokemon.id} className="bg-gray-800 rounded-lg p-4">
            <img src={pokemon.image} alt={pokemon.name} className="w-full h-auto" />
            <h2 className="text-white text-lg mt-2">{pokemon.name}</h2>
            <p className="text-gray-400">Tipo: {pokemon.types.join(', ')}</p>
            <p className="text-gray-400">Habilidades: {pokemon.abilities.join(', ')}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

export default TeamPage