const rows =100;
const columns =26;

const cellRowCont = document.querySelector(".cell-row-cont")
const cellColCont = document.querySelector(".cell-col-cont")
const cellsCont = document.querySelector(".sheet-cells")
const addressBar = document.querySelector(".address-bar")


for (let i = 0; i < rows; i++) {
  const cellCol = document.createElement("div")
  cellCol.innerText =i+1;
  cellCol.setAttribute("class", "cell-col justify-center")
  cellColCont.appendChild(cellCol) 
}
for (let i = 0; i < columns; i++) {
  const cellRow = document.createElement("div")
  cellRow.innerText =String.fromCharCode(65+i);
  cellRow.setAttribute("class", "cell-row justify-center")
  cellRowCont.appendChild(cellRow) 
}

for (let i = 0; i < rows; i++) {
  const rowCont = document.createElement("div")
  rowCont.setAttribute("class", "flex")
  for (let j = 0; j < columns; j++) {
    const cell  =  document.createElement("div")
    cell.setAttribute("class", "cell")
    cell.setAttribute("contentEditable", true)
    cell.setAttribute("rowId", i)
    cell.setAttribute("columnId", j)
    addCellListener(cell, i, j)
    rowCont.appendChild(cell)    
  }
  cellsCont.appendChild(rowCont)
}

function addCellListener (cell,rowAddress,columnAsciiAddress){
  cell.addEventListener("click", () =>{
    addressBar.value = `${String.fromCharCode(65 + columnAsciiAddress)}${rowAddress+1}`
  })
}

const firstCell = document.querySelector(".cell")
firstCell.click()
firstCell.focus()
console.log(firstCell);