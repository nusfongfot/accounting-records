let balance = document.getElementById("balance");
let mPlus = document.getElementById("money-plus");
let mMinus = document.getElementById("money-minus");
let list = document.getElementById("list");
let form = document.getElementById("form");
let text = document.getElementById("text");
let amount = document.getElementById("amount");

// let data = [
//   { id: 1, text: "salary", amount: +30000 },
//   { id: 2, text: "baby", amount: -7000 },
//   { id: 3, text: "repairs", amount: -10000 },
//   { id: 4, text: "stock", amount: +13000 },
//   { id: 5, text: "travel", amount: -7000 },
// ];
let transactions = [];

//loop ข้อมูล ทั้งหมดที่มี
function init() {
  list.innerHTML = "";
  transactions.forEach(addDatatoList);
  calmoney();
}

function addDatatoList(transactions) {
  let symbol = transactions.amount < 0 ? "-" : "+";
  let status = transactions.amount < 0 ? "minus" : "plus";
  let item = document.createElement("li");
  let result = formatNumber(Math.abs(transactions.amount));
  item.classList.add(status);
  item.innerHTML = `${transactions.text}<span>${symbol}${result}</span><button class="delete-btn" onClick="removeData(${transactions.id})">x</button>`;
  //เพิ่มข้อมูลเข้าไป แล้วทำการแสดงผล
  list.appendChild(item);
}

function autoId() {
  return Math.floor(Math.random() * 1000000);
}

function removeData(id) {
  transactions = transactions.filter((transactions) => transactions.id !== id);
  //เรียกเพื่ออัพเดทข้อมูลล่าสุด
  init();
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function calmoney() {
  let amounts = transactions.map((transactions) => transactions.amount);
  //ทำการคำนวณข้อมูล
  let total = amounts.reduce((result, item) => (result += item), 0).toFixed(2);
  //show balance
  balance.innerText = `฿` + formatNumber(total);
  //คำนวณรายรับ
  let income = amounts
    .filter((item) => item > 0)
    .reduce((result, item) => (result += item), 0)
    .toFixed(2);
  mPlus.innerText = `฿` + formatNumber(income);
  //คำนวณรายจ่าย
  let expenses = (
    amounts
      .filter((item) => item < 0)
      .reduce((result, item) => (result += item), 0) * -1
  ).toFixed(2);
  mMinus.innerText = `฿` + formatNumber(expenses);
}

function addTransections(e) {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("กรุณากรอกข้อมูล");
  } else {
    let datas = {
      id: autoId(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(datas);
    addDatatoList(datas);
    calmoney();
    text.value = "";
    amount.value = "";
  }
}

form.addEventListener("submit", addTransections);

init();
calmoney();
