let boundary;
let country_limit;
let padding = 100;
var sizeCircle = 20;

function preload() {
	boundary = loadJSON("switzerland.geojson"); //data from City of Calgary Open Data
}

function setup() {
	createCanvas(1200, 1000);
	background(0);
	country_limit = getBoundingBox(boundary);

}

// getBoundingBox adapted from http://mikefowler.me/journal/2014/06/10/drawing-geojson-in-a-canvas

function getBoundingBox (boundary) {
	let bounds = {};
	let latitude, longitude;
    let data = boundary.features[0].geometry.coordinates[0];

  for (var i = 0; i < data.length; i++) {
    longitude = data[i][0];
    latitude = data[i][1];
	bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
    bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
    bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
    bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
    
  }
  return bounds;
}


function draw() {
     background(0);
	let data = boundary.features[0].geometry.coordinates[0];
	noStroke();
	fill(255);
	beginShape();
    translate(0,-padding)
		for (var i = 0; i < data.length; i++) {
			let lon = boundary.features[0].geometry.coordinates[0][i][0];
			let lat = boundary.features[0].geometry.coordinates[0][i][1];

			let x = map(lon, country_limit.xMin, country_limit.xMax, 0 + padding, width - padding);
			let y = map(lat,country_limit.yMin, country_limit.yMax,  height - padding , 0 + padding);

			vertex(x,y);
		}
	
	endShape(CLOSE);
	fill(255,0,0)
	translate(-padding,-2*padding)
	let converted = pixelsToLongLang(47, 8);
	ellipse(converted.clng, converted.clat, sizeCircle, sizeCircle);
}



function pixelsToLongLang(lng, lat) {
var x = Math.round((lng + 180) * (width / 360));
var y = Math.round(((-1 * lat) + 90) * (height/ 180));

return {clng: x, clat: y}
}