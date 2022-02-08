import React, { useEffect, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom";
import {
  readDeck,
} from "../../utils/api";
import ViewDetails from "./ViewDetails";
import ViewNav from "./ViewNav";
import ViewCards from "./ViewCards";
import CreateForm from "../Create/CreateForm";
import CreateNav from "../Create/CreateNav";

function View() {
  const [studyDeck, setStudyDeck] = useState({});
  const {deckId} = useParams()
  const { path } = useRouteMatch();

  useEffect(() => {
    async function getDeck() {
      const newDeck = await readDeck(deckId);
      setStudyDeck(newDeck);
    }

    getDeck();
  }, [deckId]);


  return (
    <>
      <Switch>
        <Route exact path={path}>
          <ViewNav deckName={studyDeck?.name} />
          <ViewDetails
            deckName={studyDeck?.name}
            deckDescription={studyDeck?.description}
          />
          <ViewCards cards={studyDeck?.cards} deckId={studyDeck?.id} />
        </Route>
        <Route path={`${path}/edit`}>
          <CreateNav deckName={studyDeck?.name} />
          <div className="text-center border border-dark rounded-lg">
            <h2 className="bg-secondary p-3 text-white">Edit Deck</h2>
            <CreateForm />
          </div>
        </Route>
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <CreateNav deckName={studyDeck?.name} cards={studyDeck?.cards} />
          <div className="text-center border border-dark rounded-lg">
            <h2 className="bg-secondary p-3 text-white">Edit Card</h2>
            <CreateForm />
          </div>
        </Route>
        <Route path="/decks/:deckId/cards/new">
          <CreateNav deckName={studyDeck?.name} />
          <div className="text-center border border-dark rounded-lg">
            <h2 className="bg-secondary p-3 text-white">Add Card</h2>
            <CreateForm />
          </div>
        </Route>
        <Route path="/decks/new">
            <CreateNav />
            <div className="text-center border border-dark rounded-lg">
              <h2 className="bg-secondary p-3 text-white">Create Deck</h2>
              <CreateForm />
            </div>
          </Route>
      </Switch>
    </>
  );
}

export default View;
