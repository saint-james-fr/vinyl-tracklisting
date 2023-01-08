// ************************* EXTERNAL LIBRARIES : SWEETALERT

const sweetAlertButton = {
  text: "Got it!",
  value: true,
  visible: true,
  className: "sweet-alert-button",
  closeModal: true,
};

const sweetAlertOptionsError = {
  icon: "error",
  button: sweetAlertButton,
};

const sweetAlertOptionsSuccess = {
  icon: "success",
  button: sweetAlertButton,
};

// ************************* EXTERNAL LIBRARIES : JSSORTAbLE

Sortable.create(sideA, {
  animation: 150,
  swapThreshold: 1,
  handle: ".handle-function",
  group: "shared",
  selectedClass: "highlight",
  fallbackTolerance: 3,
  filter: ".not-sortable",
  direction: "horizontal",
  ghostClass: "sortable-ghost",
});

Sortable.create(sideB, {
  animation: 150,
  swapThreshold: 1,
  handle: ".handle-function",
  group: "shared",
  selectedClass: "highlight",
  fallbackTolerance: 3,
  direction: "horizontal",
  ghostClass: "sortable-ghost",
});

// ************************* EXTERNAL LIBRARIES : JSPDF & JSPDF-AUTOTABLE

function generatePDF() {
  // basic test 'not empty'
  let catNr = document.getElementById("catnumber").value;
  let artist = document.getElementById("artist").value;
  let title = document.getElementById("title").value;
  let format = "";
  let speed = "";
  let bitrate = "";
  let bits = "";
  let comments = document.getElementById("comments").value;
  if (
    document.getElementById("sideA").children.length > 0 &&
    document.getElementById("sideB").children.length > 0
  ) {
    // get datas from the tracklisting
    resetAndFillData("sideA");
    resetAndFillData("sideB");

    // Get datas from the form
    document.getElementsByName("format").forEach((element) => {
      if (element.checked === true) {
        format = element.value;
      }
    });
    document.getElementsByName("speed").forEach((element) => {
      if (element.checked === true) {
        speed = element.value;
      }
    });
    document.getElementsByName("bitrate").forEach((element) => {
      if (element.checked === true) {
        bitrate = element.value;
      }
    });
    document.getElementsByName("bits").forEach((element) => {
      if (element.checked === true) {
        bits = element.value;
      }
    });
    // test emptyness of the form
    let testEmptyness = () => {
      return (
        catNr === "" ||
        artist === "" ||
        title === "" ||
        format === "" ||
        speed === "" ||
        bitrate === "" ||
        bits === ""
      );
    };
    if (testEmptyness())
      return swal(
        "Please fill all the fields to generate the PDF.",
        sweetAlertOptionsError
      );
    // start gathering informations
    let basicInfosFirstLine = `${catNr} - ${artist} - ${title}`;
    let basicInfosSecondLine = `${format} - ${speed} - ${bitrate} - ${bits}`;
    // ceate doc variable for pdf
    var doc = new jsPDF();
    // let's start with the table
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
      startY: 90,
      cellWidth: "auto",
      columnStyles: {
        //vise la colonne [0] de l'array
        0: {
          fontStyle: "bold",
        },
      },
    });
    // configure pdf & wrapping of text
    doc.setFontSize(12).setFont("Helvetica");
    comments = doc.splitTextToSize(comments, 190);
    // put text in the pdf
    doc.setFontType("bold").setFont("Helvetica");
    doc.text(basicInfosFirstLine, 10, 10);
    doc.setFontType("regular").setFont("Helvetica");
    doc.text(basicInfosSecondLine, 10, 20);
    doc.text(comments, 10, 30);
    doc.setFontType("bold").setFont("Helvetica");
    doc.text("Generated on vinyl-tracklisting.com", 10, 290);
    doc.text("Total Length Face A - " + totalLengthSideA, 10, 50);
    doc.text("Total Length Face B - " + totalLengthSideB, 10, 60);
    // save pdf
    doc.save(`${catNr}-trackklisting.pdf`);
  } else {
    if (document.getElementById("sideA").children.length === 0) {
      swal("Side A is empty.", sweetAlertOptionsError);
    }
    if (document.getElementById("sideB").children.length === 0) {
      swal("Side B is empty.", sweetAlertOptionsError);
    }
  }
}
