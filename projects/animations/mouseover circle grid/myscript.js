var wd = window.innerWidth *0.95
var ht = window.innerHeight *0.95

var svg = d3.select("svg")
.attr("width", wd)
.attr("height", ht)
;
/* THIS WORKS GREAT FRO A START.
NEXT BIND THE 'TARGET' DATA INTO THE DATA HELD FOR EACH ONE,
THEN UPDATEALL WITH THE NEW TARGET AS IT MOUSEOVER'S.
THE FILL TRANSITION CAN CALL A HYPONTENUSE FUNCTION TO GET IT'S FILL
SHOULD SAVE DOING THAT RIDICULOUS LOOP */

var cR = 20 //circle radius

var wtarg =  Math.floor(wd/(cR*2.2) )
var htarg =  Math.floor(ht/(cR*2.2) )
var tot = wtarg * htarg
var dtta = []
var dx, dy, hyp, k

var tx = Math.floor(Math.random()*wtarg)
var ty = Math.floor(Math.random()*htarg)
console.log(tx + "  " + ty)

for (i=0;i<wtarg;i++) {
  for (j=0;j<htarg;j++) {
dx = i
dy = j
console.log(Math.floor(htarg/i))
dtta.push(
  {x: dx, y: dy}

)
}
}


//make a max hypotenuse here.

var xMax = d3.max([wtarg - tx,tx - wtarg])
var yMax = d3.max([htarg - ty,ty - htarg])
console.log(wtarg - tx + " " +  tx - wtarg)
console.log(xMax + "  " + yMax)
var hMax= hypoTarg(xMax, yMax,tx,ty)

var colsC = d3.scaleLinear()
.range([0,1])
//.domain([0,hMax]);
.domain([0,wtarg]);

var ysC = d3.scaleLinear()
.range([cR,ht-cR])
.domain([0,htarg]);

var xsC = d3.scaleLinear()
.range([cR,wd-cR])
.domain([0,wtarg]);

  var u = d3.select("svg")
  .selectAll("circle")
  .data(dtta)

  u.enter()
  .append("circle")
  .attr("r", cR)
  .merge(u)
  .attr("cx" , function(d,i) {

    return  xsC(d.x) })
  .attr("cy", function(d,i) {

    return ysC(d.y)
  })
  .attr("fill", function(d,i){
//console.log(d)
    return d3.interpolateRainbow(colsC(hypoTarg(d.x,d.y,tx,ty)))})
    .on("mouseover",function(d) {
//var iD = d3.select(this)
//var ms = iD.split("_")
//var clx = parseInt(ms[0])
//var cly = parseInt(ms[1])
upData(d.x,d.y)

    })

  u.exit().remove()

  function hypoTarg(a,b,ta,tb) {
var zx = d3.max([ta,a]) - d3.min([ta,a])
var zy = d3.max([tb,b]) - d3.min([tb,b])
var hy = Math.sqrt(Math.pow(zx,2) + Math.pow(zy,2))
return hy
  }

//function upData(mx,my) {
//console.log("doing it")
//dtta = []
///  for (i=0;i<wtarg;i++) {
//    for (j=0;j<htarg;j++) {
//  dx = d3.max([mx,j]) - d3.min([mx,j])
//  dy = d3.max([my,i]) - d3.min([my,i])
  //console.log(dx + "  " + dy)
//  hyp = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))
//  dtta.push(hyp)
//}
//}
  //console.log(dtta[k])

function upData(a,b) {
  dx = a
  dy = b
d3.selectAll("circle")
.transition().duration(1000).attr("fill", function(d,i) {
return d3.interpolateRainbow(colsC(hypoTarg(d.x,d.y,a,b)))

})

}
