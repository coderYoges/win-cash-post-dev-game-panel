export const getAnBCardsWithTimers = (cardsList) => {
  let andarCards = [];
  let baharCards = [];

  cardsList.map((random, idx) => {
    if (idx % 2 === 0)
      andarCards.push({
        card: random,
        timer: 52 + 1 * idx,
      });
    else
      baharCards.push({
        card: random,
        timer: 52 + 1 * idx,
      });
    return null;
  });
  return {
    andarCards,
    baharCards,
  };
};
