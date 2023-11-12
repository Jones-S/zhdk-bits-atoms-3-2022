console.log('Loading...');

let table;

const canvasWidth = 600;
const canvasHeight = 600;

// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('cities.csv', 'csv', 'header', onComplete, onError);
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  // print() is a p5 method to do the same as console.log
  // for the interested ones: here https://github.com/processing/p5.js/blob/v1.4.2/src/core/environment.js#L44
  // p5 defines the print method which is nothing else than another name for console.log()

  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('city'));
}

function draw() {
  background('#fae');
}

function onComplete(table) {
  console.log('Successfully loaded CSV file 🤓: ', table);
}

function onError(response) {
  console.error(
    'Unfortunately an error occured while loading your csv file: ',
    response
  );
  console.info(
    'ℹ️⚠️ If a CORS issue occured, you might want to start a local server instead of just opening the index.html. One way of doing this is using the «Live Server» extension in Visual Studio Code...'
  );
}
