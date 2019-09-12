function randomize() {
  canvasarray.randomizeArray();
}

function resize() {
  let size = document.getElementById("sizeSelect").value;
  canvasarray.resizeArray(size);
}

function sort() {
  let algorithm = document.getElementById("algorithmSelect").value;

  if (algorithm == "bubbleSort") {
    canvasarray.bubbleSort();
  } else if (algorithm == "heapSort") {
    canvasarray.heapSort();
  } else if (algorithm == "mergeSort") {
    canvasarray.mergeSort();
  } else if (algorithm == "selectionSort") {
    canvasarray.selectionSort();
  } else if (algorithm == "quickSort") {
    canvasarray.quickSort();
  }
}

//Main Program
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

//Resizing
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Generate random array
const canvasarray = new CanvasArray(context, canvas);
canvasarray.randomizeArray();
