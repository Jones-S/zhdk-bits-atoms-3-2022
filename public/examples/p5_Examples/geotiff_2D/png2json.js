console.log('tif to json');

var mapImage;
var pnts_agb = [];
var potVal = {};
var potential = [];

function preload() {
  mapImage = loadImage('data/Aboveground_Biomass_current.png');
}

async function setup() {
  console.log('pointsFromImage: ', mapImage.width);
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  mapImage.resize(mapImage.width / 2, mapImage.height / 2);
  pointsFromImage = await dataFromTIFFtoArray(mapImage, pnts_agb, 0.1);
  pixelsToJson(pointsFromImage);
}

async function dataFromTIFFtoArray(img, pointsTiff, scale) {
  img.loadPixels();
  for (let i = 0; i < img.width * img.height; i++) {
    c = color(img.pixels[i]);
    let x = i % img.width;
    let y = (i - x) / img.width;
    pointsTiff.push(new PntTIFF(x, y, c, scale));
  }
  img.updatePixels();
  return pointsTiff;
}

function pixelsToJson(points) {
  for (let i = 0; i < points.length; i++) {
    points[i].pushToArray(potVal, potential);
  }
  saveJSON(potential, 'agb_tif.json', true);
}
