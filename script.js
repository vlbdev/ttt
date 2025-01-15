(function () {
  let grid = document.querySelectorAll(".grid div");

  const crossCursor =
    ".grid > div:hover {cursor: url('close-custom.png') 64 64, auto;}";
  const circleCursor =
    ".grid > div:hover {cursor: url('circle-outline-custom.png') 64 64, auto;}";
  const cursorStyles = document.createElement("style");

  cursorStyles.innerText = circleCursor;

  document.getElementsByTagName("head")[0].appendChild(cursorStyles);

  function changeCursor() {
    if (cursorStyles.innerText == circleCursor) {
      //cursorStyles.remove();
      cursorStyles.innerText = crossCursor;
    } else {
      cursorStyles.innerText = circleCursor;
    }
  }

  grid.forEach((element) => {
    const crossImg = document.createElement("img");
    const circleImg = document.createElement("img");
    crossImg.setAttribute("src", "close-custom.png");
    circleImg.setAttribute("src", "circle-outline-custom.png");

    element.addEventListener("click", (e) => {
      //e.target.append(cross);
      if (cursorStyles.innerText == circleCursor) {
        e.target.append(circleImg);
      } else {
        e.target.append(crossImg);
      }
      changeCursor();

      //console.log(e.currentTarget);
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
