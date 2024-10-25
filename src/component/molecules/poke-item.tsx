import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { getPokemonUrlImage } from "../../utils/utils";
import CardBox from "../atom/card";

interface PokedexItemProps {
  name: string;
  url: string;
  type: "fav" | "list";
}

const PokedexItem: React.FC<PokedexItemProps> = ({ name, type, url }) => {
  const [imagePokemon, setImage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const pokemonUrlImage = getPokemonUrlImage(url);
    setImage(pokemonUrlImage);
  }, [url]);

  const getIdFromUrl = (url: string) => {
    const idMatch = url.match(/\/(\d+)(\/)?$/); // Extract the ID using regex
    return idMatch ? idMatch[1] : null;
  };

  const navigateToDetailPage = () => {
    const id = getIdFromUrl(url); // Get the ID from the URL
    if (id) {
      navigate(`/detail/${id}`); // Navigate to the detail page with the ID
    }
  };

  return (
    <button onClick={navigateToDetailPage} className="focus:outline-none">
      <CardBox>
        <img
          className="w-24 h-32 object-contain"
          src={imagePokemon || (type === "fav" && url) || "/path/to/pokeBall.png"}
          alt={name}
        />
      </CardBox>
      <p className="text-lg font-bold text-center text-neutral-800 mt-2">{name}</p>
    </button>
  );
};

export default PokedexItem;
