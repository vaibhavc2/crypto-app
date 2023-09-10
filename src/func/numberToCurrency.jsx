const numberToCurrency = (currency, number) => {
  let cur = "";
  switch (currency) {
    case "inr":
      cur = "en-IN";
      break;

    case "usd":
      cur = "en-US";
      break;

    default:
      cur = "en-DE";
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
