import React from "react";
import "./StatsBar.css";

export function StatsBar({ booksRead, quotes, readingNow }) {
  return (
    <div className="statsbar">
      <div className="statsbar__item">
        <span className="statsbar__number">{booksRead}</span>
        <span className="statsbar__label">BOOKS READ</span>
      </div>
      <div className="statsbar__item">
        <span className="statsbar__number">{quotes}</span>
        <span className="statsbar__label">QUOTES</span>
      </div>
      <div className="statsbar__item">
        <span className="statsbar__number">{readingNow}</span>
        <span className="statsbar__label">READING NOW</span>
      </div>
    </div>
  );
}
