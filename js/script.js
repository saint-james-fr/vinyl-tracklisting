




// ************************* GLOBAL VARIABLES 



var numberOfTracks;
var handlerNumber;
var positionNumber;
var timeWrapperNumber;
var sideLetter;
var counterA = 1 ;
var counterB = 1;
var dataSideA = [];
var dataSideB = [];
var totalLengthSideA;
var totalLengthSideB;


// ************************* INITIALIZATION

Init("sideA")
Init("sideB")


function Init(side) {
updateNumberOfTracks(side);
getSideLetter(side)
// attach first event listeners
document.getElementById(`minute ${sideLetter}1`).addEventListener("input", event => length(side));
document.getElementById(`second ${sideLetter}1`).addEventListener("input", event => length(side));
document.getElementById(`second ${sideLetter}1`).addEventListener("input", event => formatSecond(`second ${sideLetter}1`, side));
length(side);
}

// ************************* DATA VALIDATION

function formatSecond(id, side) {
	if (document.getElementById(id).value > 60) {
		erase(id);
		length(side) // MAJ durée totale
	}
}

function erase(id) {
	document.getElementById(id).value = null;
}


window.onbeforeunload = function(){ return 'Do you want to reload the page?';}

// ************************* DATA COLLECTING


function fillData(side) {
	// dataSide Object remplissage
	for (i = 0; i < document.getElementById(side).children.length; i++) {
		let positionPDF;
		let titlePDF;
		let minutePDF;
		let secondPDF;
		positionPDF = document.getElementById(side).children[i].children[0].textContent;
		titlePDF = document.getElementById(side).children[i].children[2].value;
		minutePDF = document.getElementById(side).children[i].children[3].children[0].value;
		secondPDF = document.getElementById(side).children[i].children[3].children[2].value;
		if (side === "sideA") {
			let object = {}
			object["position"] = positionPDF;
		  object["title"] = titlePDF;
			object["minute"] = minutePDF;
			object["second"] = secondPDF;
			dataSideA.push(object)
			totalLengthSideA = formatLength(sum(side))
			}
		if (side === "sideB") {
			let object = {}
			object["position"] = positionPDF;
		  object["title"] = titlePDF;
			object["minute"] = minutePDF;
			object["second"] = secondPDF;
			dataSideB.push(object)
			totalLengthSideB = formatLength(sum(side))
			}
		}
	}



// ************************* EVENT HANDLER

window.addEventListener("DOMContentLoaded", function() {
	var mutationObserver = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	  updatePosition("sideA");
	  updatePosition("sideB");
	  length("sideA");
	  length("sideB");
	  });
	});
	mutationObserver.observe(document.documentElement, {
	  attributes: false,
	  characterData: true,
	  childList: true,
	  subtree: true,
	  attributeOldValue: false,
	  characterDataOldValue: false
	});        
});



// ************************* LENGTH/SIDE CALCUL 


function length(side){
formatLength(sum(side));
el = document.getElementById(`length ${side}`);
// el.textContent = `Length Side ${getSideLetter(side)} --- ${result}`;
el.textContent = `TOTAL --- ${result}`;

}


function formatLength(value){ // mm:ss
	if (value[1] <10 & value[0] >=10) {
	result = value[0] + " : 0" + value[1]
	}
	else if (value[0] <10 & value[1] >=10) {
	result = "0" + value[0] + " : " + value[1];
	}
	else if (value[0] <10 && value[1] <10) {
	result = "0" + value[0] + " : 0" + value[1];
	}
	else {
	result = value[0] + " : " + value[1];
	}
	return result;
}

function sum(side) {
updateNumberOfTracks(side);
seconds = sumSeconds(side);
minutes = sumMinutes(side);
minutes += secondsToMinute(seconds)[0];
seconds = secondsToMinute(seconds)[1]
return [minutes, seconds];
}

function sumMinutes(side) {
	updateNumberOfTracks(side);
	sumMinutesResults = {};
	let a = document.querySelectorAll(`#${side} .minute-input`);
		for (var i = 0; i < a.length; i++) {
			let value = a[i].value
			sumMinutesResults[i] = value;
	}
  return sumObjValues(sumMinutesResults)
}

function sumSeconds(side) {
	updateNumberOfTracks(side);
	sumSecondsResults = {};
	let a = document.querySelectorAll(`#${side} .second-input`);
		for (var i = 0; i < a.length; i++) {
			let value = a[i].value
			sumSecondsResults[i] = value;
	}
  return sumObjValues(sumSecondsResults)
}

function secondsToMinute(seconds) {
let minutes = Math.floor(seconds / 60);
let leftover = seconds % 60;
let result = [minutes, leftover];
return result;
}

function sumObjValues(obj) {
  	return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);  // additionne les keys
	};

// ************************* DOM MANIPULATION 


// GET SIDELETTER
function getSideLetter(side){
sideLetter = side.slice(4);
return sideLetter;
}


// CREATE ELEMENT 
function newElement(el, classes, sourceId, newId) {	
	el = document.createElement(el);
	for (i =0; i < classes.length; i++) {
		el.classList.add(classes[i]);
	};
	document.getElementById(sourceId).appendChild(el);
	el.setAttribute("id", newId);
}


function updateNumberOfTracks(side) {
	numberOfTracks = document.getElementById(side).children.length;	
	return numberOfTracks
}

// UPDATE POSITION

function updatePosition(side) {
	getSideLetter(side);
	let positionElements = document.getElementById(side).children;
	for (let i = 0; i < positionElements.length; i++) {
		a = document.getElementById(positionElements[i].children[0].id);
		let index = i + 1;		
		a.textContent = `${sideLetter}${index}`;
	}
	
}

// ADD TITLE


function addTitle(side) {
	if (side === "sideA") {
		counterA++
	}
	if (side === "sideB") {
		counterB++
	}

		getSideLetter(side);
			if (side === "sideA") {
				createHandler(`handler ${sideLetter}${counterA}`,side);
				positionNumber = counterA;
				createPosition(`position ${sideLetter}${positionNumber}`, sideLetter);		
				createIcon(sideLetter);
				createTitle(`title ${sideLetter}${positionNumber}`, sideLetter);
				createTimeWrapper(`timeWrapper ${sideLetter}${positionNumber}`);
				createMinute(`minute ${sideLetter}${positionNumber}`, side)
				createSeparator(`separator ${sideLetter}${positionNumber}`);
				createSecond(`second ${sideLetter}${positionNumber}`, side);
				}
			if (side === "sideB") {
				createHandler(`handler ${sideLetter}${counterB}`,side);
				positionNumber = counterB;
				createPosition(`position ${sideLetter}${positionNumber}`, sideLetter);		
				createIcon(sideLetter);
				createTitle(`title ${sideLetter}${positionNumber}`, sideLetter);
				createTimeWrapper(`timeWrapper ${sideLetter}${positionNumber}`);
				createMinute(`minute ${sideLetter}${positionNumber}`, side)
				createSeparator(`separator ${sideLetter}${positionNumber}`);
				createSecond(`second ${sideLetter}${positionNumber}`, side);
				}
	}
	
// addTitle() NEEDED FEATURES
function createHandler(handlerId, side) {
	newElement(
		"div",
		["list-group-item", "handle-function", "row"],
		side,
		handlerId
		)	
}

function createPosition(positionId, sideLetter) {
	newElement(
		"span",
		[`position${sideLetter}`, "col-1"],
		`handler ${sideLetter}${positionNumber}`,
		positionId
		)
	a = document.getElementById(positionId)
	a.textContent = `${sideLetter}${positionNumber}`
}

function createIcon(sideLetter) {
	newElement(
		"span",
		["fa", "fa-arrows-alt", "handle", "col-1"],
		`handler ${sideLetter}${positionNumber}`,
		null
		)
}

function createTitle(titleId, sideLetter) {
	newElement(
		"input",
		["title-input", "col-7"],
		`handler ${sideLetter}${positionNumber}`,
		titleId
		)
	document.getElementById(titleId).setAttribute("placeholder", "Enter Title...");
	document.getElementById(titleId).setAttribute("type", "text")
}

function createTimeWrapper(wrapperId) {
	newElement(
		"div",
		["time-wrapper", "col-3"],
		`handler ${sideLetter}${positionNumber}`,
		wrapperId
		)
}

function createMinute(minuteId, side) {
	newElement(
		"input",
		["minute-input"],
		`timeWrapper ${sideLetter}${positionNumber}`,
		minuteId
		)
	document.getElementById(minuteId).setAttribute("placeholder", "mm");
	document.getElementById(minuteId).setAttribute("type", "number");
	document.getElementById(minuteId).setAttribute("min", "0");
	document.getElementById(minuteId).setAttribute("max", "59");
	document.getElementById(minuteId).setAttribute("oninput", "this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null");	
	document.getElementById(minuteId).addEventListener("input", event => length(side));
}

function createSecond(secondId, side) {
	newElement(
		"input",
		["second-input"],
		`timeWrapper ${sideLetter}${positionNumber}`,
		secondId
		)
	document.getElementById(secondId).setAttribute("placeholder", "ss");
	document.getElementById(secondId).setAttribute("type", "number");
	document.getElementById(secondId).setAttribute("min", "0");
	document.getElementById(secondId).setAttribute("max", "59");
	document.getElementById(secondId).setAttribute("oninput", "this.value = !!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null");
	document.getElementById(secondId).addEventListener("input", event => length(side)); // calcul durée totale
	document.getElementById(secondId).addEventListener("input", event => formatSecond(secondId, side));
}

function createSeparator(separatorId) {
	newElement(
		"span",
		["time-separator"],
		`timeWrapper ${sideLetter}${positionNumber}`,
		separatorId
		)
	document.getElementById(separatorId).textContent = ":";
}


// REMOVE TITLE

function removeTitle(side) {
	updateNumberOfTracks(`${side}`)
	lastPosition = numberOfTracks
	let lastTitle = document.getElementById(`${side}`).lastElementChild;
	if (lastPosition > 1) {
	lastTitle.remove();
	length(side)
	}
}


// ************************* EXTERNAL LIBRARIES : JSSORTAbLE


Sortable.create(sideA, {
	animation: 140,
	swapThreshold: 1,
	handle: ".handle-function",
	group: "shared",
	selectedClass: 'highlight', 
	fallbackTolerance: 3,
	filter: '.not-sortable'
});

Sortable.create(sideB, {
	animation: 140,
	swapThreshold: 1,
	handle: ".handle-function",
	group: "shared",
	selectedClass: 'highlight', 
	fallbackTolerance: 3
});



// ************************* EXTERNAL LIBRARIES : JSPDF & JSPDF-AUTOTABLE



function generatePDF() {

if (document.getElementById("sideA").children.length > 0 && document.getElementById("sideB").children.length > 0) {
	fillData("sideA");
	fillData("sideB");

	let catNr = window.prompt("Enter the catalogue number of your vinyl")

  var doc = new jsPDF();
  var col = ["Position","Title","min","sec"];
  var rows = [];     
   dataSideA.forEach(element => {      
        let temp = [element.position,element.title,element.minute,element.second];
        rows.push(temp);
    		});        
   dataSideB.forEach(element => {      
        let temp = [element.position,element.title,element.minute,element.second];
        rows.push(temp);
    		}); 

  doc.autoTable(col, rows, { 
  	startY: 50, 
  	cellWidth: "auto",
  	columnStyles: {   //vise la colonne [0] de l'array
     	0: { 
      	fontStyle: 'bold' 
      },
    }
  });

  doc.setFontSize(12)
  doc.text(catNr, 10, 10)
  doc.text("Total Length Face A - " + totalLengthSideA, 10, 20)
  doc.text("Total Length Face B - " + totalLengthSideB, 10, 30)  
  doc.save('Test.pdf');
	}
else {
	if (document.getElementById("sideA").children.length === 0) {
	alert("Side A is empty")
	}
	if (document.getElementById("sideB").children.length === 0) {
	alert("Side B is empty")
	}
}
}