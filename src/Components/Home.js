import React, { useEffect, useState } from "react";
import SingleCard from "./SingleCard";
import cardImages from "../CardImage.json";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  //set new game
  const suffleCards = () => {
    const suffledCards = [...cardImages.image, ...cardImages.image]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(suffledCards);
    setTurns(0);
    setScore(0);
  };

  const handleChoice = (card) => {
    //   console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //   console.log(cards, turns);

  //compare two card
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              setScore(score + 100);
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log("card not match");
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    suffleCards();
  }, []);

  //reset 
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setScore((prevScore) => prevScore - 50);
  };

  return (
    <div className="container">
      <h2>Memory Match Game</h2>
      <div className="header">
        <p>Turns : {turns}</p>
        <button onClick={suffleCards}>New Game</button>
        <p>Score : {score}</p>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
