const sheetAddButton = document.querySelector(".material-symbols-outlined.add-btn")
const sheetFolderCont = document.querySelector(".sheet-cont")


sheetAddButton.addEventListener(
  "click", ()=>{
    const sheet =  document.createElement("div")
    sheet.setAttribute("class", "sheet")

    const allSheets = document.querySelectorAll(".sheet") 


    sheet.setAttribute("id", allSheets.length)
    sheet.innerText = `sheet${allSheets.length + 1}`

    sheetFolderCont.appendChild(sheet)

    createCellStorage();
    createGraphMatrix();
    handleSheetActive(sheet)
    handleSheetRemove(sheet)
    sheet.click()

  }
)

function handleSheetRemove(sheet) {
  sheet.addEventListener("mousedown",(e)=>{
    if(e.button !== 2) return
    
    const allSheets = document.querySelectorAll(".sheet") 
    if(allSheets.length === 1){
      alert("Atleast one sheet is necessary")
      return 
    }
    const response = confirm("Delete?")
    if(!response) return

    const sheetIndex =  Number(sheet.getAttribute("id"))
    // DB
    collectedCellsStorage.splice(sheetIndex, 1);
    collectedGraphMatrix.splice(sheetIndex, 1);
    // UI
    handleSheetUiRemove(sheet)
    // prev sheet active
     cellsStorage = collectedCellsStorage[0]
     graphMatrix = collectedGraphMatrix[0]
    handleSheetProperties()
    
  })
  
}
function handleSheetUiRemove(sheet) {
  sheet.remove()
  const allSheets = document.querySelectorAll(".sheet") 

  for (let index = 0; index < allSheets.length; index++) {
     allSheets[index].setAttribute("id", index)
     allSheets[index].innerText = `sheet${index+1}`
     allSheets[index].style.border ="none"
     allSheets[index].style.color ="var(--dark-grey-color)"
  }
  allSheets[0].style.color = "var(--primary-color)"
  allSheets[0].style.borderBottom = "3px solid var(--primary-color)"

}
function handleSheetUI(sheet) {
    const allSheets = document.querySelectorAll(".sheet");
    for (let index = 0; index < allSheets.length; index++) {
      allSheets[index].style.border ="none"
      allSheets[index].style.color ="var(--dark-grey-color)"
      
    }
    sheet.style.color = "var(--primary-color)"
    sheet.style.borderBottom = "3px solid var(--primary-color)"
} 

function handleSheetStorage(activeIndex) {
  cellsStorage =  collectedCellsStorage[activeIndex]
  graphMatrix=  collectedGraphMatrix[activeIndex]
}
function handleSheetProperties() {

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const cellElement = document.querySelector(
        `.cell[rowId ="${i}"][columnId="${j}"]`
      );
      cellElement.click()

    }}
    const firstCell = document.querySelector(".cell")
firstCell.click()
firstCell.focus()
}



function handleSheetActive(sheet) {
  sheet.addEventListener(
    "click", ()=>{
      const activeIndex =  Number(sheet.getAttribute("id"))
      handleSheetStorage(activeIndex)
      handleSheetProperties()
      handleSheetUI(sheet)
    }
  )
  
}

function createCellStorage(){
  const cellsStorage = [];
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
  collectedCellsStorage.push(cellsStorage);
}

function createGraphMatrix(){
  const graphMatrix =[]
  for (let i = 0; i < rows; i++) {
    const graphCont = [];
    for (let j = 0; j < columns; j++) {
      graphCont.push([]);
    }
    graphMatrix.push(graphCont);
  }
  collectedGraphMatrix.push(graphMatrix)
}