export const roundNumbers = (value: number) => {
    const integerPart = Math.floor(value);
    const decimalPart = value - integerPart;

    if (decimalPart > 0.5) {
      return Math.ceil(value);
    }
    return integerPart;
  };