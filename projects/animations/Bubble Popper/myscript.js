var wd = window.innerWidth*0.98
var ht = window.innerHeight*0.95

d3.select("body")
.style("background-color", "black")

setTimeout(function(){
	d3.select(".note").transition().duration(4500).style("color", "black").on("end", function() {
		d3.select(".note").remove()
	})
},2000)

svgCont = d3.select("body").append("svg")
.attr("height", ht)
.attr("width", wd);


var curve = d3.line().curve(d3.curveNatural)
var colScale = d3.scaleLinear()
.range(["#9acd32","#99FF00","#33CC00"])
.domain([0,50,100])

function translateAlong(path) {
  var l = path.getTotalLength();

  return function(d, i, a) {
    return function(t) {
      var p = path.getPointAtLength(t * l);

      return "translate(" + p.x + "," + p.y + ")";
    };
  };
}

var fps = 3

function drawbubs() {

setTimeout(function(){
var bubz = bubblePath2()
var exis = bubz[0]

var path = svgCont
.append("path")
.attr("d", curve(bubz))
.attr("fill", "none");
var radius = 10 + Math.floor(Math.random()*60)
var col = colScale(Math.floor(Math.random()*100))

var bubble = svgCont.append("circle")
.data([{col:col}])
.attr("r", function() {return radius})
.attr("cx", function() {return 0})
.attr("cy", function() {return 0})
.attr("stroke", col)
.attr("fill","black")
.on("mouseover", function(d,i){

 var tt = d3.select(this).attr("transform")
  var tr = d3.select(this).attr("r")
  var tts = tt.substring(10,100)
  tt = tts.substring(0,tts.length-1)
  tt = tt.split(",")
  tr = parseInt(tr)
  var tx = parseInt(tt[0])
  var ty = parseInt(tt[1])
  var stz = Math.floor(Math.random()*7) + 5
 
  drawStarburst(stz,tx,ty,tr,d.col)

  d3.select(this)
  .remove();

});

function transition() {
  bubble.transition()
      .duration(15000)
      .attrTween("transform", translateAlong(path.node()))
      .on("end", transition);
    }

transition()

requestAnimationFrame(drawbubs);
}, 900)
};

requestAnimationFrame(drawbubs)

function bubblePath2(){
  var stX = -wd/8 + Math.floor(Math.random()*(wd + wd/8))
  var stY = ht + 70
  var endX = stX + Math.floor(Math.random()*wd/8)
  var endY = -250
  var midX1 = stX + (endX - stX)/2 + ((Math.round(Math.random()) * 2 - 1) * 50)
  var midY1 = ht*0.7 + ((Math.round(Math.random()) * 2 - 1) * 50)
  var midX2 = stX + (endX - stX)/2 + ((Math.round(Math.random()) * 2 - 1) * 50)
  var midY2 = ht*0.25 + ((Math.round(Math.random()) * 2 - 1) * 50)

  return  [[stX,stY],[midX1,midY1],[midX2,midY2],[endX,endY]]
}

var drawLine = d3.line()  //add this outside the function if preferable
                        .x(function(d) { return d.x })
                        .y(function(d) { return d.y });

function drawStarburst(stars,cx,cy,r,color) {
  
  var burstLength = 5
  for (i=0;i<stars;i++) {
    var lineData = [ { "x": cx - r,   "y": cy -r},  { "x": cx - burstLength -r,  "y": cy - burstLength -r}]
    
    svgCont.append("path")
    .attr("d",drawLine(lineData))
    .attr("stroke", color)
    .attr("stroke-weight",20)
    .attr("transform","rotate (" + i*(360/stars) + " " + cx + " " + cy + ")")
    .transition()
    .duration(350)
    .attr("d", drawLine([{ "x": cx - 2*burstLength - r,   "y": cy - 2*burstLength - r},  { "x": cx - 2*burstLength -r,  "y": cy - 2*burstLength -r}]))
    .remove()
 

    
  }
  
  
}

