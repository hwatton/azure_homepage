const ht = 500
const wd = 500

const svgC = d3.select(".container")
.append("svg")
.attr("viewBox", "0 0 " + wd + " " + ht )
.attr("preserveAspectRatio", "xMinYMin meet")

const lineGroup = svgC.append("g")
const numLines = 50
const lineGap = (ht*0.95)/numLines

const lineFunc = d3.line()
.x((d)=> { return d.x})
.y((d)=> { return d.y})
.curve(d3.curveLinear)

const linePoints = 25
const randPoint = 1 //+ Math.floor(Math.random()*linePoints)
console.log(randPoint)

d3.select(".container")
.style("background-color", ()=>{return d3.interpolateTurbo(0)})

let yMax = (5 + (numLines * lineGap)) + (10*Math.floor((linePoints + 1)/randPoint) - 20*Math.floor((linePoints + 1)/(randPoint*2))) * (numLines + 1)
let yMin = 0

const yScale = d3.scaleLinear()
.range([5, ht-5])
.domain([0, yMax])

for (i=0;i<numLines;i++) {

let points= []



for (j=0;j<linePoints + 1;j++) {
//generate line points
  let x = j * wd/linePoints
  let y = (5 + (i * lineGap))
//console.log(Math.floor(j/randPoint))
y = y + (10*Math.floor(j/randPoint) - 20*Math.floor(j/(randPoint*2))) * (i + 1)
points.push({"x": x, "y": yScale(y)})
}


  lineGroup.append("path")
  .attr("d", lineFunc(points))
  .attr("fill", "none")
  .style("stroke", function() {return d3.interpolateTurbo((i+1)/numLines)})
  .style("stroke-width", 25)
}
