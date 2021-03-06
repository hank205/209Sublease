/* d3.js boilerplate */
var margin = { top: 50, right: 0, bottom: 100, left: 150 },
    width = 1250 - margin.left - margin.right,
    height = 10000 - margin.top - margin.bottom;


var nav = d3.select("#chart")
            .append("div")
            .style("position","fixed")
            .style("left", margin.left)
            .style("width","100%");


var svg = d3.select("#chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/* Set up our x and y axis ranges */
var xRange = [];
for (var i = 0; i < tenants.length; i++) {
  xRange.push( i * (width/tenants.length) + 100 );
}
var x = d3.scaleOrdinal()
          .domain( tenants )
          .range( xRange );


var yRange = [];
for (var i = 0; i < dates.length; i++) {
  yRange.push(i * (height/dates.length) );
}
var y = d3.scaleOrdinal()
          .domain( dates )
          .range( yRange );


/* Write labels along axes */
nav.selectAll()
   .data( tenants )
   .enter()
   .append("text")
   .text(function (d) { return d; } )
   .style("display","block")
   .style("left", function (d) { return x(d); })
   .style("position","absolute");

svg.selectAll()
   .data( dates )
   .enter()
   .append("text")
   .attr("x", function (d) { return 0; } )
   .attr("y", function (d) { return y(d); } )
   .text(function (d) { return d; } )
   .style("text-anchor","end");


/* Now draw the horizontal lines */
svg.selectAll()
   .data( dates )
   .enter()
   .append("line")          // attach a line
   .style("stroke", "black")  // colour the line
   .attr("x1", function (d) { return -100; } )     // x position of the first end of the line
   .attr("y1", function (d) { return y(d)-18; } )      // y position of the first end of the line
   .attr("x2", function (d) { return width; } )     // x position of the second end of the line
   .attr("y2", function (d) { return y(d)-18; } )    // y position of the second end of the line
;

/* Now draw the rectangles */
svg.selectAll()
   .data( data )
   .enter()
   .append("rect")
   .attr("x", function (d) { return x(d.tenant); } )
   .attr("y", function (d) {
      const tenantStartDate = moment(d.startDate, 'MM/DD/YYYY');
      const domainStartDate = moment(dates[0], 'MM/DD/YYYY');
      const diffDays = tenantStartDate.diff(domainStartDate, 'days');
      if(diffDays <= 0)
        return 0;
      return y(d.startDate) - 10;} )
   .attr("width",function(d){return 30;} )
   .attr("height",function(d){
      var tenantStartDate = moment(d.startDate, 'MM/DD/YYYY');
      const domainStartDate = moment(dates[0], 'MM/DD/YYYY');
      const diffDomainDays = tenantStartDate.diff(domainStartDate, 'days');
      if(diffDomainDays <= 0)
        tenantStartDate = domainStartDate;
      var tenantEndDate = moment(d.endDate, 'MM/DD/YYYY');
      var diffDays = tenantEndDate.diff(tenantStartDate, 'days') + 1;
      return 10 + (diffDays-1) * (height/dates.length); } )
   .style("fill",function(d){ return "#00ff00"; });





