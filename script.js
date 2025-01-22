(function () {
  let playField = {
    selectedCells: [],
  };

  let scoreTable = {
    player1Name: document.querySelector("#crossName").value,
    player2Name: document.querySelector("#circleName").value,
    player1Score: 0,
    player2Score: 0,
    modal: document.querySelector("dialog"),
  };

  document.querySelector(".player1Name").innerText = scoreTable.player1Name;
  document.querySelector(".player1Score").innerText = scoreTable.player1Score;
  document.querySelector(".player2Name").innerText = scoreTable.player2Name;
  document.querySelector(".player2Score").innerText = scoreTable.player2Score;

  let winCombinations = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    //
    ["1", "5", "9"],
    ["3", "5", "7"],
    //
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
  ];

  function createPlayer(name) {
    return {
      name,
      score: 0,
      cursor: "cross",
      selectedCells: [],
      checkWining: function () {
        for (const win of winCombinations) {
          if (
            this.selectedCells.includes(win[0]) &&
            this.selectedCells.includes(win[1]) &&
            this.selectedCells.includes(win[2])
          ) {
            return true;
          }
        }
        return false;
      },
    };
  }

  let player1 = createPlayer("Player 1");
  let player2 = createPlayer("Player 2");

  let grid = document.querySelectorAll(".grid div");

  const crossCursor =
    ".grid > div:hover {cursor: url('close.png') 64 64, auto;}";
  const circleCursor =
    ".grid > div:hover {cursor: url('circle.png') 64 64, auto;}";
  const cursorStyles = document.createElement("style");

  cursorStyles.innerText = circleCursor;

  document.getElementsByTagName("head")[0].appendChild(cursorStyles);

  function changeCursor() {
    if (cursorStyles.innerText == circleCursor) {
      cursorStyles.innerText = crossCursor;
    } else {
      cursorStyles.innerText = circleCursor;
    }
  }

  grid.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (playField.selectedCells.includes(e.target.getAttribute("data-id"))) {
      } else {
        playField.selectedCells.push(e.target.getAttribute("data-id"));
        if (cursorStyles.innerText == circleCursor) {
          player2.selectedCells.push(e.target.getAttribute("data-id"));
          e.target.style.background = "url('circle-outline-custom.png')";
          e.target.style.backgroundColor = "bisque";
          e.target.style.backgroundRepeat = "no-repeat";
          e.target.style.backgroundPosition = "center center";
        } else {
          player1.selectedCells.push(e.target.getAttribute("data-id"));
          e.target.style.background = "url('close-custom.png')";
          e.target.style.backgroundColor = "bisque";
          e.target.style.backgroundRepeat = "no-repeat";
          e.target.style.backgroundPosition = "center center";
        }
        if (player1.checkWining()) {
          document.querySelector("h2").innerText = player1.name + " won";
          scoreTable.modal.showModal();
          scoreTable.player1Score += 1;
          document.querySelector(".player1Name").innerText =
            scoreTable.player1Name;
          document.querySelector(".player1Score").innerText =
            scoreTable.player1Score;
        }
        if (player2.checkWining()) {
          document.querySelector("h2").innerText = player2.name + " won";
          scoreTable.player2Score += 1;
          document.querySelector(".player2Name").innerText =
            scoreTable.player2Name;
          document.querySelector(".player2Score").innerText =
            scoreTable.player2Score;
        }
        changeCursor();
      }
    });
    if (
      element.getAttribute("data-id") == 1 ||
      element.getAttribute("data-id") == 2 ||
      element.getAttribute("data-id") == 3 ||
      element.getAttribute("data-id") == 4 ||
      element.getAttribute("data-id") == 5 ||
      element.getAttribute("data-id") == 6
    ) {
      element.style.borderBottom = "1px solid #aaa";
    }
    if (
      element.getAttribute("data-id") == 1 ||
      element.getAttribute("data-id") == 2 ||
      element.getAttribute("data-id") == 4 ||
      element.getAttribute("data-id") == 5 ||
      element.getAttribute("data-id") == 7 ||
      element.getAttribute("data-id") == 8
    ) {
      element.style.borderRight = "1px solid #aaa";
    }
  });
})();

// stop bubbling effect - stopPropagation()

//You’re going to store the gameboard as an array inside of a Gameboard object, so start there!

//Your players are also going to be stored in objects, and you’re probably going to want an object to control the flow of the game itself.

//сделать сетку

//при наведении курсора на сетку показывать полупрозрачный крестик
//должна быть система определения кто ходит

//после нажатия на ячейку сетки крестик появляется в этой ячейке и становится непрозрачнымя
//переключател хода

//после каждого выбора идет проверка не выйграл ли кто-то
//массив ячеек для крестика и нолика - проверить на соответствие победному набору  (1,2,3/4,5,6/7,8,9/1,5,9/3,5,7/1,4,7/2,5,8/3,6,9)

//затем курсор меняется на полупрозрачный нолик и все повторяется
