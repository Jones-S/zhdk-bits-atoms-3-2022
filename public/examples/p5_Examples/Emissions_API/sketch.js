

//using data from https://api.v2.emissions-api.org/ui/#/default/emissionsapi.web.get_average

const api_url = 'https://api.v2.emissions-api.org'
  + '/api/v2/carbonmonoxide/average.json' +
  '?country=CH&begin=2018-02-10&end=2021-02-11&limit=100&offset=0'

var user_data;
var lineChart;
var avgCo2 = [];
var startDate = [];

function preload() {

  httpGet(api_url, 'json', false, function (response) {
    user_data = response;
  });

  //uncomment this to do the same using fetch() API
  /*
  fetch(api_url)
    .then(response => response.json())
    .then(data => {
    for (let avg of data){
      avgCo2.push(avg.average.toPrecision(4));
      startDate.push(avg.start.substring(0, 10));
    
      }
   
})
*/
}

function setup() {
  textSize(18);
  ctx = document.getElementById('co2_CH').getContext('2d');

}

function draw() {

  //comment this to use fetch() API

  if (!user_data) {
    // Wait until the data has loaded before drawing.
    return;
  }

  for (let avg of user_data) {
    avgCo2.push(avg.average.toPrecision(4));
    startDate.push(avg.start.substring(0, 10));


  }


  const data = {
    labels: startDate,
    datasets: [{
      label: 'Switzerland',
      data: avgCo2,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  if (!lineChart) {

    lineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            stacked: true,
            title: {
              color: 'red',
              display: true,
              text: 'carbon monoxide [mol/m²]',
            }
          },
          x: {
            display: true,
            title: {
              color: 'red',
              display: true,
              text: 'date',
            }
          }
        }
      }
    });
  }




}


