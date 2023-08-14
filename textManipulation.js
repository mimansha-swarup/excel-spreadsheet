// ------------Storage ----------------

const cellsStorage = [];

const defaultColor = "#3d3f3e";
const defaultBgColor = "transparent";
const activateColor = "#D3E3FD";
const inActiveColor = "transparent";

for (let i = 0; i < rows; i++) {
  const rowCellsStorage = [];
  for (let j = 0; j < columns; j++) {
    const cellStorageObject = {
      bold: false,
      underline: false,
      italic: false,
      color: defaultColor,
      bgColor: defaultColor,
      alignment: "left",
      fontFamily: "monospace",
      fontSize: "12",
      value: '',
      formulaBar: '',
      children: []
    };
    rowCellsStorage.push(cellStorageObject);
  }
  cellsStorage.push(rowCellsStorage);
}


// ---------------------Cell Manipulation ------------------
const boldElement = document.querySelector(".bold");
const italicElement = document.querySelector(".italic");
const underlinedElement = document.querySelector(".underlined");
const fontSizeElement = document.querySelector(".font-size-prop");
const fontFamilyElement = document.querySelector(".font-family-prop");
const alignElements = document.querySelectorAll(".align");
const leftAlignElement = alignElements[0];
const centerAlignElement = alignElements[1];
const rightAlignElement = alignElements[2];

const cellsList = document.querySelectorAll(".cell");

boldElement.addEventListener("click", () => {
  const [cellElement, cellStorageRef] = getCell(addressBar.value);
  cellStorageRef.bold = !cellStorageRef.bold;
  cellElement.style.fontWeight = cellStorageRef.bold ? "bold" : "normal";
  boldElement.style.backgroundColor = cellStorageRef.bold
    ? activateColor
    : inActiveColor;
  cellElement.focus();
});
italicElement.addEventListener("click", () => {
  const [cellElement, cellStorageRef] = getCell(addressBar.value);
  cellStorageRef.italic = !cellStorageRef.italic;
  cellElement.style.fontStyle = cellStorageRef.italic ? "italic" : "normal";
  italicElement.style.backgroundColor = cellStorageRef.italic
    ? activateColor
    : inActiveColor;
  cellElement.focus();
});

underlinedElement.addEventListener("click", () => {
  const [cellElement, cellStorageRef] = getCell(addressBar.value);
  cellStorageRef.underlined = !cellStorageRef.underlined;
  cellElement.style.textDecoration = cellStorageRef.underlined
    ? "underline"
    : "normal";
  underlinedElement.style.backgroundColor = cellStorageRef.underlined
    ? activateColor
    : inActiveColor;
  cellElement.focus();
});

fontSizeElement.addEventListener("change", (event) => {
  const [cellElement, cellStorageRef] = getCell(addressBar.value);
  cellStorageRef.fontSize = event.target.value;
  cellElement.style.fontSize = cellStorageRef.fontSize + "px";
  fontSizeElement.value = cellStorageRef.fontSize;
  cellElement.focus();
});

fontFamilyElement.addEventListener("change", (event) => {
  const [cellElement, cellStorageRef] = getCell(addressBar.value);
  cellStorageRef.fontFamily = event.target.value;
  cellElement.style.fontFamily = cellStorageRef.fontFamily;
  fontFamilyElement.value = cellStorageRef.fontFamily;
  cellElement.focus();
});

alignElements.forEach((alignElement) => {
  alignElement.addEventListener("click", (event) => {
    const [cellElement, cellStorageRef] = getCell(addressBar.value);
    cellStorageRef.alignment = event.target.innerText.split("_")[2];
    cellElement.style.textAlign = cellStorageRef.alignment;
    updateAlignAction(cellStorageRef.alignment);

    cellElement.focus();
  });
});

function updateAlignAction(alignment) {
  switch (alignment) {
    case "left":
      leftAlignElement.style.backgroundColor = activateColor;
      centerAlignElement.style.backgroundColor = inActiveColor;
      rightAlignElement.style.backgroundColor = inActiveColor;
      break;
    case "center":
      centerAlignElement.style.backgroundColor = activateColor;
      leftAlignElement.style.backgroundColor = inActiveColor;
      rightAlignElement.style.backgroundColor = inActiveColor;
      break;
    case "right":
      rightAlignElement.style.backgroundColor = activateColor;
      leftAlignElement.style.backgroundColor = inActiveColor;
      centerAlignElement.style.backgroundColor = inActiveColor;
      break;

    default:
      break;
  }
}

// Adding listener on every cellClick and updating the our cell action button state according to that
for (let i = 0; i < cellsList.length; i++) {
  updateCellAction(cellsList[i]);
}

function updateCellAction(cell) {
  cell.addEventListener("click", () => {
    const [rowId, columnId] = getActivateCellIds(addressBar.value);
    const cellStorageRef = cellsStorage[rowId][columnId];

    // Update cell Action
    boldElement.style.backgroundColor = cellStorageRef.bold
      ? activateColor
      : inActiveColor;
    italicElement.style.backgroundColor = cellStorageRef.italic
      ? activateColor
      : inActiveColor;
    underlinedElement.style.backgroundColor = cellStorageRef.underlined
      ? activateColor
      : inActiveColor;
    fontFamilyElement.value = cellStorageRef.fontFamily;
    fontSizeElement.value = cellStorageRef.fontSize;
    updateAlignAction(cellStorageRef.alignment)
    formulaBarElement.value = cellStorageRef.formulaBar
  });
}

function getCell(address) {
  const [rowId, columnId] = getActivateCellIds(address);
  const cellElement = document.querySelector(
    `.cell[rowId ="${rowId}"][columnId="${columnId}"]`
  );
  return [cellElement, cellsStorage[rowId][columnId]];
}

function getActivateCellIds(address) {
  const columnId = address?.[0]?.charCodeAt(0) - 65;
  const rowId = parseInt(address?.substring(1), 10) - 1;
  return [rowId, columnId];
}
