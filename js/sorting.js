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

function rebuildSide(dataSource, side) {
  dataSource.forEach((track) => {
    addTitle(side);
    let title = document.getElementById(side).lastElementChild;
    title.children[1].value = track.title;
    title.children[2].children[0].value = track.minute;
    title.children[2].children[1].value = track.second;
  })
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

/*
HOW DOES IT WORK?

Try to sort the data by minutes and seconds and starts a recursion with a threshold.
It begins swapping title from side to side. If it's blocked, it calls the rescue algo.
Rescue algo checks all possible and interesting permutations for minutes.
It chooses the first that corresponds to the thresold.
If none, it starts rescue algo for seconds.
*/



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

  const threshold = (arrayMinSec) => {
    // !! this part is the most important to change if needed !!
    // returns true if the difference is more than 2 minutes and 30 seconds
    return arrayMinSec[0] > 1 || (arrayMinSec[0] > 2 && arrayMinSec[1] > 30);
  }

  const loweredThreshold = (arrayMinSec) => {
    // returns true if the difference is more than 3
    return arrayMinSec[0] > 3 ;
  }

  // ** SECOND ALORITHM

  function swapRescueAlgorithm(timeUnity) {

    resetAndFillData("sideA");
    resetAndFillData("sideB");

    let deltaSwap;
    let unity;
    let permutationMatrix = {};
    let lengthMatrix = [];
    let attempts = []
    let permutationResults = [];
    let permutationIndex = 0;
    let data;

    switch (timeUnity) {
      case "minute":

        deltaSwap = lengthDifference()[0];
        unity = "minute";
      break;
      case "second":
        deltaSwap = lengthDifference()[1];
        unity = "second";
      break;
    }

    // Determine the side with the longest length
    totalLengthSideA[0] > totalLengthSideB[0] ? (longestSide = dataSideA) : (longestSide = dataSideB);
    totalLengthSideA[0] > totalLengthSideB[0] ? (shortestSide = dataSideB) : (shortestSide = dataSideA);

    // Build LengthMatrix
    for (let i = 0; i < shortestSide.length; i++) {
      lengthMatrix.push([]);
      for (let j = 0; j < longestSide.length; j ++) {
      lengthMatrix[i].push(shortestSide[i][`${unity}`] - longestSide[j][`${unity}`]);
      }
    }

    // Build Permutation Matrix
    for (let i = 0; i < lengthMatrix.length; i++) {
      row = lengthMatrix[i];
      for (let j = 0; j < row.length; j ++) {
      // !! below is another important condition !!
      switch (timeUnity) {
        case "minute":
          permutationCondition = row[j] < 0 && Math.abs(row[j]) === deltaSwap / 2;
        break;
        case "second":
          permutationCondition = row[j] < 0 && Math.abs(row[j]) <= deltaSwap / 2;
        break;
      }
      if (permutationCondition) {
        // console.log("From shorter side, take track ", i + 1, "on opposite side, change with track on", j + 1);
        permutationMatrix[`permutation-${permutationIndex}`] = {
          "fromIndex": i,
          "toIndex": j
        };
        permutationIndex++;
      }
        else {
        // console.log("no match")
        }
      }
    }

    // Test Permutations
    data = []
    data = testPermutations()
    console.log({lengthMatrix, deltaSwap, permutationMatrix, data})

    // Depending on timeUnity, apply threshold to results of the tested permutations
    switch (timeUnity) {
      case "minute":
        let found = false
        // every allows to iterate and exits when we found something interesting!
        data.every((result) => {
          // !! using thresold function here again
          if (!threshold(result[1])) {
            rebuildFromPermutation(result[0])
            // console.log("Chosen Permutation", result)
            found = true
            return false
          }
          return true
        })
        if (!found) {
        console.log("No permutation found, trying with seconds")
        swapRescueAlgorithm('second')
        }
      break;
      case "second":
        data.every((result) => {
          // !! another condition
          let conditionOnSeconds = ((result[1][0] < 3)) && (result[1][1] <= 45)
          if (conditionOnSeconds) {
            rebuildFromPermutation(result[0])
            return false
          }
          return true
        })
    }


    // Needed functions for this second algorithm
    function testPermutations() {
    // make permutations and store combinations
    permute(shortestSide, longestSide, permutationMatrix);
    // Try all combinations and rebuild the sides
    attempts.forEach((permutedDataArray) => {
      rebuildFromPermutation(permutedDataArray)
      permutationResults.push([permutedDataArray, lengthDifference()])
    })
    return permutationResults
    }

    function rebuildFromPermutation(array) {
      destroy();
      rebuildSide(array[0], "sideA");
      rebuildSide(array[1], "sideB");
    }

    function permute(firstSide, secondSide, permutationMatrix) {
      Object.values(permutationMatrix).forEach((change) => {
        const fromIndex = change.fromIndex
        const toIndex = change.toIndex
        const temp = firstSide[fromIndex]
        firstSide[fromIndex] = secondSide[toIndex]
        secondSide[toIndex] = temp
        attempts.push([firstSide, secondSide])
      })
    }
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

  // ** MAIN ALGORITHM **
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
  // ?? logResults();


  // STEP 3 : STARTS RECURSION
  let delta = lengthDifference();

  while (threshold(delta) && counterRecursion < 30) {
    // ?? console.log("Starting Recursion...");
    totalLength();
    // ? ?console.log(totalLength())
    if (totalLengthSideA[0] > totalLengthSideB[0]) {
      swap("sideA", "sideB");
      totalLength();
      // ?? console.log("swapped A to B");
    }
    else {
      swap("sideB", "sideA");
      totalLength();
      // ?? console.log("swapped B to A");
    }
    // update delta
    delta = lengthDifference();
    // update counter
    counterRecursion += 1;
    // logs results
    // ?? console.log("I've made " + counterRecursion + " iterations");
    // ?? logResults()
    if (counterRecursion > 20 && !loweredThreshold(delta)) {
      console.log("Trying with rescue Algorithm using minutes...")
      swapRescueAlgorithm("minute");
      break;
    }
  }

  // STEP 4 : CLEAN EMPTY TITLES
  clean("sideA");
  clean("sideB");
}




// ************************* TESTS *************************

function lengthDifference() {
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

/*
const testAlgo = () => {
  let index = 0
  setInterval(() => {
    populate()
    sortAlgorithm()
    console.log("LengthDifference:", lengthDifference())
    index++
  }, 2000);
  if (index < 10) {
    clearInterval()
  }
}
*/

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
  destroy();
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
