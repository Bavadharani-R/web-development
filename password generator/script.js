const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("lengthValue");
const passwordDisplay = document.getElementById("password");
const strengthLabel = document.getElementById("strengthLabel");
const bars = document.querySelectorAll(".bar");

// Update slider value display
lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

document.getElementById("generateBtn").addEventListener("click", handleGenerate);
document.getElementById("copyBtn").addEventListener("click", copyPassword);

function handleGenerate() {
  const length = parseInt(lengthSlider.value);
  const includeUpper = document.getElementById("uppercase").checked;
  const includeLower = document.getElementById("lowercase").checked;
  const includeNumber = document.getElementById("numbers").checked;
  const includeSymbol = document.getElementById("symbols").checked;

  let characters = "";
  if (includeUpper) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLower) characters += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumber) characters += "0123456789";
  if (includeSymbol) characters += "!@#$%^&*()_+-={}[]";

  if (characters.length === 0) {
    alert("Please select at least one option.");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * characters.length);
    password += characters[randIndex];
  }

  passwordDisplay.textContent = password;
  updateStrength(password);
}

function copyPassword() {
  const password = passwordDisplay.textContent;
  navigator.clipboard.writeText(password)
    .then(() => {
      const btn = document.getElementById("copyBtn");
      btn.textContent = "✔️";
      setTimeout(() => btn.textContent = "📋", 1500);
    });
}

function updateStrength(password) {
  let strength = getStrength(password);
  strengthLabel.textContent = strength.toUpperCase();

  bars.forEach((bar, i) => {
    bar.classList.remove("filled");
  });

  if (strength === "Strong") {
    bars[0].classList.add("filled");
    bars[1].classList.add("filled");
    bars[2].classList.add("filled");
    bars[3].classList.add("filled");
  } else if (strength === "Medium") {
    bars[0].classList.add("filled");
    bars[1].classList.add("filled");
    bars[2].classList.add("filled");
  } else {
    bars[0].classList.add("filled");
  }
}

function getStrength(password) {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  if (password.length >= 16 && hasUpper && hasLower && hasNumber && hasSymbol) {
    return "Strong";
  } else if (password.length >= 10 && (hasUpper || hasLower) && hasNumber) {
    return "Medium";
  } else {
    return "Weak";
  }
}
