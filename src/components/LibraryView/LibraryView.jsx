import React from "react";
import { StatsBar } from "../StatsBar/StatsBar";
import { FilterTabs } from "../FilterTabs/FilterTabs";
import { BookCard } from "../BookCard/BookCard";
import { books } from "../../data/books";
import "./LibraryView.css";

export function LibraryView({ filter, onFilterChange, filtered, onBookSelect }) {
  const booksRead   = books.filter((b) => b.status === "finished").length;
  const readingNow  = books.filter((b) => b.status === "reading").length;
  const totalQuotes = books.reduce((sum, b) => sum + b.quotes, 0);

  return (
    <div className="library">
      <header className="library__header">
        <p className="library__eyebrow">YOUR READING LIFE</p>
        <h1 className="library__title">ReadLog</h1>
      </header>

      <StatsBar
        booksRead={booksRead}
        quotes={totalQuotes}
        readingNow={readingNow}
      />

      <FilterTabs active={filter} onChange={onFilterChange} />

      <div className="library__list">
        {filtered.map((book) => (
          <BookCard key={book.id} book={book} onClick={onBookSelect} />
        ))}
      </div>

      <button className="library__add-btn">+ ADD BOOK</button>
    </div>
  );
}
