export const customRound = (number: number) => {
  let decimalPart = number - Math.floor(number);

  if (decimalPart >= 0.5) {
      return Math.ceil(number);
  } else {
      return Math.floor(number);
  }
}