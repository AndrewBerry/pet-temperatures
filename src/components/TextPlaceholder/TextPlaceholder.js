import React from "react";
import "./TextPlaceholder.css";

export function TextPlaceholder({ width }) {
  return (
    <span
      className="TextPlaceholder"
      style={{width: `${width}em`}}
    >
      &nbsp;
    </span>
  )
}
