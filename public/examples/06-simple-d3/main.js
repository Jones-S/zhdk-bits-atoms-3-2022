console.log('... setup ...');

const data = [
  {
    size: 50,
    color: '#FFDE17',
  },
  {
    size: 210,
    color: '#FFD520',
  },
  {
    size: 140,
    color: '#FAB545',
  },
  {
    size: 57,
    color: '#FFD877',
  },
];

// distance between data point (x-axis)
// calculated from width diviced by amount of data points + 1,
// because the most outer data points should not stick to the edge of the viewport
// example:
// |------o------o------o------o------|
// |---1--|---2--|---3--|---4--|---5--|
// data.length = 4, data.length + 1 = 5
const distance = window.innerWidth / (data.length + 1);

// creating an svg within the div with id #d3
const svg = d3
  .select('#d3')
  .append('svg')
  // setting svg specific attributes for the svg tag
  .attr('width', window.innerWidth)
  .attr('height', window.innerHeight);

const line = svg
  // using the same svg selection from before and adding a line
  .append('line')
  // adding a class attribute for stroke styling (see style.css)
  .attr('class', 'axis whatever-class')
  // and adding line specific attributes to define the line
  .attr('x1', 10)
  .attr('y1', 20)
  .attr('x2', window.innerWidth - 10)
  .attr('y2', 20);

svg
  // selecting is necessary, but we can add a random selector here ('whatever')
  // the return value is an empty selection:
  // https://github.com/d3/d3-selection/blob/v3.0.0/README.md#selectAll
  // if you ask yourself why:
  // https://stackoverflow.com/questions/17452508/what-is-the-point-of-calling-selectall-when-there-are-no-existing-nodes-yet-on-d
  .selectAll('whatever')
  .data(data)
  .enter()
  .append('circle')
  // .attr('cx', (d, currentIndex) => currentIndex * distance + distance)
  // is the same as:
  .attr('cx', function (d, currentIndex) {
    return currentIndex * distance + distance;
  })
  // but a bit more new school
  .attr('cy', (d) => 300)
  // .attr('cy', 300)
  .attr('r', (d) => d.size)
  .attr('fill', (d) => d.color);
