const dis = document.querySelector('#disp-box'); // get input element as global constant
let storedOp = null; // stored operator value
let storedNum1 = null; // stored first number value
let storedNum2 = null; // stored second number value

beginScript();

function beginScript()
{
    let numberButtons = document.querySelectorAll(".num"); // get node list of numbers
    numberButtons.forEach(display); // add event listeners for each number

    let operatorButtons = document.querySelectorAll(".operator"); // operator list
    operatorButtons.forEach(storeOpNum1); // event listener for operators

    let negPos = document.querySelector('#neg-pos');
    negPos.addEventListener('click', () => makeNegPos())

    let clearButton = document.querySelector("#clear"); // clear button
    clearButton.addEventListener('click', () => clear());
}

function display(item)
{
    item.addEventListener('click', function(){
    if(storedOp != null && storedNum2 == null) // checks to see if starting the second
                                            // half of the expression
    {
        dis.value = item.textContent; // replace operator with next number

        storedNum2 = 0; // this is to make sure this condition is only passed once
                        // the stored second number is used when the equals
                        // button is pressed
    }
    else {
        if(dis.value.includes(".")) // if a decimal exists
            if(item.textContent.includes(".")); // ignore future inputted decimals
            else
                dis.value += item.textContent; 
        else
            dis.value += item.textContent;
    }
    })
}

function storeOpNum1(item)
{
    item.addEventListener('click', function(){ 
        if(storedNum2 != null)
            storedNum2 = null; // make sure this value is reset before this event is fired

        // store the first number before the operator
        if(dis.value.includes("."))
            storedNum = parseFloat(dis.value); // if there is a decimal
        else
            storedNum = parseInt(dis.value);

        dis.value = item.textContent; // remove text and replace with operator
        storedOp = dis.value; // store the operator
        // console.log(storedNum);
        // console.log(typeof storedNum);
    });
}

function makeNegPos()
{
    // if(parseInt(dis.value) > 0)
       // dis.value.
}

function clear()
{
    dis.value = "";
    storedOp = null;
    storedNum1 = null;
    storedNum2 = null;
}

function operate(operator, num1, num2)
{
    if(operator == "+")
    {
        add(num1, num2);
    }
    else if(operator == "-")
    {
        subtract(num1, num2);
    }
    else if(operator == "*")
    {
        multiply(num1, num2);
    }
    else if(operator == "/")
    {
        divide(num1, num2);
    }
}

function add(num1, num2)
{
    return num1 + num2;
}

function subtract(num1, num2)
{
    return num1 - num2;
}

function multiply(num1, num2)
{
    return num1 * num2;
}

function divide(num1, num2)
{
    return num1/num2;
}