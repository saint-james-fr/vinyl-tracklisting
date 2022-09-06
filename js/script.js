Sortable.create(sideA, {
	animation: 150,
	swapThreshold: 0.90,
	handle: ".handle-function",
	group: "shared",
	swap : true,
	swapClass: "highlight",
	filter: ".not_sortable",
});

// window.onbeforeunload = function(){ return 'Do you want to reload the page?';} // cool security to add


updateNumberOfTracks("sideA");
var handlerNumber;
var numberOfTracks;
var positionNumber;
var timeWrapperNumber;


// Update Position when changes happen
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


function updateNumberOfTracks(side) {
	numberOfTracks = document.getElementById(`${side}`).children.length;
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
	  updateNumberOfTracks(`${side}`);
	  handlerNumber = numberOfTracks + 1;	  	
		createHandler(`handler ${handlerNumber}`,`${side}`);
		positionNumber = handlerNumber;
		createPosition(`position ${side}${positionNumber}`,`${sideLetter}`);		
		createIcon();
		createTitle(`title ${positionNumber}`);
		timeWrapperNumber = handlerNumber;
		createTimeWrapper(`timeWrapper ${positionNumber}`);
		createMinute(`minute ${positionNumber}`)
		createSeparator(`separator ${positionNumber}`);
		createSecond(`second ${positionNumber}`);	
}

function removeTitle(side) {
	updateNumberOfTracks(`${side}`)
	lastPosition = numberOfTracks
	let lastTitle = document.getElementById(`${side}`).lastElementChild;
	if (lastPosition > 1) {
	lastTitle.remove();
	}
}

function newElement(el, classes, sourceId, newId) {	
	el = document.createElement(el);
	for (i =0; i < classes.length; i++) {
		el.classList.add(classes[i]);
	};
	document.getElementById(sourceId).appendChild(el);
	el.setAttribute("id", newId);
}

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

function createMinute(minuteId) {
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

}

function createSecond(secondId) {
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
