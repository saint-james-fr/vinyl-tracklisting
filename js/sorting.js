// ************************* GET ALLDATA *************************

function getAllData() {
resetAndFillData("sideA");
resetAndFillData("sideB");
allData = dataSideA.concat(dataSideB);
}


// ************************* DESTROY & REBUILD FROM DATA *************************

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

	if (index >2) {
    // creates title until all titles are created
		while (index > 0) {
			addTitle(firstSide);
			index--;
			firstElement = dataSource.shift() //takes first element and put it at the end
			dataSource.push(firstElement); // avoid empty array of Data
      // creates nth track from firstelement of Datasource - if no title, gets title from position
      let firstSideElement = document.getElementById(firstSide)
      let secondSideElement = document.getElementById(secondSide);

			if (firstElement.title === undefined) {
					firstSideElement.children[counterA].children[1].value = `Track A${counterA +  1}`;
					firstElement.title = `Track A${counterA + 1}`
				}
				else {
					firstSideElement.children[counterA].children[1].value = firstElement.title
				};
			firstSideElement.children[counterA].children[2].children[0].value = firstElement.minute;
			firstSideElement.children[counterA].children[2].children[1].value = firstElement.second;
			counterA++;

      //
			if(counterA + counterB < dataSource.length){ // compares numbers of title created with titles needed
				addTitle(secondSide);
				index--;
				firstElement = dataSource.shift();
				dataSource.push(firstElement); // avoid empty array of Data
				if (firstElement.title === undefined) {
					document.getElementById(secondSide).children[counterB].children[1].value = `Track B${counterB + 1}`;
					firstElement.title = `Track B${counterB + 1}`
				}
				else {
					secondSideElement.children[counterB].children[1].value = firstElement.title
				};
				secondSideElement.children[counterB].children[2].children[0].value = firstElement.minute;
				secondSideElement.children[counterB].children[2].children[1].value = firstElement.second;
				counterB++;
			}
		}
	}
	if (index === 2) {
		//side A
		firstSideElement.children[0].children[1].value = dataSource[0].title;
		firstSideElement.children[0].children[2].children[0].value = dataSource[0].minute;
		firstSideElement.children[0].children[2].children[1].value = dataSource[0].second;
		// side B
		secondSideElement.children[0].children[1].value = dataSource[1].title;
		secondSideElement.children[0].children[2].children[0].value = dataSource[1].minute;
		secondSideElement.children[0].children[2].children[1].value = dataSource[1].second;
	}
}

// ************************* ALGORITHM V2

function sortWithDescending() {
  if (lengthDifference() !== [0, 0])
    return window.alert("Please enter some values.");
  if (!threshold(lengthDifference()))
      return window.alert("It seems already well balanced");
	resetAndFillData("sideA");
	resetAndFillData("sideB");
	allDataSortedByMinutes =  dataSideA.concat(dataSideB).sort((a,b) => b.minute - a.minute);
	destroy();
	rebuildBothSides("sideA", "sideB", allDataSortedByMinutes);

	// test
  let total = [0, 0]
  calculLength = () => {
    resetAndFillData("sideA");
    resetAndFillData("sideB");
    totalLengthSideA = sum("sideA");
    totalLengthSideB = sum("sideB");
    total = [
      totalLengthSideA[0] + totalLengthSideB[0],
      totalLengthSideA[1] + totalLengthSideB[1],
    ];
  }
  calculLength();
  console.log("side A:", totalLengthSideA)
  console.log("side B:", totalLengthSideB)
  console.log("Length Difference", lengthDifference())
  console.log ("TOTAL both sides", total)
  // Recursion
  let lD = lengthDifference()
	while (threshold(lD) && counterRecursion < 30) {
    console.log("im in")
		if (
      totalLengthSideA > totalLengthSideB
    ) {
      console.log("swapping A to B");
      swapTitle('sideA', 'sideB');
      calculLength();
    }
    else if (totalLengthSideA < totalLengthSideB) {
      console.log("swapping B to A");
      swapTitle('sideB', 'sideA');
      calculLength();
    }
		counterRecursion += 1;
		console.log("I've made " + counterRecursion + " iterations :).");
    lD = lengthDifference();
    console.log("Length Difference", lD);
    console.log("TOTAL both sides", total);
  };
  removeEmptyTitles("sideA");
  removeEmptyTitles("sideB");
}

function threshold(arrayMinSec) {
	return arrayMinSec[0] > 1 || (arrayMinSec[0] > 2 && arrayMinSec[1] > 30);
};

const lengthDifference = () => {
	return [
		calculValAbs0(),
		calculValAbs1()];
}


// ************************* GET RANDOM VALUES FOR TEST

function getRandomLines() {
	let randomnNumberOfLines = randomNumberMin();
	let randomSide;
	let randomSideOpposite
	if ( Math.random() > .5 ) {
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
};

function writeRandomValues() {
	allData = dataSideA.concat(dataSideB);
	rebuildBothSides("sideA","sideB", allData);
};

function removeEmptyTitles(side) {
	for (let i = 0; i < document.getElementById(side).children.length; i++ ) {
		if (document.getElementById(side).children[i].children[2].children[0].value === "") {
			document.getElementById(side).children[i].remove()
		}
	}
};

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
};
