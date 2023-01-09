let a = [2,6,3,2,6,4,1]
const b = [6,1,1,4,4,2,1,1]

let sum = (array) => {
	count = 0
	array.forEach((el) => count += el)
  return count
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

const diff = () => sum(a) - sum(b)
console.log("diff:", diff())

matrix = {}

for (let i = 0; i < a.length; i++) {
	matrix[`row-${i}`] = []
	for (let j = 0; j < b.length; j ++) {
  matrix[`row-${i}`].push(a[i] - b[j])
  }
}

console.log(matrix)
swap(1, 3)
console.log("a", a)
console.log("b", b)
console.log("diff:", diff())

function swap(indexA, indexB) {
	let temp = a[indexA]
	a[indexA] = b[indexB]
  b[indexB] = temp
}
