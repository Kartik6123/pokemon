import React, { useEffect, useState } from "react";
import "./index.css";
import Pokemon1 from "./components/Pokemon1";
function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=20"
  );

  const getPokemon = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();
    setLoadMore(data.next);
    function createPokemon(result) {
      result.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((l) => [...l, data]);
      });
    }
    createPokemon(data.results);
    console.log(data.results)
    
  };
  useEffect(() => {
    getPokemon();
  }, []);
  return (
    <div className="bg-gray-200 ">
      <div className=" text-5xl text-center mb-4 mt-4 font-mono underline">
        <h1>Pokemon Evolution Guide</h1>{" "}
      </div>
      <div className="flex flex-wrap justify-evenly">
        {allPokemons
          .sort((a, b) => a.id - b.id) 
          .map((pokemon) => (
            <Pokemon1
              key={pokemon.id} 
              id={pokemon.id}
              name={pokemon.name}
              img={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
            />
          ))}
      </div>
      <div className="flex justify-center bg-gray-300">
        <button
          className=" border border-gray-500 text-3xl mb-4 mt-4 font-mono"
          onClick={() => getPokemon()}
        >
          Load more
        </button>{" "}
      </div>
    </div>
  );
}

export default App;
