
let data;
let points = [];
let points2 = [];
let pointsSizes = [];
let pointsSizes2 = [];
let goals = [];
let co2emission = [];
let brands = [];

function preload(){
   data = loadJSON('ogd47_vollzugsresultate_pw.json');
}



function setup() {

    textSize(12);
    createCanvas(1000, 1000);
    co2cars = data.co2_emission;
	minMax = findMinMax(co2cars, "co2");
	minMax2 = findMinMax(co2cars, "ziel");
	

	for (var i=0; i < co2cars.length ; i++) {
		co2emission[i] = co2cars[i].co2
		goals[i] = co2cars[i].ziel;
		brands[i] = co2cars[i].nameeg;

		
		points[i] = new GPoint(i, map(co2emission[i], minMax.min, minMax.max, 0, height), brands[i]);
		points2[i] = new GPoint(i , map(goals[i], minMax2.min, minMax2.max, 0, height), brands[i]);
		scaleFactor = map(co2emission[i], minMax.min, minMax.max, 10, 20)
		scaleFactor2 = map(goals[i], minMax2.min, minMax2.max, 10, 25)
		pointsSizes[i] = 2 * Math.sqrt((i + 1) / (200 * Math.PI)) * scaleFactor;
		pointsSizes2[i] = 2 * Math.sqrt((i + 1) / (200 * Math.PI)) * scaleFactor2;
	
		
	  }
		plot = new GPlot(this);
		plot.setPos(0, 0);
		plot.setOuterDim(width, height);
	

		plot.getXAxis().setAxisLabelText("car companies");
		plot.getYAxis().setAxisLabelText("co2 emission");
		plot.setTitleText("Difference between emitted an predicted co2 emission");

		// Add the points
		plot.setPoints(points);
		plot.addLayer("surface", points2);
		plot.activatePointLabels();
		
		
}

function draw() {

		// Draw the plot
		plot.beginDraw();
		plot.drawBox();
		plot.drawXAxis();
		plot.drawYAxis();
		plot.drawTitle();
		plot.drawLabels();
		plot.getMainLayer().drawPoints();
		plot.getMainLayer().setPointSizes(pointsSizes);
		plot.getLayer("surface").drawPoints();
		plot.getLayer("surface").setPointColor(color(0, 200, 0));
		plot.getLayer("surface").setPointSizes(pointsSizes2);
		plot.endDraw();
}

function findMinMax(numbers, myKey) {
  let temps = [];
  let minMaxValues = []
 
  for (var i=0; i < numbers.length ; i++) {
		minMaxValues[i] = numbers[i][myKey];
		temps.push(minMaxValues[i]);
	}

  return {
	  min: min(temps),
	  max: max(temps)
  }
}