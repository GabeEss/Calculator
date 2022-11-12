const dis = document.querySelector('#disp-box'); // get input element as global constant
let storedOp = null; // stored operator value
let storedNum1 = null; // stored first number value
let storedNum2 = null; // stored second number value
let storedRes = null; // stored result

beginScript();

function beginScript()
{
    dis.value = "0";

    let numberButtons = document.querySelectorAll(".num"); // get node list of numbers
    numberButtons.forEach(display); // add event listeners for each number

    let operatorButtons = document.querySelectorAll(".operator"); // operator list
    operatorButtons.forEach(store); // event listener for operators

    let negPos = document.querySelector('#neg-pos'); 
    negPos.addEventListener('click', () => makeNegPos()) // make number negative or positive
    window.addEventListener('keydown', (event) => {
        if(event.code == "KeyN") negPos.click();
    }, false);

    let clearButton = document.querySelector("#clear");
    clearButton.addEventListener('click', () => clear());
    window.addEventListener('keydown', (event) => {
        if(event.code == "KeyC") clearButton.click();
    }, false);

    let equalsButton = document.querySelector("#equals"); 
    equalsButton.addEventListener('click', () => equals());
    window.addEventListener('keydown', (event) => {
        if(event.shiftKey); // so that you can use the plus key
        else
            if(event.code == "Equal") equalsButton.click();
    }, false);

    let backspaceButton = document.querySelector("#backspace"); // delete button
    backspaceButton.addEventListener('click', () => backspace());
    window.addEventListener('keydown', (event) => {
        if(event.code == "Backspace") backspaceButton.click();
    }, false);

}

// This function executes when a number button is clicked or a number key is pressed
// down.
function display(item)
{
    // Listen for a number button on click.
    item.addEventListener('click', () => setDisplay(item))

    // Listen for the number button when a key is pressed.
    window.addEventListener('keydown', (event) => {

        if(event.code === 'Digit8' && event.shiftKey); // so that we can multiply
        else {
            // Checks to see if the number key corresponds to the correct item.
            if(event.code === `Digit${item.textContent}`)
            {
                setDisplay(item);
            }
            else if(event.code === 'Period' && item.textContent == '.')
            {
                setDisplay(item);
            };
    }
    }, false);
}

function setDisplay(item)
{
    // If the first stored number is full and the second is empty.
    // This will occur during the second half of an expression.
    if(storedNum1 != null && storedOp != null && storedNum2 == null)
    {
        dis.value = item.textContent; // replace number in the display

        storedNum2 = 0; // this is to make sure this condition is only passed once
                        // the stored second number is used when the equals
                        // button is pressed
    }
    // If a number is pressed and the display shows the last result.
    else if(storedRes != null)
    {
        storedRes = null; // reset the result
        dis.value = item.textContent; // reset the display
    }
    else {
        if(dis.value.includes(".")) // if a decimal exists
            if(item.textContent.includes(".")); // ignore future inputted decimals
            else
                dis.value += item.textContent;
        else
        {
            if(dis.value == 0)
                dis.value = item.textContent; // replace 0
            else
                dis.value += item.textContent; // add numbers to the display value
        }
    }
    
}

// This function executes when an operator button is clicked or the key is pressed.
function store(item)
{
    // Listen for an operator button on click.
    item.addEventListener('click', () => setOperatorSetResult(item));

    // Listen for the operator button when a key is pressed.
    window.addEventListener('keydown', (event) => {
        if(event.code === `Minus` && item.textContent === `-`)
        {
            setOperatorSetResult(item);
        }
        else if(event.code === 'Slash' && item.textContent === '/')
        {
            setOperatorSetResult(item);
        }
        // used event.key instead of event.code because event.code returned "Equal"
        else if(event.shiftKey && event.code == 'Equal' && item.textContent === `+`)
        {
            setOperatorSetResult(item);
        }
        else if(event.shiftKey && event.code == 'Digit8' && item.textContent === `*`)
        {
            setOperatorSetResult(item);
        }
        else;
    }, false);
}

function setOperatorSetResult(item)
{
    // This block calculates the result of storedNum1 and storedNum2
    if(storedNum2 != null) 
    {
        storedNum2 = dis.value; // update storedNum2
        storedRes = operate(storedOp, storedNum1, storedNum2); // calculate
        dis.value = storedRes; // display
        storedNum1 = null; // reset storedNum1
        storedNum2 = null; // reset storedNum2
    }
    // This block stores the first number if the second has not been initialized.
    // Checks to make sure we're not storing NaN due to multiple operator inputs.
    else if(!isNaN(parseFloat(dis.value))) 
    {
        if(dis.value.includes("."))
            storedNum1 = parseFloat(dis.value); // if there is a decimal, store a float
        else
            storedNum1 = parseInt(dis.value);
    }

    // This block stores the operator.
    if(storedNum1 != null || storedRes != null)
    {
        // This will occur if you have a result in the display and an operator button
        // is pressed.
        if(storedRes != null)
        {
            storedNum1 = storedRes; // the result is the new storedNum1
            storedRes = null;
        }

        storedOp = item.textContent; // stores the operator
    }
}

function equals()
{
    // display calculation of storedNum1 and storedNum2
    if(storedNum2 != null)
    {
        storedNum2 = dis.value; // update storedNum2
        storedRes = operate(storedOp, storedNum1, storedNum2); // calculate and store
        dis.value = storedRes; // update display
        storedNum2 = null; // reset storedNum2
        storedOp = null; // reset stored operator
    }
    else if(storedNum1 != null)
        storedOp = null;
    // do nothing if the first stored number hasn't been initialized
    else;
}

// Takes the current number in the display and makes it either positive or negative
function makeNegPos()
{
    if(dis.value.includes("."))
        number = parseFloat(dis.value);
    else number = parseInt(dis.value);

    if(number > 0)
       dis.value = "-" + dis.value;
    else
    {
        if(dis.value != 0)
            dis.value = dis.value.substring(1, dis.value.length);
        else;
    } 
}

function clear()
{
    dis.value = "0";
    storedOp = null;
    storedNum1 = null;
    storedNum2 = null;
    storedRes = null;
}

function backspace()
{   
        if(dis.value != 0) {    
        if(storedRes == null)
            dis.value = dis.value.substring(0, dis.value.length - 1);

        if(storedNum2 == null) // if the second half of the expression has not started
        {
            storedOp = null; // reset these values to be reinitialized by the store function
            storedNum1 = null;
        }
    }
    else;
}

function operate(operator, num1, num2)
{
    if(operator == "+")
    {
        return add(num1, num2);
    }
    else if(operator == "-")
    {
        return subtract(num1, num2);
    }
    else if(operator == "*")
    {
       return multiply(num1, num2);
    }
    else if(operator == "/")
    {
       return divide(num1, num2);
    }
}

function add(num1, num2)
{
    // Took this from stackoverflow. Converts number to a string. Splitting at ".".
    // Returns the last part of the array or 0 if undefined.
    Number.prototype.countDecimals = function () {

        if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    
        var str = this.toString();
        if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
            return str.split("-")[1] || 0;
        } else if (str.indexOf(".") !== -1) {
            return str.split(".")[1].length || 0;
        }
        return str.split("-")[1] || 0;
    }

    num = Number(num1) + Number(num2); // get number
    
    if(num.countDecimals() > 6) // if over 6 decimals, round to 6 decimals
        return parseFloat(num.toFixed(6));
    else
        return num;

}

function subtract(num1, num2)
{
    Number.prototype.countDecimals = function () {

        if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    
        var str = this.toString();
        if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
            return str.split("-")[1] || 0;
        } else if (str.indexOf(".") !== -1) {
            return str.split(".")[1].length || 0;
        }
        return str.split("-")[1] || 0;
    }

    num = Number(num1) - Number(num2);

    if(num.countDecimals() > 6)
        return parseFloat(num.toFixed(6));
    else return num;
}

function multiply(num1, num2)
{
    Number.prototype.countDecimals = function () {

        if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    
        var str = this.toString();
        if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
            return str.split("-")[1] || 0;
        } else if (str.indexOf(".") !== -1) {
            return str.split(".")[1].length || 0;
        }
        return str.split("-")[1] || 0;
    }

    num = Number(num1 * num2);
    if(num.countDecimals() > 6)
        return parseFloat(num.toFixed(6));
    else return num;
}

function divide(num1, num2)
{
    Number.prototype.countDecimals = function () {

        if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    
        var str = this.toString();
        if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
            return str.split("-")[1] || 0;
        } else if (str.indexOf(".") !== -1) {
            return str.split(".")[1].length || 0;
        }
        return str.split("-")[1] || 0;
    }

    if(num2 == 0)
    {
        alert("Don't divide by zero.");
        if(num1.countDecimals() > 6)
            return parseFloat(num1.toFixed(6));
        else return num1;
    }
    else
    {
        num = Number(num1/num2);
        if(num.countDecimals() > 6)
            return parseFloat(num.toFixed(6));
        else return num;
    }
}