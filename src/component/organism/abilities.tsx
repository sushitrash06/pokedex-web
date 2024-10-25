import * as React from "react";
import { Abilities, AbilitiesPage, Stats } from "../../utils/type";
import { BASE_STATE_COLORS } from "../../utils/constans";

const AbilitiesPokemon: React.FunctionComponent<AbilitiesPage> = ({
  abilities,
  stats,
}) => {
  return (
    <div className="m-5">
      <h2 className="font-semibold text-lg">Abilities</h2>
      <div className="flex flex-wrap gap-2 my-4">
        {abilities?.map((data: Abilities) => (
          <div
            key={data?.ability?.name}
            className="bg-gray-300 py-1 px-2 rounded-lg text-center"
          >
            <p className="font-semibold text-sm">{data?.ability?.name}</p>
          </div>
        ))}
      </div>
      <div className="my-4">
        {stats?.map((data: Stats) => {
          const percentage = (data.base_stat / 255) * 100;
          return (
            <div key={data?.stat?.name} className="flex items-center my-2">
              <div className="w-1/3">
                <p className="capitalize text-sm">{data?.stat?.name}</p>
              </div>
              <div className="w-1/12">
                <p className="text-sm">{data.base_stat}</p>
              </div>
              <div className="w-1/2 flex">
                <div
                  className="h-2 rounded-l-full"
                  style={{
                    width: `${Math.round(percentage)}%`,
                    backgroundColor: BASE_STATE_COLORS[data?.stat?.name.replace(/-/g, "")],
                  }}
                ></div>
                <div
                  className="h-2 bg-gray-400 rounded-r-full"
                  style={{ width: `${100 - Math.round(percentage)}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AbilitiesPokemon;
