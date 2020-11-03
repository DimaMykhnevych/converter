const values = [
  'millimeter',
  'centimeter',
  'decimeter',
  'meter',
  'kilometer',
  'milligram',
  'gram',
  'kilogram',
];

const coef = {
  millimeter: 1e-3,
  centimeter: 1e-2,
  decimeter: 1e-1,
  meter: 1,
  kilometer: 1e3,
  milligram: 1e-3,
  gram: 1,
  kilogram: 1e3,
};

const initialPhysicValues = document.querySelector('#initialValue');
const resultPhysicValues = document.querySelector('#endValue');
const fromPhys = document.querySelector('.fromPhys');
const toPhys = document.querySelector('.toPhys');
const arrow = document.querySelector('.arrow');
const startQuantityInput = document.querySelector('#startQuantity');
const finalQuantityInput = document.querySelector('#finalQuantity');
const from = document.querySelector('.from');
const to = document.querySelector('.to');
const helpTextFrom = document.querySelector('#helpId');
const helpTextTo = document.querySelector('#helpId2');
const convert = document.querySelector('#convertBtn');

let previousPhysicTextClicked;

//render list of physical values
function renderValues() {
  renderInitialValues(initialPhysicValues);
  renderInitialValues(resultPhysicValues);
}

function renderInitialValues(elem) {
  for (let i = 0; i < values.length; i++) {
    let listItem = document.createElement('a');
    listItem.href = '';
    listItem.textContent = values[i];
    listItem.classList.add('list-group-item', 'list-group-item-action');
    listItem.addEventListener('click', onItemClick);
    elem.appendChild(listItem);
  }
}

//eventsHandlers
const onItemClick = (e) => {
  e.preventDefault();
  clearInputs();
  let physicValue = e.currentTarget;
  let parent = physicValue.parentElement;
  let text = physicValue.textContent;
  removeActiveElem(parent);
  if (parent === initialPhysicValues && !checkItemToRemoveActiveClass(text)) {
    removeActiveElem(resultPhysicValues);
  }
  previousPhysicTextClicked = text;
  setPhysicText(parent, text);
  disableUnneededItems(text);
  physicValue.classList.add('active');
};

const onArrowClick = (e) => {
  let curActive = findActiveItems();
  if (curActive.first && curActive.second) {
    clearInputs();
    toggleItem(e.target);
    swapPlaceHolders();
    swapFromTo();
    swapHelpText();
    disableInput();
    changeActiveItems();
  }
};

const onConvertButtonClick = (e) => {
  let activeItmes = findActiveItems();
  let from, to, valueToConvert, targetInput, insertInput;
  from = activeItmes.first.textContent;
  to = activeItmes.second.textContent;
  if (startQuantityInput.disabled) {
    targetInput = finalQuantityInput;
    insertInput = startQuantityInput;
  } else {
    targetInput = startQuantityInput;
    insertInput = finalQuantityInput;
  }
  valueToConvert = Number(targetInput.value);
  insertInput.value = valueToConvert * (coef[from] / coef[to]);
};

//helpFunctions

function clearInputs() {
  startQuantityInput.value = '';
  finalQuantityInput.value = '';
}

function checkItemToRemoveActiveClass(currentText) {
  const len = /.*meter$/i;
  const mass = /.*gram$/i;
  if (len.test(previousPhysicTextClicked)) {
    return len.test(currentText);
  } else {
    return mass.test(currentText);
  }
}

function toggleItem(targetElem) {
  if (targetElem.classList.contains('fa-arrow-alt-right')) {
    targetElem.classList.remove('fa-arrow-alt-right');
    targetElem.classList.add('fa-arrow-alt-left');
  } else {
    targetElem.classList.remove('fa-arrow-alt-left');
    targetElem.classList.add('fa-arrow-alt-right');
  }
}

function swapPlaceHolders() {
  let t = startQuantityInput.placeholder;
  startQuantityInput.placeholder = finalQuantityInput.placeholder;
  finalQuantityInput.placeholder = t;
}

function swapHelpText() {
  let t = helpTextFrom.textContent;
  helpTextFrom.textContent = helpTextTo.textContent;
  helpTextTo.textContent = t;
}

function swapFromTo() {
  let t = from.textContent;
  from.textContent = to.textContent;
  to.textContent = t;
}

function disableInput() {
  if (arrow.classList.contains('fa-arrow-alt-right')) {
    finalQuantityInput.disabled = true;
    startQuantityInput.disabled = false;
  } else {
    finalQuantityInput.disabled = false;
    startQuantityInput.disabled = true;
  }
}

function changeActiveItems() {
  let activeItems = findActiveItems();
  removeActiveElem(initialPhysicValues);
  removeActiveElem(resultPhysicValues);
  let firstItemToBeActive = findItem(initialPhysicValues, activeItems.second);
  let secondItemToBeActive = findItem(resultPhysicValues, activeItems.first);
  setActiveItem(firstItemToBeActive);
  setActiveItem(secondItemToBeActive);
}

function setActiveItem(el) {
  el.classList.add('active');
}

function findItem(parent, currentElem) {
  let initialListItems = Array.from(initialPhysicValues.children);
  let finalListItems = Array.from(resultPhysicValues.children);
  if (parent === initialPhysicValues) {
    return initialListItems.find(
      (el) => el.textContent === currentElem.textContent
    );
  }
  return finalListItems.find(
    (el) => el.textContent === currentElem.textContent
  );
}

function findActiveItems() {
  let initialListItems = Array.from(initialPhysicValues.children);
  let finalListItems = Array.from(resultPhysicValues.children);
  let activeInitialItem = initialListItems.find((el) =>
    el.classList.contains('active')
  );
  let activeFinalItem = finalListItems.find((el) =>
    el.classList.contains('active')
  );
  return { first: activeInitialItem, second: activeFinalItem };
}

function disableUnneededItems(text) {
  const len = /.*meter$/i;
  const mass = /.*gram$/i;
  let listItems = Array.from(resultPhysicValues.children);
  removeClassFromChildrens(listItems, 'disabled');
  let disabledItems;
  if (len.test(text)) {
    disabledItems = listItems.filter((el) => mass.test(el.textContent));
  } else {
    disabledItems = listItems.filter((el) => len.test(el.textContent));
  }
  for (let i = 0; i < disabledItems.length; i++) {
    disabledItems[i].classList.add('disabled');
  }
}

function removeClassFromChildrens(listItems, className) {
  listItems.forEach((element) => {
    element.classList.remove(className);
  });
}

function setPhysicText(el, text) {
  if (el == initialPhysicValues) {
    fromPhys.innerText = text;
  } else {
    toPhys.innerText = text;
  }
}

function removeActiveElem(parent) {
  let listItems = Array.from(parent.children);
  let activeItem = listItems.filter((el) => el.classList.contains('active'));
  if (activeItem.length >= 1) {
    for (let i = 0; i < activeItem.length; i++) {
      activeItem[i].classList.remove('active');
    }
  }
}

renderValues();
disableInput();
arrow.addEventListener('click', onArrowClick);
convert.addEventListener('click', onConvertButtonClick);
