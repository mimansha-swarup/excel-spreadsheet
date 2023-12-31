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

formulaBarElement.addEventListener("keydown", async(e) => {
  if (formulaBarElement.value && e.key === "Enter") {
    const evaluatedValue = evaluateExpression(formulaBarElement.value);

    const address = addressBar.value;
    const [, activeCellProp] = getCell(address);
    // when current formula is different breaking Parent child relationship
    if (activeCellProp.formula !== evaluatedValue)
      removeChildFromParent(formulaBarElement.value);

    addChildToGraphComponent(formulaBarElement.value, address);
     cycleResponse= isGraphCyclic()
    if(cycleResponse){
      let userResponse = confirm("Formula is cyclic, Do you want to TRACE?")
      while(userResponse){
        await cyclicPathTrace(graphMatrix, ...cycleResponse)
        userResponse = confirm("Formula is cyclic, Do you want to TRACE?")
      }
      
      removeChildFromGraphComponent(formulaBarElement.value);
      return;
    }

    //update Ui and DB
    setCellAndDB(evaluatedValue, formulaBarElement.value, address);
    addChildToParent(formulaBarElement.value);
    updateChildrenOnParentChanges(address);
  }
});

function addChildToGraphComponent(formula, childAddress) {
  const [childRowId, childColumnId] = getActivateCellIds(childAddress);
  const encodedFormula = formula.split(" ");
  for (let idx = 0; idx < encodedFormula.length; idx++) {
    if (
      encodedFormula[idx].charCodeAt(0) >= 65 &&
      encodedFormula[idx].charCodeAt(0) <= 90
    ) {
      const [parentRowId, parentColumnId] = getActivateCellIds(
        encodedFormula[idx]
      );
      graphMatrix[parentRowId][parentColumnId].push([
        childRowId,
        childColumnId,
      ]);
    }
  }
}
function removeChildFromGraphComponent(formula) {
  const encodedFormula = formula.split(" ");
  for (let idx = 0; idx < encodedFormula.length; idx++) {
    if (
      encodedFormula[idx].charCodeAt(0) >= 65 &&
      encodedFormula[idx].charCodeAt(0) <= 90
    ) {
      const [parentRowId, parentColumnId] = getActivateCellIds(
        encodedFormula[idx]
      );
      graphMatrix[parentRowId][parentColumnId].pop();
    }
  }
}

function updateChildrenOnParentChanges(parentAddress) {
  const [, parentCellProps] = getCell(parentAddress);
  children = parentCellProps.children;
  for (let i = 0; i < children?.length; i++) {
    const childAddress = children[i];
    const [, childCellProps] = getCell(childAddress);

    const formula = childCellProps.formulaBar;
    const evaluatedValue = evaluateExpression(formula);
    setCellAndDB(evaluatedValue, formula, childAddress);

    // recursively calling to check childs child

    updateChildrenOnParentChanges(childAddress);
  }
}
function addChildToParent(formula) {
  const childAddress = addressBar.value;
  const encodedFormula = formula.split(" ");
  for (let idx = 0; idx < encodedFormula.length; idx++) {
    if (
      encodedFormula[idx].charCodeAt(0) >= 65 &&
      encodedFormula[idx].charCodeAt(0) <= 90
    ) {
      const [, parentCellProps] = getCell(encodedFormula[idx]);
      parentCellProps.children.push(childAddress);
    }
  }
}
function removeChildFromParent(formula) {
  const childAddress = addressBar.value;
  const encodedFormula = formula.split(" ");
  for (let idx = 0; idx < encodedFormula.length; idx++) {
    if (
      encodedFormula[idx].charCodeAt(0) >= 65 &&
      encodedFormula[idx].charCodeAt(0) <= 90
    ) {
      const [, parentCellProps] = getCell(encodedFormula[idx]);
      const childIndex = parentCellProps.children.indexOf(childAddress);
      if (childIndex >= 0) {
        parentCellProps.children.splice(childIndex, 1);
      }
    }
  }
}

function evaluateExpression(expression) {
  const encodedFormula = expression.split(" ");
  for (let idx = 0; idx < encodedFormula.length; idx++) {
    if (
      encodedFormula[idx].charCodeAt(0) >= 65 &&
      encodedFormula[idx].charCodeAt(0) <= 90
    ) {
      const [, cellProps] = getCell(encodedFormula[idx]);
      encodedFormula[idx] = cellProps.value;
    }
  }
  const decodeFormula = encodedFormula.join(" ");
  return eval(decodeFormula);
}

function setCellAndDB(evaluatedValue, expression, address) {
  const [cell, cellProps] = getCell(address);
  cell.innerText = evaluatedValue; //UI

  // DB
  cellProps.value = evaluatedValue;
  cellProps.formulaBar = expression;
}
