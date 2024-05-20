import PokemonStore from "@/components/PokemonStore";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-3 md:px-10 py-20 bg-[#0d0e12]">
      <PokemonStore />
    </main>
  );
}
