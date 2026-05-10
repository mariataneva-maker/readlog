import React from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { QuoteCard } from "../QuoteCard/QuoteCard";
import { NoteCard } from "../NoteCard/NoteCard";
import { statusLabel } from "../../data/books";
import "./BookDetailView.css";

export function BookDetailView({
  book,
  activeTab,
  quotes,
  notes,
  onTabChange,
  onCapture,
  onBack,
}) {
  return (
    <div className="bookdetail">
      <button className="bookdetail__back" onClick={onBack}>
        ← Library
      </button>

      <div className="bookdetail__hero">
        <div className="bookdetail__cover" style={{ background: book.cover }} />
        <div className="bookdetail__meta">
          <span className="bookdetail__status">
            {statusLabel[book.status].toUpperCase()}
          </span>
          <h1 className="bookdetail__title">{book.title}</h1>
          <p className="bookdetail__author">{book.author}</p>
          {book.status === "reading" && (
            <div className="bookdetail__progress">
              <span className="bookdetail__progress-label">
                PAGE PROGRESS — {book.progress}%
              </span>
              <ProgressBar progress={book.progress} />
            </div>
          )}
        </div>
      </div>

      <div className="bookdetail__tabs">
        <button
          className={`bookdetail__tab${activeTab === "quotes" ? " bookdetail__tab--active" : ""}`}
          onClick={() => onTabChange("quotes")}
        >
          QUOTES
        </button>
        <button
          className={`bookdetail__tab${activeTab === "notes" ? " bookdetail__tab--active" : ""}`}
          onClick={() => onTabChange("notes")}
        >
          NOTES
        </button>
      </div>

      <div className="bookdetail__content">
        {activeTab === "quotes" && (
          <>
            <div className="bookdetail__content-header">
              <span className="bookdetail__count">{quotes.length} QUOTES</span>
              <button className="bookdetail__capture-btn" onClick={onCapture}>
                + Capture
              </button>
            </div>
            {quotes.map((q) => <QuoteCard key={q.id} quote={q} />)}
          </>
        )}

        {activeTab === "notes" && (
          <>
            <div className="bookdetail__content-header">
              <span className="bookdetail__count">{notes.length} NOTES</span>
              <button className="bookdetail__capture-btn" onClick={onCapture}>
                + ADD NOTE
              </button>
            </div>
            {notes.map((n) => <NoteCard key={n.id} note={n} />)}
          </>
        )}
      </div>
    </div>
  );
}
