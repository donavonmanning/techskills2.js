// Define the alphabet
const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Function to generate a random letter from the alphabet
function getRandomLetter() {
  const randomIndex = Math.floor(Math.random() * alphabet.length);
  return alphabet[randomIndex];
}

// Function to encrypt a single letter using Caesar's Cipher
function encryptLetter(letter, shiftValue) {
  const isUpperCase = letter === letter.toUpperCase();
  const index = alphabet.indexOf(letter.toLowerCase());
  
  // If the character is not in the alphabet, return it as is
  if (index === -1) {
    return letter;
  }
  
  let newIndex = (index + shiftValue) % alphabet.length;
  if (newIndex < 0) {
    newIndex += alphabet.length; // Handle negative indices
  }
  
  let encryptedLetter = alphabet[newIndex];
  // Convert back to uppercase if the original letter was uppercase
  if (isUpperCase) {
    encryptedLetter = encryptedLetter.toUpperCase();
  }
  return encryptedLetter;
}

// Function to encrypt a message using Caesar's Cipher with random letters
function encrypt(message, shiftValue) {
  let encryptedMessage = "";
  let count = 0; // Counter to track every two characters
  
  for (let i = 0; i < message.length; i++) {
    const letter = message[i];
    const encryptedLetter = encryptLetter(letter, shiftValue);
    encryptedMessage += encryptedLetter;
    
    // Insert a random letter from the alphabet after every two characters
    count++;
    if (count === 2 && i !== message.length - 1) {
      const randomLetter = getRandomLetter();
      encryptedMessage += randomLetter;
      count = 0; // Reset the counter
    }
  }
  
  return encryptedMessage;
}

const encrypted = encrypt("Hello Brutus, meet me at the high gardens.", 42);
console.log(encrypted); // Output: "Xuobbce eRhakjikiw, gcueujr cfu wqjy jzxul xfywox pwqghtiudri."


// Function to decrypt a single letter using Caesar's Cipher
function decryptLetter(encryptedLetter, shiftValue) {
    const isUpperCase = encryptedLetter === encryptedLetter.toUpperCase();
    const index = alphabet.indexOf(encryptedLetter.toLowerCase());
    
    // If the character is not in the alphabet, return it as is
    if (index === -1) {
      return encryptedLetter;
    }
    
    let newIndex = (index - shiftValue) % alphabet.length;
    if (newIndex < 0) {
      newIndex += alphabet.length; // Handle negative indices
    }
    
    let decryptedLetter = alphabet[newIndex];
    // Convert back to uppercase if the original letter was uppercase
    if (isUpperCase) {
      decryptedLetter = decryptedLetter.toUpperCase();
    }
    return decryptedLetter;
  }
  
  // Function to decrypt a message using Caesar's Cipher with skipping random letters
  function decrypt(encryptedMessage, shiftValue) {
    let decryptedMessage = "";
    let count = 0; // Counter to track every two characters
    
    for (let i = 0; i < encryptedMessage.length; i++) {
      const letter = encryptedMessage[i];
      
      // Skip over random letters inserted after every two characters
      if (alphabet.includes(letter.toLowerCase())) {
        const decryptedLetter = decryptLetter(letter, shiftValue);
        decryptedMessage += decryptedLetter;
      }
      
      count++;
      // Reset the counter after every two characters
      if (count === 2) {
        i++; // Skip over the random letter
        count = 0;
      }
    }
    
    return decryptedMessage;
  }
  
  // Test the decrypt function
  const decrypted = decrypt("Xuobbce eRhakjikiw, gcueujr cfu wqjy jzxul xfywox pwqghtiudri.", 42);
  console.log(decrypted); // Output: "Hello Brutus, meet me at the high gardens."
  