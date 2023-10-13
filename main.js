let data = null;
let A, B, C, E, F, G, D, H;
const init = async () => {
  await getData();
  C = data[1];
  fillPriceHolder();
  fillSalaryPercentage();
  fillProfitPercentage();
  initWeightInput();
  initSalaryInput();
  initProfitInput();
};

const initSalaryInput = () => {
  document.getElementById("salaryInput").value = calculateSalary();
};

const initProfitInput = () => {
  document.getElementById("profitInput").value = calculateProfit();
};

const initWeightInput = () => {
  document.getElementById("weight").value = "";
};

const calculator = () => {
  let auth = document.getElementById("weight").value;
  if (auth != "") {
    document.getElementById("value").innerText = calculateValue();
    document.getElementById("salary").innerText = calculateSalary();
    document.getElementById("profit").innerText = calculateProfit();
    document.getElementById("tax").innerText = calculateTax();
    document.getElementById("final").innerText = calculateFinal();
  } else {
    clearForm();
  }
};

const calculateValue = () => {
  D = document.getElementById("weight").value;
  return formatData(D * C);
};

const calculateSalary = () => {
  A = document.getElementById("salaryPercentage").value;
  D = document.getElementById("weight").value;
  if (D) {
    E = C * (A / 100) * D;
  } else {
    E = C * (A / 100) * 1;
  }
  return parseInt(E);
};

const calculateProfit = () => {
  B = document.getElementById("profitPercentage").value;
  F = (E + C) * (B / 100);
  return parseInt(F);
};

const calculateTax = () => {
  G = (E + F) * (9 / 100);
  return parseInt(G);
};

const calculateFinal = () => {
  H = C + E + F + G;
  return formatData(parseInt(H));
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

const getData = async () => {
  await fetch("1d.json")
    .then((res) => res.json())
    .then((json) => (data = json[json.length - 1]));
};

init();
