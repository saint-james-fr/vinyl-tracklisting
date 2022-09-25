// ************************* GLOBAL VARIABLES

var numberOfTracks;
var handlerNumber;
var positionNumber;
var timeWrapperNumber;
var sideLetter;
var counterA = 1;
var counterB = 1;
var dataSideA = [];
var dataSideB = [];
var totalLengthSideA;
var totalLengthSideB;
var allData;
var shuffledData;

// ************************* INITIALIZATION

Init("sideA");
Init("sideB");

function Init(side) {
	updateNumberOfTracks(side);
	getSideLetter(side);
	// attach first event listeners
	document
		.getElementById(`minute ${sideLetter}1`)
		.addEventListener("input", (event) => updateLength(side));
	document
		.getElementById(`second ${sideLetter}1`)
		.addEventListener("input", (event) => updateLength(side));
	document
		.getElementById(`second ${sideLetter}1`)
		.addEventListener("input", (event) =>
			formatSecond(`second ${sideLetter}1`, side)
		);
	updateLength(side);
}

// ************************* DATA VALIDATION

function formatSecond(id, side) {
	if (document.getElementById(id).value > 60) {
		erase(id);
		updateLength(side); // MAJ durée totale
	}
}

function erase(id) {
	document.getElementById(id).value = null;
}

window.onbeforeunload = function () {
	return "Do you want to reload the page?";
};

// ************************* DATA COLLECTING

function fillData(side) {
	if (dataSideA.length === 0 || dataSideB.length === 0) {
		for (i = 0; i < document.getElementById(side).children.length; i++) {
			let position;
			let title;
			let minute;
			let second;
			position =
				document.getElementById(side).children[i].children[0]
					.textContent;
			title =
				document.getElementById(side).children[i].children[1].value;
			minute =
				document.getElementById(side).children[i].children[2].children[0]
					.value;
			second =
				document.getElementById(side).children[i].children[2].children[2]
					.value;
			if (side === "sideA") {
				let object = {};
				object["position"] = position;
				object["title"] = title;
				object["minute"] = minute;
				object["second"] = second;
				dataSideA.push(object);
				totalLengthSideA = formatLength(sum(side));
			}
			if (side === "sideB") {
				let object = {};
				object["position"] = position;
				object["title"] = title;
				object["minute"] = minute;
				object["second"] = second;
				dataSideB.push(object);
				totalLengthSideB = formatLength(sum(side));
			}
		}
	}
}
// ************************* EVENT HANDLER

window.addEventListener("DOMContentLoaded", function () {
	var mutationObserver = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			updatePosition("sideA");
			updatePosition("sideB");			
			updateLength("sideA");
			updateLength("sideB");
			updateClassSideA();
			updateClassSideB();
			preventNullTitle("sideA")
			preventNullTitle("sideB")
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

// ************************* PREVENT NULL TITLE

function preventNullTitle(side) {
	updateNumberOfTracks(side);
	if (numberOfTracks === 0) {
		addTitle(side)
	}
} 



// ************************* CLASS CHANGER

function updateClassSideA() {
	let children = document.getElementById("sideA").children;
	let arrayChildren = Array.from(children);
	arrayChildren.forEach(element => {		
		let arrayClass = Array.from(element.classList)	
		if (arrayClass.includes("color-side-a")) {
			return
		}
		if (arrayClass.includes("color-side-b")) {
			element.classList.remove("color-side-b")
			element.classList.add("color-side-a")
		}					
		else {
			element.classList.add("color-side-a")
		}			
	})
}

function updateClassSideB() {
	let children = document.getElementById("sideB").children;
	let arrayChildren = Array.from(children);
	arrayChildren.forEach(element => {		
		let arrayClass = Array.from(element.classList)	
		if (arrayClass.includes("color-side-b")) {
			return
		}
		if (arrayClass.includes("color-side-a")) {
			element.classList.remove("color-side-a")
			element.classList.add("color-side-b")
		}					
		else {
			element.classList.add("color-side-b")
		}			
	})
}


// ************************* LENGTH/SIDE CALCUL

function updateLength(side) {
	formatLength(sum(side));
	el = document.getElementById(`length ${side}`);
	el.textContent = `TOTAL --- ${result}`;
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
	seconds = sumSeconds(side);
	minutes = sumMinutes(side);
	minutes += secondsToMinute(seconds)[0];
	seconds = secondsToMinute(seconds)[1];
	return [minutes, seconds];
}

function sumMinutes(side) {
	updateNumberOfTracks(side);
	sumMinutesResults = {};
	let el = document.querySelectorAll(`#${side} .minute-input`);
	for (var i = 0; i < el.length; i++) {
		let value = el[i].value;
		sumMinutesResults[i] = value;
	}
	return sumObjValues(sumMinutesResults);
}

function sumSeconds(side) {
	updateNumberOfTracks(side);
	sumSecondsResults = {};
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

// ************************* DOM MANIPULATION

// GET SIDELETTER

function getSideLetter(side) {
	sideLetter = side.slice(4);
	return sideLetter;
}

// CREATE ELEMENTS

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

// UPDATE POSITION

function updateNumberOfTracks(side) {
	numberOfTracks = document.getElementById(side).children.length;
	return numberOfTracks;
}

function updatePosition(side) {
	getSideLetter(side);
	let positionElements = document.getElementById(side).children;
	for (let i = 0; i < positionElements.length; i++) {
		el = document.getElementById(positionElements[i].children[0].id);
		let index = i + 1;
		el.textContent = `${sideLetter}${index}`;
	}
}

// ADD TITLE

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
		createSeparator(`separator ${sideLetter}${positionNumber}`);
		createSecond(`second ${sideLetter}${positionNumber}`, side);
	}
	if (side === "sideB") {
		createHandler(`handler ${sideLetter}${counterB}`, side);
		positionNumber = counterB;
		createPosition(`position ${sideLetter}${positionNumber}`, sideLetter);
		createTitle(`title ${sideLetter}${positionNumber}`, sideLetter);
		createTimeWrapper(`timeWrapper ${sideLetter}${positionNumber}`);
		createMinute(`minute ${sideLetter}${positionNumber}`, side);
		createSeparator(`separator ${sideLetter}${positionNumber}`);
		createSecond(`second ${sideLetter}${positionNumber}`, side);
	}
}

// addTitle() NEEDED FEATURES

function createHandler(handlerId, side) {
	addElementWithID(
		"div",
		["list-group-item", "handle-function", "row"],
		side,
		handlerId
	);
	el = document.getElementById(handlerId);
}

function createPosition(positionId, sideLetter) {
	addElementWithID(
		"span",
		[`position${sideLetter}`, "col-1"],
		`handler ${sideLetter}${positionNumber}`,
		positionId
	);
	el = document.getElementById(positionId);
	el.textContent = `${sideLetter}${positionNumber}`;
}

function createTitle(titleId, sideLetter) {
	addElementWithID(
		"input",
		["title-input", "col-7"],
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
		["time-wrapper", "col-3"],
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
	el = document.getElementById(minuteId);
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

function createSeparator(separatorId) {
	addElementWithID(
		"span",
		["time-separator"],
		`timeWrapper ${sideLetter}${positionNumber}`,
		separatorId
	);
	let el = document.getElementById(separatorId);
	el.textContent = ":";
}

// REMOVE TITLE

function removeTitle(side) {
	updateNumberOfTracks(`${side}`);
	lastPosition = numberOfTracks;
	let lastTitle = document.getElementById(`${side}`).lastElementChild;
	if (lastPosition > 1) {
		lastTitle.remove();
		updateLength(side);
	}
}

// ************************* SHUFFLE DATA

function shuffleAlgo(array) {
  let currentIndex = array.length
  let randomIndex;

  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function getAllData() {
fillData("sideA");
fillData("sideB");
allData = dataSideA.concat(dataSideB)
}


function shuffleData() {
shuffledData = shuffleAlgo(allData);
}

// ************************* RANDOM & REBUILD 



function random() {	
	getAllData()
	shuffleData()
	destroy()
	rebuildSide(dataSideA,shuffledData, "sideA")
	rebuildSide(dataSideB,shuffledData, "sideB")
}


function destroy(){
	let sideA = document.getElementById("sideA")
	let sideB = document.getElementById("sideB")
	while (sideA.children.length >0) {sideA.lastElementChild.remove()}
	while (sideB.children.length >0) {sideB.lastElementChild.remove()}	
}

function rebuildSide(oldSource, newSource, side) {
	for (let i = 0; i < oldSource.length ; i++) {
	addTitle(side); // Crée les lignes 
	console.log("new line")
	}
	let first;	
	for (let i = 0; i < document.getElementById(side).children.length; i++) {
		first = newSource.shift()
		newSource.push(first); // avoid empty array of Data
		// gets infos from objects
		document.getElementById(side).children[i].children[1].value = first.title 
		document.getElementById(side).children[i].children[2].children[0].value = first.minute 
		document.getElementById(side).children[i].children[2].children[2].value = first.second
	}		
}








// ************************* EXTERNAL LIBRARIES : JSSORTAbLE

Sortable.create(sideA, {
	animation: 140,
	swapThreshold: 1,
	handle: ".handle-function",
	group: "shared",
	selectedClass: "highlight",
	fallbackTolerance: 3,
	filter: ".not-sortable",
});

Sortable.create(sideB, {
	animation: 140,
	swapThreshold: 1,
	handle: ".handle-function",
	group: "shared",
	selectedClass: "highlight",
	fallbackTolerance: 3,
});







// ************************* EXTERNAL LIBRARIES : JSPDF & JSPDF-AUTOTABLE

function generatePDF() {
	if (
		document.getElementById("sideA").children.length > 0 &&
		document.getElementById("sideB").children.length > 0
	) {
		fillData("sideA");
		fillData("sideB");
		let catNr = window.prompt("Enter the catalogue number of your vinyl");
		var doc = new jsPDF();
		var col = ["Position", "Title", "min", "sec"];
		var rows = [];
		dataSideA.forEach((element) => {
			let temp = [
				element.position,
				element.title,
				element.minute,
				element.second,
			];
			rows.push(temp);
		});
		dataSideB.forEach((element) => {
			let temp = [
				element.position,
				element.title,
				element.minute,
				element.second,
			];
			rows.push(temp);
		});

		doc.autoTable(col, rows, {
			startY: 50,
			cellWidth: "auto",
			columnStyles: {
				//vise la colonne [0] de l'array
				0: {
					fontStyle: "bold",
				},
			},
		});

		doc.setFontSize(12);
		doc.text(catNr, 10, 10);
		doc.text("Total Length Face A - " + totalLengthSideA, 10, 20);
		doc.text("Total Length Face B - " + totalLengthSideB, 10, 30);
		doc.save("Test.pdf");
	} else {
		if (document.getElementById("sideA").children.length === 0) {
			alert("Side A is empty");
		}
		if (document.getElementById("sideB").children.length === 0) {
			alert("Side B is empty");
		}
	}
}
