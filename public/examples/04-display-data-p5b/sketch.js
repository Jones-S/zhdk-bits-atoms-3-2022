console.log('Loading data...');

let table;

const canvasWidth = window.innerWidth;
const canvasHeight = 6000; // ⚠️ size limit if too long
const xPosAxis1 = 20; // px
const xPosAxis2 = 500; // px

// https://p5js.org/reference/#/p5/loadTable
function preload() {
  table = loadTable('future_cities_data_truncated.csv', 'csv', 'header');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);

  const barMargin = 10;
  const barHeight = 30;

  // count the columns
  print(table.getRowCount() + ' total rows in table');
  print(table.getColumnCount() + ' total columns in table');
  print('All cities:', table.getColumn('current_city'));

  for (let i = 0; i < table.getRowCount(); i++) {
    const city = table.get(i, 'current_city');
    const meanTemp = table.get(i, 'Annual_Mean_Temperature');
    const futureMeanTemp = table.get(i, 'future_Annual_Mean_Temperature');

    position = convertDegreesToPosition(meanTemp);
    drawTempToday(position);
    drawLabelToday(position, city, meanTemp);

    futurePosition = convertDegreesToPosition(futureMeanTemp);
    drawTempFuture(futurePosition);
    drawLabelFuture(futurePosition, city, futureMeanTemp);

    drawConnectingLine(position, futurePosition);
  }

  // drawAxes();
  // drawAxesLabels();
}

function convertDegreesToPosition(temp) {
  // we need to map the temperatures to a new scale
  // 0° = 600px, 25° = 300px, 20° = 30px
  // https://p5js.org/reference/#/p5/map
  const position = map(temp, 0, 20, 600, 30);
  return position;
}

// the two temp drawing functions could also be combined into a single function
// adding the x-position as a new parameter. For simplicity we have two functions
function drawTempToday(pos) {
  fill('black');
  circle(xPosAxis1, pos, 10);
}

function drawTempFuture(pos) {
  fill('black');
  circle(xPosAxis2, pos, 10);
}

function drawLabelToday(pos, city, temp) {
  fill('black');
  const label = `${city}: ${temp}°C`;
  text(label, xPosAxis1 + 10, pos + 5);
}

function drawLabelFuture(pos, city, temp) {
  fill('black');
  const label = `${city}: ${temp}°C`;
  text(label, xPosAxis2 + 10, pos + 5);
}

function drawConnectingLine(y1, y2) {
  line(xPosAxis1, y1, xPosAxis2, y2);
}
