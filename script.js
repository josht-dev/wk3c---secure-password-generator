// Assignment code here

/* Function that returns a password fitting the user selected criteria
and validates that the minimum acceptable was selected*/
const generatePassword = () => {
  // local scope variables, arrays, and objects used in this function
  const pwRules = {
    pwLength: 0,
    pwLowercase: false, // dec# 97-122
    pwUppercase: false, // dec# 65-90
    pwNumeric: false, // dec# 48-57
    pwSpecialChar: false // dec# 32-47, 58-64, 91-96, 123-126
  }
  let numCharTypes;
  const rulePatternArr = [];
  let minValidCharNum = 0;
  let maxValidCharNum = 0;
  let pwCharNums = [];
  let validated;
  let loopCounter = 0;
  let newPassword = "";

/* Random number generation for decimal character code Function so it can be called 
  again if all user criteria was not used at least once*/
  const pwCharCodeGen = () => {
    // Loop through array assigning random numbers to each index
    pwCharNums.forEach((val, index) => {
      let validNum = false;
      // Loop that generates a random number and checks it against the rulePatternArr
      do {
        // generate a random number between 32 and 126 depending on user selected rules
        val = Math.floor((Math.random() * (maxValidCharNum - minValidCharNum)) + minValidCharNum);
        pwCharNums[index] = val;

        /* Validate the random number with the rulePatternArr variable/array 
        incase the char dec code has gaps between character groups*/
        for (let i = 0; i < rulePatternArr.length; i += 2) {
          if (val >= rulePatternArr[i] && val <= rulePatternArr[i+1]) {
            validNum = true;
          }
        }
      } while (!validNum);
    });
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
    numCharTypes = 0;
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

  // Create default array for the password length and pre-fill with 0
  pwCharNums = Array(pwRules.pwLength);
  pwCharNums.fill(0);

  // Generate the random character decimal code and validate it against user criteria
  do {
    const pwRulesValidated = {}
    validated = true;
    loopCounter++

    // Call function to generate random character code numbers
    pwCharCodeGen();

    // validate at least 1 of each user criteria is used
    for (let x in pwRules) {
      switch (x) {
        case "pwLowercase":
          if (pwRules[x]) {
            // If rule is true, check for at least 1 use of it in new password
            pwRulesValidated[x] = pwCharNums.some((val, index) => {return val >= 97 && val <= 122;});
          }
          break;
        case "pwUppercase":
          if (pwRules[x]) {
            // If rule is true, check for at least 1 use of it in new password
            pwRulesValidated[x] = pwCharNums.some((val, index) => {return val >= 65 && val <= 90;});
          }
          break;
        case "pwNumeric":
          if (pwRules[x]) {
            // If rule is true, check for at least 1 use of it in new password
            pwRulesValidated[x] = pwCharNums.some((val, index) => {return val >= 48 && val <= 57;});
          }
          break;
        case "pwSpecialChar":
          if (pwRules[x]) {
            // If rule is true, check for at least 1 use of it in new password
            pwRulesValidated[x] = pwCharNums.some((val, index) => {
              return (val >= 32 && val <= 47) || (val >= 58 && val <= 64) || 
              (val >= 91 && val <= 96) || (val >= 123 && val <= 126);
            });
          }
          break;
        default:
          break;
      }
    }
    for (let x in pwRulesValidated) {
      if (!pwRulesValidated[x]) {
        validated = false;
        break;
      }
    }

    // break loop if it iterates over 10 times
    if (loopCounter > 10) {
      // Alert user if script did not create pw that used all criteria
      alert("Warning! Random generation did not contain all user criteria. Please try generating another password or use what was generated with missing criteria.");
      validated = true;
      break;
    }
  } while (!validated);

  // Convert the pwCharNums array decimal codes to their basic latin characters
  pwCharNums.forEach((val, index) => {
    newPassword += String.fromCharCode(val);
  });

  return newPassword;
}

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