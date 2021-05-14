function getTax() {
    // get user input from form and transfer data to variables
    let monthlyIncome = document.getElementById("income").value;
    let numDependents = document.getElementById("dependents").value;

    // call function to calculate total deductions
    let totalDeduction = getTotalDeduct(monthlyIncome, numDependents);
    let netTaxableIncome = getNTI(monthlyIncome, totalDeduction);

    //calculate payable tax
    let payableTax = computeTax(netTaxableIncome);

    //replace text in span "tax" with value from variable payableTax with two decimal places
    document.getElementById("tax").innerText = payableTax.toFixed(2);
}

// ---- || FUNCTIONS FOR TOTAL DEDUCTION || -----------------------------------------------------
// ---- || START || ----

function getTotalDeduct(income, dependents) {
    //calculate GSIS/SSS deduction
    let deductionInsurance = getInsuranceDeduction(income);

    //calculate Pag-Ibig and Philhealth deductions
    let deductionPagIbig = getYearly(income, 0.01375);
    let deductionPhilHealth = getYearly(income, 0.035);

    //calculate exemptions
    let personalExemption = 50000;
    let additionalPE = getAPE(dependents);
    let totalExemption = personalExemption + additionalPE;

    // finally calulate total deductions and return result
    return totalExemption + deductionInsurance + deductionPhilHealth + deductionPagIbig;
}

//function to calculate insurance deduction based on whether user ticked "yes" or "no"
function getInsuranceDeduction(income) {
    if (document.getElementById("yes").checked == true) {
        return getYearly(income, 0.09);
    }
    if (document.getElementById("no").checked == true) {
        return getYearly(income, 0.11);
    }
}

//function to calculate additional personal exemption based on number of dependents
function getAPE(dependents) {
    if (dependents <= 4) {
        return 50000*dependents;
    }
    else {
        return 200000;
    }
}

function getYearly(income, percentage) {
    return income*percentage*12;
}
// ---- || END OF FUNCTIONS FOR TOTAL DEDUCTION || -----------------------------------------------

// ---- || FUNCTION TO GET NET TAXABLE INCOME || ------------------------------------------------

function getNTI(income, deductions) {
    let grossIncome = income*13;
    return grossIncome - deductions;
}

// ---- || FUNCTION TO GET PAYABLE TAX BASED ON NTI || ------------------------------------------
function computeTax(nti) {
    switch(true) {
        case (nti >= 0) && (nti <= 250000):
            return 0;
        case (nti >= 250001) && (nti <= 400000):
            return (nti-250000)*0.20;
        case (nti >= 400001) && (nti <= 800000):
            return 30000 + ((nti-400000)*0.25);
        case (nti >= 800001) && (nti <= 2000000):
            return 130000 + ((nti-800000)*0.30);
        case (nti >= 2000001) && (nti <= 8000000):
            return 490000 + ((nti-2000000)*0.32);
        case (nti >= 8000001):
            return 2410000 + ((nti-8000000)*0.35);
    }
}