var mapImage;

var clon = 0;
var clat = 0;

var imageWidth = 1024;
var imageHeight = 512;

var zoom = 1;
var pitch = 0;
var earthquakes;

var depthArray = [];
var depthMax, depthMin;

var magArray = [];
var magMax, magMin;

var colArray = [];
var colMax, colMin;


function preload() {
	// Load the map
	mapImage = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/" +
		clon + "," + clat + "," + zoom + "," + pitch + "/" + imageWidth + "x" + imageHeight +
		"?access_token=pk.eyJ1IjoiY2FkZWJlIiwiYSI6ImNqMDNvOWU5YzAwYXIzMm55YTNyMGtoNzcifQ.B7Y5DHMKO6o8tj2woXVxQw");

	// Load the data
	var urlMonth = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
	loadJSON(urlMonth, getData);
}

function getData(data) {
	earthquakes = data;
}

function setup() {
	createCanvas(imageWidth, imageHeight);
	translate(width/2, height/2);
	imageMode(CENTER);
	image(mapImage, 0, 0);

	var cx = webMercatorX(clon);
	var cy = webMercatorY(clat);

	// Create an array with all the earthquake depth values
	for (var i = 0; i < earthquakes.features.length; ++i) {
		var depth = earthquakes.features[i].geometry.coordinates[2];
		depthArray.push(depth);

		var mag = earthquakes.features[i].properties.mag;
		magArray.push(mag);
	}

	// .. and pick the min and max depth values to use in value mapping
	depthMin = depthArray.min();
	depthMax = depthArray.max();

	// .. and pick the min and max magnitude values to use in value mapping
	magMin = magArray.min();
	magMax = magArray.max();

	for (var i = 0; i < earthquakes.features.length; ++i) {
		var lon = earthquakes.features[i].geometry.coordinates[0];
		var lat = earthquakes.features[i].geometry.coordinates[1];
		depth = earthquakes.features[i].geometry.coordinates[2];
		mag = earthquakes.features[i].properties.mag;

		var x = webMercatorX(lon) - cx;
		var y = webMercatorY(lat) - cy;

		mag = Math.pow(10, mag);
		mag = sqrt(mag);
		var magmax = sqrt(pow(10, 10));
		var d = map(mag, 0, magmax, 0, 180);
		var col = round(map(depth, depthMin, depthMax, 255, 0));

		stroke(450 - col, 50, col);
		fill(450 - col, 50, col, 200);
		ellipse(x, y, d*2, d*2);
	}

	// Create an array with all the earthquake colour values
	for (var i = 0; i < earthquakes.features.length; ++i) {
		depth = earthquakes.features[i].geometry.coordinates[2];
		col = round(map(depth, depthMin, depthMax, 255, 0));
		colArray.push(col);
	}

	// pick the min and max colour values to use in value mapping
	colMin = colArray.min();
	colMax = colArray.max();

	//depth legend
	noStroke();
	translate(-width/2, 0);
	fill(0);
	rect(403, 236, 110, 20);

	fill(450 - colMax, 50, colMax, 200);
	rect(317, 236, 120, 20);

	fill(450 - colMin, 50, colMin, 200);
	rect(477, 236, 120, 20);

	fill(220);
	textSize(10);
	text("Smallest Magnitude: " + magMin, 50, 249);
	text("Largest Magnitude: " + magMax, 190, 249);

	text("Deepest: " + depthMin.toFixed(4) + "km", 328, 249);
	text("Highest: " + depthMax.toFixed(4) + "km", 483, 249);
}

function webMercatorX(lon) {
	lon = radians(lon);
	var a = (256 / Math.PI) * Math.pow(2, zoom);
	var b = lon + Math.PI;
	return a * b;
}

function webMercatorY(lat) {
	lat = radians(lat);
	var a = (256 / Math.PI) * Math.pow(2, zoom);
	var b = Math.tan(Math.PI / 4 + lat / 2);
	var c = Math.PI - Math.log(b);
	return a * c;
}

Array.prototype.max = function() {
	return Math.max.apply(null, this);
};

Array.prototype.min = function() {
	return Math.min.apply(null, this);
};
