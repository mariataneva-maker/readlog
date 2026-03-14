import { useState } from "react";
import { books as initialBooks, sampleQuotes, sampleNotes } from "../data/books";

/**
 * useReadlog — central state management for the ReadLog app.
 * All view state, navigation, and data mutations live here.
 */
export function useReadlog() {
  const [view, setView] = useState("library");       // "library" | "book" | "capture"
  const [activeBook, setActiveBook] = useState(null); // book id
  const [activeTab, setActiveTab] = useState("quotes"); // "quotes" | "notes"
  const [filter, setFilter] = useState("all");        // "all" | "reading" | "finished" | "want-to-read"

  const filtered =
    filter === "all"
      ? initialBooks
      : initialBooks.filter((b) => b.status === filter);

  const currentBook = activeBook
    ? initialBooks.find((b) => b.id === activeBook)
    : null;

  const currentQuotes = sampleQuotes.filter((q) => q.bookId === activeBook);
  const currentNotes  = sampleNotes.filter((n) => n.bookId === activeBook);

  function openBook(id) {
    setActiveBook(id);
    setActiveTab("quotes");
    setView("book");
  }

  function openCapture() {
    setView("capture");
  }

  function goBack() {
    if (view === "capture") setView("book");
    else if (view === "book") { setView("library"); setActiveBook(null); }
    else setView("library");
  }

  function goToLibrary() {
    setView("library");
    setActiveBook(null);
  }

  return {
    // state
    view,
    filter,
    activeTab,
    filtered,
    currentBook,
    currentQuotes,
    currentNotes,
    // actions
    setFilter,
    setActiveTab,
    openBook,
    openCapture,
    goBack,
    goToLibrary,
  };
}
