const alphabet = "abcdefghijklmnopqrstuvwxyz";

function encrypt(message, shiftValue) {
  function encryptLetter(letter, shift) {
    const isUpperCase = letter === letter.toUpperCase(); // Check if the letter is uppercase
    const letterIndex = alphabet.indexOf(letter.toLowerCase()); // Convert to lowercase for processing
    if (letterIndex === -1) return letter; // Return non-alphabetical characters unchanged
    const shiftLetter = (letterIndex + shift) % alphabet.length;
    const encryptedLetter = alphabet[shiftLetter];
    return isUpperCase ? encryptedLetter.toUpperCase() : encryptedLetter; // Return letter in original case
  }

  let encryptedMessage = "";
  for (let i = 0; i < message.length; i++) {
    encryptedMessage += encryptLetter(message[i], shiftValue);
    if ((i + 1) % 2 === 0) {
      const randomLetter = Math.floor(Math.random() * alphabet.length);
      encryptedMessage += alphabet[randomLetter]; // Add a random letter every 2 characters
    }
  }
  return encryptedMessage;
}

function decrypt(encryptedMessage, shiftValue) {
  function decryptLetter(letter, shift) {
    const isUpperCase = letter === letter.toUpperCase(); // Check if the letter is uppercase
    const letterIndex = alphabet.indexOf(letter.toLowerCase()); // Convert to lowercase for processing
    if (letterIndex === -1) return letter; // Return non-alphabetical characters unchanged
    const nonNegativeShift = shift % alphabet.length;
    const shiftLetter =
      (letterIndex - nonNegativeShift + alphabet.length) % alphabet.length;
    const decryptedLetter = alphabet[shiftLetter];
    return isUpperCase ? decryptedLetter.toUpperCase() : decryptedLetter; // Return letter in original case
  }

  let decryptedMessage = "";
  for (let i = 0; i < encryptedMessage.length; i++) {
    if ((i + 1) % 3 !== 0) {
      // Skip every 3rd/randomly-added letter
      decryptedMessage += decryptLetter(encryptedMessage[i], shiftValue);
    }
  }
  return decryptedMessage;
}
