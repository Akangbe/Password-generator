const PassLength = document.querySelector(".pass-length span");
const lengthSlider = document.querySelector(".pass-length input");
const passwordInput = document.querySelector(`.input-box input`);
const Options = document.querySelectorAll(".option input");

const PassIndicator = document.querySelector(".pass-indicator");
const Copyicon = document.querySelector(".input-box span");

const generateBtn = document.querySelector(".generate-btn");
//OBJECT OF LETTERS, NUMBER AND SYMBOL
const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  Numbers: "0123456789",
  Symbols: `<>-=+{}()*%$"!`,
};
const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    PassLength = lengthSlider.value;
  //LOOPING THROUGH EACH OPTION`S CHECKBOX
  Options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "ExcDuplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += ` ${staticPassword}  `;
      } else {
        excludeDuplicate = true;
      }
    }
  });
  for (let i = 0; i < PassLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  //   console.log(randomPassword);
  passwordInput.value = randomPassword;
};
const updatePassIndicator = () => {
  PassIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  //passing slider value as counterbtext in  the html
  PassLength.innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  Copyicon.innerText = "check";
  setTimeout(() => {
    Copyicon.innerText = "copy_all";
  }, 1500);
};
Copyicon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
console.log(copyPassword);
