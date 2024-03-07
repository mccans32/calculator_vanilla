const VALID_KEYS = ["(", ")", "*", "/", "+", "-", ".", "Enter", "c"];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearButtons() {
    buttons = document.getElementsByTagName("button");
    for (let i=0; i<buttons.length; i++) {
        buttons[i].classList.remove("active");
    }
}

async function listenForKeys() {
  document.addEventListener("keydown", async (event) => {
    const keyName = event.key;
    button = document.getElementById(keyName.toUpperCase());
    if (!isNaN(keyName) || VALID_KEYS.includes(keyName)) {
      button.click();
      button.classList.add("active");
      await sleep(30);
      clearButtons();
    } else if (keyName === "Backspace") {
      backCalString();
    }
  });
}

listenForKeys();
