import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import classNames from "../../utils/class-names";

function Cards({ cards, deckName }) {
  const history = useHistory();
  const { deckId } = useParams();
  const [flip, setFlip] = useState(false);
  const [cardNum, setCardNum] = useState(0);

  function flipHandle() {
    setFlip(!flip);
  }

  function addCardsHandle() {
    history.push(`/decks/${deckId}/cards/new`);
  }

  function endHandle() {
    const confirm = window.confirm(
      "Restart Cards?\n\nClick 'cancel' to return to the home page"
    );
    if (confirm) {
      setCardNum(0);
    } else {
      history.push("/");
    }
  }

  function nextHandle() {
      setFlip(false);
      setCardNum(cardNum + 1);
    }
  
  const flashCards = cards?.filter((card, index) => cardNum === index).map(({ front, back }) => {
    return (
      <div>
        <div
          className={`${classNames({
          })} border border-dark rounded-lg mt-3 text-center`}
        >
          <h4 className="p-3 bg-secondary text-white">{`Card ${cardNum + 1} of ${
            cards.length
          }`}</h4>
          <p className="m-4">{flip ? back : front}</p>
          <div className="p-2 bg-secondary text-white">
            <button onClick={flipHandle} className="btn btn-info mx-2">
              Flip
            </button>
            {flip ? (
              <button
                onClick={cardNum + 1 === cards.length ? endHandle : nextHandle}
                className="btn btn-success mx-2"
              >
                Next
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  });

  console.log(cards)

  if (cards?.length < 3) {
    return (
      <div>
        <h1>{deckName} : Study</h1>
        <h3>Not Enough Cards</h3>
        <p>
          You need at least 3 cards to study. There are {cards.length} in the
          deck
        </p>
        <button onClick={addCardsHandle}>Add Cards</button>
      </div>
    );
  }

  return <div>{flashCards}</div>;
}

export default Cards;
