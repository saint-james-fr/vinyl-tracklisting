// ************************* GLOBAL VARIABLES *************************

let numberOfTracks;
let positionNumber;
let sideLetter;
let counterA = 1;
let counterB = 1;
let dataSideA = [];
let dataSideB = [];
let totalLengthSideA;
let totalLengthSideB;
let allData;

// ************************* INITIALIZATION *************************

initialization("sideA");
initialization("sideB");
initSecondA();
initSecondB();

function initialization(side) {
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

function adjustHeight(side) {
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
  let mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      updatePosition("sideA");
      updatePosition("sideB");
      updateLength("sideA");
      updateLength("sideB");
      updateColor("sideA");
      updateColor("sideB");
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

// ************************* CLASS UPDATE - CSS COLORS *************************

function updateColor(side) {
  let arrayChildren = Array.from(document.getElementById(side).children);
  arrayChildren.forEach((element) => {
    let arrayClass = Array.from(element.classList);
    switch (side) {
      case "sideA":
        if (arrayClass.includes("color-side-a")) {
          return;
        }
        if (arrayClass.includes("color-side-b")) {
          element.classList.remove("color-side-b");
          element.classList.add("color-side-a");
        } else {
          element.classList.add("color-side-a");
        }
        break;
      case "sideB":
        if (arrayClass.includes("color-side-b")) {
          return;
        }
        if (arrayClass.includes("color-side-a")) {
          element.classList.remove("color-side-a");
          element.classList.add("color-side-b");
        } else {
          element.classList.add("color-side-b");
        }
        break;
    }
  });
}

// ************************* LENGTH/SIDE CALCULATION *************************

function updateLength(side) {
  formatLength(length(side));
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

function length(side) {
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
  for (let i = 0; i < el.length; i++) {
    let value = el[i].value;
    sumMinutesResults[i] = value;
  }
  return sumObjValues(sumMinutesResults);
}

function sumSeconds(side) {
  updateNumberOfTracks(side);
  let sumSecondsResults = {};
  let el = document.querySelectorAll(`#${side} .second-input`);
  for (let i = 0; i < el.length; i++) {
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

// ------ Get SideLetter ------ //

function getSideLetter(string) {
  sideLetter = string.slice(4);
  return sideLetter;
}

// ------ Create Element Functions ------ //

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

// ------ Update Position & Number Of Tracks / side ------ //

function updateNumberOfTracks(side) {
  return numberOfTracks = document.getElementById(side).children.length;
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

// ------ Add TITLE ------ //

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
  adjustHeight(side);
}

// ------ Add TITLE needed FEATURES ------ //

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
  el.setAttribute("data-form-type", "other");
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
  el.setAttribute('data-form-type', 'other')
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
  el.setAttribute("data-form-type", "other");
  el.setAttribute(
    "oninput",
    "this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"
  );
  el.addEventListener("input", (event) => updateLength(side)); // calcul durée totale
  el.addEventListener("input", (event) => formatSecond(secondId, side));
}

// ** REMOVE TITLE //

function removeTitle(side) {
  if (updateNumberOfTracks(side) === 0) return;

  document.getElementById(`${side}`).lastElementChild.remove();
  updateLength(side);
  if (side === "sideA" && dataSideA.length > 0) {
    resetAndFillData(side);
  }
  if (side === "sideB" && dataSideB.length > 0) {
    resetAndFillData(side);
  }
}

// ** SWAP TITLE  //

function swap(sideFrom, sideTo) {
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

function clean(side) {
  for (let i = 0; i < document.getElementById(side).children.length; i++) {
    if (
      document.getElementById(side).children[i].children[2].children[0]
        .value === ""
    ) {
      document.getElementById(side).children[i].remove();
    }
  }
}

// ************************* DATA MANIPULATION : OBJECT DATA, DATA TESTS *************************

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
      totalLengthSideA = length(side);
    }
    if (side === "sideB") {
      let object = {};
      object["position"] = position;
      object["title"] = title;
      object["minute"] = minute;
      object["second"] = second;
      object["timeArray"] = [this.minute, this.second];
      dataSideB.push(object);
      totalLengthSideB = length(side);
    }
  }
}

const someDataAreEmpty = () => {
  resetAndFillData("sideA");
  resetAndFillData("sideB");
  allData = dataSideA.concat(dataSideB);
  return allData.some((side) => {
    if (side.minute === "" || side.second === "") {
      return true;
    }
  });
};

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

// ************************* AUDIO UPLOAD *************************

let input = document.getElementById("audioInput");
let filesMeta = [];
input.addEventListener(
  "change",
  (event) => {
    filesMeta = [];
    document.getElementById("overlay").style.display = "block";
    setFilesMeta(event.currentTarget);
  },
  false
);

function setFilesMeta(target) {
  const filesList = target.files;
  Object.keys(filesList).forEach((key) => {
    meta = {}; // initiate new object
    setMetaTitle(meta, filesList[key]);// populates array of results for further manipulation
    setMetaMinutesAndSeconds(meta, filesList[key]);
  });

  function setMetaTitle(meta, file) {
    meta.title = file.name.replace(/\.[^/.]+$/, "");
  }

  function setMetaMinutesAndSeconds(meta, file) {
    let reader = new FileReader();
    // When the file has been succesfully read
    reader.onload = (event) => {
      // Create an instance of AudioContext
      let audioContext = new (window.AudioContext || window.webkitAudioContext)();
      // Asynchronously decode audio file data contained in an ArrayBuffer.
      audioContext.decodeAudioData(event.target.result).then((buffer) => {
        // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
        let durationInMilliseconds = buffer.duration;
        // example 12.3234 seconds
        let result = secondsToMinute(parseInt(durationInMilliseconds));
        // push result into metainformations
        meta.minute = result[0];
        meta.second = result[1];
        meta.timeArray = [meta.minute, meta.second];
        filesMeta.push(meta);
        if (
          filesMeta.every((el) => el.minute) &&
          filesMeta.length === filesList.length
        ) {
          destroy();
          rebuildSides("sideA", "sideB", filesMeta);
          document.getElementById("overlay").style.display = "none";
        } else {
        }
      });
    };
    // In case that the file couldn't be read
    reader.onerror = function (event) {
      console.error("An error ocurred reading the file: ", event);
    };
    // Read file as an ArrayBuffer, important !
    reader.readAsArrayBuffer(file);
  }
}
