import PokemonStore from "@/components/PokemonStore";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PokemonStore />
    </main>
  );
}