
  const calcContainer = document.getElementById("calculator");


  const display = document.createElement("input");
  display.setAttribute("type", "text");
  display.setAttribute("id", "display");
  display.setAttribute("class", "form-control mb-3 shadow-sm");
  display.setAttribute("readonly", true);
  calcContainer.appendChild(display);

 
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
    buttonContainer.appendChild(btn);
  });

 
  document.addEventListener("keydown", (e) => {
  const validKeys = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "+", "-", "*", "/", "%", ".", "Enter", "Backspace", "="
  ];

  if (validKeys.includes(e.key)) {
    if (e.key === "=" || e.key === "Enter") {
      calculate();
    } else if (e.key === "Backspace") {
      display.value = display.value.slice(0, -1);
    } else {
      display.value += e.key;
    }
  } else {
    alert("Only numbers are allowed");
    e.preventDefault();
  }
});



  function calculate() {
    try {
     
      if (/^[0-9+\-*/%. ]+$/.test(display.value)) {
        display.value = eval(display.value);
      } else {
        throw new Error();
      }
    } catch {
      alert("Invalid expression");
      display.value = "";
    }
  }


  function handleClick(label) {
    if (label === "=") {
      calculate();
    } else if (label === "C") {
      display.value = "";
    } else {
      display.value += label;
    }
  }