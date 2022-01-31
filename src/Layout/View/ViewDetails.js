import React from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

function ViewDetails({ deckName, deckDescription }) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const deckId = useParams().deckId;

  function editHandle() {
    history.push(`${url}/edit`);
  }

  function studyHandle() {
    history.push(`${url}/study`);
  }

  function addHandle() {
    history.push(`${url}/cards/new`);
  }

  async function deleteHandle(id) {
    const confirm = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it"
    );
    if (confirm) {
      await deleteDeck(id);
      history.push("/");
    }
  }

  return (
    <div className="border border-secondary rounded-lg text-center m-2">
      <h4 className="bg-secondary text-white p-3">{deckName}</h4>
      <p className="m-2">{deckDescription}</p>
      <div className="d-flex border-top border-dark bg-secondary">
        <button onClick={editHandle} className="btn btn-info m-2">
          Edit
        </button>
        <button onClick={studyHandle} className="btn btn-success m-2">
          Study
        </button>
        <button onClick={addHandle} className="btn btn-warning m-2 mr-auto">
          Add Card
        </button>
        <button
          onClick={() => deleteHandle(deckId)}
          className="btn btn-danger m-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ViewDetails;
