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
const initialPhysicValues = document.querySelector('#initialValue');
const resultPhysicValues = document.querySelector('#endValue');
const fromPhys = document.querySelector('.fromPhys');
const toPhys = document.querySelector('.toPhys');
const arrow = document.querySelector('.arrow');

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

const onItemClick = (e) => {
  e.preventDefault();
  let physicValue = e.currentTarget;
  let parent = physicValue.parentElement;
  let text = physicValue.textContent;
  removeActiveElem(parent);
  setPhysicText(parent, text);
  disableUnneededItems(text);
  physicValue.classList.add('active');
};

const onArrowClick = (e) => {
  toggleItem(e.target);
};

function toggleItem(targetElem) {
  if (targetElem.classList.contains('fa-arrow-alt-right')) {
    targetElem.classList.remove('fa-arrow-alt-right');
    targetElem.classList.add('fa-arrow-alt-left');
  } else {
    targetElem.classList.remove('fa-arrow-alt-left');
    targetElem.classList.add('fa-arrow-alt-right');
  }
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
arrow.addEventListener('click', onArrowClick);
