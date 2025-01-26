(function () {
  // input fields for player's names
  let inputData = {
    firstPlayerName: document.querySelector("#crossName"),
    secondPlayerName: document.querySelector("#circleName"),
  };

  // function factory for player's objects creation
  let createPlayer = function (name) {
    let score = 0;
    checkWining = function () {
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
    };
    return {
      name,
      getScore: function () {
        return score;
      },
      addPoint: function () {
        score++;
      },
      reset: () => {
        score = 0;
      },
      selectedCells: [],
      checkWining,
    };
  };

  // create two players
  let player1 = createPlayer(inputData.firstPlayerName.value);
  let player2 = createPlayer(inputData.secondPlayerName.value);

  // create object for game board
  let playBoard = {
    //cellNumber : "X" / "0"
    gridCells: document.querySelectorAll(".grid div"),
    selectedCells: [],
    cellsData: ["unused", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    //clean board function
    //draw board function
  };

  // object to show results of the game
  let results = {
    resultPlayer1Name: document.querySelector("#resultPlayer1Name"),
    resultPlayer2Name: document.querySelector("#resultPlayer2Name"),
    resultPlayer1Score: document.querySelector("#player1Score"),
    resultPlayer2Score: document.querySelector("#player2Score"),
    modal: document.querySelector("dialog"),
    updateResultsTable: () => {
      results.resultPlayer1Name.textContent = player1.name;
      results.resultPlayer2Name.textContent = player2.name;
      results.resultPlayer1Score.textContent = player1.getScore();
      results.resultPlayer2Score.textContent = player2.getScore();
    },
  };

  // array of winning combinations
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

  // lines drawing
  playBoard.gridCells.forEach((element) => {
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

  let cursorStyles = document.createElement("style");

  // create cursor for players
  let cursor = {
    cross: ".grid > div:hover {cursor: url('close.png') 64 64, auto;}",
    circle: ".grid > div:hover {cursor: url('circle.png') 64 64, auto;}",
    cursorImg: "circle-outline-custom.png",
    setCursor: () => {
      cursorStyles.innerText = cursor.circle;
      document.getElementsByTagName("head")[0].appendChild(cursorStyles);
    },
    changeCursor: () => {
      if (cursorStyles.innerText == cursor.circle) {
        cursorStyles.innerText = cursor.cross;
        cursor.cursorImg = "close-custom.png";
      } else {
        cursorStyles.innerText = cursor.circle;
        cursor.cursorImg = "circle-outline-custom.png";
      }
    },
  };

  // play game
  (function () {
    // changing 1 player name
    inputData.firstPlayerName.addEventListener("keyup", () => {
      player1.name = inputData.firstPlayerName.value;
      results.updateResultsTable();
    });

    // changing 2 player name
    inputData.secondPlayerName.addEventListener("keyup", () => {
      player2.name = inputData.secondPlayerName.value;
      results.updateResultsTable();
    });

    results.updateResultsTable();
    cursor.setCursor();

    playBoard.gridCells.forEach((element) => {
      element.addEventListener("click", (e) => {
        if (player1.checkWining() || player2.checkWining()) {
          return;
        }
        if (
          playBoard.selectedCells.includes(e.target.getAttribute("data-id"))
        ) {
        } else {
          playBoard.selectedCells.push(e.target.getAttribute("data-id"));
          if (cursor.cursorImg == "close-custom.png") {
            player1.selectedCells.push(e.target.getAttribute("data-id"));
          }
          if (cursor.cursorImg == "circle-outline-custom.png") {
            player2.selectedCells.push(e.target.getAttribute("data-id"));
          }

          e.target.style.background = `bisque url('${cursor.cursorImg}') no-repeat center center`;

          playBoard.cellsData[e.target.getAttribute("data-id")] =
            cursor.cursorImg;

          if (player1.checkWining()) {
            player1.addPoint();
            results.updateResultsTable();
            document.querySelector("h2").innerText = player1.name + " won";
            results.modal.showModal();
          }

          if (player2.checkWining()) {
            player2.addPoint();
            results.updateResultsTable();
            document.querySelector("h2").innerText = player2.name + " won";
            results.modal.showModal();
          }

          if (playBoard.selectedCells.length == 9) {
            document.querySelector("h2").innerText = "It's a tie";
            results.modal.showModal();
          }
          cursor.changeCursor();
        }
      });
    });

    results.modal.addEventListener("click", () => {
      playBoard.selectedCells = [];
      player1.selectedCells = [];
      player2.selectedCells = [];
      playBoard.gridCells.forEach((element) => {
        element.style.background = `bisque`;
      });
      results.modal.close();
    });

    document.querySelector(".resetButton").addEventListener("click", () => {
      playBoard.selectedCells = [];
      player1.selectedCells = [];
      player2.selectedCells = [];
      player1.reset();
      player2.reset();
      playBoard.gridCells.forEach((element) => {
        element.style.background = `bisque`;
      });
      results.updateResultsTable();
    });
  })();
})();
// game over
