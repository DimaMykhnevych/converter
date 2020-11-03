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
const weightPhys = document.querySelector('#weight');
const lengthPhys = document.querySelector('#length');
const menu = document.querySelector('.items-wrapper');
const converterLength = document.querySelector('.converter-length');
const converterWeight = document.querySelector('.converter-width');
let activeInput;

const onWeightClick = (e) => {
  menu.style.display = 'none';
  converterWeight.style.display = 'block';
  let inputs = getAllInputs();
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('click', onInputClick);
    inputs[i].addEventListener('input', onValueInput);
  }
  const backToMenu = document.querySelectorAll('.backToMenu');
  backToMenu[0].addEventListener('click', onBackToMenuClick);
  backToMenu[1].addEventListener('click', onBackToMenuClick);
};

const onValueInput = (e) => {
  let inputs = getAllInputs();
  let activeInputValue = Number(activeInput.value);
  let activeInputId = activeInput.getAttribute('id');
  let neededCoef = coef[activeInputId];
  for (let i = 0; i < inputs.length; i++) {
    let curId = inputs[i].getAttribute('id');
    if (curId != activeInputId && curId !== 'search') {
      inputs[i].value =
        activeInputValue * (neededCoef / coef[curId]).toFixed(6);
    }
  }
};

const onBackToMenuClick = (e) => {
  clearInputs();
  converterLength.style.display = 'none';
  converterWeight.style.display = 'none';
  menu.style.display = 'block';
};

const clearInputs = () => {
  let inputs = document.querySelectorAll('input');
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
};

const onLengthClick = (e) => {
  menu.style.display = 'none';
  converterLength.style.display = 'block';
  let inputs = getAllInputs();
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('click', onInputClick);
    inputs[i].addEventListener('input', onValueInput);
  }
  const backToMenu = document.querySelector('.backToMenu');
  backToMenu.addEventListener('click', onBackToMenuClick);
};

const onInputClick = (e) => {
  activeInput = e.target;
  e.target.select();
};

function getAllInputs() {
  return Array.from(document.querySelectorAll('input'));
}

weightPhys.addEventListener('click', onWeightClick);
lengthPhys.addEventListener('click', onLengthClick);
