//main function
function getBinary() {
    //gets info given by user
    let number = document.getElementById("number").value;

    if ((number < 0) || (isNaN(number) == true)) { //checks to see if input is not a number or is negative
        displayWarning();
    }
    else {
        getBinaryTrue(number);
    }
}

//tells user to only enter positive integers
function displayWarning() {
    document.getElementById("error_message").innerText = "Please enter positive integers only.";
    document.getElementById("binary").innerText = "";
}

function getBinaryTrue(num) {
    //calls convert() function to convert decimal to binary
    let result = convert(num);
    
    //displays result in the page
    document.getElementById("binary").innerText = result;
    document.getElementById("error_message").innerText = "";
}

//function for converting decimal to binary
function convert(num) {
    let result;
    let i = 0;

    if (ifInteger(num) == 1) { //checks if input is whole number or fractional. 1 is yes, 0 is no.
        return result = convertInteger(num);
    }
    else { //if input is 0, use different function catered to converting numbers with decimals
        return result = convertDecimal(num);
    }
}

//function for converting an integer/whole number to binary
function convertInteger(whole) {
    let i = 1, binary = 0, remainder;
   
    //begins conversion
    while (whole != 0) {
        remainder = (whole % 2) * i;
        whole = Math.floor(whole/2, 10);
        binary = binary + remainder;
        i = i*10;
    }

    return binary;
}

//function for converting fractional numbers to binary
function convertDecimal(dec) {
    let result = []; //array to contain final, combined result of decimal and whole number parts
    let whole = convertInteger(Math.floor(dec)); //takes the whole number part of the input to be combined later
    let binaryDec = []; //initialize array that will contain decimal portion of converted binary
    let fraction = dec - Math.floor(dec); //variable to store the decimal part whenever multiplying by 2
    let integer; //variable to store integer part whenever multiplying by 2
    let digits = 0; //digit counter

    //begins conversion
    while (digits != 4) { //stops at 4 decimal places
        integer = (Math.floor(fraction*2));
        fraction = (fraction*2) - integer;
        if (integer == 1) { //appends 1 at the end of array 'binaryDec'
            binaryDec.push(1);
        }
        else {
            binaryDec.push(0); //appends 0 at the end of array 'binaryDec'
        }
        digits++;
    }

    //converts the whole and binaryDec variables to strings so they can be combined/concatenated
    whole = whole.toString();
    binaryDec = binaryDec.join("");

    //combines the whole and binaryDec variables into one, separated by a dot
    result = whole.concat('.', binaryDec);
    return result;
}

//function to check if given number is an integer or a fraction
function ifInteger(num) {
    let confirm = 0;

    if (num % 1 == 0) {
        confirm = 1;
    }

    return confirm;
}