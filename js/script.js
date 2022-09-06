Sortable.create(faceA, {
	animation: 200,
	handle: ".handle-function",
	group: "shared",
	swap : true,
	swapClass: "highlight",
});

updateNumberOfTracks();



var handlerNumber;
var numberOfTracks;
var positionNumber;
var timeWrapperNumber;
var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    updatePosition();
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


function updateNumberOfTracks() {
	numberOfTracks = document.getElementById("faceA").children.length;
}

function updatePosition() {
	positionElements = document.getElementsByClassName("position")
	for (let i = 0; i < positionElements.length; i++) {
		a = document.getElementById(positionElements[i].id);
		newNumber = i + 1		
		a.textContent = `A${newNumber}`		
	}
}

function addTitle() {
	  	updateNumberOfTracks();
	  	handlerNumber = numberOfTracks + 1;	  	
		createHandler(`handler ${handlerNumber}`);
		positionNumber = handlerNumber;
		createPosition(`position A${positionNumber}`);		
		createIcon();
		createTitle(`title ${positionNumber}`);
		timeWrapperNumber = `timeWrapper ${positionNumber}`;
		createTimeWrapper(timeWrapperNumber);
		createMinute(`minute ${positionNumber}`)
		createSeparator(`separator ${positionNumber}`);
		createSecond(`second ${positionNumber}`);	
}

function removeTitle() {
	updateNumberOfTracks()
	lastPosition = faceA.length
	let lastTitle = document.getElementById("faceA").lastElementChild;
	if (lastPosition !== null) {
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

function createHandler(handlerId) {
	newElement(
		"div",
		["list-group-item", "handle-function", "row"],
		"faceA",
		handlerId
		)	
}

function createPosition(positionId) {
	newElement(
		"span",
		["position", "col-1"],
		`handler ${positionNumber}`,
		positionId
		)
	a = document.getElementById(positionId)
	a.textContent = `A${positionNumber}`
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
