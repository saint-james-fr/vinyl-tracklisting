Init("sideA")

function Init(side) {
updateNumberOfTracks(side);
// attach first event listeners
document.getElementById("minute 1").addEventListener("input", event => length(side));
document.getElementById("second 1").addEventListener("input", event => length(side));
document.getElementById("second 1").addEventListener("input", event => formatSecond("second 1", side));
length(side);
}

// window.onbeforeunload = function(){ return 'Do you want to reload the page?';} // cool security to add



// ************************* GLOBAL VARIABLES 


var handlerNumber;
var numberOfTracks;
var positionNumber;
var timeWrapperNumber;
var sumOfSideA;


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

// ************************* EVENT HANDLER

var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    updatePosition("sideA");
  });
});
mutationObserver.observe(document.documentElement, {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
  attributeOldValue: true,
  characterDataOldValue: true
});


// ************************* CALCUL 


function length(side){
let value = sum(side);
el = document.getElementById(`length ${side}`);
// format 0m : 0s 
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
el.textContent = "Durée Face A --- " + result;
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
	sumMinutesResults = {}
		for (var i = 0; i < numberOfTracks; i++) {
			id = `minute ${i + 1}`;
			sumMinutesResults[id] = Number(document.getElementById(id).value); 
			// construction de l'objet	
  }
  return sumObjValues(sumMinutesResults)
}

function sumSeconds(side) {
	updateNumberOfTracks(side);
	sumSecondsResults = {}
		for (var i = 0; i < numberOfTracks; i++) {
			id = `second ${i + 1}`;
			sumSecondsResults[id] = Number(document.getElementById(id).value); 
			// construction de l'objet	
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
  	return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
	};

// ************************* NEW TITLES CREATION 


// ELEMENT WITH CLASSES & DIV CREATOR
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
}

function updatePosition(side) {
	var sideLetter = side.slice(4)
	positionElements = document.getElementsByClassName("position")
	for (let i = 0; i < positionElements.length; i++) {
		a = document.getElementById(positionElements[i].id);
		newNumber = i + 1		
		a.textContent = `${sideLetter}${newNumber}`		
	}
}

function addTitle(side) {
		var sideLetter = side.slice(4);
	  updateNumberOfTracks(side);
	  numberOfTracks += 1;
	  handlerNumber = numberOfTracks;	  	
		createHandler(`handler ${handlerNumber}`,side);
		positionNumber = handlerNumber;
		createPosition(`position ${positionNumber}`, sideLetter);		
		createIcon();
		createTitle(`title ${positionNumber}`);
		timeWrapperNumber = handlerNumber;
		createTimeWrapper(`timeWrapper ${positionNumber}`);
		createMinute(`minute ${positionNumber}`, side)
		createSeparator(`separator ${positionNumber}`);
		createSecond(`second ${positionNumber}`, side);			
}


// addTitle() NEEDED FEATURES
function createHandler(handlerId,side) {
	newElement(
		"div",
		["list-group-item", "handle-function", "row"],
		side,
		handlerId
		)	
}

function createPosition(positionId,side) {
	newElement(
		"span",
		["position", "col-1"],
		`handler ${positionNumber}`,
		positionId
		)
	a = document.getElementById(positionId)
	a.textContent = `${side}${positionNumber}`
}

function createIcon() {
	newElement(
		"span",
		["fa", "fa-arrows-alt", "handle", "col-1"],
		`handler ${positionNumber}`,
		null
		)
}

function createTitle(titleId) {
	newElement(
		"input",
		["title-input", "col-7"],
		`handler ${positionNumber}`,
		titleId
		)
	document.getElementById(titleId).setAttribute("placeholder", "Enter Title...");
	document.getElementById(titleId).setAttribute("type", "text")
}

function createTimeWrapper(wrapperId) {
	newElement(
		"div",
		["time-wrapper", "col-3"],
		`handler ${positionNumber}`,
		wrapperId
		)
}

function createMinute(minuteId, side) {
	newElement(
		"input",
		["minute-input"],
		`timeWrapper ${positionNumber}`,
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
		`timeWrapper ${positionNumber}`,
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
		`timeWrapper ${positionNumber}`,
		separatorId
		)
	document.getElementById(separatorId).textContent = ":";
}




function removeTitle(side) {
	updateNumberOfTracks(`${side}`)
	lastPosition = numberOfTracks
	let lastTitle = document.getElementById(`${side}`).lastElementChild;
	if (lastPosition > 1) {
	lastTitle.remove();
	length(side)
	}
}


// ************************* RELATIVE TO EXTERNAL LIBRARIES



Sortable.create(sideA, {
	animation: 150,
	swapThreshold: 0.90,
	handle: ".handle-function",
	group: "shared",
	swap : true,
	swapClass: "highlight",
	filter: ".not_sortable",
});








