(function () {
  const grid = document.querySelectorAll(".grid div");
  grid.forEach((element) => {
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
