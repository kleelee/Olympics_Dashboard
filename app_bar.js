// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 560;

// Define the chart's margins as an object
var chartMargin = {
 top: 30,
 right: 30,
 bottom: 200,
 left: 70
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select bar, append SVG area to it, and set the dimensions
var svg = d3.select("#bar")
 .append("svg")
 .attr("height", svgHeight)
 .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
 .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from csv
d3.csv("/data/MedalCountByCountry.csv", function(error, athleteData) {
 if (error) return console.warn(error);

 function selectMedals(data) {
   return data.Medal = "Gold"
   && data.Medal_Count >500 ;
 }
 var filterdata = athleteData.filter(selectMedals);


 console.log(filterdata)

 //Cast the hours value to a number for each piece of tvData
 filterdata.forEach(function(d) {
   d.Medal_Count = +d.Medal_Count;
 });

 // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
 var xBandScale = d3.scaleBand()
   .domain(filterdata.map(d => d.Team))
   .range([0, chartWidth])
   .padding(0.2);

 // Create a linear scale for the vertical axis.
 var yLinearScale = d3.scaleLinear()
   .domain([0, d3.max(filterdata, d => d.Medal_Count)])
   .range([chartHeight, 0]);

 // Create two new functions passing our scales in as arguments
 // These will be used to create the chart's axes
 var bottomAxis = d3.axisBottom(xBandScale);
 var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

 // Append two SVG group elements to the chartGroup area,
 // and create the bottom and left axes inside of them
 chartGroup.append("g")
   .call(leftAxis);

 chartGroup.append("g")
   .attr("transform", `translate(0, ${chartHeight})`)
   .call(bottomAxis)
   .selectAll("text")
   .attr("y", 10)
   .attr("x", 20)
   .attr("dy", ".35em")
   .attr("transform", "rotate(45)")
   .style("text-anchor", "start")
   .style("font-size", "12px");

 // Create one SVG rectangle per piece of tvData
 // Use the linear and band scales to position each rectangle within the chart
 chartGroup.selectAll(".bar")
   .data(filterdata)
   .enter()
   .append("rect")
   .attr("class", "bar")
   .attr("x", d => xBandScale(d.Team))
   .attr("y", d => yLinearScale(d.Medal_Count))
   .attr("width", xBandScale.bandwidth())
   .attr("height", d => chartHeight - yLinearScale(d.Medal_Count))
   .attr("fill", "blue")

 chartGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 - chartMargin.left + 10)
   .attr("x", 0 - (chartHeight / 1.4))
   .attr("dy", "1em")
   .attr("class", "axisText")
   .text("Number of Gold Medals");

 chartGroup.append("text")
   .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 100})`)
   .attr("class", "axisText")
   .text("Olympic Teams");

});

// Define SVG area dimensions
var svgWidth1 = 960;
var svgHeight1 = 560;

// Define the chart's margins as an object
var chartMargin1 = {
 top: 30,
 right: 30,
 bottom: 200,
 left: 70
};

// Define dimensions of the chart area
var chartWidth1 = svgWidth1 - chartMargin1.left - chartMargin1.right;
var chartHeight1 = svgHeight1 - chartMargin1.top - chartMargin1.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg1 = d3.select("#line")
 .append("svg")
 .attr("height", svgHeight)
 .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup1 = svg1.append("g")
 .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from csv
d3.csv("/data/events.csv", function(error, athleteData) {
 if (error) return console.warn(error);

 function selectSeason(data) {
   return data.Season == "Summer";
 }

 var filterdata = athleteData.filter(selectSeason);
 console.log(filterdata)


var parseTime = d3.timeParse("%Y");

 //Cast the hours value to a number for each piece of tvData
 filterdata.forEach(function(d) {
   d.Year = parseTime(d.Year);
   d.Sport = +d.Sport  
 });

 // Configure a linear scale for the horizontal axis with a padding of 0.1 (10%)
 var xTimeScale = d3.scaleTime()
   .domain(d3.extent(filterdata, d => d.Year))
   .range([0, chartWidth]);

 // Create a linear scale for the vertical axis.
 var yLinearScale = d3.scaleLinear()
   .domain([0, d3.max(filterdata, d => d.Sport)+10])
   .range([chartHeight, 0]);

 // Create two new functions passing our scales in as arguments
 // These will be used to create the chart's axes
 var bottomAxis = d3.axisBottom(xTimeScale);
 var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

 // Append two SVG group elements to the chartGroup area,
 // and create the bottom and left axes inside of them
 chartGroup1.append("g")
   .call(leftAxis);

//create line for  medal data
var line1 = d3.line()
   .x(d => xTimeScale(d.Year))
   .y(d => yLinearScale(d.Sport));

 chartGroup1.append("g")
   .attr("transform", `translate(0, ${chartHeight})`)
   .call(bottomAxis)
   .selectAll("text")
   .attr("y", 10)
   .attr("x", 20)
   .attr("dy", ".35em")
   .attr("transform", "rotate(45)")
   .style("text-anchor", "start")
   .style("font-size", "12px");


chartGroup1
   .data([filterdata])
   .append("path")
   .attr("d", line1)
   .classed("line green", true);


 chartGroup1.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 - chartMargin1.left + 10)
   .attr("x", 0 - (chartHeight1 / 1.4))
   .attr("dy", "1em")
   .attr("class", "axisText")
   .text("Number of Olympic Sports");

 chartGroup1.append("text")
   .attr("transform", `translate(${chartWidth1 / 2.5}, ${chartHeight1 + chartMargin1.top + 45})`)
   .attr("class", "axisText")
   .text("Years - Summer Olympics");

});


// Define SVG area dimensions
var svgWidth2 = 960;
var svgHeight2 = 560;

// Define the chart's margins as an object
var chartMargin2 = {
  top: 30,
  right: 30,
  bottom: 200,
  left: 70
};

// Define dimensions of the chart area
var chartWidth2 = svgWidth2 - chartMargin2.left - chartMargin2.right;
var chartHeight2 = svgHeight2 - chartMargin2.top - chartMargin2.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg2 = d3.select("#bar2")
  .append("svg")
  .attr("height", svgHeight2)
  .attr("width", svgWidth2);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup2 = svg2.append("g")
  .attr("transform", `translate(${chartMargin2.left}, ${chartMargin2.top})`);


function createGraph(sample){
// Load data from hours-of-tv-watched.csv
url = "";
if (sample == "Gold") {url = ""}


d3.csv("hours-of-tv-watched.csv", function(error, athleteData) {
  if (error) return console.warn(error);

  function selectMedals(data) {
    return data.Medal_Count >= 8
  }

  var filterdata = athleteData.filter(selectMedals);

  console.log(filterdata)

  //Cast the hours value to a number for each piece of tvData
  filterdata.forEach(function(d) {
    d.Medal_Count = +d.Medal_Count;
    console.log(d.Medal_Count)
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(filterdata.map(d => d.name))
    .range([0, chartWidth])
    .padding(0.2);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(filterdata, d => d.Medal_Count)])
    .range([chartHeight, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup2.append("g")
    .call(leftAxis);

  chartGroup2.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 20)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start")
    .style("font-size", "12px");

  // Create one SVG rectangle per piece of tvData
  // Use the linear and band scales to position each rectangle within the chart
  chartGroup2.selectAll(".bar")
    .data(filterdata)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.name))
    .attr("y", d => yLinearScale(d.Medal_Count))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight2 - yLinearScale(d.Medal_Count))
    .attr("fill", "green") // write code here for a function for the fill to be based on d.Sex

  chartGroup2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin2.left + 10)
    .attr("x", 0 - (chartHeight2 / 1.4))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Number of Gold Medals");

  chartGroup2.append("text")
    .attr("transform", `translate(${chartWidth2 / 2}, ${chartHeight2 + chartMargin2.top + 150})`)
    .attr("class", "axisText")
    .text("Olympic Gold Medalists");

})};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}
