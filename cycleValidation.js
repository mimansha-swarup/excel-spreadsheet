const collectedGraphMatrix = [];
let graphMatrix = [];

for (let i = 0; i < rows; i++) {
  const graphCont = [];
  for (let j = 0; j < columns; j++) {
    graphCont.push([]);
  }
  graphMatrix.push(graphCont);
}

function isGraphCyclic() {
  const visited = [];
  const dfsVisited = [];

  for (let i = 0; i < rows; i++) {
    const visitedRow = [];
    const dfsVisitedRow = [];
    for (let j = 0; j < columns; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  // 2D matrix for lookup  ^

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if( visited[i][j] === false){
        const res = dfsCycleDetection(graphMatrix, i, j, visited, dfsVisited);
        if (res) return [i,j]; //cycle is there
      }
    }
  }
  // if loop executes and there is no cycle return false
  return false;
}

function dfsCycleDetection(
  graphMatrix,
  sourceRowId,
  sourceColumnId,
  visited,
  dfsVisited
) {
  visited[sourceRowId][sourceColumnId] = true;
  dfsVisited[sourceRowId][sourceColumnId] = true;

  for (
    let children = 0;
    children < graphMatrix[sourceRowId][sourceColumnId].length;
    children++
  ){
    const [neighborRowId, neighborColumnId] = graphMatrix[sourceRowId][sourceColumnId][children]
    if(visited[neighborRowId][neighborColumnId] === false){
      const res = dfsCycleDetection(  graphMatrix,
        neighborRowId,
        neighborColumnId,
        visited,
        dfsVisited)        
        if(res) return res
      
    }
    else if(visited[neighborRowId][neighborColumnId] === true && dfsVisited[neighborRowId][neighborColumnId] === true){
      return true
    }

  }
    dfsVisited[sourceRowId][sourceColumnId] = false;

  return false;
}
