var ht = window.innerHeight * 0.8
var wd = window.innerWidth
console.log(ht)
var col = "5% " + ht + "auto"

d3.select(".item3").attr("height", ht);

var menW = ht/5
var svgC = d3.select("svg")
.attr("height", "100%")
.attr("width", "100%")


d3.select("#holder").style("height", ht)

ht = d3.select("#holder").style("height")
ht = parseInt(ht.substring(0,3))
console.log(ht)

var lnCol = "orange"

var sh = 0
var pad = ht*0.1
var xScale = d3.scaleLinear()
.range([0,ht]);

var lScale = d3.scaleLinear()
.range([0,ht])
.domain([0,25]);

var pthL = d3.line()
.curve(d3.curveLinear);


var pthD = d3.line()
.x(function(d){
  return xScale(d[0])})
.y(function(d) {
  return xScale(d[1])})
.curve(d3.curveLinear);

var dt = d3.csv("animals.csv")
dt.then(function(data) {
  var dx = data
  var uL =  d3.select("ul")

  var nav = uL.selectAll("li")
    .data(dx)
    .enter();

    nav.append("li")
    .attr("id",function(d) {return d.id})
    .text(function(d) {return d.name})
    .style("font-size", function() {

      return d3.min([wd/20,ht/20]) + "px"
    })
    .on("click", function(d){
      var eyeD = d.file
    lineup(eyeD)
    })
    .on("mouseover", function(d){
      var dx = d3.select(this)
      dx.transition()
      .style("background-color",lnCol)
      .style("color","white")
    })
    .on("mouseout", function(d){
    var dx = d3.select(this)
    dx.transition()
    .duration(1600)
    .style("background-color","white")
    .style("color",lnCol)
    .on("end",function(d) {
      var dx = d3.select(this)
      dx.transition()
      .duration(600)
      .style("color", "#818181")
    })

  }); //mouseout

//here :  create a random array of 40 lines
var ln = d3.range(1,26)
var loadPath = []

ln.forEach(function(d) {
  loadPath.push([[lScale(d),lScale(1)],[lScale(d),lScale(60)]])
})

ln = d3.range(1,36)
ln.forEach(function(d) {
  loadPath.push([[lScale(0),lScale(0)],[lScale(0),lScale(0)]])
})

for (i=0;i<60;i++){

var lines = svgC.append("path")
.attr("id","line" + i )
.attr("d", pthL(loadPath[i]))
.style("stroke",lnCol)
.attr("fill","none");
}

}) //initial csv load



function lineup(sh) {

var dat = d3.csv(sh)
dat.then(function(dta) {


dta.forEach(function(d){
return d.x1 = +d.x1, d.x2 = +d.x2, d.y1 = +d.y1, d.y2 = +d.y2

})
var nz = dta.filter(function(d){return d.x1 !== 0})

 // scale the input
var x1t = d3.extent(nz.map(function(d){
  return (d.x1);}))
var y1t = d3.extent(nz.map(function(d){
  return (d.y1);}))
var x2t = d3.extent(nz.map(function(d){
  return (d.x2);}))
var y2t = d3.extent(nz.map(function(d){
  return (d.y2);}))
var mx = d3.extent([x1t[1],y1t[1],x2t[1],y2t[1],x1t[0],y1t[0],x2t[0],y2t[0]])

console.log(mx)




xScale.domain(mx)

for (j=0;j<60;j++) {
  var pt = []
  pt.push([dta[j].x1,dta[j].y1])
  pt.push([dta[j].x2,dta[j].y2])

  d3.select("#line" + j)
  .transition()
  .duration(3500)
  .attr("d", pthD(pt))
  .style("stroke",function() {
    var izit = parseInt(dta[j].visible)
    if (izit == 1) {
        return lnCol
    }else{
      return lnCol
        //return "none"
      }
  })
  .attr("fill", "none");

}
 // for loop
}) //end of data callback

  //sh = sh+ 1  //end if function update sh
}
