
let cities = ['Zurich', 'Dietikon']

const mainUrl = 'http://api.airvisual.com/v2/city?city=';
const contUrl = '&state=Zurich&country=Switzerland&key=';

let token = '8d15ddab-41f7-4240-983c-b2cce77536d8';
let aq = [];
let isReady;

function setup() {
  createCanvas(800, 800);
  noStroke();
  fetchAQ();

}


function draw() {
  background(220);
  setTimeout(fetchAQ, 3600000);
  if (!isReady ) {
    // Wait until the earthquake data has loaded before drawing.
    return;
  }


  for (let i in aq) {
    if(i == "air_quality"){
      ellipse(width/2 +(aq[i] * 10), height / 2 , aq[i] * 5, aq[i] * 5);
    }else {
      textAlign(CENTER);
      text(aq[i], width/2 + 250, height/2, 30 , 30);
      fill(255, 0, 0, 100);
    }
    
}
noLoop();
}

function fetchAQ() {
  for (let el of cities){
    let iqurl = mainUrl + el + contUrl;
    httpGet(iqurl + token, "json", false,
    function(response){
      console.log(response)
      addValueToMap("city", response.data.city);
      addValueToMap("air_quality", response.data.current.pollution.aqicn);
      isReady = response;
    });
  }
  
  return aq;

}

function addValueToMap(key, value) {
  aq[key] = aq[key] || [];
  aq[key].push(value);
  }