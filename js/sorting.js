let counterRecursion = 0;
let allDataSortedByMinutes;


let randomNumberMin = () => Math.floor(Math.random() * 6);
let randomNumberSec = () => Math.floor(Math.random() * 60);

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
  while (sideA.children.length > 0) {
    sideA.lastElementChild.remove();
  }
  while (sideB.children.length > 0) {
    sideB.lastElementChild.remove();
  }
}

function rebuildSide(oldSource, dataSource, side) {
  for (let i = 0; i < oldSource.length; i++) {
    addTitle(side); // Crée les lignes
  }
  let firstElement;
  for (let i = 0; i < document.getElementById(side).children.length; i++) {
    firstElement = dataSource.shift();
    dataSource.push(firstElement); // avoid empty array of Data
    // gets infos from objects
    document.getElementById(side).children[i].children[1].value =
      firstElement.title;
    document.getElementById(side).children[i].children[2].children[0].value =
      firstElement.minute;
    document.getElementById(side).children[i].children[2].children[1].value =
      firstElement.second;
  }
}

function rebuildSides(firstSide, secondSide, dataSource) {
  let index = dataSource.length;
  let counterA = 0;
  let counterB = 0;
  let firstElement;
  let firstSideElement = document.getElementById(firstSide);
  let secondSideElement = document.getElementById(secondSide);

  if (index === 1) {
    addTitle(firstSide);
      firstElement = dataSource[0];
      if (firstElement.title === undefined) {
        firstSideElement.children[counterA].children[1].value = 'Track A1'
        firstElement.title = 'Track A1';
      } else {
        firstSideElement.children[0].children[1].value =
          firstElement.title;
      }
      firstSideElement.children[0].children[2].children[0].value =
        firstElement.minute;
      firstSideElement.children[0].children[2].children[1].value =
        firstElement.second;
  }

  if (index > 2) {
    // creates title until all titles are created
    while (index > 0) {
      addTitle(firstSide);
      index--;
      firstElement = dataSource.shift(); //takes first element and put it at the end
      dataSource.push(firstElement); // avoid empty array of Data
      // creates nth track from first element of Datasource - if no title, gets title from position

      if (firstElement.title === undefined) {
        firstSideElement.children[counterA].children[1].value = `Track A${
          counterA + 1
        }`;
        firstElement.title = `Track A${counterA + 1}`;
      } else {
        firstSideElement.children[counterA].children[1].value =
          firstElement.title;
      }
      firstSideElement.children[counterA].children[2].children[0].value =
        firstElement.minute;
      firstSideElement.children[counterA].children[2].children[1].value =
        firstElement.second;
      counterA++;

      //
      if (counterA + counterB < dataSource.length) {
        // compares numbers of title created with titles needed
        addTitle(secondSide);
        index--;
        firstElement = dataSource.shift();
        dataSource.push(firstElement); // avoid empty array of Data
        if (firstElement.title === undefined) {
          document.getElementById(secondSide).children[
            counterB
          ].children[1].value = `Track B${counterB + 1}`;
          firstElement.title = `Track B${counterB + 1}`;
        } else {
          secondSideElement.children[counterB].children[1].value =
            firstElement.title;
        }
        secondSideElement.children[counterB].children[2].children[0].value =
          firstElement.minute;
        secondSideElement.children[counterB].children[2].children[1].value =
          firstElement.second;
        counterB++;
      }
    }
  }
  if (index === 2) {
    addTitle(firstSide);
    addTitle(secondSide);
    //side A
    firstSideElement.children[0].children[1].value = dataSource[0].title;
    firstSideElement.children[0].children[2].children[0].value =
      dataSource[0].minute;
    firstSideElement.children[0].children[2].children[1].value =
      dataSource[0].second;
    // side B
    secondSideElement.children[0].children[1].value = dataSource[1].title;
    secondSideElement.children[0].children[2].children[0].value =
      dataSource[1].minute;
    secondSideElement.children[0].children[2].children[1].value =
      dataSource[1].second;
  }
}

// ************************* ALGORITHM V2 *************************

function sortAlgorithm() {

  // ** USEFUL FUNCTIONS

  const totalLength = () => {
    resetAndFillData("sideA");
    resetAndFillData("sideB");
    totalLengthSideA = length("sideA");
    totalLengthSideB = length("sideB");
    return [
      totalLengthSideA[0] + totalLengthSideB[0],
      totalLengthSideA[1] + totalLengthSideB[1],
    ];
  };

  const lengthDifference = () => {
    let calculValAbs0 = () => {
      totalLengthSideA = length("sideA");
      totalLengthSideB = length("sideB");
      return Math.abs(totalLengthSideB[0] - totalLengthSideA[0]);
    };
    let calculValAbs1 = () => {
      totalLengthSideA = length("sideA");
      totalLengthSideB = length("sideB");
      return Math.abs(totalLengthSideB[1] - totalLengthSideA[1]);
    };
    return [calculValAbs0(), calculValAbs1()];
  };

  const threshold = (arrayMinSec) => {
    return arrayMinSec[0] > 1 || (arrayMinSec[0] > 2 && arrayMinSec[1] > 30);
  }


  // ** SPECIAL CASES TESTS **

  if (allDataAreEmpty()) {
    return swal(
      "Please enter some timing informations.",
      sweetAlertOptionsError
    );
  }
  if (someDataAreEmpty()) {
    return swal(
      "Some timing informations are missing.",
      sweetAlertOptionsError
    );
  }
  if (!threshold(lengthDifference())) {
    return swal(
      "It seems already well balanced, not sure we can help you more. Good job!",
      sweetAlertOptionsSuccess
    );
  }

  // ** ALGORITHM **
  // STEP 1 : SORT ALL DATA BY MINUTES AND REBUILD SIDES
  // BUILD ALLDATASORTEDBYMINUTES
  resetAndFillData("sideA");
  resetAndFillData("sideB");
  allDataSortedByMinutes = dataSideA
    .concat(dataSideB)
    .sort((a, b) => b.minute - a.minute);
  // DESTROY SIDES
  destroy();
  // REBUILD SIDES
  rebuildSides("sideA", "sideB", allDataSortedByMinutes);

  // STEP 2 : OUPUT RESULTS
  const logResults = () => {
  console.log("Length Difference:", `minutes: ${lengthDifference()[0]}`, `seconds: ${lengthDifference()[1]}`);
  console.log("Total Length:", totalLength());
  }
  logResults();


  // STEP 3 : STARTS RECURSION
  let delta = lengthDifference();

  while (threshold(delta) && counterRecursion < 30) {
    console.log("Starting Recursion...");
    totalLength();
    console.log(totalLength())
    if (totalLengthSideA[0] > totalLengthSideB[0]) {
      swap("sideA", "sideB");
      totalLength();
      console.log("swapped A to B");
    }
    else {
      swap("sideB", "sideA");
      totalLength();
      console.log("swapped B to A");
    }
    // update delta
    delta = lengthDifference();
    // update counter
    counterRecursion += 1;
    // logs results
    console.log("I've made " + counterRecursion + " iterations :).");
    logResults()
  }

  // STEP 4 : CLEAN EMPTY TITLES
  clean("sideA");
  clean("sideB");
}




// ************************* GET RANDOM VALUES FOR TEST

const getRandomLines = () => {
  let randomnNumberOfLines = randomNumberMin();
  let randomSide;
  let randomSideOpposite;
  if (Math.random() > 0.5) {
    randomSide = "sideA";
    randomSideOpposite = "sideB";
  } else {
    randomSide = "sideB";
    randomSideOpposite = "sideA";
  }
  for (let i = 0; i < randomnNumberOfLines; i++) {
    addTitle(randomSide);
  }
  for (let i = 0; i < randomnNumberOfLines + 1; i++) {
    addTitle(randomSideOpposite);
  }
}

const getRandomValues = () => {
  let totalLength =
    document.getElementById("sideA").children.length +
    document.getElementById("sideB").children.length;
  for (let i = 0; i < totalLength; i++) {
    let obj = {};
    if (i % 2 == 0) {
      obj.minute = randomNumberMin();
      obj.second = randomNumberSec();
      dataSideA.push(obj);
    } else {
      obj.minute = randomNumberMin();
      obj.second = randomNumberSec();
      dataSideB.push(obj);
    }
  }
}

const writeRandomValues = () => {
  allData = dataSideA.concat(dataSideB);
  rebuildSides("sideA", "sideB", allData);
}



function populate() {
  getRandomLines();
  getRandomValues();
  writeRandomValues();
  clean("sideA");
  clean("sideA");
  clean("sideA");
  clean("sideA");
  clean("sideB");
  clean("sideB");
  clean("sideB");
  clean("sideB");
}
