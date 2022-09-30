// ************************* EXTERNAL LIBRARIES : JSSORTAbLE

Sortable.create(sideA, {
	animation: 140,
	swapThreshold: 1,
	handle: ".handle-function",
	group: "shared",
	selectedClass: "highlight",
	fallbackTolerance: 3,
	filter: ".not-sortable",
	direction: 'horizontal',
});

Sortable.create(sideB, {
	animation: 140,
	swapThreshold: 1,
	handle: ".handle-function",
	group: "shared",
	selectedClass: "highlight",
	fallbackTolerance: 3,
	direction: 'horizontal',
});







// ************************* EXTERNAL LIBRARIES : JSPDF & JSPDF-AUTOTABLE

function generatePDF() {
	if (
		document.getElementById("sideA").children.length > 0 &&
		document.getElementById("sideB").children.length > 0
	) {
		resetAndFillData("sideA");
		resetAndFillData("sideB");
		let catNr = window.prompt("Enter the catalogue number of your vinyl");
		var doc = new jsPDF();
		var col = ["Position", "Title", "min", "sec"];
		var rows = [];
		dataSideA.forEach((element) => {
			let temp = [
				element.position,
				element.title,
				element.minute,
				element.second,
			];
			rows.push(temp);
		});
		dataSideB.forEach((element) => {
			let temp = [
				element.position,
				element.title,
				element.minute,
				element.second,
			];
			rows.push(temp);
		});

		doc.autoTable(col, rows, {
			startY: 50,
			cellWidth: "auto",
			columnStyles: {
				//vise la colonne [0] de l'array
				0: {
					fontStyle: "bold",
				},
			},
		});

		doc.setFontSize(12);
		doc.text(catNr, 10, 10);
		doc.text("Total Length Face A - " + totalLengthSideA, 10, 20);
		doc.text("Total Length Face B - " + totalLengthSideB, 10, 30);
		doc.save("Test.pdf");
	} else {
		if (document.getElementById("sideA").children.length === 0) {
			alert("Side A is empty");
		}
		if (document.getElementById("sideB").children.length === 0) {
			alert("Side B is empty");
		}
	}
}