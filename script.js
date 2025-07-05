const calcContainer = document.getElementById("calculator");


const input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("id", "result"); 
input.setAttribute("class", "form-control mb-3 shadow-sm");
input.setAttribute("readonly", true);
calcContainer.appendChild(input);


const result = document.getElementById("result");


const buttons = [
  "7", "8", "9", "/", 
  "4", "5", "6", "*", 
  "1", "2", "3", "-", 
  "0", ".", "%", "+", 
  "C", "="
];


const buttonContainer = document.createElement("div");
buttonContainer.className = "row row-cols-4 g-3";
calcContainer.appendChild(buttonContainer);


buttons.forEach(label => {
  const btn = document.createElement("button");
  btn.textContent = label;
  btn.className = "btn btn-outline-primary col py-3 rounded-3 fw-semibold";
  btn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
  btn.addEventListener("click", () => handleClick(label));

 
  if (!isNaN(label)) btn.id = label;         // Digits 0-9
  if (label === "+") btn.id = "add";
  if (label === "-") btn.id = "subtract";
  if (label === "=") btn.id = "equal";
  if (label === "C") btn.id = "clear";

  buttonContainer.appendChild(btn);
});


function handleClick(label) {
  if (label === "=") {
    calculate();
  } else if (label === "C") {
    result.value = "";
  } else {
    result.value += label;
  }
}


function calculate() {
  try {
    if (/^[0-9+\-*/%. ]+$/.test(result.value)) {
      result.value = eval(result.value);
    } else {
      throw new Error();
    }
  } catch {
    alert("Invalid expression");
    result.value = "";
  }
}


document.addEventListener("keydown", (e) => {
  const validKeys = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "+", "-", "*", "/", "%", ".", "Enter", "Backspace", "="
  ];

  if (validKeys.includes(e.key)) {
    if (e.key === "=" || e.key === "Enter") {
      calculate();
    } else if (e.key === "Backspace") {
      result.value = result.value.slice(0, -1);
    } else {
      result.value += e.key;
    }
  } else {
    alert("Only numbers are allowed");
    e.preventDefault();
  }
});
