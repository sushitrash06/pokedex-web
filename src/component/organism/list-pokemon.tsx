import * as React from "react";
import { Pokemon } from "../../utils/type";
import PokedexItem from "../molecules/poke-item";
import Loading from "../atom/loading";

interface PropsList {
  dataList: Pokemon[];
  isLoading?: boolean;
  type: 'fav' | 'list';
}

const ListPokemon: React.FunctionComponent<PropsList> = ({
  dataList,
  isLoading = false,
  type,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {dataList.map((pokemon: Pokemon, index: number) => (
        <div key={index} className="mb-4">
          <PokedexItem
            name={pokemon.name}
            url={pokemon.url}
            type={type}
          />
        </div>
      ))}
      {isLoading && (
        <div className="w-full flex justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default ListPokemon;
