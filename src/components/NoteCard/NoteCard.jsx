import React from "react";
import "./NoteCard.css";

export function NoteCard({ note }) {
  return (
    <div className="notecard">
      <p className="notecard__text">{note.text}</p>
      <div className="notecard__meta">
        <span className="notecard__type">{note.type.toUpperCase()}</span>
        <span className="notecard__date">{note.date}</span>
      </div>
    </div>
  );
}
