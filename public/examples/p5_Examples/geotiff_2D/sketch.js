
var mapImage;
var clon = 0;
var clat = 0;

var zoom = 1;
var pitch = 0;
var earthquakes;

var depthArray = [];
var depthMax, depthMin;

var magArray = [];
var magMax, magMin;

var colArray = [];
var colMax, colMin;


var imageWidth = 1024;
var imageHeight = 512;

function preload() {
	// Load the map
	mapImage = loadImage("data/AGB_pot_outsideHumanLU.png");
	var urlMonth = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
	loadJSON(urlMonth, getData);
}

function getData(data) {
	earthquakes = data;
}

function setup() {
	createCanvas(imageWidth, imageHeight);
	background(0);
	//scale proportionally
	var scale = 1;
	image(mapImage, 0, 0, scale*width, scale*mapImage.height*width/mapImage.width); // to fit width

	var cx = webMercatorX(clon);
	var cy = webMercatorY(clat);
	
	translate(width/2, height/2);
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

	// .. and pick the min and max colour values to use in value mapping
	colMin = colArray.min();
	colMax = colArray.max();

	// Draw depth legend
	noStroke();
	translate(-width/2, 0);
	fill(0);
	rect(403, 236, 110, 20);

	fill(450 - colMax, 50, colMax, 200);
	rect(428, 236, 150, 20);

	fill(450 - colMin, 50, colMin, 200);
	rect(623, 236, 100, 20);

	fill(220);
	textSize(10);
	text("Smallest Magnitude: " + magMin, 20, 249);
	text("Largest Magnitude: " + magMax, 150, 249);

	text("Deepest: " + depthMin + "km", 428, 249);
	text("Highest: " + depthMax + "km", 623, 249);
}

function draw(){
	
}

function webMercatorX(lon) {
	lon = radians(lon);
	var a = ((imageHeight/2)/ Math.PI) * Math.pow(2, zoom);
	var b = lon + Math.PI;
	return a * b;
}

function webMercatorY(lat) {
	lat = radians(lat);
	var a = ((imageHeight/2) / Math.PI) * Math.pow(2, zoom);
	var b = Math.tan(Math.PI / 4 + lat / 2);
	var c = Math.PI - Math.log(b);
	return a * c;
}

function convertPixelToGeo(tx, ty, mapWidth, mapHeight){   
	var mapLatBottomRadian = -90 * Math.PI / 180;
    var worldMapRadius = mapWidth * 360/(2 * Math.PI);     
    var mapOffsetY = (worldMapRadius / 2 * Math.log( (1 + Math.sin(mapLatBottomRadian) ) / (1 - Math.sin(mapLatBottomRadian))  ));
    var equatorY = mapHeight + mapOffsetY;   
    var a = (equatorY-ty)/worldMapRadius;

    var lat = 180/Math.PI * (2 * Math.atan(Math.exp(a)) - Math.PI/2);
    var long = -90 + tx / mapWidth ;
    return [lat,long];
}

Array.prototype.max = function() {
	return Math.max.apply(null, this);
};

Array.prototype.min = function() {
	return Math.min.apply(null, this);
};
