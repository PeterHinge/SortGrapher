class CanvasArray {
  constructor(context, canvas, size = 50) {
    this.size = size;
    this.array = [];

    this.context = context;
    this.canvas = canvas;
  }

  displayArray(cleared = false) {
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (cleared == true) {
      context.fillStyle = "green";
    } else {
      context.fillStyle = "black";
    }
    this.array.forEach(function(item, index) {
      context.fillRect(100 + index * 8, 0, 6, item * 4);
    });
  }

  displaySingle(index) {
    context.fillStyle = "red";
    for (let i = 0; i < this.size; i++) {
      if (i == index) {
        context.fillRect(100 + index * 8, 0, 6, this.array[index] * 4);
      }
    }
  }

  randomizeArray() {
    let temp = [];
    for (let i = 0; i < this.size; i++) {
      temp.push(i + 30);
    }
    let len = this.size;
    this.array = [];
    for (let i = 0; i < this.size; i++) {
      let element = temp[Math.floor(Math.random() * len)];
      temp.splice(temp.indexOf(element), 1);
      this.array.push(element);
      len--;
    }
    this.displayArray();
  }

  resizeArray(size) {
    this.size = size;
    this.randomizeArray();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async bubbleSort() {
    let swap = true;
    while (swap == true) {
      swap = false;
      for (let i = 0; i < this.size - 1; i++) {
        if (this.array[i] > this.array[i + 1]) {
          let x = this.array[i],
            y = this.array[i + 1];
          this.array[i] = y;
          this.array[i + 1] = x;
          swap = true;
          await this.sleep(10);
          this.displayArray();
        }
      }
    }
    let cleared = true;
    this.displayArray(cleared);
  }

  async selectionSort() {
    for (let i = 0; i < this.size - 1; i++) {
      let small = this.array[i];
      let small_index = i;
      for (let j = i + 1; j < this.size; j++) {
        if (this.array[j] < small) {
          small = this.array[j];
          small_index = j;
          await this.sleep(20);
          this.displaySingle(small_index);
        }
      }
      if (small < this.array[i]) {
        this.array[small_index] = this.array[i];
        this.array[i] = small;
        await this.sleep(10);
        this.displayArray();
      }
    }
    let cleared = true;
    this.displayArray(cleared);
  }

}
