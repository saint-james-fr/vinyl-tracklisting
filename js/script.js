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
		return Math.abs(totalLengthSideB[0] - totalLengthSideA[0]);};
  let calculValAbs1 = () => {
  	totalLengthSideA = sum("sideA");
		totalLengthSideB = sum("sideB");
  	return Math.abs(totalLengthSideB[1] - totalLengthSideA[1]);};
var t0LengthDifference = [undefined,undefined];
var t1LengthDifference = [undefined,undefined];
let randomNumber = () => Math.floor(Math.random() * 6);
let randomNumberSec = () => Math.floor(Math.random() * 60); 
var combinations = [];

// ************************* INITIALIZATION ************************* 

init("sideA");
init("sideB");
initSecondA();
initSecondB();

function init(side) {
	updateNumberOfTracks(side);
	getSideLetter(side);
	// attach first event listeners
	document.getElementById(`minute ${sideLetter}1`).addEventListener("input", (event) => updateLength(side));
	document.getElementById(`second ${sideLetter}1`).addEventListener("input", (event) => updateLength(side));	
	updateLength(side);
}

function initSecondA() {
	document.getElementById(`second A1`).addEventListener("input", (event) => formatSecond(`second A1`, "sideA"));	
}

function initSecondB() {
	document.getElementById(`second B1`).addEventListener("input", (event) => formatSecond(`second B1`, "sideA"));	
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

/* // "ARE YOU SURE YOU WANT TO REFRESH?"" 

window.onbeforeunload = function () {
	return "Do you want to reload the page?";
};
*/

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

// ************************* PREVENT NULL TITLE ************************* 

function preventNullTitle(side) {
	updateNumberOfTracks(side);
	if (numberOfTracks === 0) {
		addTitle(side)
	}
} 

// ************************* CLASS UPDATE ************************* 

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


// ************************* LENGTH/SIDE CALCULATION ************************* 

function updateLength(side) {
	formatLength(sum(side));
	let el = document.getElementById(`length ${side}`);
	return el.textContent = `TOTAL --- ${result}`;
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
		[`position${sideLetter}`, "col-1"],
		`handler ${sideLetter}${positionNumber}`,
		positionId
	);
	let el = document.getElementById(positionId);
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

/////////// REMOVE TITLE ///////////

function removeTitle(side) {
	updateNumberOfTracks(`${side}`);
	lastPosition = numberOfTracks;
	let lastTitle = document.getElementById(`${side}`).lastElementChild;
	if (lastPosition > 1) {
		lastTitle.remove();
		updateLength(side);
		if (side === "sideA" && dataSideA.length > 0) {
		resetAndFillData(side)
		}
		if (side === "sideB" && dataSideB.length > 0) {
		resetAndFillData(side)
		}
	}
}

// ************************* RESET AND FILL DATA ************************* 



function resetAndFillData(side) {
	if (side === "sideA") { // reset A
		dataSideA = [];
	}
	if (side === "sideB") { // reset B
		dataSideB = [];
	}
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

// ************************* GET ALLDATA ************************* 


function getAllData() {
resetAndFillData("sideA");
resetAndFillData("sideB");
allData = dataSideA.concat(dataSideB);
}


// ************************* SHUFFLE DATA ************************* 

function shuffleAlgo(array) {
  let currentIndex = array.length;
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


function shuffleData() {
shuffledData = shuffleAlgo(allData);
}


// ************************* DESTROY & REBUILD TOOLS ************************* 

function destroy(){
	let sideA = document.getElementById("sideA");
	let sideB = document.getElementById("sideB");
	while (sideA.children.length >0) {sideA.lastElementChild.remove();}
	while (sideB.children.length >0) {sideB.lastElementChild.remove();}	
}

function rebuildSide(oldSource, dataSource, side) {
	for (let i = 0; i < oldSource.length ; i++) {
	addTitle(side); // Crée les lignes 
	}
	let firstElement;	
	for (let i = 0; i < document.getElementById(side).children.length; i++) {
		firstElement = dataSource.shift();
		dataSource.push(firstElement); // avoid empty array of Data
		// gets infos from objects
		document.getElementById(side).children[i].children[1].value = firstElement.title;
		document.getElementById(side).children[i].children[2].children[0].value = firstElement.minute;
		document.getElementById(side).children[i].children[2].children[2].value = firstElement.second;
	}		
}

function rebuildBothSides(firstSide, secondSide, dataSource)  {

	let index = dataSource.length;
	let counterA = 0;
	let counterB = 0;
	let firstElement;	

	if (index >2) {  // TODO : il faut gérer le cas où =2
		while (index > 0) {	
			addTitle(firstSide);
			index--;			
			firstElement = dataSource.shift()
			dataSource.push(firstElement); // avoid empty array of Data
			document.getElementById(firstSide).children[counterA].children[1].value = `Track ${counterA + 1}`;
			firstElement.title = `Track ${counterA}`;
			document.getElementById(firstSide).children[counterA].children[2].children[0].value = firstElement.minute;
			document.getElementById(firstSide).children[counterA].children[2].children[2].value = firstElement.second;
			counterA++;

			if(counterA + counterB < dataSource.length){
				addTitle(secondSide);
				index--;
				firstElement = dataSource.shift();
				dataSource.push(firstElement); // avoid empty array of Data
				document.getElementById(secondSide).children[counterB].children[1].value = `Track ${counterB + 1}`;
				firstElement.title = `Track ${counterB}`;
				document.getElementById(secondSide).children[counterB].children[2].children[0].value = firstElement.minute;
				document.getElementById(secondSide).children[counterB].children[2].children[2].value = firstElement.second;
				counterB++;
			}
		}
	}
	if (index === 2) {
		//side A
		document.getElementById(firstSide).children[0].children[1].value = dataSource[0].title;
		document.getElementById(firstSide).children[0].children[2].children[0].value = dataSource[0].minute;
		document.getElementById(firstSide).children[0].children[2].children[2].value = dataSource[0].second;
		// side B
		document.getElementById(secondSide).children[0].children[1].value = dataSource[1].title;
		document.getElementById(secondSide).children[0].children[2].children[0].value = dataSource[1].minute;
		document.getElementById(secondSide).children[0].children[2].children[2].value = dataSource[1].second;
	}	
}

// ************************* ALGORITHM V2

function sortWithDescending() {
resetAndFillData("sideA");
resetAndFillData("sideB");
dataSideASortedByMinutes = dataSideA.sort((a,b) => b.minute - a.minute);
dataSideBSortedByMinutes = dataSideB.sort((a,b) => b.minute - a.minute);
let assemblage = dataSideASortedByMinutes.concat(dataSideBSortedByMinutes)
allDataSortedByMinutes =  assemblage.sort((a,b) => b.minute - a.minute);
destroy();
rebuildBothSides("sideA", "sideB", allDataSortedByMinutes);

// test 
totalLengthSideA = sum("sideA");
totalLengthSideB = sum("sideB");
t1LengthDifference = [
		calculValAbs0(),
		calculValAbs1()];
combinations.push(t1LengthDifference);
return console.log(combinations);
}


// ************************* SHUFFLE & SORTWITHSHUFFLE ************************* 


function shuffle() {	
	getAllData()
	shuffleData()
	destroy()
	rebuildSide(dataSideA,shuffledData, "sideA")
	rebuildSide(dataSideB,shuffledData, "sideB")
}


function sortWithShuffle() {	

		// tests to avoid stupid or abusive recursions


	if (t0LengthDifference[0] ===  t1LengthDifference[0]
		&& t0LengthDifference[1] ===  t1LengthDifference[1] 
		&& t1LengthDifference[0] !== undefined
		&& t1LengthDifference[1] !== undefined) {
		return console.log("test1", t1LengthDifference);  // test: test already happened + same value obtained than inital value after this first test
	}
	
	if (t1LengthDifference[0] === 0 
		&& t0LengthDifference[1] > t1LengthDifference[1]) {
		return console.log("test2", t1LengthDifference); // test: if diff in minutes = 0 don't run the test
	}
	t0LengthDifference = [calculValAbs0(),calculValAbs1()];
	console.log(t0LengthDifference);

	shuffle(); 
	console.log("let's shuffle bitch!");
	t1LengthDifference = [calculValAbs0(),calculValAbs1()];	
	console.log(t1LengthDifference);
	//recursion
	if (t1LengthDifference[0] = 0 && t1LengthDifference[1] > t0LengthDifference[1] ) {
		{
			console.log("let's do a recursion");
		sortWithShuffle();
		}
	}
}

function sortWithShuffle2() {	

/*
if (t0LengthDifference[0] ===  t1LengthDifference[0]
		&& t0LengthDifference[1] ===  t1LengthDifference[1] 
		&& t1LengthDifference[0] !== undefined
		&& t1LengthDifference[1] !== undefined) {
		return console.log("test1", t1LengthDifference);  // test: test already happened + same value obtained than inital value after this first test
	}
*/	
	if (t1LengthDifference[0] === 0 
		&& t0LengthDifference[1] > t1LengthDifference[1]) {
		return console.log("test2", t1LengthDifference); // test: if diff in minutes = 0 don't run the test
	}


	t0LengthDifference = [calculValAbs0(),calculValAbs1()];
	console.log(t0LengthDifference);
	shuffle(); 
	counterRecursion++;
	console.log(counterRecursion);
	console.log("let's shuffle bitch!");
	t1LengthDifference = [calculValAbs0(),calculValAbs1()];
	console.log(t1LengthDifference)

	if ( t0LengthDifference[0] + (t0LengthDifference[1]/60) > t1LengthDifference[0] + (t1LengthDifference[1]/60) )
		{combinations.push(t1LengthDifference)}
	if ( t1LengthDifference[0] === 0 )
		{combinations.push(t1LengthDifference)}
	if (counterRecursion >= 5) {
		sortWithDescending();
	}
	else {
		console.log("let's do a recursion motherfucker!");
		sortWithShuffle2()};
}


// ************************* GET RANDOM VALUES FOR TEST 

function getRandomLines() {
	let randomnNumberOfLines = randomNumber();
	let randomSide;
	let randomSideOpposite
	if ( Math.random() > .5 ){
	  randomSide = "sideA";
	  randomSideOpposite = "sideB";
	} else {
	  randomSide = "sideB";  
	  randomSideOpposite = "sideA"
	}
	for (let i = 0 ; i < randomnNumberOfLines; i++){
		addTitle(randomSide)
	}
	for (let i = 0 ; i < randomnNumberOfLines+ 1; i++){
		addTitle(randomSideOpposite)
	}
}

function getRandomValues() {	
	let totalLength =  document.getElementById('sideA').children.length + document.getElementById('sideB').children.length
	for (let i = 0; i < totalLength ; i++) {
		let obj = {}		
		if (i%2 ==0){
		obj.minute = randomNumber();
		obj.second = randomNumberSec();
		dataSideA.push(obj);
		}
		else {
		obj.minute = randomNumber();
		obj.second = randomNumberSec();
		dataSideB.push(obj);
		};
	}
}

function writeRandomValues() {
	allData = dataSideA.concat(dataSideB);
	rebuildBothSides("sideA","sideB", allData);	
}

function removeEmptyTitles(side) {
	for (let i = 0; i < document.getElementById(side).children.length; i++ ) {
		if (document.getElementById(side).children[i].children[2].children[0].value === "") {
			document.getElementById(side).children[i].remove()
		}
	}
}


// ************************* ALGO TEST

function populate() {
	getRandomLines()
	getRandomValues();
	writeRandomValues();
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideB");
	removeEmptyTitles("sideB");
	removeEmptyTitles("sideB");
	removeEmptyTitles("sideB");
}

function algoTestShuffle() {
	getRandomLines()
	getRandomValues();
	writeRandomValues();
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideB");
	removeEmptyTitles("sideB");
	removeEmptyTitles("sideB");
	removeEmptyTitles("sideB");
	sortWithShuffle2();
	if(counterRecursion<3){
	sortWithShuffle2();
	sortWithShuffle2();
	sortWithShuffle2();
	}
	console.log(combinations)
}

function algoTestDescending() {
	getRandomLines()
	getRandomValues();
	writeRandomValues();
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideA");
	removeEmptyTitles("sideB");
	removeEmptyTitles("sideB");
	removeEmptyTitles("sideB");
	removeEmptyTitles("sideB");
	sortWithDescending();
}

function algoTestBoth() {
	sortWithDescending()
	sortWithShuffle2();
	if(counterRecursion<40){
	sortWithShuffle2();
	sortWithShuffle2();
	sortWithShuffle2();
	}
	console.log(combinations)
}

// ************************* AVERAGE


function average() {
	totalLengthSideA = sum("sideA");
	totalLengthSideB = sum("sideB");
	avr = [];
	let integer;
	avr[0] = Math.trunc((totalLengthSideA[0] + totalLengthSideB[0])/2); // get integer part of minutes
	integer = avr[0];
	let decimal = ((totalLengthSideA[0] + totalLengthSideB[0])/2) - integer; // get floating part of minutes
	additionalSeconds = decimal*60;
	avr[1] = parseInt(((totalLengthSideA[1] + totalLengthSideB[1])/2) + additionalSeconds);
	return avr;
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
		resetAndFillData("sideA");
		resetAndFillData("sideB");
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