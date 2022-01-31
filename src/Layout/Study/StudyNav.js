import React from "react";

function StudyNav({ deckName, deckId }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        <li className="breadcrumb-item">
          <a href={`/decks/${deckId}`}>{deckName}</a>
        </li>
      </ol>
    </nav>
  );
}

export default StudyNav;
