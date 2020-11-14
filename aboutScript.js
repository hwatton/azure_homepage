function ladyBird(){

let x = true

const actualHeight = window.innerHeight
const actualWidth = window.innerWidth
let step = 0

const legData = [[
  [[9,10],[5,3]],
  [[10,10],[10,2]],
  [[11,10],[15,3]],
  [[9,10],[5,17]],
  [[10,10],[10,18]],
  [[11,10],[15,17]]
],

[
  [[9,10],[6,3]], //forward
  [[10,10],[9,2]], //back
  [[11,10],[16,3]], //forward
  [[9,10],[4,17]], //back
  [[10,10],[11,18]], //forward
  [[11,10],[14,17]] //back
],

[
  [[9,10],[5,3]],
  [[10,10],[10,2]],
  [[11,10],[15,3]],
  [[9,10],[5,17]],
  [[10,10],[10,18]],
  [[11,10],[15,17]]
],

[
  [[9,10],[4,3]], //back
  [[10,10],[11,2]],  //forward
  [[11,10],[14,3]],  //back
  [[9,10],[6,17]],  //forward
  [[10,10],[9,18]],  //back
  [[11,10],[16,17]]  //forward
]]

const lineFunc = d3.line()
.x((d)=> { return d[0]})
.y((d)=> { return d[1]})
.curve(d3.curveLinear)

const hypMax = Math.sqrt(Math.pow(actualHeight,2)*Math.pow(actualWidth,2))

const svgC = d3.select(".backSvg")
.attr("height", actualHeight)
.attr("width", actualWidth)


let bubbleGroup = svgC.append("g")
.attr("class", "bubbleGroup")
// ladybird path drawing
//curly path for ladybirdFace

function spacer(limit, points2, loopvariable) {

  let points = [Math.random()*actualWidth, Math.random()*actualHeight]
let one = Math.abs(points[0] - points2[0])
let two = Math.abs(points[1] - points2[1])


if (one > limit && two > limit) {
  return points
}else{
  spacer(50, points2, loopvariable)
}


}
let tmpArray = []

let lbPath = [[-15,Math.random()*actualHeight]]
for (i=0;i<53;i++) {
tmpArray = spacer(50, lbPath[0], i)

if (typeof tmpArray !== 'undefined'){

  lbPath.push(tmpArray)
}
}

lbPath.push([actualWidth+10, Math.random()*actualHeight])


const pathLineFunc = d3.line()
.x((d)=> {
  return d[0]})
.y((d)=> { return d[1]})
.curve(d3.curveBundle.beta(0.9))

const ladybirdPathGoup = svgC.append("g")
.attr("id", "ladybirdPathGoup")

const lPath = ladybirdPathGoup.append("path")
.attr("d", pathLineFunc(lbPath))
.attr("fill", "none")
.style("stroke", "none")
.style("stroke-width", "2px")

//ladybird, centre @ 10,10
//ladybird legs

const ladybirdGroup = svgC.append("g")
.attr("id", "lGroup")
.attr("transform", "translate(0, 0) rotate(0)")
.style("transform-origin", "10px 10px")

const legGroup = ladybirdGroup.append("g")
let legsies = legGroup.selectAll("path")
.data(legData[0])
.enter()

legsies.append("path")
.attr("id", (d,i) => {

  return "legs_" + i})
.attr("d", (d)=> { return lineFunc(d)})
.attr("fill", "none")
.style("stroke", "white")
.style("stroke-width", "0.5px")


//ladybird back
const dfs = ladybirdGroup.append("defs")
const rG = dfs.append("radialGradient")
.attr("id", "ladybird")
.attr("cx", "50%")
.attr("cy", "50%")
.attr("r", "50%")
.attr("fx", "50%")
.attr("fy", "50%")

rG.append("stop")
.attr("offset", "0%")
.style("stop-color", "rgb(255,50,0)")
.style("stop-opacity", "1")

rG.append("stop")
.attr("offset", "100%")
.style("stop-color", "rgb(200,50,0)")
.style("stop-opacity", "1")

ladybirdGroup.append("ellipse")
.attr("cx", 10)
.attr("cy", 10)
.attr("rx", 7)
.attr("ry", 6)
.attr("fill", "url(#ladybird)")

ladybirdGroup.append("clipPath")
.attr("id", "ladybirdFace")
.append("circle")
.attr("cx", 18)
.attr("cy", 10)
.attr("r", 6)

ladybirdGroup.append("ellipse")
.attr("clip-path", "url(#ladybirdFace)")
.attr("cx", 10)
.attr("cy", 10)
.attr("rx", 7)
.attr("ry", 6)
.attr("fill", "black")

//ladybird spots
const spots = [
  {"cx":11, "cy":10, "r":1.3},
  {"cx":10, "cy":5.5, "r":0.8},
  {"cx":10, "cy":14.5, "r":0.8},
  {"cx":8.8, "cy":8.5, "r":1},
  {"cx":8.8, "cy":11.5, "r":1},
  {"cx":5 ,"cy":7.5, "r":1},
  {"cx":5 ,"cy":12.5, "r":1}
]

let spotGroup = ladybirdGroup.append("g")
let spot = spotGroup.selectAll("circle")
  .data(spots)
  .enter()

  spot.append("circle")
  .attr("cx", (d)=>{return d.cx})
  .attr("cy", (d)=>{return d.cy})
  .attr("r", (d)=>{return d.r})

//white bits on ladybirdFace
spotGroup.append("circle")
.attr("cx", 16)
.attr("cy", 8)
.attr("r", 1.2)
.attr("fill", "white")

spotGroup.append("circle")
.attr("cx", 16)
.attr("cy", 12)
.attr("r", 1.2)
.attr("fill", "white")

//outline

ladybirdGroup.append("ellipse")
.attr("cx", 10)
.attr("cy", 10)
.attr("rx", 7)
.attr("ry", 6)
.attr("fill", "none")
.style("stroke", "black")
.style("stroke-width", "0.3px")

function walk() {

  setTimeout(function() {
step = upToThree(step)
let newData = legData[step]

for (j=0;j<6;j++) {

  let dt = d3.select("#legs_" + j)
  .data([newData[j]])
  .enter()

d3.select("#legs_" + j).transition()
.duration(20)
.attr("d", (d,i)=>{

  return lineFunc(d)});
}

requestAnimationFrame(walk)}, 50)

}


function upToThree(num) {

  if (num + 1 > 3) {
    return 0
  }else{
    return num + 1
  }
}

function translateAlong(path) { // this function, partly found on stackOF I think, lost the reference!
  let l = path.getTotalLength();

  return function(d, i, a) {
    return function(t) {
      let p = path.getPointAtLength(t * l);

let len = path.getTotalLength();
let point1 = path.getPointAtLength(t * len - 0.1);
let point2 = path.getPointAtLength(t * len + 0.1);
let vector = { x: point2.x - point1.x, y: point2.y - point1.y }
let magnitude = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
vector.x /= magnitude;
vector.y /= magnitude;

let retVal = {p: point1, v: vector }

let adj = point2.x - point1.x
let opp = point2.y - point1.y

let ang = Math.atan2(opp,adj)
ang = ang*180/Math.PI

let perp = rotate2d(retVal.v, 90)

      return "translate(" + p.x + "," + p.y + ") rotate(" + ang + ")";
    };
  };
}

function rotate2d(vector, angle) {
  //rotate a vector
  angle *= Math.PI/180; //convert to radians
  return {
    x: vector.x * Math.cos(angle) - vector.y * Math.sin(angle),
    y: vector.x * Math.sin(angle) + vector.y * Math.cos(angle)
  }
}

function transition() {
  let ld = d3.select("#lGroup")

  ld.transition()
      .duration(130000)
  .ease(d3.easeLinear)
      .attrTween("transform", translateAlong(lPath.node()))
      .on("end", transition);
    }

    transition()
    walk()

  }

  ladyBird()


let idCount = 0
  function ladyBubbles() {

setTimeout(()=>{

let tmp = d3.select("#lGroup").attr("transform")
let id = "id_" + idCount
let newPoints = tmp.split("(")[1].split(")")[0].split(",")
let time = 10000 + Math.random()*5000
d3.select(".bubbleGroup").append("circle")
.attr("id", id)
.attr("cx", (10 + Math.random()*50 - 25 + parseFloat(newPoints[0])))
.attr("cy", (10 + Math.random()*50 - 25 + parseFloat(newPoints[1])))
.attr("r", 0)
.attr("fill", "none")
.style("stroke", ()=>{return d3.interpolateRainbow(Math.random())})
.style("stroke-width", "0.5px")
.transition()
.duration(15000)
.ease(d3.easeCubicIn)
.attr("r", 160)
.style("stroke-opacity", "0")
.on("end", ()=>{
let idInFlux = "#" + id
  d3.select(idInFlux).remove()})

idCount++

  requestAnimationFrame(ladyBubbles)
}, 200)
  }

  ladyBubbles()
