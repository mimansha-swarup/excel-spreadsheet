
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    const cellElement = document.querySelector(
      `.cell[rowId ="${i}"][columnId="${j}"]`
    );
    cellElement.addEventListener("blur", () => {
      const address = addressBar.value;
      // Storing data in db
      const [activeCell, cellProps] = getCell(address);
      cellProps.value = activeCell.innerText;
    });
  }
}
const formulaBarElement = document.querySelector(`.formula-bar`);

formulaBarElement.addEventListener("keydown", (e) => {
  if (formulaBarElement.value && e.key === "Enter") {
    const evaluatedValue = evaluateExpression(formulaBarElement.value)
    
    //update Ui and DB
    setCellAndDB(evaluatedValue, formulaBarElement.value)

  }
});

function evaluateExpression(expression){
  return eval(expression)

} 

function setCellAndDB(evaluatedValue, expression){
  const [cell,cellProps]= getCell(addressBar.value)
  cell.innerText = evaluatedValue //UI

  // DB
  cellProps.value = evaluatedValue
  cellProps.formulaBar = expression
}