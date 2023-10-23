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
    document.getElementById("value").innerText = formatData(calculateValue());
    document.getElementById("salary").innerText = formatData(calculateSalary());
    document.getElementById("profit").innerText = formatData(calculateProfit());
    document.getElementById("tax").innerText = formatData(calculateTax());
    document.getElementById("final").innerText = formatData(calculateFinal());
  } else {
    clearForm();
  }
};

const calculateValue = () => {
  D = document.getElementById("weight").value;
  return D * C;
};

const calculateSalary = () => {
  A = document.getElementById("salaryPercentage").value;
  D = document.getElementById("weight").value;
  E = C * (A / 100);
  if (D) {
    E = E * D;
  }
  return parseInt(E);
};

const calculateProfit = () => {
  B = document.getElementById("profitPercentage").value;
  D = document.getElementById("weight").value;
  let tempE = C * (A / 100);
  F = (tempE + C) * (B / 100);
  if (D) {
    F = F * D;
  }
  return parseInt(F);
};

const calculateTax = () => {
  G = (E + F) * (9 / 100);
  return parseInt(G);
};

const calculateFinal = () => {
  H = C + E + F + G;
  return parseInt(H);
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
  E = 0;
  F = 0;
  G = 0;
  H = 0;
};

const getData = async () => {
  await fetch("1d.json")
    .then((res) => res.json())
    .then((json) => (data = json[json.length - 1]));
};

init();
