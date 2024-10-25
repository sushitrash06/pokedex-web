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
    <div className="flex flex-wrap justify-between p-4">
      {dataList.map((pokemon: Pokemon, index: number) => (
        <div key={index} className="mb-4 w-1/3"> {/* Adjust width as needed */}
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