var wd = window.innerWidth
var ht = window.innerHeight

var svg = d3.select("svg")
.attr("width", wd)
.attr("height", ht*0.75);

d3.select("#title").style("color","#3d4849")
d3.select("#datalink").style("color","#3d4849")
d3.select("#update").style("color","#3d4849")
var doit = d3.json("https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true")
doit.then(function(data) {

var dtta = data
console.log(dtta)
var upd = dtta[0].lastUpdatedSource
upd = upd.substring(0,10)
d3.select("#update").text("Last updated: " + upd)
let cs = dtta.length
var numnodes = data.length
var dthExt = d3.extent(dtta,function(d) {
  return d.deceased
})

var rScale = d3.scaleLinear()
.range([10,80]) //scale of the radius of the circles
.domain(dthExt);
//"#fe6e00"
var colScale = d3.scaleLinear()
.range(["#ffBF00","#fe6e00", "#8b0000"])
.domain([0, dthExt[1] * 0.2, dthExt[1]]);


dtta.sort(function(a,b) {
  return b.deceased - a.deceased
});
console.log(dtta)
var exs = []
var force = d3.forceSimulation(dtta)
        .force("charge", d3.forceManyBody().strength(5))
        .force("center", d3.forceCenter(wd/2,(ht*0.75)/2))
        .force("collision", d3.forceCollide().radius(function(d) {
          return rScale(d.deceased) + 5
        }))
        .on("tick", ticked);

force.velocityDecay(0.9).alphaDecay(0.005)

function ticked() {

  var u = d3.select("svg")
  .selectAll("circle")
  .data(dtta)

  u.enter()
  .append("circle")
  .attr("id", function (d,i) {return "circle" + i})
  .attr("r", function(d) {

    return rScale(d.deceased)
  })
  .merge(u)
  .attr("cx" , function(d) {
exs.push(d.x)
    return d.x})
  .attr("cy", function(d) {return d.y})
  .attr("fill", function(d){return colScale(d.deceased)})
  .attr("stroke", "red")
  .on("mouseover", function(d,i){

console.log("Y")
var coords = d3.mouse(this)

var txt = d.country
var txt2 = "Deaths: " + d.deceased
var txt3 = "Cases:  " + d.infected
var ex = d3.max([coords[0] - 150,10])
var wy = d3.max([coords[1] - 30,10])
  d3.select("#tooltip")
    						.style("left", ex + "px")
    						.style("top", wy  + "px");
  d3.select("#value1")
    						.text(txt);
  d3.select("#value2")
                .text(txt2);
  d3.select("#value3")
                .text(txt3);



d3.select("#tooltip").classed("hidden", false);
})
.on("mouseout", function() {
d3.select("#tooltip").classed("hidden", true);
})



  u.exit().remove()
}

}); //data
