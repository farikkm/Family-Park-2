function removeStyle(elem: HTMLInputElement) {
  elem.classList.remove("w-32", "md:w-48", "opacity-100");
  elem.classList.add("w-0", "md:w-0", "opacity-0");
}

function addStyle(elem: HTMLInputElement) {
  elem.classList.remove("w-0", "md:w-0", "opacity-0");
  elem.classList.add("w-32", "md:w-48", "opacity-100");
}

function showInput(elem: HTMLInputElement | null) {
  if (!elem) return; // Проверка на null  
  
  if (elem.classList.contains("w-0")) {
    addStyle(elem)
    elem.focus();
  } else {
    removeStyle(elem)
    elem.blur();
  }
}

const handleEnter = (e: KeyboardEvent, input: HTMLInputElement) => {
  if (e.key === "Enter") {
    const searchText = input.value.trim();
    if (searchText) console.log("User input:", searchText);
    input.value = "";
    removeStyle(input);
    input.blur();
  }
};

export {showInput, handleEnter}