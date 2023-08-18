async function cyclicPathTrace(graphMatrix, sourceRowId, sourceColumnId) {
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

  const res = await dfsCyclicPathDetection(
    graphMatrix,
    sourceRowId,
    sourceColumnId,
    visited,
    dfsVisited
  );
  if (res) return Promise.resolve(true);
  return Promise.resolve(false);
}

async function colorDelay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}
async function dfsCyclicPathDetection(
  graphMatrix,
  sourceRowId,
  sourceColumnId,
  visited,
  dfsVisited
) {
  visited[sourceRowId][sourceColumnId] = true;
  dfsVisited[sourceRowId][sourceColumnId] = true;

  const sourceCell = document.querySelector(
    `.cell[rowId ="${sourceRowId}"][columnId="${sourceColumnId}"]`
  );
  // cellsStorage
  sourceCell.style.backgroundColor = "#82D99B";
  await colorDelay();

  for (
    let children = 0;
    children < graphMatrix[sourceRowId][sourceColumnId].length;
    children++
  ) {
    const [neighborRowId, neighborColumnId] =
      graphMatrix[sourceRowId][sourceColumnId][children];
      console.log(" graphMatrix[sourceRowId][sourceColumnId][children]" ,  graphMatrix[sourceRowId][sourceColumnId][children]);
    if (visited[neighborRowId][neighborColumnId] === false) {
      const res = await dfsCyclicPathDetection(
        graphMatrix,
        neighborRowId,
        neighborColumnId,
        visited,
        dfsVisited
      );
      console.log("FIRST IF CELL", res);
      if (res) {
        sourceCell.style.backgroundColor = "transparent";
        await colorDelay();

        return Promise.resolve(true);
      }
    } else if (
      visited[neighborRowId][neighborColumnId] === true &&
      dfsVisited[neighborRowId][neighborColumnId] === true
    ) {
      console.log("NBOR CELL");
      const neighborCell = document.querySelector(
        `.cell[rowId ="${neighborRowId}"][columnId="${neighborColumnId}"]`
      );

      neighborCell.style.backgroundColor = "#FF8589";
      await colorDelay();

      neighborCell.style.backgroundColor = "transparent";

      sourceCell.style.backgroundColor = "transparent";
      await colorDelay();
      return Promise.resolve(true);
    }
  }
  dfsVisited[sourceRowId][sourceColumnId] = false;

  return Promise.resolve(false);
}

