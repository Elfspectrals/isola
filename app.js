let currentPlayer = "player1";

function Game() {
  let p1Start = document.querySelectorAll(".case")[3];
  p1Start.classList.add("pawn1");

  let p2Start = document.querySelectorAll(".case")[45];
  p2Start.classList.add("pawn2");

  // Récupérer toutes les cases
  let cases = document.querySelectorAll(".case");

  let block = false;

  cases.forEach(function (caseElement) {
    caseElement.addEventListener("click", function () {
      if (
        !caseElement.classList.contains("pawn1") &&
        !caseElement.classList.contains("pawn2") &&
        !caseElement.classList.contains("cross")
      ) {
        if (!block) {
          if (currentPlayer === "player1") {
            if (
              isAdjacentVertical(caseElement, p1Start) ||
              isAdjacentHorizontal(caseElement, p1Start) ||
              isAdjacentDiagonal(caseElement, p1Start)
            ) {
              p1Start.classList.remove("pawn1");
              caseElement.classList.add("pawn1");
              p1Start = caseElement;

              block = !block;
            }
          } else if (currentPlayer === "player2") {
            if (
              isAdjacentVertical(caseElement, p2Start) ||
              isAdjacentHorizontal(caseElement, p2Start) ||
              isAdjacentDiagonal(caseElement, p2Start)
            ) {
              p2Start.classList.remove("pawn2");
              caseElement.classList.add("pawn2");
              p2Start = caseElement;
              block = !block;
            }
          }
        } else {
          caseElement.classList.add("cross");
          currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
          if(GameOver()) {
            alert('One of you lost');
          }
          block = !block;
        }
      }
    });
  });
}

function isAdjacentVertical(caseElement, startElement) {
  const selectedIndex = Array.from(caseElement.parentNode.children).indexOf(
    caseElement
  );
  const startIndex = Array.from(startElement.parentNode.children).indexOf(
    startElement
  );

  const columnSize = 7;
  const selectedColumn = selectedIndex % columnSize;
  const startColumn = startIndex % columnSize;

  return (
    selectedColumn === startColumn &&
    Math.abs(selectedIndex - startIndex) === columnSize
  );
}

function isAdjacentHorizontal(caseElement, startElement) {
  const selectedIndex = Array.from(caseElement.parentNode.children).indexOf(
    caseElement
  );
  const startIndex = Array.from(startElement.parentNode.children).indexOf(
    startElement
  );

  const columnSize = 7;
  const selectedColumn = selectedIndex % columnSize;
  const startColumn = startIndex % columnSize;

  const selectedRow = Math.floor(selectedIndex / columnSize);
  const startRow = Math.floor(startIndex / columnSize);

  return (
    selectedRow === startRow && Math.abs(selectedColumn - startColumn) === 1
  );
}

function isAdjacentDiagonal(caseElement, startElement) {
  const selectedIndex = Array.from(caseElement.parentNode.children).indexOf(
    caseElement
  );
  const startIndex = Array.from(startElement.parentNode.children).indexOf(
    startElement
  );

  const columnSize = 7;
  const selectedColumn = selectedIndex % columnSize;
  const startColumn = startIndex % columnSize;

  const selectedRow = Math.floor(selectedIndex / columnSize);
  const startRow = Math.floor(startIndex / columnSize);

  return (
    Math.abs(selectedColumn - startColumn) === 1 &&
    Math.abs(selectedRow - startRow) === 1
  );
}

function GameOver() {
  let p1Position = document.querySelector(".pawn1");
  let p2Position = document.querySelector(".pawn2");
  let cases = document.querySelectorAll(".case");

  let p1Line = parseInt(p1Position.getAttribute("data-line"));
  let p1Col = parseInt(p1Position.getAttribute("data-col"));

  let p2Line = parseInt(p2Position.getAttribute("data-line"));
  let p2Col = parseInt(p2Position.getAttribute("data-col"));


  if (currentPlayer === "player1") {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        } else {
          let compareLine = p1Line + i;
          let compareCol = p1Col + j;
          let target = document.querySelector(
            `.case[data-line="${compareLine}"][data-col="${compareCol}"]`
          );
          if (target && !target.classList.contains("cross")) {
            return false;
          }
        }
      }
    }
    return true;
  } else if (currentPlayer === "player2") {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        } else {
          let compareLine = p2Line + i;
          let compareCol = p2Col + j;
          let target = document.querySelector(
            `.case[data-line="${compareLine}"][data-col="${compareCol}"]`
          );
          if (target && !target.classList.contains("cross")) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

Game();
