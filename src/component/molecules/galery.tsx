import React from "react";

interface PokedexItemProps {
  url: string;
  color: string;
}

const Galery: React.FunctionComponent<PokedexItemProps> = ({ url, color }) => {
  return (
    <div className="relative">
      <div
        className="w-36 h-36 rounded-lg m-2 flex justify-center items-center relative"
        style={{ backgroundColor: color }}
      >
        <div className="absolute inset-0 bg-white opacity-30 z-10" />
        <img
          className="w-52 h-32 object-contain z-20"
          src={url ? url : "/path/to/pokeBall.png"}
          alt="Pokemon"
        />
      </div>
    </div>
  );
};

export default Galery;
