import React from "react";
import { useParams, useRouteMatch } from "react-router-dom";

function CreateNav({deckName = '', cards = []}) {
    const {deckId, cardId} = useParams()
    const {path} = useRouteMatch()

    const addCard = path.includes("/cards/new")
    const createDeck = path.includes('/decks/new')

    let cardNum = 0

    cards?.forEach((card, index) => {
        if (card.id == cardId) {
            cardNum = index
        }
    })

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        {
            deckName ? <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deckName}</a></li> : null
        
        }
        {
            cardId ? <li className="breadcrumb-item active" aria-current="page">{`Edit Card ${cardNum + 1}`}</li> : null
        
        }
        {
            addCard ? <li className="breadcrumb-item active" aria-current="page">Add Card</li> : null
        }
        {
            createDeck ? <li className="breadcrumb-item active" aria-current="page">Create Deck</li> : null
        }
      </ol>
    </nav>
  );
}

export default CreateNav