import { useState } from "react";
import { books as initialBooks, sampleQuotes, sampleNotes } from "../data/books";

export function useReadlog() {
  const [view, setView] = useState("library");
  const [activeBook, setActiveBook] = useState(null);
  const [activeTab, setActiveTab] = useState("quotes");
  const [filter, setFilter] = useState("all");
  const [quotes, setQuotes] = useState(sampleQuotes);
  const [notes] = useState(sampleNotes);

  const filtered =
    filter === "all"
      ? initialBooks
      : initialBooks.filter((b) => b.status === filter);

  const currentBook = activeBook
    ? initialBooks.find((b) => b.id === activeBook)
    : null;

  const currentQuotes = quotes.filter((q) => q.bookId === activeBook);
  const currentNotes  = notes.filter((n) => n.bookId === activeBook);

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

  function saveQuote({ chapter, section, text, page }) {
    const today = new Date();
    const label = today.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const next = {
      id: Date.now(),
      bookId: activeBook,
      chapter,
      section,
      text,
      page: page ? Number(page) : null,
      date: label,
    };
    setQuotes((prev) => [next, ...prev]);
    setView("book");
    setActiveTab("quotes");
  }

  return {
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
    goToLibrary,
    saveQuote,
  };
}
