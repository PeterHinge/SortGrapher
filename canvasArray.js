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

  async heapSort() {
    let len = this.array.length;

    for (let i = len - 1; i >= -1; i--) {
      this.heapSortHeapify(len, i);
      await this.sleep(10);
      this.displayArray();
    }

    for (let i = len - 1; i >= 0; i--) {
      let temp = this.array[i];
      this.array[i] = this.array[0];
      this.array[0] = temp;
      this.heapSortHeapify(i, 0);
      await this.sleep(10);
      this.displayArray();
    }
    let cleared = true;
    this.displayArray(cleared);
  }

  async heapSortHeapify(len, index) {
    let largest = index;
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    if (left < len && this.array[largest] < this.array[left]) {
      largest = left;
    }

    if (right < len && this.array[largest] < this.array[right]) {
      largest = right;
    }

    if (largest != index) {
      let temp = this.array[largest];
      this.array[largest] = this.array[index];
      this.array[index] = temp;
      this.heapSortHeapify(len, largest);
    }
  }

  async insertionSort() {
    for (let i = 1; i < this.size; i++) {
      let temp = this.array[i];
      await this.sleep(10);
      this.displaySingle(i);
      this.array.splice(i, 1);

      let j = 0;
      this.displaySingle(j);
      while (this.array[j] < temp && j < i) {
        j++;
        await this.sleep(10);
        this.displaySingle(j);
      }

      this.array.splice(j, 0, temp);
      await this.sleep(10);
      this.displayArray();
    }

    let cleared = true;
    this.displayArray(cleared);
  }

  async mergeSort(arr = this.array, currentIndex = 0) {
    if (arr.length > 1) {
      // divide
      let mid_index = Math.floor(arr.length / 2);
      let left = arr.slice(0, mid_index);
      let right = arr.slice(mid_index);

      this.mergeSort(left, currentIndex);
      this.mergeSort(right, currentIndex + mid_index);

      // and conquer
      let i = 0;
      let j = 0;
      let k = 0;

      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          arr[k] = left[i];
          this.array[currentIndex + k] = left[i];
          await this.sleep(20);
          this.displayArray();
          i++;
        } else {
          arr[k] = right[j];
          this.array[currentIndex + k] = right[j];
          await this.sleep(20);
          this.displayArray();
          j++;
        }
        k++;
      }

      while (i < left.length) {
        arr[k] = left[i];
        this.array[currentIndex + k] = left[i];
        await this.sleep(20);
        this.displayArray();
        i++;
        k++;
      }

      while (j < right.length) {
        arr[k] = right[j];
        this.array[currentIndex + k] = right[j];
        await this.sleep(20);
        this.displayArray();
        j++;
        k++;
      }
    }

    if (arr.length != this.size) {
      await this.sleep(20);
      this.displayArray();
    } else {
      await this.sleep(20);
      let cleared = true;
      this.displayArray(cleared);
    }
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
