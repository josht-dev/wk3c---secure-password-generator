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
  const pwRulesValidated = {}

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

  console.log(`Validate pwRules obj: `);
  console.log(pwRules);

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

  // Create default array for the password length and pre-fill with 0
  pwCharNums = Array(pwRules.pwLength);
  pwCharNums.fill(0);

  // Loop through array assigning random numbers to each index
  pwCharNums.forEach((val, index) => {
    let validNum = false;
    console.log(`charnum arr index: ${index}`)
    // Loop that generates a random number and checks it against the rulePatternArr
    do {
      // generate a random number between 32 and 126 depending on user selected rules
      /*pwCharNums[index]*/val = Math.floor((Math.random() * (maxValidCharNum - minValidCharNum)) + minValidCharNum);
      //val = pwCharNums[index];
      pwCharNums[index] = val;

      /* Validate the random number with the rulePatternArr variable/array 
      incase the char dec code has gaps between character groups*/
      //console.log(`rand num: ${pwCharNums[index]}`);
      console.log(`log val: ${val}`);
      for (let i = 0; i < rulePatternArr.length; i += 2) {
        console.log(`rule loop index: ${i}`);
        if (/*pwCharNums[index]*/val >= rulePatternArr[i] && /*pwCharNums[index]*/val <= rulePatternArr[i+1]) {
          validNum = true;
        }
        console.log(`new num: ${val}`);
      }
      console.log(`valid num boolean: ${validNum}`);
      //validNum = true;
      
    } while (!validNum);
  });

  console.log(pwCharNums);

  
  // validate at least 1 of each user criteria is used
  for (let x in pwRules) {
    switch (x) {
      case "pwLowercase":
        if (pwRules[x]) {
          // If rule is true, check for at least 1 use of it in new password
          pwRulesValidated[x] = pwCharNums.some((val, index) => {return val >= 97 && val <= 122;});
          console.log(`validate ${x}: ${pwRulesValidated[x]}`);
        }
        break;
      case "pwUppercase":
        if (pwRules[x]) {
          // If rule is true, check for at least 1 use of it in new password
          pwRulesValidated[x] = pwCharNums.some((val, index) => {return val >= 65 && val <= 90;});
          console.log(`validate ${x}: ${pwRulesValidated[x]}`);
        }
        break;
      case "pwNumeric":
        if (pwRules[x]) {
          // If rule is true, check for at least 1 use of it in new password
          pwRulesValidated[x] = pwCharNums.some((val, index) => {return val >= 48 && val <= 57;});
          console.log(`validate ${x}: ${pwRulesValidated[x]}`);
        }
        break;
      case "pwSpecialChar":
        if (pwRules[x]) {
          // If rule is true, check for at least 1 use of it in new password
          pwRulesValidated[x] = pwCharNums.some((val, index) => {
            return (val >= 32 && val <= 47) || (val >= 58 && val <= 64) || 
            (val >= 91 && val <= 96) || (val >= 123 && val <= 126);
          });
          console.log(`validate ${x}: ${pwRulesValidated[x]}`);
        }
        break;
      default:
        break;
    }
  }

  console.log('validate pwrulesvalidated: ');
  console.log(pwRulesValidated);

  for (let x in pwRulesValidated) {
    if (!pwRulesValidated[x]) {
      console.log(`validated rule as false; ${x}`);
    }
  }

  // Convert the pwCharNums array decimal codes to their basic latin characters
  pwCharNums.forEach((val, index) => {
    newPassword += String.fromCharCode(val);
    console.log(`val = ${val}`);
    console.log(`value = ${newPassword}`);
  });


  console.log(newPassword);

  return newPassword; // TO DO - add completed password
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
