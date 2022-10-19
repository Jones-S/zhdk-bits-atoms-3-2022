const data = ['10', '30', '34', '55', '3'];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // draw a rectangle for each array item with the given size
  for (let index = 0; index < data.length; index++) {
    // increase y coordinates
    const yCord = index * 80 + 30;

    // set fixed x coordinate
    const xCord = 30;

    const rectangleSize = data[index];
    rect(xCord, yCord, rectangleSize, rectangleSize);
  }
}
