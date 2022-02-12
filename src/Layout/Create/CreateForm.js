import React, { useEffect, useState} from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import {
  createDeck,
  updateDeck,
  readDeck,
  readCard,
  updateCard,
  createCard,
} from "../../utils/api";

function CreateForm() {
  const { path } = useRouteMatch();
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const [form, setForm] = useState({name: '', description: '', front: '', back: ''});

  const edittingCard = path === "/decks/:deckId/cards/:cardId/edit";
  const edittingDeck = path === "/decks/:deckId/edit";
  const creatingDeck = path === "/decks/new";
  const addingCard = path === "/decks/:deckId/cards/new";

  useEffect(() => {
    async function getDeck() {
      if (edittingDeck) {
        const Deck = await readDeck(deckId);
        setForm(Deck);
      }
      if (edittingCard) {
        const Card = await readCard(cardId);
        setForm(Card);
      }
    }

    getDeck();
  }, [deckId, cardId, edittingCard, edittingDeck]);

  function changeHandle(event) {
    setForm({ ...form, [event.target.id]: event.target.value });
  }

  function cancelHandle() {
    if (edittingDeck || edittingCard || addingCard) {
      history.push(`/decks/${deckId}`);
    } else {
      history.push("/");
    }
  }

  async function submitHandle(event) {
    event.preventDefault();
    if (edittingDeck) {
      const updatedDeck = await updateDeck(form);
      history.push(`/decks/${updatedDeck.id}`);
      history.go(0);
    }
    if (edittingCard) {
      await updateCard(form);
      history.push(`/decks/${deckId}`);
      history.go(0);
    }
    if (addingCard) {
      await createCard(deckId, form);
      history.push(`/decks/${deckId}`);
      history.go(0);
    }
    if (creatingDeck) {
      const newDeck = await createDeck(form);
      history.push(`/decks/${newDeck.id}`);
    }
  }

  if (creatingDeck || edittingDeck) {
    return (
      <form onSubmit={submitHandle}>
        <div className="d-flex flex-column border-bottom border-dark pb-4">
          <label htmlFor="name">
            <h3>Name</h3>
          </label>
          <input
            className="m-auto"
            type="text"
            id="name"
            required
            onChange={changeHandle}
            value={form?.name}
          />
        </div>

        <div className="d-flex flex-column mt-3 pb-4">
          <label htmlFor="description">
            <h3>Description</h3>
          </label>
          <textarea
            className="m-auto"
            id="description"
            required
            onChange={changeHandle}
            value={form?.description}
          />
        </div>
        <div className="bg-secondary">
          <button onClick={cancelHandle} className="btn btn-primary m-2">
            Cancel
          </button>
          <button type="submit" className="btn btn-success m-2">
            Submit
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <form onSubmit={submitHandle}>
        <div className="d-flex flex-column border-bottom border-dark pb-4">
          <label htmlFor="front">
            <h3>Front</h3>
          </label>
          <textarea
            className="m-auto"
            id="front"
            required
            onChange={changeHandle}
            value={form?.front}
          />
        </div>

        <div className="d-flex flex-column mt-3 pb-4">
          <label htmlFor="back">
            <h3>Back</h3>
          </label>
          <textarea
            className="m-auto"
            id="back"
            required
            onChange={changeHandle}
            value={form?.back}
          />
        </div>
        <div className="bg-secondary">
          <button onClick={cancelHandle} className="btn btn-primary m-2">
            Cancel
          </button>
          <button type="submit" className="btn btn-success m-2">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default CreateForm;
