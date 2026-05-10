import React, { useState } from "react";
import "./QuoteCaptureView.css";

const METHODS = [
  { value: "camera", label: "Camera", emoji: "📷" },
  { value: "voice",  label: "Voice",  emoji: "🎙" },
  { value: "type",   label: "Type",   emoji: "✏️" },
];

export function QuoteCaptureView({ onBack, onSave }) {
  const [method, setMethod] = useState("type");
  const [quoteText, setQuoteText] = useState("");
  const [chapter, setChapter] = useState("");
  const [section, setSection] = useState("");
  const [page, setPage] = useState("");

  function handleSave() {
    if (!quoteText.trim()) return;
    onSave({ chapter: chapter.trim(), section: section.trim(), text: quoteText.trim(), page });
  }

  return (
    <div className="capture">
      <button className="capture__back" onClick={onBack}>
        ← Back
      </button>

      <h1 className="capture__title">
        Capture<br />a Quote
      </h1>

      <div className="capture__section-label">CAPTURE METHOD</div>
      <div className="capture__methods">
        {METHODS.map((m) => (
          <button
            key={m.value}
            className={`capture__method${method === m.value ? " capture__method--active" : ""}`}
            onClick={() => setMethod(m.value)}
          >
            <span className="capture__method-icon">{m.emoji}</span>
            <span className="capture__method-label">{m.label}</span>
          </button>
        ))}
      </div>

      {method === "camera" && (
        <div className="capture__viewfinder">
          <span className="capture__viewfinder-icon">📷</span>
          <span className="capture__viewfinder-hint">POINT AT PAGE TEXT</span>
          <button className="capture__shutter" aria-label="Capture" />
        </div>
      )}

      {method === "voice" && (
        <div className="capture__voice">
          <span className="capture__voice-icon">🎙</span>
          <span className="capture__voice-hint">TAP TO START RECORDING</span>
        </div>
      )}

      <div className="capture__section-label" style={{ marginTop: 24 }}>
        QUOTE
      </div>
      <textarea
        className="capture__textarea"
        placeholder="Type or paste the quote here…"
        rows={5}
        value={quoteText}
        onChange={(e) => setQuoteText(e.target.value)}
      />

      <div className="capture__section-label">LOCATION</div>
      <div className="capture__fields">
        <div className="capture__field capture__field--full">
          <div className="capture__field-label">CHAPTER</div>
          <input
            className="capture__input"
            placeholder="e.g. 2: The Psychology of Everyday Actions"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />
        </div>
        <div className="capture__field capture__field--full">
          <div className="capture__field-label">SECTION</div>
          <input
            className="capture__input"
            placeholder="e.g. Human Thought: Mostly Subconscious"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          />
        </div>
        <div className="capture__field">
          <div className="capture__field-label">PAGE NO.</div>
          <input
            className="capture__input"
            type="number"
            placeholder="e.g. 44"
            value={page}
            onChange={(e) => setPage(e.target.value)}
          />
        </div>
      </div>

      <button
        className={`capture__save-btn${!quoteText.trim() ? " capture__save-btn--disabled" : ""}`}
        onClick={handleSave}
        disabled={!quoteText.trim()}
      >
        Save quote
      </button>
    </div>
  );
}
