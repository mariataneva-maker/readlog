import React from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { statusLabel } from "../../data/books";
import "./BookCard.css";

export function BookCard({ book, onClick }) {
  return (
    <div className={`bookcard bookcard--${book.status}`} onClick={() => onClick(book.id)}>
      <div className="bookcard__cover" style={{ background: book.cover }}>
        <span className="bookcard__cover-title">{book.title}</span>
        <span className="bookcard__cover-author">{book.author}</span>
      </div>
      <div className="bookcard__body">
        <span className={`bookcard__badge bookcard__badge--${book.status}`}>
          {statusLabel[book.status]}
        </span>
        <h2 className="bookcard__title">{book.title}</h2>
        <p className="bookcard__author">{book.author}</p>
        {book.status === "reading" && (
          <div className="bookcard__progress">
            <ProgressBar progress={book.progress} />
            <span className="bookcard__progress-pct">{book.progress}%</span>
          </div>
        )}
        <div className="bookcard__meta">
          <span>{book.quotes} quotes</span>
          <span>{book.notes} notes</span>
        </div>
      </div>
    </div>
  );
}
