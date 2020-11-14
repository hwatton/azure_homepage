//now all working again.
//try spacing out all the planets with an equal gap.
//use rScale to create a d.x key:value that describs the new cx attribute

var wd = window.innerWidth -20
var ht = window.innerHeight -20

var bckCol = "white"
d3.select("body")
.style("background-color", function() {return bckCol})

svgCont = d3.select("body").append("svg")
.attr("height", ht)
.attr("width", wd);
var target = 30
var sqX = Math.floor(wd/(target+target/10))
var sqY = Math.floor(ht/(target+target/10))
var myCol = d3.scaleLinear()
.range(["#518eff","#bf00ff","#0e7c61","#008000","#39ff14","#aaff00","yellow","orange","red"])
.domain([0,25,55,200,770,860,925,975,1000]);
//domain is 1000 max
function jeepers(x,y) {
  if(k > 15) {
var rx = Math.floor(Math.random()*x)
var ry = Math.floor(Math.random()*y)
var id = "r" + rx + "_" + ry
//console.log(id)
d3.select("."+id).transition().attr("fill",function(){

//return '#'+Math.floor(Math.random()*16777215).toString(16)
var colin = Math.floor(Math.random()*1000)
return myCol(colin)
}).duration(2000);
}
 else {
  k=k+1
  console.log(k)
};
}

console.log(sqX + "  " + sqY)

for (i=0; i<sqX; i++){
for (j=0; j<sqY; j++){
svgCont.append("rect")
.attr("class", function(){
  return "r" + i + "_" + j})
.attr("height", function() {return target})
.attr("width", function() {return target})
.attr("x", function() {return i*(target + target/10)})
.attr("y", function() {return j*(target + target/10)})
.attr("fill",function() {
  var colin = Math.floor(Math.random()*1000)
  return myCol(colin)
  //return bckCol
});
}
}
let k = 0
setInterval(function(){jeepers(sqX,sqY)}, 40);







 var id = "r2_4"
