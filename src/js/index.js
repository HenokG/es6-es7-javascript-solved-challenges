import App from "./constants";

const axios = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 24 });
    }, 2000);
  });
};

const getId = async () => {
  const result = await axios();
  alert(`Id from axios is: ${result.id}`);
};

const users = new Map();
users.set(12, { name: "henokg", email: "henok@gmail.com" });

getId();

const app = new App();
console.log(`App version: ${app.getVersion()}`);

// remove n occurances of '!'

const remover = word => occurance => {
  for (let i = 0; i < occurance; i++) {
    word = word.replace("!", "");
  }
  return word;
};

// reduce but grow
// multiply everything inside an array

const multiplier = arr => arr.reduce((result, element) => result * element);

// render list into human readable string
// Format a string of names like 'Bart, Lisa & Maggie'.

const list = arr => {
  let result = "";
  arr.forEach((name, i) => {
    !i
      ? (result += name.name)
      : i === arr.length - 1
      ? (result += ` & ${name.name}`)
      : (result += `, ${name.name}`);
  });
  return result;
};

// Digital Root
// sum all digits in a number n and reduce to a single digit

const digital_root = number => {
  const numberInArrayForm = number
    .toString()
    .split("")
    .map(string => Number(string));
  let digitalRoot = numberInArrayForm.reduce(
    (previous, current) => previous + current
  );
  return digitalRoot > 9 ? digital_root(digitalRoot) : digitalRoot;
};

// Tribonacci Sequence
// given signature and n return the tribonacci sequence of n elements

const fibonacci = (signature, n) => {
  for (let i = 0; i < n - 3; i++) {
    signature.push(signature[i] + signature[i + 1] + signature[i + 2]);
  }
  return signature.slice(0, n);

  // original code was
  if (!n) return [];
  if (n <= 3) return signature.slice(0, n);
  const lengthOfSignature = signature.length;
  if (n === lengthOfSignature) return signature;
  const sumOfLast3Elements = signature
    .slice(lengthOfSignature - 3, lengthOfSignature)
    .reduce((previous, current) => previous + current);
  signature.push(sumOfLast3Elements);
  return fibonacci(signature, n);
};

// Sum of two lowest positive integers in an array

const sum = array => {
  array.sort((a, b) => a - b);
  return array[0] + array[1];
};

// Complementary DNA

const DNAStrand = dna => {
  return dna.replace(/./g, function(c) {
    return DNAStrand.pairs[c];
  });

  DNAStrand.pairs = {
    A: "T",
    T: "A",
    C: "G",
    G: "C"
  };
  // original code
  const DNA_MAP = { A: "T", T: "A", C: "G", G: "C" };
  return dna
    .split("")
    .map(element => DNA_MAP[element])
    .join("");
};

// Counting Duplicates

const countDuplicates = text => {
  return (
    text
      .toLowerCase()
      .split("")
      .sort()
      .join("")
      .match(/([^])\1+/g) || []
  ).length;

  // original code
  const duplicates = {};
  const textInArrayForm = text.split("").map(element => element.toLowerCase());
  for (let i = 0; i < textInArrayForm.length; i++) {
    const element = textInArrayForm[i];
    if (textInArrayForm.filter(char => char === element).length === 1) continue;
    duplicates[element] = 0;
  }
  return Object.keys(duplicates).length;
};

// Cut rectangles into squares
const sqInRect = (width, length) => {
  let arr = [];
  if (lng === wdth) return null;
  while (lng > 0 && wdth > 0) {
    arr.push(lng > wdth ? wdth : lng);
    lng > wdth ? (lng -= wdth) : (wdth -= lng);
  }
  return arr;
};

// Morse Code Advanced
const decodeBits = bits => {
  // trim() but for 0's instead of trailing spaces
  bits = bits.replace(/(^0*|0*$)/g, "");

  // getTransmissionRate could've been changed to
  // var rate = Math.min.apply(null, bits.match(/0+|1+/g).map(function(b) { return b.length }))

  const getTransmissionRate = bits => {
    const onBits1 = (bits.match(/[1]+/g) || [""]).sort()[0];
    const onBits0 = (bits.match(/[0]+/g) || [""]).sort()[0];
    if (onBits0.length === 0 || onBits1.length < onBits0.length)
      return onBits1.length;
    return onBits0.length;
  };

  const transmissionRate = getTransmissionRate(bits);
  const regExpForDash = new RegExp(`[1]{${transmissionRate * 3}}`, "g");
  const regExpForDot = new RegExp(`[1]{${transmissionRate}}`, "g");
  const regExpForSpace = new RegExp(`[0]{${transmissionRate}}`, "g");
  const regExpForCharacterEnd = new RegExp(`[0]{${transmissionRate * 3}}`, "g");
  const regExpForWordEnd = new RegExp(`[0]{${transmissionRate * 7}}`, "g");

  return bits
    .replace(regExpForDash, "-")
    .replace(regExpForDot, ".")
    .replace(regExpForWordEnd, "   ")
    .replace(regExpForCharacterEnd, " ")
    .replace(regExpForSpace, "");
};

const decodeMorse = morseCode => {
  const decodeMorseWord = morseWord =>
    morseWord
      .split(" ")
      .map(decodeChar)
      .join("");

  const decodeChar = morseChar => MORSE_CODE[morseChar];

  return morseCode
    .split("   ")
    .map(decodeMorseWord)
    .join(" ");
};

// console.log(
//   decodeBits(
//     "1100110011001100000011000000111111001100111111001111110000000000000011001111110011111100111111000000110011001111110000001111110011001100000011"
//   )
// );

// Texting with an old-school mobile phone

const sendMessage = message => {
  let isLastCharUpperCase = false;
  let holding = false;

  const encodeWord = word => {
    return word
      .split("")
      .map(encodeChar)
      .join("");
  };

  const encodeChar = (char, index, array) => {
    let encodedChar = "";
    if (shouldSwitchCase(char)) {
      encodedChar += "#";
    } else if (holding && isOnSameKeyAsPreviousChar(char, array[index - 1])) {
      encodedChar += " ";
    }
    if (isLetter(char) && isUpperCase(char) && !isLastCharUpperCase) {
      isLastCharUpperCase = true;
      console.log("caping:", char);
      encodedChar += encodeUpperCase(char);
    } else {
      isLetter(char) && !isUpperCase(char) ? (isLastCharUpperCase = false) : "";
      console.log(char, "##", isLastCharUpperCase);
      encodedChar += getCode(char);
    }
    return encodedChar;
  };

  const shouldSwitchCase = char =>
    !holding && isLastCharUpperCase && isLetter(char) && !isUpperCase(char);

  const isOnSameKeyAsPreviousChar = (currentChar, previousChar) => {
    if (!previousChar) return false;
    return (
      getCode(currentChar)
        .toString()
        .charAt(0) ===
      getCode(previousChar)
        .toString()
        .charAt(0)
    );
  };

  const isUpperCase = char =>
    char.charCodeAt(0) === char.toUpperCase().charCodeAt(0);

  const encodeUpperCase = upperCaseChar => "#" + getCode(upperCaseChar);

  const getCode = char => {
    if (isNumberOrSpecialChar(char)) return encodeNumberAndSpecialChar(char);
    holding = false;
    return KEYBOARD_CODE[char.toLowerCase()];
  };

  const isLetter = char => char.match(/[a-zA-Z]/) !== null;

  const isNumberOrSpecialChar = numberOrSpecialChar =>
    numberOrSpecialChar.match(/[\*#]|\d/);

  const encodeNumberAndSpecialChar = numberOrSpecialChar => {
    holding = true;
    return numberOrSpecialChar + "-";
  };

  return message
    .split(" ")
    .map(encodeWord)
    .join("0");
};

const KEYBOARD_CODE = {
  " ": 0,
  ".": 1,
  ",": 11,
  "?": 111,
  "!": 1111,
  "'": "*",
  "-": "**",
  "+": "***",
  "=": "****",
  b: 22,
  c: 222,
  a: 2,
  b: 22,
  c: 222,
  d: 3,
  e: 33,
  f: 333,
  g: 4,
  h: 44,
  i: 444,
  j: 5,
  k: 55,
  l: 555,
  m: 6,
  n: 66,
  o: 666,
  p: 7,
  q: 77,
  r: 777,
  s: 7777,
  t: 8,
  u: 88,
  v: 888,
  w: 9,
  x: 99,
  y: 999,
  z: 9999
};

// find numbers divisible by a given number

const divisibleBy = (numbers, divisor) =>
  numbers.filter(number => number % divisor === 0);

// remove first and last character

const removeFirstAndLastCharacter = string =>
  string.substr(1, string.length - 2);

// return sum of array

const sumOfArray = array =>
  array.reduce((sum, currentValue) => sum + currentValue, 0);

// call closeset elevator

const ELEVATOR_NAMES = ["left", "right"];
const elevator = (left, right, calledFrom) => {
  return Math.abs(left - calledFrom) < Math.abs(right - calledFrom)
    ? ELEVATOR_NAMES[0]
    : ELEVATOR_NAMES[1];
};

// Last digit of a large number

const lastDigit = (str1, str2) => {
  return +!+str2 || Math.pow(str1.slice(-1) % 10, str2.slice(-2) % 4 || 4) % 10;
};

// default arguments

const defaultArguments = (func, args, funcStringified = func.toString()) => {
  const indexOfArgumentsStart = funcStringified.match(/\(/).index;
  const indexOfArgumentsEnd = funcStringified.match(/\)/).index + 1;
  let partiallyAppliedFunction = funcStringified.substr(
    0,
    indexOfArgumentsStart
  );
  let functionBody = funcStringified.substr(indexOfArgumentsEnd);
  funcStringified = funcStringified.slice(
    indexOfArgumentsStart,
    indexOfArgumentsEnd
  );
  for (const key of Object.keys(args)) {
    if (args.hasOwnProperty(key)) {
      const regExp = new RegExp(`(${key} = \\w+)|(${key})`);
      funcStringified = funcStringified.replace(
        regExp,
        `${key + " = " + args[key]}`
      );
    }
  }
  partiallyAppliedFunction += funcStringified + functionBody;
  console.log(partiallyAppliedFunction);
  return new Function("return (" + partiallyAppliedFunction + ");")();
};

var timesFive = (function() {
  var five = 5;
  return function(a) {
    return five * a;
  };
})();

function add(a, b) {
  return a + b;
}

// const add = (ab, b) => ab + b;
// var result = defaultArguments(timesFive, { a: 1 });
// console.log(result());
