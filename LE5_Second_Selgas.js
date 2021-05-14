function isPalindrome() {
    //get input from user and put in variable 'input'
    let input = document.getElementById("data").value;

    input = input.toString(); //turns given input into a string
    result = confirmPalindrome(input); //confirms whether string is a palindrome or not

    display(result);
}

//function that identifies whether given input is a string
function confirmPalindrome(inpt) {
    let non_alphanum = /[\W_]/g; //variable that contains all characters that are not alphanumeric (A-Z, 0-9)
    inpt = inpt.toLowerCase().replace(non_alphanum,''); //remove all non-alphanumeric characters
    
    let i = 0;
    let length = inpt.length;
    let confirm = 1;

    for (i = 0; i < length/2; i++) {
        if (inpt[i] != inpt[length - 1 - i]) {
            confirm = 0
            break;
        }
        else {
            continue;
        }
    }

    return confirm;
}

//function that displays on the page whether the string was a palindrome or not
function display(res) {
    if (res == 1) {
        document.getElementById("result").innerText = "It's a palindrome!";
    }
    else {
        document.getElementById("result").innerText = "Nope, it's not a palindrome!";
    }
}