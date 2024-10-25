import React from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { useQuery } from "react-query";
import { getIdPokemon, getPokemonUrlImage } from "../utils/utils";
import { fetchPokemonDetail, fetchPokemonSpecies } from "../server/api";
import PokemonDetail from "../component/organism/pokemon";
import Sprite from "../component/organism/sprite";
import AbilitiesPokemon from "../component/organism/abilities";

const DetailPage: React.FunctionComponent = () => {
  const { id } = useParams();

  const { data } = useQuery(["PokemonDetail", id], async () => {
    return await fetchPokemonDetail(parseInt(id ?? '')); // Use the id directly
  });

  const { data: dataPokemonSpecies } = useQuery(["PokemonSpecies", id], async () => {
    return await fetchPokemonSpecies(parseInt(id ?? '')); // Use the id directly
  });

  const isString = (value: any) => typeof value === "string";

  const getStringValues = (obj: any) => {
    let stringValues: string[] = [];
    for (let key in obj) {
      const value = obj[key];
      if (isString(value)) {
        stringValues.push(value);
      }
    }
    return stringValues;
  };

  const stringValuesArray = getStringValues(data?.sprites || {});
console.log(id, 'ini id')
  return (
    <div className="bg-white">
      <div className="relative">
        <PokemonDetail
          color={dataPokemonSpecies?.color?.name}
          name={data?.name}
          url={getPokemonUrlImage(id)}
          types={data?.types}
        />
        <Sprite color={dataPokemonSpecies?.color?.name} imageUrl={stringValuesArray} />
        <AbilitiesPokemon stats={data?.stats} abilities={data?.abilities} />
      </div>
    </div>
  );
};

export default DetailPage;
