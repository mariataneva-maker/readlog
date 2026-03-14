import React from "react";
import "./QuoteCard.css";

export function QuoteCard({ quote }) {
  return (
    <div className="quotecard">
      <p className="quotecard__text">"{quote.text}"</p>
      <div className="quotecard__meta">
        <span className="quotecard__page">p. {quote.page}</span>
        <span className="quotecard__date">{quote.date}</span>
      </div>
    </div>
  );
}
