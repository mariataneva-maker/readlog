import React, { useState } from "react";
import "./QuoteCaptureView.css";

const METHODS = [
  { value: "camera", label: "CAMERA", emoji: "📷" },
  { value: "voice",  label: "VOICE",  emoji: "🎙" },
  { value: "type",   label: "TYPE",   emoji: "✏️" },
];

export function QuoteCaptureView({ onBack }) {
  const [method, setMethod] = useState("camera");

  return (
    <div className="capture">
      <button className="capture__back" onClick={onBack}>
        ← BACK
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

      {method === "type" && (
        <textarea
          className="capture__textarea"
          placeholder="Type your quote here..."
          rows={5}
        />
      )}

      <div className="capture__section-label" style={{ marginTop: 24 }}>
        CAPTURED TEXT
      </div>
      <textarea
        className="capture__textarea"
        placeholder="Quote will appear here after capture, or type directly…"
        rows={4}
      />

      <div className="capture__fields">
        <div className="capture__field">
          <div className="capture__field-label">PAGE NO.</div>
          <input className="capture__input" type="number" placeholder="e.g. 108" />
        </div>
        <div className="capture__field">
          <div className="capture__field-label">TAG</div>
          <input className="capture__input" placeholder="e.g. faith, love…" />
        </div>
      </div>

      <button className="capture__save-btn">SAVE QUOTE</button>
    </div>
  );
}
