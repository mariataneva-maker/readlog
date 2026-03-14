import React from "react";
import "./FilterTabs.css";

const TABS = [
  { value: "all",          label: "ALL" },
  { value: "reading",      label: "READING" },
  { value: "finished",     label: "FINISHED" },
  { value: "want-to-read", label: "WISHLIST" },
];

export function FilterTabs({ active, onChange }) {
  return (
    <div className="filtertabs">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          className={`filtertabs__tab${active === tab.value ? " filtertabs__tab--active" : ""}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
