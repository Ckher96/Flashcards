import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index";
import { listDecks } from "../../utils/api/index";

function Decks({decks, setDecks}) {
  const history = useHistory();

  function viewHandler(deckId) {
    history.push(`/decks/${deckId}`);
  }

  function studyHandler(deckId) {
    history.push(`/decks/${deckId}/study`);
  }

  async function deleteHandler(id) {
    const confirm = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it"
    );
    if (confirm) {
      await deleteDeck(id);
      const newDeckList = await listDecks();
      setDecks(newDeckList);
    }
  }

  const listOfDecks = decks.map(({ id, name, description, cards }, index) => {
    return (
      <>
        <div
          key={index}
          className="border border-dark rounded-lg text-center my-3"
        >
          <h2 className="bg-secondary text-white border-bottom border-dark">
            {name}
          </h2>
          <p className="m-4">{description}</p>
          <h4>{`${cards.length} cards`}</h4>
          <div className="d-flex bg-secondary text-white border-top border-dark">
            <button
              onClick={() => viewHandler(id)}
              className="btn btn-info m-2"
            >
              View
            </button>
            <button
              onClick={() => studyHandler(id)}
              className="btn btn-success m-2 mr-auto"
            >
              Study
            </button>
            <button
              onClick={() => deleteHandler(id)}
              className="btn btn-danger m-2"
            >
              Delete
            </button>
          </div>
        </div>
      </>
    );
  });

  return <div>{listOfDecks}</div>;
}

export default Decks;
