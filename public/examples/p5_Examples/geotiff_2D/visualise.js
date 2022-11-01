console.log('Init');

var mapJson;
var pointsX = [],
  pointsY = [];
var strokeWeights = [];
var strokeColors = [];

function preload() {
  console.log('Loading data...');
  loadJSON('data/agb_tif.geojson', getData);
}

function getData(data) {
  greyscaleValues = data;
  console.log('data: ', data);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  var totalPixels = 0;

  for (var i = 0; i < greyscaleValues.length; ++i) {
    var x = greyscaleValues[i].x;
    var y = greyscaleValues[i].y;
    var stW = greyscaleValues[i].stW;
    //var stC = greyscaleValues[i].stC;
    pointsX.push(x);
    pointsY.push(y);
    strokeWeights.push(stW);
    // strokeColors.push(stC);

    totalPixels = i;
  }

  console.log('totalPixels from geoJson: ', totalPixels);

  background(255);
  push();
  scale(2);

  // looping through all pixels
  for (var i = 0; i < pointsX.length; i++) {
    fill(255, 204, 0);
    // and drawing a circle if the strokeWeight is more than 0.5
    if (strokeWeights[i] > 0.5) {
      circle(pointsX[i], pointsY[i], strokeWeights[i]);
    }
  }
  pop();
}

// function draw() {
//   background(255);
//   push();
//   scale(0.5);
//   for (var i = 0; i < pointsX.length; i++) {
//     fill(30, 30, 30);
//     if (strokeWeights[i] > 0.5) {
//       circle(pointsX[i], pointsY[i], strokeWeights[i]);
//     }
//   }
//   pop();
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
