const numberToCurrency = (currency, number) => {
  if (number === null) return null;
  let cur = "";
  switch (currency) {
    case "inr":
      cur = "en-IN";
      break;

    case "eur":
      cur = "en-DE";
      break;

    default:
      cur = "en-US";
      break;
  }
  let answer = number.toLocaleString(cur, {
    style: "currency",
    currency: currency.toUpperCase()
  });
  let result;
  switch (currency) {
    case "inr":
      result = answer.split("₹")[1];
      break;

    case "eur":
      result = answer.split("€")[1];
      break;

    default:
      result = answer.split("$")[1];
      break;
  }
  return result;
};

export default numberToCurrency;
