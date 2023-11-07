function Moving() {
  let currentPlayer = "player1"; // Variable pour suivre le joueur actuel

  let p1Start = document.querySelectorAll(".case")[3];
  p1Start.classList.add("pawn1");

  let p2Start = document.querySelectorAll(".case")[45];
  p2Start.classList.add("pawn2");

  // Récupérer toutes les cases
  let cases = document.querySelectorAll(".case");

  cases.forEach(function (caseElement) {
    caseElement.addEventListener("click", function () {
      if (
        !caseElement.classList.contains("pawn1") &&
        !caseElement.classList.contains("pawn2")
      ) {
        if (currentPlayer === "player1") {
          // Vérifier si la case est adjacente et dans la même colonne que le pion du joueur 1
          if (isAdjacentVertical(caseElement, p1Start)) {
            p1Start.classList.remove("pawn1");
            caseElement.classList.add("pawn1");
            p1Start = caseElement;
            currentPlayer = "player2";
          }
        } else if (currentPlayer === "player2") {
          // Vérifier si la case est adjacente et dans la même colonne que le pion du joueur 2
          if (isAdjacentVertical(caseElement, p2Start)) {
            p2Start.classList.remove("pawn2");
            caseElement.classList.add("pawn2");
            p2Start = caseElement;
            currentPlayer = "player1";
          }
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

Moving();
