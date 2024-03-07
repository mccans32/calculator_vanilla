const SYMBOLS = ["(", ")", "*", "/", "+", "-", "."]; 

document.addEventListener(
    "keydown",
    (event) => {
        const keyName = event.key;
        console.log(keyName);
        if (!isNaN(keyName) || SYMBOLS.includes(keyName)) {
            addToCalcString(keyName);
        }  
        else if (keyName === "Enter") {
            calculateTotal();
        }
        else if (keyName === "c") {
            clearScreen();
        }
    }
)