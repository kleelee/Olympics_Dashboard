
  //Bar Chart
  // Define SVG area dimensions
  var svgWidth1 = 1000;
  var svgHeight1 = 500;

  // Define the chart's margins as an object
  var chartMargin1 = {
  top: 30,
  right: 30,
  bottom: 150,
  left: 70
  };

  // Define dimensions of the chart
  var chartWidth1 = svgWidth1 - chartMargin1.left - chartMargin1.right;
  var chartHeight1 = svgHeight1 - chartMargin1.top - chartMargin1.bottom;

  // Select bar, append SVG to it, and set the dimensions
  var svg1 = d3.select("#bar")
  .append("svg")
  .attr("height", svgHeight1)
  .attr("width", svgWidth1);

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  var chartGroup1 = svg1.append("g")
  .attr("transform", `translate(${chartMargin1.left}, ${chartMargin1.top})`);

  // Load data from csv
  d3.json("/static/data/goldCountries.json", function(error, athleteData) {
  if (error) return (error);

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(athleteData.map(d => d.Country))
    .range([0, chartWidth1])
    .paddingInner(0.2);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(athleteData, d => d.Medal_Count)])
    .range([chartHeight1, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup1.append("g")
    .call(leftAxis);

  chartGroup1.append("g")
    .attr("transform", `translate(0, ${chartHeight1})`)
    .call(bottomAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 20)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start")
    .style("font-size", "12px");

  // Use the linear and band scales to position each rectangle within the chart
  chartGroup1.selectAll(".bar")
    .data(athleteData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.Country))
    .attr("y", d => yLinearScale(d.Medal_Count))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight1 - yLinearScale(d.Medal_Count))
    .attr("fill", "#29A39E")

  chartGroup1.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - chartMargin1.left + 10)
    .attr("x", 0 - (chartHeight1 / 1.4))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Number of Gold Medals");

  chartGroup1.append("text")
    .attr("transform", `translate(${chartWidth1 / 2}, ${chartHeight1 + chartMargin1.top + 100})`)
    .attr("class", "axisText")
    .text("Olympic Teams");

  });

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
  var chartGroup1 = svg1.append("g")
  .attr("transform", `translate(${chartMargin1.left}, ${chartMargin1.top})`);

// Perform a GET request to the query URL
d3.json("/static/data/OlympicLocations.json", function(error, data) {
  if (error) return (error);
 
   // Once we get a response, send the data.features object to the createFeatures function)
   
   createFeatures(data);
  
 });

 function createFeatures(countryData) {
 
   // Define a function we want to run once for each feature in the features array
   function onEachFeature(feature, layer) {
     layer.bindPopup("<h3>" + "Location: " + feature.properties.City+
       "</h3><hr><h3>" + "Games: " + feature.properties.all_games + "</h3>");
   } 
 
   function markerColor(season) {
     var color = "";
     if (season == "Summer") {color = "#DD7373";}
     else {color = "lightskyblue";};
     return color;}
 
   
   
   // Create a GeoJSON layer containing the features array on the earthquakeData object
   // Run the onEachFeature function once for each piece of data in the array
  //  "OlympicLocations.geojson"
   var countries = L.geoJSON(countryData, {
     onEachFeature: onEachFeature,
     pointToLayer: function (feature, layer) {
         return L.circleMarker(layer, 
             {radius: feature.properties.number*5,
             fillColor: markerColor(feature.properties.Season),
             color: "#000",
             weight: 1,
             opacity: 1,
             fillOpacity: 0.5
         });
     }
   });

 
   // Sending our earthquakes layer to the createMap function
   createMap(countries);
 }
 
 function createMap(countries) {
 
   // Define streetmap and darkmap layers
   var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
     maxZoom: 18,
     id: "mapbox.light",
     accessToken: "pk.eyJ1Ijoia3VsaW5pIiwiYSI6ImNpeWN6bjJ0NjAwcGYzMnJzOWdoNXNqbnEifQ.jEzGgLAwQnZCv9rA6UTfxQ"
   });
 
   // Create overlay object to hold our overlay layer
   var overlayMaps = {
     Countries: countries
   };
 
   // Create our map, giving it the streetmap and earthquakes layers to display on load
   var myMap = L.map("map", {
     center: [25.104304, 0],
     zoom: 2.25,
     layers: [streetmap, countries],
     zoomControl:false,
     scrollWheelZoom: false
   });
 
   // Create a layer control
   // Pass in our baseMaps and overlayMaps
   // Add the layer control to the map
   L.control.layers(overlayMaps, {
     collapsed: false
   }).addTo(myMap);
 
 }
 





 //Transition Graph
var svgWidth = 1000;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#line")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenYAxis = "Name";

// function used for updating y-scale var upon click on axis label
function yScale(SportAthData, chosenYAxis) {
  // create scales
if (chosenYAxis =="Name"){
  var yLinearScale = d3.scaleLinear()
  .domain([d3.min(SportAthData, d => d.Name) * 0.8,
    d3.max(SportAthData, d => d.Name) * 1.2
  ])
  .range([height, 0]);

return yLinearScale;

} else {

  var yLinearScale = d3.scaleLinear()
  .domain([d3.min(SportAthData, d => d.Sport) * 0.8,
    d3.max(SportAthData, d => d.Sport) * 1.2
  ])
  .range([height, 0]);

  return yLinearScale;
}
}
// function used for updating yAxis var upon click on axis label
function renderAxes( newYScale,yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}
// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newYScale, chosenYaxis) {

  if (chosenYaxis == "Name") {
    circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d.Name));

   return circlesGroup;
  } else {

    circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d.Sport));

  return circlesGroup;
  }
}

// Retrieve data from the CSV file and execute everything below
d3.json('/static/data/growth.json', function(err, SportAthData) {
  if (err) throw err;
 

  var parseTime = d3.timeParse("%Y");

  // parse data
  SportAthData.forEach(function(d) {
    d.Year = parseTime(d.Year);
    d.Sport = +d.Sport
    d.Name = +d.Name  
  });

  // yLinearScale function above csv import
  var yLinearScale = yScale(SportAthData, chosenYAxis);

  // Create x scale function
  var xLinearScale = d3.scaleTime()
    .domain([d3.min(SportAthData, d => d.Year), d3.max(SportAthData, d => d.Year)])
    .range([0, width]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    //.attr("transform", `translate(0, ${height})`)
    .call(leftAxis);

  // append x axis
  chartGroup.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(bottomAxis);

  // append initial circles

  if (chosenYAxis == "Name"){
    var circlesGroup = chartGroup.selectAll("circle")
    .data(SportAthData)
    .enter()
    .append("circle")
    .attr("cy", d => yLinearScale(d.Name))
    .attr("cx", d => xLinearScale(d.Year))
    .attr("r", 10)
    .attr("fill", "#DD7373")
    .attr("opacity", ".5");   
  } else {
    var circlesGroup = chartGroup.selectAll("circle")
    .data(SportAthData)
    .enter()
    .append("circle")
    .attr("cy", d => yLinearScale(d.Sport))
    .attr("cx", d => xLinearScale(d.Year))
    .attr("r", )
    .attr("fill", "#DD7373")
    .attr("opacity", ".5");   
  }
  


  // Create group for  2 x- axis labels
  var labelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`);

  var sportLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 30)
    .attr("value", "Sport") // value to grab for event listener
    .classed("inactive", true)
    .text("# of Sports by Year");

  var nameLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 50)
    .attr("value", "Name") // value to grab for event listener
    .classed("active", true)
    .text("# of Athletes by Year");

  // append y axis
  chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Total");

  // updateToolTip function above csv import
 // var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenXAxis with value
        chosenYAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates y scale for new data
        yLinearScale = yScale(SportAthData, chosenYAxis);

        // updates y axis with transition
        yAxis = renderAxes(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        //circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "Name") {
          nameLabel
            .classed("active", true)
            .classed("inactive", false);
          sportLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          nameLabel
            .classed("active", false)
            .classed("inactive", true);
          sportLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
});







// Define SVG area dimensions
var svgWidth2 = 1000;
var svgHeight2 = 500;

// Define the chart's margins as an object
var chartMargin2 = {
  top: 30,
  right: 50,
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

d3.json("/static/data/goldAthletes.json", function(error, athleteData) {
  if (error) return (error);
  
console.log(athleteData);

  //Cast the hours value to a number for each piece of tvData
  athleteData.forEach(function(d) {
    d.Gold_Medals = +d.Gold_Medals;
  });

  // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
  var xBandScale = d3.scaleBand()
    .domain(athleteData.map(d => d.Name))
    .range([0, chartWidth2])
    .paddingInner(0.2);
   

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(athleteData, d => d.Gold_Medals)])
    .range([chartHeight2, 0]);

  // Create two new functions passing our scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
    chartGroup2.append("g")
    .call(leftAxis);

  chartGroup2.append("g")
    .attr("transform", `translate(0, ${chartHeight2})`)
    .call(bottomAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", 20)
    .attr("dy", ".35em")
    .attr("transform", "rotate(45)")
    .style("text-anchor", "start")
    .style("font-size", "10px");


    function barColor(gender){
      color=""
      if (gender == "M"){color = "#3E92CC"}
      else {color = "#BBBDF6"}
      return color}
  // Create one SVG rectangle per piece of tvDatas
  // Use the linear and band scales to position each rectangle within the chart

  colorColumn = "Sex"

  chartGroup2.selectAll(".bar")
    .data(athleteData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xBandScale(d.Name))
    .attr("y", d => yLinearScale(d.Gold_Medals))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight2 - yLinearScale(d.Gold_Medals))
    .attr("fill", function (d) { return barColor(d[colorColumn])});


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

});




//Transition Graph Winter
var svgWidth5 = 1000;
var svgHeight5 = 500;

var margin5 = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width5 = svgWidth5 - margin5.left - margin5.right;
var height5 = svgHeight5 - margin5.top - margin5.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg5 = d3
  .select("#line1")
  .append("svg")
  .attr("width", svgWidth5)
  .attr("height", svgHeight5);

// Append an SVG group
var chartGroup5 = svg5.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenYAxis = "Name";

// function used for updating y-scale var upon click on axis label
function yScale(SportAthData, chosenYAxis) {
  // create scales
if (chosenYAxis =="Name"){
  var yLinearScale = d3.scaleLinear()
  .domain([d3.min(SportAthData, d => d.Name) * 0.8,
    d3.max(SportAthData, d => d.Name) * 1.2
  ])
  .range([height5, 0]);

return yLinearScale;

} else {

  var yLinearScale = d3.scaleLinear()
  .domain([d3.min(SportAthData, d => d.Sport) * 0.8,
    d3.max(SportAthData, d => d.Sport) * 1.2
  ])
  .range([height5, 0]);

  return yLinearScale;
}
}
// function used for updating yAxis var upon click on axis label
function renderAxes( newYScale,yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}
// function used for updating circles group with a transition to
// new circles
function renderCircles(circlesGroup, newYScale, chosenYaxis) {

  if (chosenYaxis == "Name") {
    circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d.Name));

   return circlesGroup;
  } else {

    circlesGroup.transition()
    .duration(1000)
    .attr("cy", d => newYScale(d.Sport));

  return circlesGroup;
  }
}

// Retrieve data from the CSV file and execute everything below
d3.json('/static/data/GrowthWinter.json', function(err, SportAthData) {
  if (err) throw err;


  var parseTime = d3.timeParse("%Y");

  // parse data
  SportAthData.forEach(function(d) {
    d.Year = parseTime(d.Year);
    d.Sport = +d.Sport
    d.Name = +d.Name  
  });

  // yLinearScale function above csv import
  var yLinearScale = yScale(SportAthData, chosenYAxis);

  // Create x scale function
  var xLinearScale = d3.scaleTime()
    .domain([d3.min(SportAthData, d => d.Year), d3.max(SportAthData, d => d.Year)])
    .range([0, width]);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append y axis
  var yAxis = chartGroup5.append("g")
    .classed("y-axis", true)
    //.attr("transform", `translate(0, ${height})`)
    .call(leftAxis);

  // append x axis
  chartGroup5.append("g")
  .attr("transform", `translate(0, ${height5})`)
  .call(bottomAxis);

  // append initial circles

  if (chosenYAxis == "Name"){
    var circlesGroup = chartGroup5.selectAll("circle")
    .data(SportAthData)
    .enter()
    .append("circle")
    .attr("cy", d => yLinearScale(d.Name))
    .attr("cx", d => xLinearScale(d.Year))
    .attr("r", 10)
    .attr("fill", "#726fc5")
    .attr("opacity", ".5");   
  } else {
    var circlesGroup = chartGroup5.selectAll("circle")
    .data(SportAthData)
    .enter()
    .append("circle")
    .attr("cy", d => yLinearScale(d.Sport))
    .attr("cx", d => xLinearScale(d.Year))
    .attr("r", )
    .attr("fill", "#7265c5")
    .attr("opacity", ".5");   
  }
  


  // Create group for  2 x- axis labels
  var labelsGroup = chartGroup5.append("g")
    .attr("transform", `translate(${width5 / 2}, ${height5 + 20})`);

  var sportLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 30)
    .attr("value", "Sport") // value to grab for event listener
    .classed("inactive1", true)
    .text("# of Sports by Year");

  var nameLabel = labelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 50)
    .attr("value", "Name") // value to grab for event listener
    .classed("active1", true)
    .text("# of Athletes by Year");

  // append y axis
  chartGroup5.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Total");

  // updateToolTip function above csv import
 // var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

  // x axis labels event listener
  labelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenXAxis with value
        chosenYAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates y scale for new data
        yLinearScale = yScale(SportAthData, chosenYAxis);

        // updates y axis with transition
        yAxis = renderAxes(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        //circlesGroup = updateToolTip(chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "Name") {
          nameLabel
            .classed("active1", true)
            .classed("inactive1", false);
          sportLabel
            .classed("active1", false)
            .classed("inactive1", true);
        }
        else {
          nameLabel
            .classed("active1", false)
            .classed("inactive1", true);
          sportLabel
            .classed("active1", true)
            .classed("inactive1", false);
        }
      }
    });
});














