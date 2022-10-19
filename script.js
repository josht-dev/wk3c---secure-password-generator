// Assignment code here

/* Accept Criteria:
GIVEN I need a new, secure password
WHEN I click the button to generate a password
THEN I am presented with a series of prompts for password criteria
WHEN prompted for password criteria
THEN I select which criteria to include in the password
WHEN prompted for the length of the password
THEN I choose a length of at least 8 characters and no more than 128 characters
WHEN asked for character types to include in the password
THEN I confirm whether or not to include lowercase, uppercase, numeric, and/or special characters
WHEN I answer each prompt
THEN my input should be validated and at least one character type should be selected
WHEN all prompts are answered
THEN a password is generated that matches the selected criteria
WHEN the password is generated
THEN the password is either displayed in an alert or written to the page
*/

/* TO DO - Write generatePassword() function that returns a password 
fitting the selected criteria*/

// TO DO - Use prompt() method to get user input on the length of the password

// TO DO - Validate input is acceptable by security criteria
// TO DO - Use the alert() method to inform the user of invalid input

// TO DO - Use the confirm() method to prompt the user to confirm the character types to use

// TO DO - Take user selected criteria to build a possible character array

// TO DO - Use the Math.random() method to determine characters used in the password

/* TO DO - Validate that at least 1 of each of the user selected character types is used
otherwise, regenerate the password before returning it*/

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
