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

/* Function that returns a password fitting the user selected criteria
and validates that the minimum acceptable was selected*/

const generatePassword = () => {
  // local scope variables used in this function
  let pwLength = 0;

  // Loop to prompt and validate user input on password length
  while (pwLength < 8) {
    // Use prompt() method to get user input on the length of the password
    pwLength = prompt("Please enter the password length. It must be between 8 and 128 characters long.", 8);
    // convert pwLength from type string to number
    pwLength = Number(pwLength)

    // Validate input is acceptable by security criteria
    if (isNaN(pwLength) || pwLength < 8) {
      //Use the alert() method to inform the user of invalid input
      alert("ERROR! Invalid password length. A number of 8 or higher must be entered.");
      pwLength = 0;
    }
  };






  return "password-here" // TO DO - add completed password
}

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
