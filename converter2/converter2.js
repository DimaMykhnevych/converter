const physicalCategories = [
  'length',
  'weight',
  'time',
  'pressure',
  'volume',
  'square',
  'speed',
  'temperature',
];

const optionValues = {
  length: ['millimeter', 'centimeter', 'decimeter', 'meter', 'kilometer'],
  weight: ['milligram', 'gram', 'kilogram'],
  time: ['minute', 'second', 'millisecond', 'hour', 'month', 'week'],
  pressure: ['pascal', 'bar', 'atmosphere'],
  volume: ['liter', 'milliliter', 'gallon'],
  square: ['square meter', 'square kilometer', 'acre', 'hectare'],
  speed: ['meter per second', 'kilometer per hour', 'foot per second'],
  temperature: ['degree Celsius', 'Degree Fahrenheit', 'Kelvin'],
};

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

const categories = document.querySelector('.phys-category');
const initialPhysicQuantitySelect = document.querySelector(
  '#initialPhysicQuantity'
);
const endPhysicQuantitySelect = document.querySelector('#endPhysicQuantity');
const clearBtn = document.querySelector('.clearBtn');
const startValueInput = document.querySelector('#startValue');
const finishValueInput = document.querySelector('#finishValue');

const onCategoriesChange = (e) => {
  fillAdjacentCategories();
};

const onClearButtonClick = (e) => {
  let inputs = document.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
};

const onInputValue = (e) => {
  let selectedPhysQuant = getCurrentPhysValuesToConvert();
  let inputedValue = Number(e.target.value);
  if (e.target === startValueInput) {
    finishValueInput.value =
      inputedValue *
      (coef[selectedPhysQuant.from] / coef[selectedPhysQuant.to]);
  } else {
    startValueInput.value =
      inputedValue *
      (coef[selectedPhysQuant.to] / coef[selectedPhysQuant.from]);
  }
};

const onInputClick = (e) => {
  e.target.select();
};

function getCurrentPhysValuesToConvert() {
  return {
    from:
      initialPhysicQuantitySelect.options[
        initialPhysicQuantitySelect.selectedIndex
      ].text,
    to:
      endPhysicQuantitySelect.options[endPhysicQuantitySelect.selectedIndex]
        .text,
  };
}

function fillCategories() {
  for (let i = 0; i < physicalCategories.length; i++) {
    let option = document.createElement('option');
    if (i == 0) option.selected = true;
    option.textContent = physicalCategories[i];
    option.value = i + 1;
    categories.appendChild(option);
  }
}

function fillAdjacentCategories() {
  let selectedCategory = categories.options[categories.selectedIndex].text;
  let neededValues = optionValues[selectedCategory];
  renderAdjacentOptions(initialPhysicQuantitySelect, neededValues);
  renderAdjacentOptions(endPhysicQuantitySelect, neededValues);
}

function renderAdjacentOptions(parent, values) {
  parent.innerHTML = '';
  for (let i = 0; i < values.length; i++) {
    let option = document.createElement('option');
    option.textContent = values[i];
    option.value = i + 1;
    parent.appendChild(option);
  }
}

fillCategories();
fillAdjacentCategories();
categories.addEventListener('change', onCategoriesChange);
clearBtn.addEventListener('click', onClearButtonClick);
startValueInput.addEventListener('click', onInputClick);
finishValueInput.addEventListener('click', onInputClick);
startValueInput.addEventListener('input', onInputValue);
finishValueInput.addEventListener('input', onInputValue);
