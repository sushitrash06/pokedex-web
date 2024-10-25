import * as React from "react";
import { PokemonHeadDetail, Types } from "../../utils/type";
import { TYPE_COLORS } from "../../utils/constans";


const PokemonDetail: React.FunctionComponent<PokemonHeadDetail> = ({
  name,
  url,
  color,
  types,
}) => {

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full h-[350px] flex items-center justify-center" style={{ backgroundColor: color }}>
        <div className="absolute inset-0 bg-white opacity-40" />
        <img
          className="w-[300px] h-[300px] object-cover mt-5 z-10"
          src={url || "../../../../assets/pokeBall.png"}
          alt={name}
        />
      </div>
      <div className="bg-white p-5 pt-12 w-full rounded-t-[50px] -mt-[50px]">
        <div className="flex flex-wrap mt-2">
          {types &&
            types.map((data: Types) => (
              <div
                key={data.type.name}
                className="m-1 p-2 rounded-lg text-center"
                style={{ backgroundColor: TYPE_COLORS[data.type.name] }}
              >
                <span className="font-semibold text-white">{data.type.name}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
