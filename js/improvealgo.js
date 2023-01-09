function swapRescueAlgorithm(timeUnity) {

  resetAndFillData("sideA");
  resetAndFillData("sideB");

  let deltaSwap;
  let unity;
  let beta;
  const permutationMatrix = {};
  const lengthMatrix = [];
  let permutationIndex = 1;

  switch (timeUnity) {
    case "minute":
      deltaSwap = lengthDifference()[0];
      unity = "minute";
      beta = 1;
      break;
    case "second":
      deltaSwap = lengthDifference()[1];
      unity = "second";
      beta = 25;
      break;
  }

  // determine the side with the longest length
  totalLengthSideA[0] > totalLengthSideB[0] ? (longestSide = dataSideA) : (longestSide = dataSideB);
  totalLengthSideA[0] > totalLengthSideB[0] ? (shortestSide = dataSideB) : (shortestSide = dataSideA);

  for (let i = 0; i < shortestSide.length; i++) {
    lengthMatrix.push([]);
    for (let j = 0; j < longestSide.length; j ++) {
    lengthMatrix[i].push(shortestSide[i][`${unity}`] - longestSide[j][`${unity}`]);
    }
  }

  for (let i = 0; i < lengthMatrix.length; i++) {
    row = lengthMatrix[i];
    for (let j = 0; j < row.length; j ++) {
    if (row[j] < 0 && Math.abs(row[j]) === deltaSwap / 2 ||
        row[j] < 0 && Math.abs(row[j] + beta) === deltaSwap / 2) {

      console.log("From shorter side, take track ", i + 1, "on opposite side, change with track on", j + 1);
      permutationMatrix[`permutation-${permutationIndex}`] = {
        "fromIndex": i,
        "toIndex": j
      };
      permutationIndex++;
    }
      else {
      console.log("no match")
      }
    }
  }

  console.log("matrix", lengthMatrix);
  console.log("deltaSwap", deltaSwap);
  console.log("permutationMatrix",permutationMatrix);
  swapRescue(shortestSide, longestSide, permutationMatrix);

  function swapRescue (firstSide, secondSide, permutationMatrix) {
    for (let i = 0; i < permutationMatrix.length; i++) {
      const fromIndex = permutationMatrix[i].fromIndex
      const toIndex = permutationMatrix[i].toIndex
      const temp = firstSide[fromIndex]
      firstSide[fromIndex] = secondSide[toIndex]
      secondSide[toIndex] = temp
      allData =
      destroy();
      rebuildSides("sideA", "sideB", firstSide.concat(secondSide));
      debugger
    }
  }
}

// document.querySelectorAll("#sideA > .row")
