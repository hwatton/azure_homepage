// this is good but try making one where
//it transitions() after each i maybe,m the effect will
//be continuous....


const ht = 600
const wd = 600

const lineNum = 2900

const svgC = d3.select(".container")
.append("svg")
.attr("viewBox", "0 0 " + wd + " " + ht )
.attr("preserveAspectRatio", "xMinYMin meet")
.style("background-color", "#001515")
 //on click

const lineFunc = d3.line()
.x((d)=> { return d.x})
.y((d)=> { return d.y})

const lineGroup = svgC.append("g")


const lineSize = 15 // this has rnd(10) added to it
let target_x = Math.random()*wd
let target_y = Math.random()*ht



console.log(target_x + " " + target_y)


const colourFunc = d3.scaleLinear()
.range(["green","yellow", "orange", "red", "magenta", "purple"])
.domain([0,0.15,0.3,0.5,0.75,1])

let maxDist = getMaxDist(ht, wd, target_x, target_y)



for (i=0;i<lineNum;i++) {

let targetData = [{"x": target_x, "y":target_y,"rx":(Math.random()*(wd*1.2)) - (wd*0.1), "ry":(Math.random()*(ht*1.2)) - (ht*0.1)}]
let tmp = "path_" + i

  let path = lineGroup.selectAll(tmp)
  .data(targetData)
  .enter()

  path.append("path")
  .attr("class", "line")
  .attr("id", tmp)
  .attr("d", function(d) {


    return getLineData(d.x, d.y, d.rx, d.ry)})
  .attr("fill", "none")
  .style("stroke", ()=> {
    return colourFunc(Math.random())
    //return "white"
  })
  .style("stroke-width", "2px")
  //.attr("transform", "rotate(10)")
  //.style("transform-origin", trStr)

}




function newData() {

console.log("cycle")
setTimeout(function() {

  target_x = Math.random()*wd
  target_y = Math.random()*ht

for (i=0;i<lineNum;i++) {

  let str = "#path_" + i
  let dt = d3.select(str)
  .data()

let clickedData = [
  {"x": target_x,
  "y":target_y,
  "rx":dt[0].rx,
  "ry":dt[0].ry}
]
//console.log(clickedData)
let thisPath = d3.select(str)

thisPath
.data(clickedData)
.enter()

thisPath.transition()
.duration(3000)
.attr("d", function(d) {

  return getLineData(d.x, d.y, d.rx, d.ry)})



} //for i
requestAnimationFrame(newData)
}, 2500)




} //newData

requestAnimationFrame(newData)

function pythag(x,y) {

return Math.sqrt(x*x + y*y)
}

function getMaxDist(height, width, x, y) {

let one = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
let two = Math.sqrt(Math.pow((width-x), 2) + Math.pow(y, 2))
let three = Math.sqrt(Math.pow((width-x), 2) + Math.pow((height-y), 2))
let four = Math.sqrt(Math.pow(x, 2) + Math.pow(height-y, 2))

let mX = d3.max([one, two, three, four])

  return mX
}



function getLineData(tx,ty, x1, y1) {


let xDist = tx - x1
let yDist = ty - y1

let diagonalDistance = pythag(xDist, yDist)
let mxDist = getMaxDist(ht,wd,tx,ty)

let angle = (diagonalDistance/mxDist) * 5 + (0.2*(Math.random()*2-1))
let siZe = (lineSize + Math.random()*10) // hypotenuse of triangle

let x2 = x1 + Math.sin(angle) * siZe
let y2 = y1 + Math.cos(angle) * siZe

let lineData = [
  {"x":x1, "y":y1},
  {"x":x2, "y":y2}
]
//console.log(lineData)


return lineFunc(lineData)
}
