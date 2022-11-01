
var balls = []; // array of Jitter objects
var data; // a reference to all the data from the file
var co2emission = []; //an array of all the "co2" values
var names = [];	// an array of all the "nameeg" values
var sanctions = []; // an array of all the "sanction sum" values
let emissions;


function preload(){
	//loads .json data
		data = loadJSON('ogd47_vollzugsresultate_pw.json');
}

function setup() {
  createCanvas(1000, 1000);
  noStroke();
  emissions = data.co2_emission;

  for (var i=0; i<emissions.length; i++) {
    balls.push(new Sphere());
  }

}

function draw() {
  background(240);
 fill(0);

  for (var i=0; i < emissions.length; i++) {
    co2emission[i] = emissions[i].co2
    names[i] = emissions[i].nameeg
    sanctions[i] = emissions[i].sanktion_final
    balls[i].move(map(sanctions[i], 0, max(sanctions[i]), 0, 1));
    balls[i].display(co2emission[i], names[i]);
  }
}

// Function determines ellipse characteristics
class Sphere {

    constructor () {
        this.direction = 1;
        this.x = random(0, width);
        this.y = random(0,height);
        this.diameter = 0;
    }
  
  move(speedVar) {
    this.x += random(-speedVar, speedVar)

  }

  display(diameter, names){
    
    circle(this.x, this.y, 0.4*diameter);
    text(names, this.x, this.y);

  }
}