const ht = 500
const wd = 500
//d3.select("body").style("background-color", "black")

const svgC = d3.select(".container")
.append("svg")
.attr("height", ht)
.attr("width", wd)

svgC.append("rect")
.attr("height", ht)
.attr("width", wd)
.attr("fill", "#000807")

const myCol = d3.scaleLinear()
.range(["white", "turquoise", "blue", "purple", "magenta", "red", "orange"])
.domain([0, 0.25, 0.6, 0.75, 0.95,  0.96,0.98  ,1])

const lineGroup = svgC.append("g")

const lineFunc = d3.line()
.x((d)=>{return d.x})
.y((d)=> {return d.y})

const mX = Math.random()*wd/2 + wd/4

for (i=0;i<6250;i++) {
let rX = Math.random()*(wd + 100) - 50
let rY = Math.random()*(ht + 100) - 50
let rX2 = rX + 5 + Math.random()*15
let tmpPath = [
  {"x": rX, "y": rY},
    {"x": rX2 , "y": rY + angler(rX2 - rX, mX)}
]

  lineGroup.append("path")
  .attr("d", lineFunc(tmpPath))
  .attr("fill", "none")
  .style("stroke", ()=>{
    return myCol(Math.random())
  })
  .style("stroke-width", "2px")
}

console.log(svgC)

function angler(y, x) {

  let tmp = Math.pow(y, 0 + Math.random())
 return tmp


}
