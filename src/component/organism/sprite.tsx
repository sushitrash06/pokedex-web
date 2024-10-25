import * as React from "react";
import { UrlImage } from "../../utils/type";
import Galery from "../molecules/galery";

const Sprite: React.FunctionComponent<UrlImage> = ({ imageUrl, color = "#FFF" }) => {
  return (
    <div className="m-4 text-black">
      <h2 className="font-semibold text-lg mb-2">Sprites Gallery</h2>
      <div className="flex flex-wrap justify-between">
        {imageUrl && imageUrl.map((data: string) => (
          <Galery key={data} color={color} url={data} />
        ))}
      </div>
    </div>
  );
};

export default Sprite;
