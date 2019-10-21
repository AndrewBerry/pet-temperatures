import React from "react";
import "./Chart.css";

export function Chart({ temps }) {
  const minTemp =
    Math.floor(
      temps.reduce((m, t) => {
        if (m === null) {
          return Math.min(t.h, t.l);
        }

        return Math.min(t.h, t.l, m);
      }, null) / 5
    ) * 5;

  const maxTemp =
    Math.ceil(
      temps.reduce((m, t) => {
        if (m === null) {
          return Math.max(t.h, t.l);
        }

        return Math.max(t.h, t.l, m);
      }, null) / 5
    ) * 5;

  const range = maxTemp - minTemp;
  const width = 125 / (temps.length - 1);

  const hPoints = temps.map(({ h }, tempi) => {
    return [width * tempi, (1 - (h - minTemp) / range) * 50];
  });

  const lPoints = temps.map(({ l }, tempi) => {
    return [width * tempi, (1 - (l - minTemp) / range) * 50];
  });

  const tempPoints = [...hPoints, ...lPoints.reverse()];
  const tempPath = `M0 0 ${tempPoints.map(([x, y]) => `L${x} ${y} `)}`;

  const huPoints = temps.map(({ hu }, tempi) => {
    return [width * tempi, 50 - (parseFloat(hu) / 100) * 50];
  });
  const huPath = huPoints.map(
    ([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y} `
  );

  return (
    <div className="Chart">
      <div className="Chart__tick">{maxTemp}&deg;</div>
      <div className="Chart__tick Chart__tick--min">{minTemp}&deg;</div>

      <svg
        className="Chart__img"
        viewBox="0 0 125 50"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <linearGradient id="Gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="red" />
            <stop offset="100%" stopColor="blue" />
          </linearGradient>
        </defs>

        <path d={tempPath} stroke="none" fill="url(#Gradient)" />
        <path
          d={huPath}
          strokeWidth="0.5"
          stroke="white"
          strokeDasharray="2 1"
          fill="none"
        />
      </svg>
    </div>
  );
}
