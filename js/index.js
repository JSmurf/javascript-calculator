// Object to hold the memory of the calculator
var calcMem = {
    currentValue: "0",
    storedValue: "0",
    lastEntered: "",
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
// Function to truncate number if it has too many digits
function getTotalToDisplay(num) {
    if (num.toString().length > 11) {
        num = num.toExponential(4);
    }
    return num;
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
                if (newMem.lastEntered == "") {
                    newMem.lastEntered = newMem.currentValue;
                } else {
                    newMem.currentValue = newMem.lastEntered;
                }
                // Evaluate the operation
                var newTotal = evaluate(newMem.storedValue, newMem.currentValue, newMem.operator);
                newTotal = getTotalToDisplay(newTotal);
                newMem.storedValue = newTotal;
                // Switch the evaluated to true so that we know we've done math
                newMem.evaluated = true;
                // Change the current value to the newly expressed value
                newMem.total = newTotal;
            } else {
                console.log("No operator entered");
            }
            break;
        case "clrAll":
            // If the "A/C" button was pressed
            // Reset all of the vars to original values
            newMem.currentValue = "0";
            newMem.storedValue = "0";
            newMem.total = "";
            newMem.operator = "";
            newMem.memory = "";
            newMem.total = "";
            break;
        case "clrOne":
            // If the "C" button was pressed
            // "Undo" the last operator + number just the currentValue variable
            newMem.currentValue = newMem.storedValue;
            newMem.storedValue = "0";
            newMem.operator = "";
            newMem.lastEntered = "";
            newMem.total = "";
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
            var sqrTotal = Math.pow(newMem.currentValue, 2);
            sqrTotal = getTotalToDisplay(sqrTotal);
            newMem.currentValue = sqrTotal;
            newMem.total = sqrTotal;
            // We then want to set evaluated to true, so that we know that we just did an operation
            newMem.evaluated = true;
            break;
        case "sqrt":
            // If the "square root" button is pressed
            // Calculate the current value squared, and set the current value to that
            var sqrtTotal = Math.sqrt(newMem.currentValue);
            sqrtTotal = getTotalToDisplay(sqrtTotal);
            newMem.currentValue = sqrtTotal;
            newMem.total = sqrtTotal;
            // We then want to set evaluated to true, so that we know that we just did an operation
            newMem.evaluated = true;
            break;
        case ".":
            // If the "." button is pressed
            // Check to see if the current value has a period in it
            var periodCheck = new RegExp("[.]");
            if (!periodCheck.test(newMem.currentValue)) {
                // If it doesn't add a period to the current value
                newMem.currentValue+= ".";
            } else {
                console.log("Current Value already contains a decimal point");
            }
            break;
        case "/":
        case "+":
        case "*":
        case "-":
            // If an operator is pressed
            // Set the operator value to the id
            newMem.operator = id;
            // Move the current value to the stored value, and reset the current value
            newMem.storedValue = newMem.currentValue;
            newMem.currentValue = "";
            break;
        default:
            // All that should be left is the numbers
            if (newMem.currentValue.toString().length > 9) {
                // If there's already 10 digits, don't allow any more, this keeps the numbers able to fit in the box
                console.log("Digit limit met");
            } else {
                // If the current value is 0, replace it, so that there's no 0-padding at the start
                if (newMem.currentValue == "0") {
                    newMem.currentValue = id;
                } else if (newMem.currentValue == "-0") {
                    newMem.currentValue = "-" + id;
                } else {
                    // If the value isn't 0, just add the new digit onto the end
                    newMem.currentValue += id;
                }
            }
            // End the !evaluated block
            break;
        }
        if (newMem.total === "") {
            // If the enter key was not just pressed, the total would be ""
            // Therefore, just display the current value
            updateDisplay(newMem.currentValue);
        } else {
            // If the total is any other value, it means that it was just evaluated, so use the total
            updateDisplay(newMem.total);
        }
        break;
    case true:
        // If we have already done math
        switch (id) {
        case "total":
            // If "=" button is pressed again, re-run last operation.
            // Set the evaluated to false so that the above code runs
            newMem.evaluated = false;
            // Set the current value to the last entered value
            newMem.currentValue = newMem.lastEntered;
            newMem = handleButtonPress(id, newMem);
            break;
        case "*":
        case "/":
        case "+":
        case "-":
            // If an operator is entered
            // Set the current value to the total
            newMem.currentValue = newMem.total;
            // Reset all other values except stored value
            newMem.lastEntered = "";
            newMem.evaluated = false;
            newMem.operator = "";
            newMem.total = "";
            // Run the above code for operator entered
            newMem = handleButtonPress(id, newMem);
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            // If a number is entered
            // Reset all values except stored value
            newMem.currentValue = "0";
            newMem.lastEntered = "";
            newMem.evaluated = false;
            newMem.operator = "";
            newMem.total = "";
            // Run the above code for number entered
            newMem = handleButtonPress(id, newMem);
            break;
        case "clrAll":
        case "clrOne":
            // If a clear button is pressed, reset evaluated and then re-run
            newMem.evaluated = false;
            newMem = handleButtonPress(id, newMem);
            break;
        case "memAdd":
            // If the memory add button is pressed, add the total to the memory
            newMem.memory = newMem.total;
            newMem.evaluated = false;
            break;
        case "sqr":
        case "sqrt":
            // If squaring or rooting, make sure the currentValue is the total
            newMem.currentValue = newMem.total;
            newMem.evaluated = false;
            newMem = handleButtonPress(id, newMem);
            break;
        }
        break;
    }
    // Return the new memory object that we've created an updated
    return newMem;
}
// Function to set all event listeners
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
        });
    }
    // Set the display so that it's not empty when the calculator loads
    // From a testing standpoint, this also lets us know that the page loaded properly
    updateDisplay(calcMem.currentValue);
}
// Function to add ability to use keyboard
document.onkeydown = function(e) {
    // Variable that represents the "name" of the key (if a letter or number)
    var key = String.fromCharCode(e.keyCode);
    // Variable that represents the code for the key
    var code = e.keyCode;
    // We can use switch/cases as is they're a ton of if statements
    switch (key) {
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "9":
    case "0":
        // If the key is a number, just enter that number
        handleButtonPress(key, calcMem);
        break;
    case "8":
        // If the number is 8, check if shift is held
        if (event.shiftKey) {
            // If so, then the user wants to multiply
            handleButtonPress("*", calcMem);
        } else {
            // Otherwise, enter an "8"
            handleButtonPress(key, calcMem);
        }
        break;
    case "X":
        // We can also count the "X" key as a multiplication sign
        handleButtonPress("*", calcMem);
        break;
    }
    // Same thing here, but with the keycode, since these aren't as easy to work with
    switch (code) {
    case 13:
        // If the Enter key is pressed, process as an equals
        handleButtonPress("total", calcMem);
        break;
    case 187:
        // If the "=" key is pressed, check if the shift key is held
        if (event.shiftKey) {
            // If so, process as a "+"
            handleButtonPress("+", calcMem);
        } else {
            // If not, process as an equals
            handleButtonPress("total", calcMem);
        }
        break;
    case 189:
        // 189 is the minus key, we don't need to worry about shift
        handleButtonPress("-", calcMem);
        break;
    case 106:
        // 106 is the multiply key on the numberpad
        handleButtonPress("*", calcMem);
        break;
    case 107:
        // 107 is the add key on the numberpad
        handleButtonPress("+", calcMem);
        break;
    case 108:
    case 110:
        // 108 and 110 are both periods
        handleButtonPress(".", calcMem);
        break;
    case 109:
        // 109 is the subtract key on the numberpad
        handleButtonPress("-", calcMem);
        break;
    case 111:
        // 111 is the divide key on the numberpad
        handleButtonPress("/", calcMem);
        break;
        // NOTE: This doesn't allow for exponents and memory functions with the keyboard
        // But I think basic functionality is fine for now
    }
};
