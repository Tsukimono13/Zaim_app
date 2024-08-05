export const getDaySuffix = (number: number) => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return " день";
  }
  if (
    number % 10 >= 2 &&
    number % 10 <= 4 &&
    !(number % 100 >= 12 && number % 100 <= 14)
  ) {
    return " дня";
  }
  return " дней";
};
