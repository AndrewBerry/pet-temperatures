import React from "react";
import { Chart } from "../Chart/Chart";
import { TextPlaceholder } from "../TextPlaceholder/TextPlaceholder";

export function PetLoading() {
  return (
    <div className="Pet PetLoading">
      <div className="Pet__chart">
        <Chart temps={[]} />
      </div>
      <div className="Pet__details">
        <div className="Pet__image"></div>
        <div className="Pet__name">
          <TextPlaceholder width={2 + Math.floor(Math.random() * 4)} />
        </div>
      </div>
      <div className="Pet__meta">
        <TextPlaceholder width="1" /> <TextPlaceholder width="3" />{" "}
        <TextPlaceholder width="2" />
      </div>

      <div className="Pet__value Pet__value--low">
        <div className="Pet__valueTitle">Low</div>
        <div className="Pet__valueValue">
          <TextPlaceholder width="2.5" />
        </div>
      </div>
      <div className="Pet__value Pet__value--high">
        <div className="Pet__valueTitle">High</div>
        <div className="Pet__valueValue">
          <TextPlaceholder width="2.5" />
        </div>
      </div>
      <div className="Pet__value Pet__value--humidity">
        <div className="Pet__valueTitle">Humidity</div>
        <div className="Pet__valueValue">
          <TextPlaceholder width="2" />
        </div>
      </div>
    </div>
  );
}
