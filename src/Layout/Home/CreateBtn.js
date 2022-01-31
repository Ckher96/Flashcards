import React from "react";
import { useHistory } from "react-router-dom";

function CreateBtn() {
  const history = useHistory();

  function createBtnHandler() {
    history.push("/decks/new");
  }

  return (
    <div className="my-2">
      <button onClick={createBtnHandler} className="btn btn-primary">
        Create Deck
      </button>
    </div>
  );
}
export default CreateBtn;
