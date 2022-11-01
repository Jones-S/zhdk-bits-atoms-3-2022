// visualize future rainfall precipation prediction

let futureCities;
let cities;

const mappa = new Mappa('Leaflet');
let resultMap;
let canvas;
let data = [];
let diameters = {min:1, max:10}

const options = {
  lat: 0,
  lng: 0,
  zoom: 1.5,
  style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

function preload() {
  futureCities = loadTable('future_cities_data.csv', 'header');
}

function setup() {
  canvas = createCanvas(800, 600);
  resultMap = mappa.tileMap(options);
  resultMap.overlay(canvas);
  noStroke();

 let futureRainfalls = futureCities.getColumn('future_Annual_Precipitation')

  for (let row of futureCities.rows) {
    let country = row.get('current_city').toLowerCase();
    let lat = row.get('Latitude');
    let long = row.get('Longitude');
    let futureRainfall = row.get('future_Annual_Precipitation')
    
    data.push({
      lat,
      long,
      futureRainfall
    });

  for (let precipation of data) {
    precipation.diameter = map(precipation.futureRainfall, min(futureRainfalls), max(futureRainfalls), diameters.min, diameters.max);
  }
}

}
function draw() {
  clear();
  for (let results of data) {
    const pix = resultMap.latLngToPixel(results.lat, results.long);

    fill(0,0,255, 255 * (results.diameter/diameters.max));
    const zoom = resultMap.zoom();
    const scl = pow(2, zoom); 
    ellipse(pix.x, pix.y, results.diameter * scl);
  }

}


function drawGradient(x, y) {
  var radius = dim/2;
  var h = random(0, 360);
  for (r = radius; r > 0; --r) {
    fill(h, 90, 90);
    ellipse(x, y, r, r);
    h = (h + 1) % 360;
  }
}
