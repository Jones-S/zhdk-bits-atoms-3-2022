//Initialize variables
var myMap;
var canvas;
var mappa = new Mappa('Leaflet');
var geoJSON, geoJSONlength;

//Initialize arrays to store the GeoJSON values
var loc = [], lat = [], lon = [];

var sizeCircle = 10;

//Setting up properties for the Leaflet-Mappa
var options = {
	lat: 47.3745,
	lng: 7.141,
	zoom: 5.4,
	style: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
}

//Load the map
function preload(){
	geoJSON = loadJSON("", getGJSON);
}

//Call-back function for getting the GeoJSON data
//After extraction, push the values on each separate array
function getGJSON(data){
	geoJSONlength = data.features[0].geometry.coordinates[0];
	for (var i = 0; i < geoJSONlength.length; i++) {
		lat.push(data.features[0].geometry.coordinates[0][i][0]);
		lon.push(data.features[0].geometry.coordinates[0][i][1]);
	
	}
}

function setup(){
	canvas = createCanvas(1280,720);

	myMap = mappa.tileMap(options);
	myMap.overlay(canvas)

	//Redraw map on change
	//myMap.onChange(drawPoint);
}

function draw(){
	drawPoint();
}

// We moved everything to this custom function that
// will be trigger only when the map moves
function drawPoint(){
	clear();
	for (var i=0; i<geoJSONlength.length; i++){
		//Convert all points from latitude and longitude to pixel
		loc[i] = myMap.latLngToPixel(lat[i], lon[i]);
		fill(255, 0, 255, 80);
		stroke(255, 255, 255);
		strokeWeight(3);
		//Draw the ellipses on the location points
		ellipse(loc[i].x, loc[i].y, sizeCircle, sizeCircle);
		//Run the distancePlace function that draws the interactive animation
		distancePlace(loc[i].x, loc[i].y, 0, 0, 0);
	}
}

//Function that calculates and draws on the screen the distance
//between the mouse position and the locations on screen
function distancePlace(x, y, r, g, b){
	var distanceCalc = dist(mouseX, mouseY, x, y);
	if (distanceCalc<sizeCircle/2){
		var mapAlpha = map (distanceCalc, 0, 50, 255, 0);
		fill(r, g, b, mapAlpha)
	} else {
		fill (0, 0);
	}
	noStroke();
	ellipse(x, y, sizeCircle+3, sizeCircle+3);
	var strokeMap = map (distanceCalc, 0, 350, 255, 0);
	stroke(r, g, b, strokeMap);
	var strokeWeightMap = map (distanceCalc, 0, 350, 20, 0);
	strokeWeight(strokeWeightMap);
	line(mouseX, mouseY, x, y);
}