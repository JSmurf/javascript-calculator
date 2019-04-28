// Object to hold the memory of the calculator
var calcMem = {
    currentValue: "0",
    storedValue: "0",
    total: "",
    operator: "",
    memory: "",
    evaluated: false
};
// Function to calculate the total
function evaluate(first, second, operator) {
    // All three of these arguments are strings
    // We can use one line to build our expression, evaluate it, and return it
    return eval(first + operator + second);
}
// Function to update the display
function updateDisplay(str) {
    // Target the screen div
    var screen = document.querySelectorAll('.textBox')[0];
    // Set the screen's inner HTML to the input string
    screen.innerHTML = str;
}
// Feed in the button's id, and the current calculator memory object
function handleButtonPress(id, input) {
    var newMem = input;
    // Check to see if we have just evaluated a previous expression
    switch (newMem.evaluated) {
    case false:
        switch (id) {
        case "total":
            // If the "=" button was pressed
            // Check to see if there has been an operator entered
            if (newMem.operator != "") {
                // Evaluate the operation
                if (newMem.lastEntered) {
                    newMem.storedValue = newMem.lastEntered;
                } else {
                    newMem.lastEntered = newMem.currentValue;
                }
                var newTotal = evaluate(newMem.storedValue, newMem.currentValue, newMem.operator);
                if (newTotal.toString().length > 11) {
                    newTotal = newTotal.toExponential(4);
                }
                newMem.storedValue = newMem.currentValue;
                // Switch the evaluated to true so that we know we've done math
                newMem.evaluated = true;
                // Change the current value to the newly expressed value
                newMem.currentValue = newTotal;
            }
            break;
        case "clrAll":
            // If the "A/C" button was pressed
            // Reset all of the vars to empty strings
            newMem.currentValue = "0";
            newMem.storedValue = "0";
            newMem.operator = "";
            newMem.memory = "";
            break;
        case "clrOne":
            // If the "C" button was pressed
            // "Undo" the last operator + number just the currentValue variable
            newMem.currentValue = newMem.storedValue;
            newMem.storedValue = "0";
            newMem.operator = "";
            newMem.lastEntered = "";
            // NOTE: Previously this would only delete the last key entered, but this behavior matches actual calculators
            break;
        case "memAdd":
            // If the "M+" button was pressed
            // Set the memory var to the current value
            newMem.memory = newMem.currentValue;
            break;
        case "memRec":
            // If the "M" button was pressed
            // Set the current value to the memory var
            newMem.currentValue = newMem.memory;
            break;
        case "neg":
            // If the "+/-" button is pressed
            if (newMem.currentValue[0] == "-") {
                // If the current Value is negative, remove the "-"
                newMem.currentValue = newMem.currentValue.slice(1);
            } else {
                // If it isn't negative, add a "-"
                newMem.currentValue = "-" + newMem.currentValue;
            }
            break;
        case "sqr":
            // If the "square" button is pressed
            // Calculate the current value squared, and set the current value to that
            newMem.currentValue = Math.pow(newMem.currentValue, 2);
            // We then want to set evaluated to true, so that we know that we just did an operation
            newMem.evaluated = true;
            break;
        case "sqrt":
            // If the "square root" button is pressed
            // Calculate the current value squared, and set the current value to that
            newMem.currentValue = Math.sqrt(newMem.currentValue);
            // We then want to set evaluated to true, so that we know that we just did an operation
            newMem.evaluated = true;
            break;
        case ".":
            // If the "." button is pressed
            var periodCheck = new RegExp("[.]");
            if (!periodCheck.test(newMem.currentValue)) {
                newMem.currentValue+= ".";
            }
            break;
        case "/":
        case "+":
        case "*":
        case "-":
            newMem.operator = id;
            newMem.storedValue = newMem.currentValue;
            newMem.currentValue = "0";
            break;
        default:
            // All that should be left is the numbers
            if (newMem.currentValue.toString().length > 9) {
                console.log("Digit limit met");
            } else {
                if (newMem.currentValue == "0") {
                    newMem.currentValue = id;
                } else if (newMem.currentValue == "-0") {
                    newMem.currentValue = "-" + id;
                } else {
                newMem.currentValue += id;
                }
            }
            break;
        }
        break;
    case true:
        // If we have already done math
        if (id == "total") {
            // If "=" button is pressed again, re-run last operation.
            newMem.evaluated = false;
            newMem = handleButtonPress(id, newMem);
        } else if (!isNaN(id)) {
            newMem.lastEntered = "";
            newMem.currentValue = "0";
            newMem.evaluated = false;
            newMem.operator = "";
            newMem = handleButtonPress(id, newMem);
        } else {
            newMem.lastEntered = "";
            newMem.storedValue = newMem.currentValue;
            newMem.evaluated = false;
            newMem.operator = "";
            newMem = handleButtonPress(id, newMem);
        }
        break;
    }
    // Return the new memory object that we've created an updated
    return newMem;
}
function loadCalc() {
    // Target all buttons on the page
    var buttons = document.querySelectorAll('button');
    // Iterate over buttons to add event listener
    for (var i = 0; i < buttons.length; i ++) {
        buttons[i].addEventListener('click', function(event) {
            // Prevent browser default
            event.preventDefault();
            // Handle the button press, and then update the screen
            calcMem = handleButtonPress(this.id, calcMem);
            updateDisplay(calcMem.currentValue);
        });
    }
    // Set the display so that it's not empty when the calculator loads
    // From a testing standpoint, this also lets us know that the page loaded properly
    updateDisplay(calcMem.currentValue);
}
