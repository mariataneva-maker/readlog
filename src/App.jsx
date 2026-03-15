import React from "react";
import { useReadlog } from "./hooks/useReadlog";
import { LibraryView } from "./components/LibraryView/LibraryView";
import { BookDetailView } from "./components/BookDetailView/BookDetailView";
import { QuoteCaptureView } from "./components/QuoteCaptureView/QuoteCaptureView";
import "./styles/global.css";

export default function App() {
  const {
    view,
    filter,
    activeTab,
    filtered,
    currentBook,
    currentQuotes,
    currentNotes,
    setFilter,
    setActiveTab,
    openBook,
    openCapture,
    goBack,
  } = useReadlog();

  return (
    <div className="app">
      {view === "library" && (
        <LibraryView
          filter={filter}
          onFilterChange={setFilter}
          filtered={filtered}
          onBookSelect={openBook}
        />
      )}

      {view === "book" && currentBook && (
        <BookDetailView
          book={currentBook}
          activeTab={activeTab}
          quotes={currentQuotes}
          notes={currentNotes}
          onTabChange={setActiveTab}
          onCapture={openCapture}
          onBack={goBack}
        />
      )}

      {view === "capture" && (
        <QuoteCaptureView onBack={goBack} />
      )}
    </div>
  );
}
