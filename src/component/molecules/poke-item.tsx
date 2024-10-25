import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardBox from "../atom/card";
import { getPokemonUrlImageList } from "../../utils/utils";
import { useQuery } from "react-query";
import { fetchPokemonSpecies } from "../../server/api";
import { TYPE_COLORS } from "../../utils/constans";

interface PokedexItemProps {
  name: string;
  url: string;
  type: "fav" | "list";
}

const PokedexItem: React.FC<PokedexItemProps> = ({ name, type, url }) => {
  const [imagePokemon, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const pokemonUrlImage = getPokemonUrlImageList(url);
    setImage(pokemonUrlImage);
  }, [url]);

  const getIdFromUrl = (url: string) => {
    const idMatch = url.match(/\/(\d+)(\/)?$/);
    return idMatch ? idMatch[1] : null;
  };
  const id = getIdFromUrl(url);
  const navigateToDetailPage = () => {
    if (id) {
      navigate(`/detail/${id}`);
    }
  };

  const { data: dataPokemonSpecies } = useQuery(["PokemonSpecies", id], async () => {
    return await fetchPokemonSpecies(parseInt(id ?? '')); // Use the id directly
  });

  console.log(dataPokemonSpecies)

  return (
    <div onClick={navigateToDetailPage}  className="rounded-xl cursor-pointer relative w-full h-[350px] flex items-center justify-center" style={{ backgroundColor: dataPokemonSpecies?.color?.name }}>
      <div className="absolute rounded-xl inset-0 bg-white opacity-40 hover:opacity-30" />
      <CardBox>
        <img
          className="w-24 h-32 object-contain z-10"
          src={
            imagePokemon ||
            (type === "fav" && url) ||
            "/pokeBall.png"
          }
          alt={name}
        />
          <p className="text-lg font-bold text-center text-neutral-800 mt-2 z-10">
        {name.split("-").join("\n")}
      </p>
      </CardBox>
    </div>

  );
};

export default PokedexItem;
