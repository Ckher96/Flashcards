import React from "react";
import { useHistory } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { deleteCard } from "../../utils/api";

function ViewCards({ cards }) {
  const history = useHistory();
  const { url } = useRouteMatch();

  function editHandle(id) {
    history.push(`${url}/cards/${id}/edit`);
  }

  async function deleteHandler(id) {
    const confirm = window.confirm(
      "Delete this card?\n\nYou will not be able to recover it"
    );
    if (confirm) {
      await deleteCard(id);
      history.go(0);
    }
  }

  const viewCards = cards?.map(({ front, back, id }, index, array) => {
    return (
      <div key={index} className="border border-dark rounded-lg m-2 text-center">
        <h5 className="bg-secondary text-white p-2">{`Card ${index + 1} of ${
          array.length
        }`}</h5>
        <h4>Front</h4>
        <div className="border-bottom border-dark">
          <p className="m-2">{front}</p>
        </div>
        <h4 className="m-2">Back</h4>
        <p>{back}</p>
        <div className="d-flex justify-content-around bg-secondary">
          <button onClick={() => editHandle(id)} className="btn btn-info m-2">
            Edit
          </button>
          <button
            onClick={() => deleteHandler(id)}
            className="btn btn-danger m-2"
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return <>{viewCards}</>;
}

export default ViewCards;
