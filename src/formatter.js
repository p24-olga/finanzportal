const pipe = (...fns) => input => fns.reduce((acc, func) => func(acc), input);

function format(input, precision, decimalSeparator, thousandsSeparator, rounding) {
  if (input === undefined) {
    return "0,00";
  }
  if (typeof (input) === "string") {
    input = parseFloat(input);
  }
  const action = pipe(
    round(precision, rounding),
    replaceDecimalSeparator(decimalSeparator),
    addThousandsSeparator(thousandsSeparator)
  );
  return action(input);
}

function deconstructNumber(number) {
  const twoParts = number.split('.');
  return {
    wholePart: twoParts[0],
    decimal: newSeparator + twoParts[1]
  }
}
// Currying
function round(precision = 2, rounding = true) {
    return number => {
      if (!rounding) {
        const unrounder = 0.1 / Math.pow(10, precision)
        number -= 0.5 / Math.pow(10, precision);
      }
      return roundToPrecision(precision, number)
  }
}

function roundToPrecision(precision, number) {
  return number.toFixed(precision)
}
function replaceDecimalSeparator(newSeparator = ",") {
  return number => {
    const twoParts = number.split('.');
    return {
      wholePart: twoParts[0],
      decimal: newSeparator + twoParts[1]
    }
  }
}

function reverseString(string) {
  return string.split('').reverse().join('')
}
function addThousandsSeparator(newSeparator = ".") {
  return numberParts => {
    const wholePartWithSeparator =  numberParts.wholePart.split('').reverse().reduce((acc, val, index) => {
      const isThirdDigit = index !== 0 && index % 3 === 0;
      if (isThirdDigit) {
        acc += newSeparator;
      }
      acc += val;
      return acc;
    }, "");

    return reverseString(wholePartWithSeparator) + numberParts.decimal;
  }
}

module.exports = {format};
