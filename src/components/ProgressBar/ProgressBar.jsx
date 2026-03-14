import React from "react";
import "./ProgressBar.css";

export function ProgressBar({ progress }) {
  return (
    <div className="progressbar">
      <div className="progressbar__track">
        <div className="progressbar__fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
