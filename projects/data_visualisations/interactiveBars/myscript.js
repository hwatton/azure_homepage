
var wd = 690
var ht = 340
var pad = 60 //margin for axes
var bpad = 10 //top margin


var svg = d3.select("#divcont")
  .append("svg")
  .attr("viewBox", "0 0 800 350")
  .attr("preserveAspectRatio", "xMinYMin meet")
d3.select("body").style("background-color","#f7f9e0")
var dozer = d3.json("https://api.covid19api.com/summary")
  dozer.then(function(deeta) {
var intDat = deeta.Countries

intDat.sort(function(a, b) {return b.TotalDeaths-a.TotalDeaths})

var deathExt_int = d3.extent(intDat, function(d) {
return d.TotalDeaths
})
var dL = 9 //the amount of countries to return

var trimmed_data = intDat.slice(0,dL)
var promises = []
trimmed_data.forEach(function(d) {
  var urlStr = "https://api.covid19api.com/total/country/" + d.Slug
  promises.push(d3.json(urlStr))
})
Promise.all(promises).then(function(data) {


var data_startpoint
for (i=0;i<100;i++) {
for (j=0;j<dL;j++){

  if (data[j][i].Deaths != 0) {
    data_startpoint = i
     i = 200
     j = 200
  } //if
} // i
} // j

var sliced_data = []
var dthMax, running_total
var maxArr = []

for (j=0;j<dL;j++){

if(data[j][2].Country != "United Kingdom") {

	for (i=0;i<data[j].length;i++){

maxArr.push(data[j][i].Deaths - running_total)
data[j][i].daily_deaths = data[j][i].Deaths - running_total
running_total = data[j][i].Deaths

} // i
sliced_data.push(data[j].slice(data_startpoint))
} //if!UK
} // j

/*
for (i=0;i<dL;i++) {
	if(sliced_data[i][2].Country == "United Kingdom"){
		sliced_data.splice(i,1)
		i= dL + 10
}
}*/

dL = dL - 1


dthMax = d3.max(maxArr)
var date_Ext = d3.extent(sliced_data[0], function(d) {
return d.Date
})

var yScale = d3.scaleLinear()
.range([0,ht-pad -bpad ])
.domain([0,dthMax])

var yinvScale = d3.scaleLinear()
.range([ht-pad - bpad ,0])
.domain([0,dthMax])

var x_Scale = d3.scaleLinear()
.range([pad,wd])
.domain([0,sliced_data[0].length])

var t_Scale = d3.scaleTime()
  .domain(d3.extent(sliced_data[0], function(d) {

    return new Date(d.Date);
  }))
  .range([pad, wd]);

  var xAxis = d3.axisBottom()
  .scale(t_Scale);

  var yAxis = d3.axisLeft()
  .scale(yinvScale);

  var bar_Width = 0.6*(((wd) - pad)/sliced_data[0].length)

  var xAxisTrans = ht - pad  ;
  var yAxisTrans =  bpad
  // drawing in from here
  var barcol
  var thisBar
  var tableau = d3.scaleOrdinal(d3.schemeTableau10)
  var legend = []
  var click_check = []
for (j=0;j<sliced_data.length;j++){

	
click_check.push(0)

  var dbarGroup = svg.append("g")
  var dbars = dbarGroup.selectAll("dbar")
  .data(sliced_data[j])
  .enter()

  dbars.append("rect")
  .attr("class", function(d,i) {return "group" + j })
  .attr("height", 0)
  .attr("width", function(){return bar_Width })
  .attr("x", function(d,i) {return x_Scale(i)})
  .attr("y", function(d,i) {return ht - pad})
  .attr("fill", function(){return tableau(j)});
var cullur = tableau(j)
legend.push({
country: sliced_data[j][0].Country,
colour: cullur,
className: "group" + j,
group: j
})

} //drawing for loop

//please click hText
/*
svg.append("text")
.attr("class","pleaseclick")
.text("< click on a  box in the legend to see the data")
.attr("x", wd/2)
.attr("y", pad)
.attr("fill", "grey")
.style("font-size", pad/5)
.style("font-family", "sans-serif")
.style("text-align", "center")

*/



// draw legend

var legendBars = svg.selectAll("legBar")
.data(legend)
.enter()

legendBars.append("rect")
.attr("class", function(d) {
  return d.className + "text"
})
.attr("height", bar_Width * 2)
.attr("width", x_Scale(0)/3)
.attr("x", function() {return x_Scale(4)})
.attr("y",function(d,i) {return pad/3 - bar_Width/2 + i * bar_Width*5})
.attr("fill", function(d) {
  return d.colour})
.style("stroke", "grey")
.style("stroke-width", "0.5px")
.style("opacity", "50%")
.on("click", function(d) {

d3.select(".pleaseclick")
  .transition()
  .duration(1650)
  .style("opacity", "0%")
  .on("end", function() {d3.select(".pleaseclick").remove()})

var click = "." + d.className + "text"
  if (click_check[d.group] == 0) {
    click_check[d.group] = 1
    d3.selectAll(click).style("opacity","100%");

    thisBar = "." + d.className
    d3.selectAll(thisBar).transition()
      .duration(500)
        .attr("y", function(d) {return ht - pad - yScale(d3.max([0,d.daily_deaths]))})
        .attr("height", function(d,i){
              return yScale(d3.max([0,d.daily_deaths]))});

  }else{
    click_check[d.group] = 0
    d3.selectAll(click).style("opacity","40%");
    thisBar = "." + d.className
      d3.selectAll(thisBar).transition()
      .duration(500)
      .attr("y", function(d) {return ht - pad })
      .attr("height", 0);
}
})


var legendTxt = svg.selectAll("legTxt")
.data(legend)
.enter()

legendTxt.append("text")
.attr("class", function(d) {
  return d.className + "text"
})
.attr("x", function() {return x_Scale(5) + x_Scale(0)/3})
.attr("y",function(d,i) {return pad/2.8 +  bar_Width + i * bar_Width*5})
.text(function(d) {return d.country})
.style("font-size", ()=>{return "6px"})
.style("font-family", "sans-serif")
.style("opacity", "50%")



  var x_Ax = svg.append("g")
  .attr("class","axis x_axis")
          .attr("transform", "translate(0, " + xAxisTrans  +")")
          .call(xAxis);

  var y_Ay = svg.append("g")
  .attr("class","axis y_axis")
          .attr("transform", "translate(" + pad + ", " + yAxisTrans  +")")
          .call(yAxis);

  d3.selectAll(".tick").style("font-size", pad/7) //style the ticks
  d3.selectAll(".axis").style("stroke-width", "0.5px") // style the axes


}) // for j

}) // initial data load country data
