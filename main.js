let data = null;
let C, E, F, G, D;
const init = async () => {
  await getData();
  fillPriceHolder();
  fillSalaryPercentage();
  fillProfitPercentage();
  initWeightInput();
  let value = initSalaryInput();
  initProfitInput(value);
};

const initSalaryInput = () => {
  let salary =
    data[1] * (document.getElementById("salaryPercentage").value / 100);
  document.getElementById("salaryInput").value = salary;
  return salary;
};

const initProfitInput = (salary) => {
  document.getElementById("profitInput").value =
    salary +
    data[1] * (document.getElementById("profitPercentage").value / 100);
};

const initWeightInput = () => {
  document.getElementById("weight").value = "";
};

const calculator = () => {
  let auth = document.getElementById("weight").value;
  if (auth != "") {
    calculateValue();
    calculateSalary();
    calculateProfit();
    calculateTax();
    calculateFinal();
  }
};

const calculateValue = () => {
  D = document.getElementById("weight").value;
  C = data[1];
  let result = D * C;
  document.getElementById("value").innerText = formatData(result);
};

const calculateSalary = () => {
  let A = document.getElementById("salaryPercentage").value;
  let result = C * (A / 100) * D;
  E = parseInt(result);
  document.getElementById("salary").innerText = formatData(parseInt(result));
};

const calculateProfit = () => {
  let B = document.getElementById("profitPercentage").value;
  let C = data[1];
  let result = E + C * (B / 100);
  F = parseInt(result);
  document.getElementById("profit").innerText = formatData(parseInt(result));
};

const calculateTax = () => {
  let result = (E + F) * (9 / 100);
  G = parseInt(result);
  document.getElementById("tax").innerText = formatData(parseInt(result));
};

const calculateFinal = () => {
  console.log(C);
  console.log(E);
  console.log(F);
  console.log(G);
  console.log(D);
  let result = (C + E + F + G) * D;
  document.getElementById("final").innerText = formatData(result);
};

const fillProfitPercentage = () => {
  let salaryPercentageInput = document.getElementById("salaryPercentage");
  for (let i = 0; i <= 100; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = `${i}.0%`;
    if (i === 10) {
      option.selected = true;
    }
    salaryPercentageInput.appendChild(option);
  }
};

const fillSalaryPercentage = () => {
  let profitPercentageInput = document.getElementById("profitPercentage");
  for (let i = 0; i <= 100; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = `${i}.0%`;
    if (i === 7) {
      option.selected = true;
    }
    profitPercentageInput.appendChild(option);
  }
};

const fillPriceHolder = () => {
  document.getElementById("price").innerText = formatData(data[1]);
  document.getElementById("priceInput").value = data[1];
};

// turn string to currency
const formatData = (data) => {
  return (data = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
};

const clearForm = () => {
  document.getElementById("weight").value = "";
  document.getElementById("value").innerText = 0;
  document.getElementById("salary").innerText = 0;
  document.getElementById("profit").innerText = 0;
  document.getElementById("tax").innerText = 0;
  document.getElementById("final").innerText = 0;
  dbsalary = 0;
  dbprofit = 0;
  dbtax = 0;
  dbval = 0;
};

const calculateSalaryInput = () => {
  let salaryPer = document.getElementById("salaryPercentage").value;
  let dbprice = data[1];
  let salary = dbprice * (salaryPer / 100);
  dbsalary = parseInt(salary);
  document.getElementById("salaryInput").value = parseInt(salary);
};

const calculateProfitInput = () => {
  let profitPer = document.getElementById("profitPercentage").value;
  let dbprice = data[1];
  let profit = dbsalary + dbprice * (profitPer / 100);
  dbprofit = parseInt(profit);
  document.getElementById("profitInput").value = parseInt(profit);
};

const getData = async () => {
  await fetch("1d.json")
    .then((res) => res.json())
    .then((json) => (data = json[json.length - 1]));
};

init();
