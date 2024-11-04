import { useEffect, useState } from 'react';
import getID from './../public/api';

type Card = {
  id: string;
  count: number;
};

function App() {
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [cards, setCards] = useState<Card[]>([]);

  const populateCards = async (i: number) => {
    const newCards: Card[] = [];
    while (newCards.length < i) {
      const card: Card = {
        id: await getID().then((res) => res._id),
        count: 0,
      };
      if (!newCards.includes(card)) {
        newCards.push(card);
      }
    }
    setCards(newCards);
  };

  useEffect(() => {
    populateCards(10);
  }, []);

  function shuffle(array: Card[]): void {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  function handleClick(e: any): void {
    for (let i = 0; i < cards.length; i++) {
      if (e.target.id == cards[i].id) {
        if (cards[i].count === 0) {
          cards[i].count++;
          setScore(score + 1);
          if (score + 1 > highScore) {
            setHighScore(score + 1);
          }
          const newCards: Card[] = [...cards];
          shuffle(newCards);
          setCards(newCards);
        } else {
          alert('You already clicked this card!');
          setScore(0);
          populateCards(10);
        }
      }
    }
  }

  return (
    <div className="px-4">
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-bold text-lg md:text-5xl">
          Welcome to Cat Memory Card!
        </h1>
        <div>
          <p className="text-xs md:text-2xl">Highest Score: {highScore}</p>
          <p className="text-xs md:text-2xl">Score: {score}</p>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-3 md:grid-cols-5">
        {cards.map((card) => {
          const link: string = `https://cataas.com/cat/${card.id}?type=square`;
          return (
            <img
              onClick={handleClick}
              className="w-full h-full"
              src={link}
              key={card.id}
              id={card.id}
              alt="cat"
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
