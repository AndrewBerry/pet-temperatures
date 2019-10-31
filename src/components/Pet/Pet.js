import React, { useEffect, useState } from "react";
import ta from "s-ago";

import "./Pet.css";
import { Chart } from "../Chart/Chart";

export function Pet({ name, image, temps, dataPointOverrideIndex, setDataPointOverrideIndex }) {
  const dataPointIndex = dataPointOverrideIndex > -1 ? dataPointOverrideIndex : temps.length - 1;
  const { w, l, h, hu } = temps[dataPointIndex];

  const [timeAgo, setTimeAgo] = useState();
  useEffect(() => {
    function recalculateTimeAgo() {
      setTimeAgo(ta(new Date(w)));
    }

    const intervalId = setInterval(recalculateTimeAgo, 15000);
    recalculateTimeAgo();

    return () => {
      clearInterval(intervalId);
    };
  }, [w]);

  const humidity = parseInt(hu);

  return (
    <div className="Pet">
      <div className="Pet__chart">
        <Chart temps={temps} setDataPointOverrideIndex={setDataPointOverrideIndex} />
      </div>

      <div className="Pet__details">
        <div
          className="Pet__image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="Pet__name">{name}</div>
      </div>
      <div className="Pet__meta">{timeAgo}</div>

      <div className="Pet__value Pet__value--low">
        <div className="Pet__valueTitle">Low</div>
        <div className="Pet__valueValue">
          {l}
          <span className="Pet__valueUnit">&deg;</span>
        </div>
      </div>
      <div className="Pet__value Pet__value--high">
        <div className="Pet__valueTitle">High</div>
        <div className="Pet__valueValue">
          {h}
          <span className="Pet__valueUnit">&deg;</span>
        </div>
      </div>
      <div className="Pet__value Pet__value--humidity">
        <div className="Pet__valueTitle">Humidity</div>
        <div className="Pet__valueValue">
          {humidity}
          <span className="Pet__valueUnit Pet__valueUnit--small">%</span>
        </div>
      </div>
    </div>
  );
}
