var t0LengthDifference = [undefined, undefined];
var t1LengthDifference = [undefined, undefined];
let shuffledData;


function sortWithShuffle2() {
  /*
if (t0LengthDifference[0] ===  t1LengthDifference[0]
		&& t0LengthDifference[1] ===  t1LengthDifference[1]
		&& t1LengthDifference[0] !== undefined
		&& t1LengthDifference[1] !== undefined) {
		return console.log("test1", t1LengthDifference);  // test: test already happened + same value obtained than inital value after this first test
	}
*/
  if (
    t1LengthDifference[0] === 0 &&
    t0LengthDifference[1] > t1LengthDifference[1]
  ) {
    return; //console.log("test2", t1LengthDifference); // test: if diff in minutes = 0 don't run the test
  }

  t0LengthDifference = [calculValAbs0(), calculValAbs1()];
  //console.log(t0LengthDifference);
  shuffle();
  counterRecursion++;
  //console.log(counterRecursion);
  //console.log("let's shuffle bitch!");
  t1LengthDifference = [calculValAbs0(), calculValAbs1()];
  // console.log(t1LengthDifference)

  //if ( t0LengthDifference[0] + (t0LengthDifference[1]/60) > t1LengthDifference[0] + (t1LengthDifference[1]/60) )
  //{combinations.push(t1LengthDifference)}
  //if ( t1LengthDifference[0] === 0 )
  //{combinations.push(t1LengthDifference)}
  if (counterRecursion >= 5) {
    sortAlgorithm();
  } else {
    // 	console.log("let's do a recursion motherfucker!");
    sortWithShuffle2();
  }
}

function sortWithShuffle() {
  // tests to avoid stupid or abusive recursions

  if (
    t0LengthDifference[0] === t1LengthDifference[0] &&
    t0LengthDifference[1] === t1LengthDifference[1] &&
    t1LengthDifference[0] !== undefined &&
    t1LengthDifference[1] !== undefined
  ) {
    return; //console.log("test1", t1LengthDifference);  // test: test already happened + same value obtained than inital value after this first test
  }

  if (
    t1LengthDifference[0] === 0 &&
    t0LengthDifference[1] > t1LengthDifference[1]
  ) {
    return; //console.log("test2", t1LengthDifference); // test: if diff in minutes = 0 don't run the test
  }
  t0LengthDifference = [calculValAbs0(), calculValAbs1()];
  //console.log(t0LengthDifference);

  shuffle();
  //console.log("let's shuffle bitch!");
  t1LengthDifference = [calculValAbs0(), calculValAbs1()];
  //console.log(t1LengthDifference);
  //recursion
  if (
    (t1LengthDifference[0] = 0 && t1LengthDifference[1] > t0LengthDifference[1])
  ) {
    {
      //console.log("let's do a recursion");
      sortWithShuffle();
    }
  }
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
	sortAlgorithm();
}*/

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




// ************************* SHUFFLE & SORTWITHSHUFFLE *************************

function shuffle() {
	getAllData()
	shuffleData()
	destroy()
	rebuildSide(dataSideA,shuffledData, "sideA")
	rebuildSide(dataSideB,shuffledData, "sideB")
}
