// ************************* GLOBAL VARIABLES *************************

var numberOfTracks;
var handlerNumber;
var positionNumber;
var timeWrapperNumber;
var sideLetter;
var counterA = 1;
var counterB = 1;
var counterRecursion = 0;
var dataSideA = [];
var dataSideB = [];
var totalLengthSideA;
var totalLengthSideB;
var allData;
var shuffledData;
let dataSideASortedByMinutes;
let dataSideBSortedByMinutes;
let allDataSortedByMinutes;
let calculValAbs0 = () => {
  totalLengthSideA = sum("sideA");
  totalLengthSideB = sum("sideB");
  return Math.abs(totalLengthSideB[0] - totalLengthSideA[0]);
};
let calculValAbs1 = () => {
  totalLengthSideA = sum("sideA");
  totalLengthSideB = sum("sideB");
  return Math.abs(totalLengthSideB[1] - totalLengthSideA[1]);
};
var t0LengthDifference = [undefined, undefined];
var t1LengthDifference = [undefined, undefined];
let randomNumberMin = () => Math.floor(Math.random() * 6);
let randomNumberSec = () => Math.floor(Math.random() * 60);

// ************************* INITIALIZATION *************************

init("sideA");
init("sideB");
initSecondA();
initSecondB();

function init(side) {
  updateNumberOfTracks(side);
  getSideLetter(side);
  // attach first event listeners
  document
    .getElementById(`minute ${sideLetter}1`)
    .addEventListener("input", (event) => updateLength(side));
  document
    .getElementById(`second ${sideLetter}1`)
    .addEventListener("input", (event) => updateLength(side));
  updateLength(side);
}

function initSecondA() {
  document
    .getElementById(`second A1`)
    .addEventListener("input", (event) => formatSecond(`second A1`, "sideA"));
}

function initSecondB() {
  document
    .getElementById(`second B1`)
    .addEventListener("input", (event) => formatSecond(`second B1`, "sideA"));
}

// ************************* CSS MANIPULATION *************************

function adjustTracklistingSectionHeight(side) {
  if (document.getElementById(side).children.length > 6) {
    document.getElementById("page-container-tracklisting").style.height =
      "auto";
    document.getElementById("section__tracklisting").style.height = "auto";
  }
}

// ************************* DATA CHECK *************************

function formatSecond(id, side) {
  if (document.getElementById(id).value > 60) {
    erase(id);
    updateLength(side); // MAJ durée totale
  }
}

function erase(id) {
  document.getElementById(id).value = null;
}

// "ARE YOU SURE YOU WANT TO REFRESH?""

window.onbeforeunload = function () {
  return "Do you want to reload the page?";
};

// ************************* EVENT HANDLER *************************

window.addEventListener("DOMContentLoaded", function () {
  var mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      updatePosition("sideA");
      updatePosition("sideB");
      updateLength("sideA");
      updateLength("sideB");
      updateClassSideA();
      updateClassSideB();
      preventNullTitle("sideA");
      preventNullTitle("sideB");
    });
  });
  let sideA = document.getElementById("sideA");
  let sideB = document.getElementById("sideB");
  mutationObserver.observe(sideA, {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: false,
    attributeOldValue: false,
    characterDataOldValue: false,
  });
  mutationObserver.observe(sideB, {
    attributes: false,
    characterData: false,
    childList: true,
    subtree: false,
    attributeOldValue: false,
    characterDataOldValue: false,
  });
});

// ************************* PREVENT NULL TITLE *************************

function preventNullTitle(side) {
  updateNumberOfTracks(side);
  if (numberOfTracks === 0) {
    addTitle(side);
  }
}

// ************************* CLASS UPDATE *************************

function updateClassSideA() {
  let children = document.getElementById("sideA").children;
  let arrayChildren = Array.from(children);
  arrayChildren.forEach((element) => {
    let arrayClass = Array.from(element.classList);
    if (arrayClass.includes("color-side-a")) {
      return;
    }
    if (arrayClass.includes("color-side-b")) {
      element.classList.remove("color-side-b");
      element.classList.add("color-side-a");
    } else {
      element.classList.add("color-side-a");
    }
  });
}

function updateClassSideB() {
  let children = document.getElementById("sideB").children;
  let arrayChildren = Array.from(children);
  arrayChildren.forEach((element) => {
    let arrayClass = Array.from(element.classList);
    if (arrayClass.includes("color-side-b")) {
      return;
    }
    if (arrayClass.includes("color-side-a")) {
      element.classList.remove("color-side-a");
      element.classList.add("color-side-b");
    } else {
      element.classList.add("color-side-b");
    }
  });
}

// ************************* LENGTH/SIDE CALCULATION *************************

function updateLength(side) {
  formatLength(sum(side));
  let el = document.getElementById(`length ${side}`);
  return (el.textContent = `${result}`);
}

function formatLength(value) {
  // mm:ss
  if ((value[1] < 10) & (value[0] >= 10)) {
    result = value[0] + " : 0" + value[1];
  } else if ((value[0] < 10) & (value[1] >= 10)) {
    result = "0" + value[0] + " : " + value[1];
  } else if (value[0] < 10 && value[1] < 10) {
    result = "0" + value[0] + " : 0" + value[1];
  } else {
    result = value[0] + " : " + value[1];
  }
  return result;
}

function sum(side) {
  updateNumberOfTracks(side);
  let seconds = sumSeconds(side);
  let minutes = sumMinutes(side);
  minutes += secondsToMinute(seconds)[0];
  seconds = secondsToMinute(seconds)[1];
  return [minutes, seconds];
}

function sumMinutes(side) {
  updateNumberOfTracks(side);
  let sumMinutesResults = {};
  let el = document.querySelectorAll(`#${side} .minute-input`);
  for (var i = 0; i < el.length; i++) {
    let value = el[i].value;
    sumMinutesResults[i] = value;
  }
  return sumObjValues(sumMinutesResults);
}

function sumSeconds(side) {
  updateNumberOfTracks(side);
  let sumSecondsResults = {};
  let el = document.querySelectorAll(`#${side} .second-input`);
  for (var i = 0; i < el.length; i++) {
    let value = el[i].value;
    sumSecondsResults[i] = value;
  }
  return sumObjValues(sumSecondsResults);
}

function secondsToMinute(seconds) {
  let minutes = Math.floor(seconds / 60);
  let leftover = seconds % 60;
  let result = [minutes, leftover];
  return result;
}

function sumObjValues(obj) {
  return Object.keys(obj).reduce(
    (sum, key) => sum + parseFloat(obj[key] || 0),
    0
  ); // additionne les keys
}

// ************************* DOM MANIPULATION *************************

/////////// GET SIDELETTER ///////////

function getSideLetter(side) {
  sideLetter = side.slice(4);
  return sideLetter;
}

/////////// CREATE ELEMENTS ///////////

function addElementWithID(el, classes, sourceId, newId) {
  el = document.createElement(el);
  for (i = 0; i < classes.length; i++) {
    el.classList.add(classes[i]);
  }
  document.getElementById(sourceId).appendChild(el);
  el.setAttribute("id", newId);
}

function addElementWithoutID(el, classes, sourceId) {
  el = document.createElement(el);
  for (i = 0; i < classes.length; i++) {
    el.classList.add(classes[i]);
  }
  document.getElementById(sourceId).appendChild(el);
}

/////////// UPDATE POSITION NUMBER OF TRACKS ///////////

function updateNumberOfTracks(side) {
  numberOfTracks = document.getElementById(side).children.length;
  return numberOfTracks;
}

function updatePosition(side) {
  getSideLetter(side);
  let positionElements = document.getElementById(side).children;
  for (let i = 0; i < positionElements.length; i++) {
    let el = document.getElementById(positionElements[i].children[0].id);
    let index = i + 1;
    el.textContent = `${sideLetter}${index}`;
  }
}

/////////// ADD TITLE ///////////

function addTitle(side) {
  if (side === "sideA") {
    counterA++;
  }
  if (side === "sideB") {
    counterB++;
  }

  getSideLetter(side);
  if (side === "sideA") {
    createHandler(`handler ${sideLetter}${counterA}`, side);
    positionNumber = counterA;
    createPosition(`position ${sideLetter}${positionNumber}`, sideLetter);
    createTitle(`title ${sideLetter}${positionNumber}`, sideLetter);
    createTimeWrapper(`timeWrapper ${sideLetter}${positionNumber}`);
    createMinute(`minute ${sideLetter}${positionNumber}`, side);
    createSecond(`second ${sideLetter}${positionNumber}`, side);
  }
  if (side === "sideB") {
    createHandler(`handler ${sideLetter}${counterB}`, side);
    positionNumber = counterB;
    createPosition(`position ${sideLetter}${positionNumber}`, sideLetter);
    createTitle(`title ${sideLetter}${positionNumber}`, sideLetter);
    createTimeWrapper(`timeWrapper ${sideLetter}${positionNumber}`);
    createMinute(`minute ${sideLetter}${positionNumber}`, side);
    createSecond(`second ${sideLetter}${positionNumber}`, side);
  }
  adjustTracklistingSectionHeight(side);
}

/////////// addTitle() NEEDED FEATURES ///////////

function createHandler(handlerId, side) {
  addElementWithID(
    "div",
    ["list-group-item", "handle-function", "row"],
    side,
    handlerId
  );
  let el = document.getElementById(handlerId);
}

function createPosition(positionId, sideLetter) {
  addElementWithID(
    "span",
    [`position${sideLetter}`],
    `handler ${sideLetter}${positionNumber}`,
    positionId
  );
  let el = document.getElementById(positionId);
  el.textContent = `${sideLetter}${positionNumber}`;
}

function createTitle(titleId, sideLetter) {
  addElementWithID(
    "input",
    ["title-input"],
    `handler ${sideLetter}${positionNumber}`,
    titleId
  );
  let el = document.getElementById(titleId);
  el.setAttribute("placeholder", "Enter Title...");
  el.setAttribute("type", "text");
}

function createTimeWrapper(wrapperId) {
  addElementWithID(
    "div",
    ["time-wrapper"],
    `handler ${sideLetter}${positionNumber}`,
    wrapperId
  );
}

function createMinute(minuteId, side) {
  addElementWithID(
    "input",
    ["minute-input"],
    `timeWrapper ${sideLetter}${positionNumber}`,
    minuteId
  );
  let el = document.getElementById(minuteId);
  el.setAttribute("placeholder", "mm");
  el.setAttribute("type", "number");
  el.setAttribute("min", "0");
  el.setAttribute("max", "59");
  el.setAttribute(
    "oninput",
    "this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
  );
  el.addEventListener("input", (event) => updateLength(side));
}

function createSecond(secondId, side) {
  addElementWithID(
    "input",
    ["second-input"],
    `timeWrapper ${sideLetter}${positionNumber}`,
    secondId
  );
  let el = document.getElementById(secondId);
  el.setAttribute("placeholder", "ss");
  el.setAttribute("type", "number");
  el.setAttribute("min", "0");
  el.setAttribute("max", "59");
  el.setAttribute(
    "oninput",
    "this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
  );
  el.addEventListener("input", (event) => updateLength(side)); // calcul durée totale
  el.addEventListener("input", (event) => formatSecond(secondId, side));
}

/////////// REMOVE TITLE ///////////

function removeTitle(side) {
  updateNumberOfTracks(`${side}`);
  lastPosition = numberOfTracks;
  let lastTitle = document.getElementById(`${side}`).lastElementChild;
  if (lastPosition > 1) {
    lastTitle.remove();
    updateLength(side);
    if (side === "sideA" && dataSideA.length > 0) {
      resetAndFillData(side);
    }
    if (side === "sideB" && dataSideB.length > 0) {
      resetAndFillData(side);
    }
  }
}

// ------ SWAP TITLE ------ //

function swapTitle(sideFrom, sideTo) {
  title = document.getElementById(sideFrom).lastChild;
  addTitle(sideTo);
  newTitle = document.getElementById(sideTo).lastChild;
  // swap data
  newTitle.children[1].value = title.children[1].value;
  newTitle.children[2].children[0].value = title.children[2].children[0].value;
  newTitle.children[2].children[1].value = title.children[2].children[1].value;
  //remove swapped title
  removeTitle(sideFrom);
}

// ************************* RESET AND FILL DATA *************************

function resetAndFillData(side) {
  if (side === "sideA") {
    // reset A
    dataSideA = [];
  }
  if (side === "sideB") {
    // reset B
    dataSideB = [];
  }
  for (i = 0; i < document.getElementById(side).children.length; i++) {
    let position;
    let title;
    let minute;
    let second;
    position =
      document.getElementById(side).children[i].children[0].textContent;
    title = document.getElementById(side).children[i].children[1].value;
    minute =
      document.getElementById(side).children[i].children[2].children[0].value;
    second =
      document.getElementById(side).children[i].children[2].children[1].value;
    if (side === "sideA") {
      let object = {};
      object["position"] = position;
      object["title"] = title;
      object["minute"] = minute;
      object["second"] = second;
      object["timeArray"] = [minute, second];
      dataSideA.push(object);
      totalLengthSideA = formatLength(sum(side));
    }
    if (side === "sideB") {
      let object = {};
      object["position"] = position;
      object["title"] = title;
      object["minute"] = minute;
      object["second"] = second;
      object["timeArray"] = [this.minute, this.second];
      dataSideB.push(object);
      totalLengthSideB = formatLength(sum(side));
    }
  }
}

// ************************* TEST DATA EMPTYNESS *************************

const someDataAreEmpty = () => {
  resetAndFillData("sideA");
  resetAndFillData("sideB");
  allData = dataSideA
  .concat(dataSideB)
  return allData.some((side) => {
    if (side.minute === '' || side.second === '') {
      return true
    }
  })
}

const allDataAreEmpty = () => {
  resetAndFillData("sideA");
  resetAndFillData("sideB");
  allData = dataSideA.concat(dataSideB);
  return allData.every((side) => {
    if (side.minute === "" && side.second === "") {
      return true;
    }
  });
};
