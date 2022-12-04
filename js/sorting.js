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

function destroy() {
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
		document.getElementById(side).children[i].children[2].children[1].value = firstElement.second;
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
			if (firstElement.title === undefined) {
					document.getElementById(firstSide).children[counterA].children[1].value = `Track A${counterA +  1}`;
					firstElement.title = `Track A${counterA + 1}`
				}
				else {
					document.getElementById(firstSide).children[counterA].children[1].value = firstElement.title
				};
			document.getElementById(firstSide).children[counterA].children[2].children[0].value = firstElement.minute;
			document.getElementById(firstSide).children[counterA].children[2].children[1].value = firstElement.second;
			counterA++;

			if(counterA + counterB < dataSource.length){
				addTitle(secondSide);
				index--;
				firstElement = dataSource.shift();
				dataSource.push(firstElement); // avoid empty array of Data
				if (firstElement.title === undefined) {
					document.getElementById(secondSide).children[counterB].children[1].value = `Track B${counterB + 1}`;
					firstElement.title = `Track B${counterB + 1}`
				}
				else {
					document.getElementById(secondSide).children[counterB].children[1].value = firstElement.title
				};
				document.getElementById(secondSide).children[counterB].children[2].children[0].value = firstElement.minute;
				document.getElementById(secondSide).children[counterB].children[2].children[1].value = firstElement.second;
				counterB++;
			}
		}
	}
	if (index === 2) {
		//side A
		document.getElementById(firstSide).children[0].children[1].value = dataSource[0].title;
		document.getElementById(firstSide).children[0].children[2].children[0].value = dataSource[0].minute;
		document.getElementById(firstSide).children[0].children[2].children[1].value = dataSource[0].second;
		// side B
		document.getElementById(secondSide).children[0].children[1].value = dataSource[1].title;
		document.getElementById(secondSide).children[0].children[2].children[0].value = dataSource[1].minute;
		document.getElementById(secondSide).children[0].children[2].children[1].value = dataSource[1].second;
	}
}

// ************************* ALGORITHM V2

function sortWithDescending() {
	resetAndFillData("sideA");
	resetAndFillData("sideB");
	allDataSortedByMinutes =  dataSideA.concat(dataSideB).sort((a,b) => b.minute - a.minute);
  console.log('allDataSortedByMinutes', allDataSortedByMinutes)
	destroy();
	rebuildBothSides("sideA", "sideB", allDataSortedByMinutes);

	// test
	totalLengthSideA = sum("sideA");
  console.log("totalLengthSideA", totalLengthSideA);
	totalLengthSideB = sum("sideB");
  console.log("totalLengthSideB", totalLengthSideB);
	lengthDifference();
  console.log("lengthDifference", lengthDifference)
  console.log('threshold(lengthDifference)', threshold(lengthDifference))

  // Recurstion
	while (threshold(lengthDifference) && counterRecursion < 30) {
		destroy();
		rebuildBothSides("sideA", "sideB", allDataSortedByMinutes);
		console.log("I've made " + counterRecursion + " iterations :).");
		counterRecursion += 1;
		lengthDifference();
		console.log("lengthDifference", lengthDifference)
	}
}

let threshold = (arrayMinSec) => {
	return (arrayMinSec[0] > 2 || (arrayMinSec[0] > 1 &&  arrayMinSec[1] > 30))
};

function lengthDifference() {
	return lengthDifference = [
		calculValAbs0(),
		calculValAbs1()];
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
		return //console.log("test1", t1LengthDifference);  // test: test already happened + same value obtained than inital value after this first test
	}

	if (t1LengthDifference[0] === 0
		&& t0LengthDifference[1] > t1LengthDifference[1]) {
		return //console.log("test2", t1LengthDifference); // test: if diff in minutes = 0 don't run the test
	}
	t0LengthDifference = [calculValAbs0(),calculValAbs1()];
	//console.log(t0LengthDifference);

	shuffle();
	//console.log("let's shuffle bitch!");
	t1LengthDifference = [calculValAbs0(),calculValAbs1()];
	//console.log(t1LengthDifference);
	//recursion
	if (t1LengthDifference[0] = 0 && t1LengthDifference[1] > t0LengthDifference[1] ) {
		{
			//console.log("let's do a recursion");
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
		return //console.log("test2", t1LengthDifference); // test: if diff in minutes = 0 don't run the test
	}


	t0LengthDifference = [calculValAbs0(),calculValAbs1()];
	//console.log(t0LengthDifference);
	shuffle();
	counterRecursion++;
	//console.log(counterRecursion);
	//console.log("let's shuffle bitch!");
	t1LengthDifference = [calculValAbs0(),calculValAbs1()];
	// console.log(t1LengthDifference)

	//if ( t0LengthDifference[0] + (t0LengthDifference[1]/60) > t1LengthDifference[0] + (t1LengthDifference[1]/60) )
		//{combinations.push(t1LengthDifference)}
	//if ( t1LengthDifference[0] === 0 )
		//{combinations.push(t1LengthDifference)}
	if (counterRecursion >= 5) {
		sortWithDescending();
	}
	else {
	// 	console.log("let's do a recursion motherfucker!");
		sortWithShuffle2()};
}


// ************************* GET RANDOM VALUES FOR TEST

function getRandomLines() {
	let randomnNumberOfLines = randomNumberMin();
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
		obj.minute = randomNumberMin();
		obj.second = randomNumberSec();
		dataSideA.push(obj);
		}
		else {
		obj.minute = randomNumberMin();
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

/*function algoTestShuffle() {
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
}*/

/*function algoTestDescending() {
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
}*/

function algoTestBoth() {
	sortWithDescending()
	//sortWithShuffle2();
	//if(counterRecursion<40){
	//sortWithShuffle2();
	//sortWithShuffle2();
	//sortWithShuffle2();
	//}
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

setTimeout(() => {
  populate();
}, 1000);
