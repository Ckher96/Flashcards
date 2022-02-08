import React, {useEffect, useState} from "react";
import CreateBtn from "./CreateBtn";
import Decks from "./Decks";
import { listDecks } from "../../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function getDecks() {
      const decksList = await listDecks();
      setDecks(decksList);
    }

    getDecks();
  }, []);
  return (
    <>
      <CreateBtn />
      <Decks decks={decks} setDecks={setDecks}/>
    </>
  );
}

export default Home;
