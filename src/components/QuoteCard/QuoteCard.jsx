import React from "react";
import "./QuoteCard.css";

export function QuoteCard({ quote }) {
  return (
    <div className="quotecard">
      {(quote.chapter || quote.section) && (
        <div className="quotecard__location">
          {quote.chapter && <span className="quotecard__chapter">{quote.chapter}</span>}
          {quote.chapter && quote.section && <span className="quotecard__location-sep"> · </span>}
          {quote.section && <span className="quotecard__section">{quote.section}</span>}
        </div>
      )}
      <p className="quotecard__text">"{quote.text}"</p>
      <div className="quotecard__meta">
        {quote.page && <span className="quotecard__page">p. {quote.page}</span>}
        <span className="quotecard__date">{quote.date}</span>
      </div>
    </div>
  );
}
