let earthquakes;
let index = 0;
let largestMagnitude = -100;

function preload() {
	let url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
	httpDo(
		url, {
			method: 'GET',
			// Other Request options, like special headers for apis
      		// It's a free public api so no need for authentication
			headers: {
				authorization: 'Bearer secretKey'
			}
		},
		function(result) {
			earthquakes = result;
		}
	);
}

function setup() {
	createCanvas(400, 400);
	frameRate(2);
	noStroke();
	fill(153, 102, 51, 200);
}

function draw() {
	// wait until the data is loaded
	if (!earthquakes || !earthquakes.features[index]) {
		return;
	}
	clear();

	let feature = earthquakes.features[index];
	let mag = feature.properties.mag;
	let earthquakeName = earthquakes.features[index].properties.place;

	textAlign(CENTER);
	text(earthquakeName, 0, height - 50, width, 30);
	text("Earthquake Database Visualizer", 0, 50, width, 30);


	//Update this field to display the largest earthquake
	if(mag > largestMagnitude) {	
		largestMagnitude = mag;	
	}

	if (index >= earthquakes.features.length) {
		index = 0;
	} else {
		index += 1;
	}

	let bigRad = largestMagnitude / 8 * ((width + height) / 2);
	fill(255, 0,0, 50);
	circle(width/2, height/2, bigRad);

	let rad = mag / 10 * ((width + height) / 2);
	fill(153, 102, 51, 200);
	circle(width / 2 , height / 2 , rad);
}


