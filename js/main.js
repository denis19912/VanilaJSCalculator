//Storing my selecmntors in a variable
const erase = document.querySelector(".clear");
const user = document.querySelector(".calculator__display");
const ops = document.getElementsByClassName("operators");
const equals = document.querySelector(".equal");
const num = document.getElementsByClassName("number");
const period = document.getElementById("decimal");

//Initialize variables
let calculation = [];
let previousNum = "";
let currentNum = "";
let operator = null;

//dynamically update the numbers
const updateNum = (e) => {
  if (operator === "" && previousNum !== "") {
    previousNum = "";
  }
  const numText = e.target.innerText;
  if (currentNum === "" && numText === ".") {
    currentNum = "0";
    user.innerHTML = currentNum;
  } else if (numText === "." && currentNum.includes(".")) {
    numText = null;
  } else {
    currentNum += numText;
    user.innerHTML = currentNum;
    //console.log(currentNum);
    if (currentNum === 'C') resetCalculator(); // Resets calculator
  }
};

const resetCalculator = () => {
  console.log("Calculator reset");
  //Initialize variables
  calculation = [];
  previousNum = "";
  currentNum = "";
  operator = null;
}

//Operator function
const selectOperator = (e) => {
  if (previousNum !== "") {
    calculation.push(previousNum);
    if (calculation[calculation.length - 1] !== ("+" || "-" || "*" || "/" || "×" || "÷")) {
      operator = e.target.innerText;
      if (operator === "×") {
        operator = "*";
      } else if (operator === "÷") {
        operator = "/";
      }
      calculation.push(operator);
    }
    previousNum = "";
  }
  if (currentNum !== "") {
    calculation.push(currentNum);
    if (calculation[calculation.length - 1] !== ("+" || "-" || "*" || "/" || "×" || "÷")) {
      operator = e.target.innerText;
      if (operator === "×") {
        operator = "*";
      } else if (operator === "÷") {
        operator = "/";
      }
      calculation.push(operator);
    }
  }
  currentNum = "";
  // console.log(operator);
  // console.log(calculation);
};

// Calculation
const getResult = (e) => {
  if (currentNum !== "") {
    calculation.push(currentNum);
  }
  // console.log(e.target.innerText);
  console.log(calculation);
  const result = eval(calculation.join("")).toString();
  // currentNum = result;
  user.innerHTML = result;
  previousNum = result;
  currentNum = "";
  calculation = [];
  operator = null;
  // console.log(typeof result);
};

// Event listener to operator and number buttons using for loop
for (let i = 0; i < num.length; i++) {
  num[i].addEventListener("click", updateNum);
}
for (i = 0; i < ops.length; i++) {
  ops[i].addEventListener("click", selectOperator);
}

equals.addEventListener("click", getResult);

// Erase function
erase.onclick = () => {
  user.innerHTML = "0";
  currentNum = "";
  pendingNum = "";
  calculation = [];
};
