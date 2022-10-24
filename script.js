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
  // local scope variables and obj used in this function
  let numCharTypes = 0;
  let newPassword = "";
  let pwCharNums = [];
  const rulePatternArr = [];
  let minValidCharNum = 0;
  let maxValidCharNum = 0;
  const pwRules = {
    pwLength: 0,
    pwLowercase: false, // dec# 97-122
    pwUppercase: false, // dec# 65-90
    pwNumeric: false, // dec# 48-57
    pwSpecialChar: false // dec# 32-47, 58-64, 91-96, 123-126
  }

  // Loop to prompt and validate user input on password length
  while (pwRules.pwLength < 8) {
    // Use prompt() method to get user input on the length of the password
    pwRules.pwLength = prompt("Please enter the password length. It must be between 8 and 128 characters long.", 8);
    // convert pwLength from type string to number
    pwRules.pwLength = Number(pwRules.pwLength)

    // Validate input is acceptable by security criteria
    if (isNaN(pwRules.pwLength) || pwRules.pwLength < 8) {
      //Use the alert() method to inform the user of invalid input
      alert("ERROR! Invalid password length. A number of 8 or higher must be entered.");
      pwRules.pwLength = 0;
    }
  }

  // Loop through character types user selections until at least one type is chosen
  do {
    // Use the alert() method to warn the user that 1 of the next 4 prompts must be ok'd
    alert("Warning! The user must select at least one of the next four prompts.");
    // Use the confirm() method to prompt the user to confirm the character types to use
    pwRules.pwLowercase = confirm("Should the password use lowercase characters?");
    pwRules.pwUppercase = confirm("Should the password use uppercase characters?");
    pwRules.pwNumeric = confirm("Should the password use numeric characters?");
    pwRules.pwSpecialChar = confirm("Should the password use special characters?");

    // Loop through pwRules obj checking if the user confirmed any character types to use
    for (let x in pwRules) {
      if (pwRules[x] && x != "pwLength") {
        numCharTypes++;
      }
    }
  } while (numCharTypes < 1);

  // Build the pw criteria pattern as an array of numbers
  for (let x in pwRules) {
    switch (x) {
      case "pwLowercase":
        if (pwRules[x]) {
          rulePatternArr.push(97, 122);
        }
        break;
      case "pwUppercase":
        if (pwRules[x]) {
          rulePatternArr.push(65, 90);
        }
        break;
      case "pwNumeric":
        if (pwRules[x]) {
          rulePatternArr.push(48, 57);
        }
        break;
      case "pwSpecialChar":
        if (pwRules[x]) {
          rulePatternArr.push(32, 47, 58, 64, 91, 96, 123, 126);
        }
        break;
      default:
        break;
    }
  }
  // Sort the array of numbers and grab the lowest and highest from the array
  rulePatternArr.sort(function(a, b) {return a-b});
  minValidCharNum = rulePatternArr[0];
  maxValidCharNum = rulePatternArr[rulePatternArr.length -1];
  console.log(`min rule val = ${minValidCharNum}; max rule val = ${maxValidCharNum}`);

  // Create default array for the password length
  pwCharNums = new Uint8Array(pwRules.pwLength);

  // Loop through array assigning random numbers to each index
  pwCharNums.forEach((val, index) => {
    let validNum = false;
    console.log(`charnum arr index: ${index}`)
    // Loop that generates a random number and checks it against the rulePatternArr
    do {
      // generate a random number between 32 and 126 depending on user selected rules
      pwCharNums[index] = Math.floor((Math.random() * (maxValidCharNum - minValidCharNum)) + minValidCharNum);

      /* Validate the random number with the rulePatternArr variable/array 
      incase the char dec code has gaps between character groups*/
      console.log(`rand num: ${pwCharNums[index]}`);
      for (let i = 0; i < rulePatternArr.length; i += 2) {
        console.log(`rule loop index: ${i}`);
        if (pwCharNums[index] >= rulePatternArr[i] && pwCharNums[index] <= rulePatternArr[i+1]) {
          validNum = true;
        }
        console.log(`new num: ${pwCharNums[index]}`);
      }
      console.log(`valid num boolean: ${validNum}`);
      //validNum = true;
      
    } while (!validNum);

    


  });

  console.log(pwCharNums);

  return "password-here" // TO DO - add completed password
}

// TO DO - Use the Math.random() method to determine characters used in the password

/* TO DO - Validate that at least 1 of each of the user selected character types is used
otherwise, regenerate the password before returning it*/
// TO DO - I can use a RegExp pattern and the test() method to validate

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
