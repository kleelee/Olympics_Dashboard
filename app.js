
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("athlete_events.csv")
  .then(function(athleteData) {

//Parse data to cast as numbers
athleteData.ForEach(function(data){
    data.ID = +data.ID;
    data.Age = +data.Age;
    data.Height = +data.Height;
    data.Weight = +data.Weight;
    data.Year = +data.Year;

});

    // Create scale functions

    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(athleteData, d => d.hair_length)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(hairData, d => d.num_hits)])
      .range([height, 0]);

    // Create axis functions

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);




}