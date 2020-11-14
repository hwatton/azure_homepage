const ht = 500
const wd = 500

const svgC = d3.select(".container")
.append("svg")
.attr("viewBox", "0 0 " + wd + " " + ht )
.attr("preserveAspectRatio", "xMinYMin meet")
.style("background-color", "#001515")

const lineFunc = d3.line()
.x((d)=> { return d.x})
.y((d)=> { return d.y})

const lineGroup = svgC.append("g")

const lineNum = 2500
const lineSize = 5 // this has rnd(10) added to it
let target_x = wd/3 + Math.random()*wd/3
let target_y = ht/3 + Math.random()*ht/3



const colourFunc = d3.scaleLinear()
.range(["white", "orange", "red", "magenta"])
.domain([0,0.2,0.5,1])

let maxDist = getMaxDist(ht, wd, target_x, target_y)

for (i=0;i<lineNum;i++) {

let x1 = Math.random()*wd

let y1 = Math.random()*ht

let dist = Math.sqrt(Math.pow(x1 - target_x, 2) + Math.pow(y1 -target_y,2))

ang = ((dist / maxDist)*180) -90
console.log(ang)
let x2 = x1 + Math.sin(ang)*(dist)
let y2 = y1 + Math.cos(ang)*(dist)

let lineData = [
  {"x":x1, "y":y1},
  {"x":x2, "y":y2}
]

  lineGroup.append("path")
  .attr("class", "line")
  .attr("d", lineFunc(lineData))
  .attr("fill", "none")
  .style("stroke", ()=> {
    return colourFunc(dist/maxDist)
  })
  //.attr("transform", "rotate(10)")
  //.style("transform-origin", trStr)

}

function getMaxDist(height, width, x, y) {

let one = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
let two = Math.sqrt(Math.pow((width-x), 2) + Math.pow(y, 2))
let three = Math.sqrt(Math.pow((width-x), 2) + Math.pow((height-y), 2))
let four = Math.sqrt(Math.pow(x, 2) + Math.pow(height-y, 2))

let mX = d3.max([one, two, three, four])

  return mX
}
