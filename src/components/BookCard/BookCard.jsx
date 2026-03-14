import React from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { statusLabel, statusColor } from "../../data/books";
import "./BookCard.css";

export function BookCard({ book, onClick }) {
  return (
    <div className="bookcard" onClick={() => onClick(book.id)}>
      <div className="bookcard__cover" style={{ background: book.cover }} />
      <div className="bookcard__info">
        <span
          className="bookcard__status"
          style={{ color: statusColor[book.status] }}
        >
          {statusLabel[book.status].toUpperCase()}
        </span>
        <h2 className="bookcard__title">{book.title}</h2>
        <p className="bookcard__author">{book.author}</p>
        {book.status === "reading" && (
          <div className="bookcard__progress">
            <ProgressBar progress={book.progress} />
          </div>
        )}
        <div className="bookcard__meta">
          <span>{book.quotes} quotes</span>
          <span>{book.notes} notes</span>
        </div>
      </div>
      <span className="bookcard__chevron">›</span>
    </div>
  );
}
