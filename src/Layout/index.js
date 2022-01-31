import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home/Home";
import CreateForm from "./Create/CreateForm";
import Study from "./Study/Study";
import View from "./View/View";
import CreateNav from "./Create/CreateNav";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateNav />
            <div className="text-center border border-dark rounded-lg">
              <h2 className="bg-secondary p-3 text-white">Create Deck</h2>
              <CreateForm />
            </div>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId">
            <View />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
