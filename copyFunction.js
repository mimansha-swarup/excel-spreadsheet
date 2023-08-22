copyElement = document.querySelector(".copy")
cutElement = document.querySelector(".cut")
pasteElement = document.querySelector(".paste")

let ctrlKey = false
document.addEventListener(
  "keydown" , (e) =>{
    ctrlKey = e.ctrlKey
  }
)
document.addEventListener(
  "keyup" , (e) =>{
    ctrlKey = e.ctrlKey
  }
)

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    const cellElement = document.querySelector(
      `.cell[rowId ="${i}"][columnId="${j}"]`
    );
    handleSelectedCell(cellElement)

  }
}

let selectedRange =[]
function handleSelectedCell(cell){
  cell.addEventListener("click",e =>{
    if(!ctrlKey) return
    if(selectedRange.length >= 2){
      defaultSelectedCellUI()
      selectedRange =[]
      // return
    }

    const rowId = Number(cell.getAttribute("rowId"))
    const columnId = Number(cell.getAttribute("columnId"))

    cell.style.border = "2px solid var(--primary-color)"

    selectedRange.push([rowId,columnId])
  })
}

function defaultSelectedCellUI(){
  for (let i = 0; i < selectedRange.length; i++) {
    const cellElement = document.querySelector(
      `.cell[rowId ="${selectedRange[i][0]}"][columnId="${selectedRange[i][1]}"]`
      );
    cellElement.style.border = "1px solid var(--border-color)"

  }
}

let copyData =[]

copyElement.addEventListener(
  "click",
  ()=>{
    const [startRow,startCol,endRow,endCol] = selectedRange.flat()
    for (let i = startRow; i <= endRow; i++) {
      const copyRow =[]
      for (let j = startCol; j <= endCol; j++) {
        copyRow.push(cellsStorage[i][j])
      }
      copyData.push(copyRow)
    }
    defaultSelectedCellUI()
  }
)

pasteElement.addEventListener(
  "click",
  () =>{
    console.log("rest", selectedRange, copyData);
    const [currentRow, currentCol] =  getActivateCellIds(addressBar.value)
    const rowDiff = Math.abs(selectedRange[0][0] -  selectedRange[1][0] )
    const colDiff = Math.abs(selectedRange[0][1] -  selectedRange[1][1] )

    for (let i = currentRow, row =0; i <= currentRow+ rowDiff; i++, row++) {
      for (let j = currentCol, col =0; j <= currentCol+ colDiff; j++, col++) {
        const cellElement = document.querySelector(
          `.cell[rowId ="${i}"][columnId="${j}"]`
        );
        if(!cellElement) return;
        const cellStorageRef = cellsStorage[i][j];
        const copiedData = copyData[row][col];
        cellStorageRef.value = copiedData.value;
        cellStorageRef.bold = copiedData.bold;
        cellStorageRef.underline = copiedData.underline;
        cellStorageRef.italic = copiedData.italic;
        cellStorageRef.color = copiedData.color;
        cellStorageRef.bgColor = copiedData.bgColor;
        cellStorageRef.alignment = copiedData.alignment;
        cellStorageRef.fontFamily = copiedData.fontFamily;
        cellStorageRef.fontSize = copiedData.fontSize;
        
        cellElement.click()
      }
    }
    // for
  }
)