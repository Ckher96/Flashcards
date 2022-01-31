import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyNav from "./StudyNav";
import Cards from "./Cards";

function Study() {
  const [studyDeck, setStudyDeck] = useState({});
  const deckNum = useParams().deckId;

  useEffect(() => {
    async function getDeck() {
      const newDeck = await readDeck(deckNum);
      setStudyDeck(newDeck);
    }

    getDeck();
  }, [deckNum]);
  console.log(studyDeck?.cards)
  return (
    <>
      <StudyNav deckName={studyDeck?.name} deckId={studyDeck?.id} />
      <Cards cards={studyDeck?.cards} deckName={studyDeck?.name} />
    </>
  );
}

export default Study;
