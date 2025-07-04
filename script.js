let currentInput = '';
const MEMORY_KEY = 'calc-memory';

// Append value to the input expression
function appendToDisplay(value) {
  currentInput += value;
  updateDisplay();
}

// Update the calculator display
function updateDisplay() {
  const display = document.getElementById('display');
  display.textContent = currentInput || '0';
}

// Clear current input
function clearDisplay() {
  currentInput = '';
   localStorage.removeItem(MEMORY_KEY);
  updateDisplay();
}

// Evaluate the current infix expression
function calculateResult() {
  try {
    currentInput = eval(currentInput).toString();
  } catch (error) {
    currentInput = 'Error';
  }
  updateDisplay();
}

// Get memory value from localStorage
function getMemory() {
  return parseFloat(localStorage.getItem(MEMORY_KEY)) || 0;
}

// Set memory value in localStorage
function setMemory(value) {
  localStorage.setItem(MEMORY_KEY, value.toString());
}

// Memory Add (M+)
function memoryAdd() {
  const value = parseFloat(currentInput);
  console.log('Memory Add:', value);
  if (!isNaN(value)) {
     console.log('Memory Details for M+:', getMemory());
    setMemory(getMemory() + value);
  }
  clearDisplay();
}

// Memory Subtract (M-)
function memorySubtract() {
  const value = parseFloat(currentInput);
  console.log('Memory Removed:', value);
  console.log('Memory Details for M-:', getMemory());
  if (!isNaN(value)) {
    setMemory(getMemory() - value);
  }
  clearDisplay();
}

// Memory Clear (MC)
function memoryClear() {
  localStorage.removeItem(MEMORY_KEY);
}

// Optional: Memory Recall (MR)
function memoryRecall() {
  currentInput = getMemory().toString();
  console.log('Memory Recalled:', currentInput);
  updateDisplay();
}

window.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('keydown', function (e) {
    // Only handle keys if not focused on an input/textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key >= '0' && e.key <= '9') {
      appendToDisplay(e.key);
      e.preventDefault();
    } else if (["+", "-", "*", "/", "%", ".", "(", ")"].includes(e.key)) {
      appendToDisplay(e.key);
      e.preventDefault();
    } else if (e.key === "Enter" || e.key === "=") {
      calculateResult();
      e.preventDefault();
    } else if (e.key === "Backspace") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
      e.preventDefault();
    } else if (e.key === "Escape" || e.key.toLowerCase() === "c") {
      clearDisplay();
      e.preventDefault();
    }
    // Ignore all other keys silently
  });
});

