const ht = 450
const wd = 450

const svgC = d3.select(".container")
.append("svg")
.attr("class", "svgHolder")
.attr("height", ht)
.attr("width", wd)


console.log("do some stuff")

//todo//
// make a point array generator 
//  >make a loop shape/path
//  >make a series of lines parallel/relative to a f(x)

const lineFuncBasis = d3.line()
.x((d)=>{return d[0]})
.y((d)=>{return d[1]})
.curve(d3.curveBasis)

const lineFuncLinear = d3.line()
.x((d)=>{return d[0]})
.y((d)=>{return d[1]})

let cols = [
["#00140e","#00573a","rgb(0, 74, 87)","rgb(0, 129, 108)","rgb(226, 109, 0)","#de9b00"],
["#ff934f","#c2e812","#91f5ad","#ffffff","#bfcbc2"],
["#0e0004","#31081f","#6b0f1a","#b91372","#fa198b", "#FABC2A"],
["#ffbe0b","#fb5607","#ff006e","#8338ec","#3a86ff"],
["#293132","#474044","#4f5165","#547aa5","#50d8d7"]
]

let colArray = cols[Math.floor(Math.random()*cols.length)]

let tL = colArray.length

let ticks = d3.scaleLinear()
.ticks(tL)

console.log(ticks)


const colourScale = d3.scaleLinear()
.domain(ticks)
.range(colArray)


let thingGroup = svgC.append("g")

const xScale = d3.scaleLinear()
.domain([0,1])
.range([(0-wd/2), (wd/2 + wd)])

const yScale = d3.scaleLinear()
.domain([0,1])
.range([(0-ht/2), (ht/2 + ht)])


svgC
.style("background-color", ()=>{
  return darkerColour(colourScale(Math.random()))
})

let locations = []

let spread = 15


for (let i = 0; i < spread; i++) {
  for (let j = 0; j < spread; j++) {

  let xVal = i/spread
  let hVal = j/spread
  
  let x = xScale(xVal)
  let y = yScale(hVal)

locations.push({x:x,y:y})

  }//j
}//i

let thingRotation = Math.random()*360

thingGroup
.style("transform-origin", "center")
.attr("transform", "rotate(" + thingRotation + ")")



for (let i = 0; i < locations.length; i++) {
 
  let x = locations[i].x
  let y = locations[i].y
  let angle = 120 + Math.random()*20
  //let angle = 180

  let tranString = "translate(" + x + ", " + y + ") rotate(" + angle + ")"
  let thisPath = pathGenerator()
  let thisId = "id_" + i
  let thisGroup = thingGroup.append("g")
  let thisCol = colourScale(Math.pow(Math.random(),5))

   //make the bottom fill 
thisGroup.append("path")
.attr("d", lineFuncBasis(thisPath.loop))
.attr("class", "backFill")
.attr("fill", "white")


  //make the clip-path

  thisGroup.append("clipPath")
.attr("id", thisId)
.append("path")
.attr("d", lineFuncBasis(thisPath.loop))
.attr("class", "loop")




let thisUrl = "url(#" + thisId + ")"

//make some Lines

let lineArray = thisPath.lines


for (let j = 0; j < lineArray.length; j++) {

  thisGroup.append("path")
.attr("d", lineFuncLinear(lineArray[j]))
.attr("clip-path", thisUrl)
.attr("class", "line")
.attr("fill", "none")
.style("stroke", thisCol)

}

 //make the top loop 
thisGroup.append("path")
.attr("d", lineFuncBasis(thisPath.loop))
.attr("class", "loop")
.attr("fill", "none")
.style("stroke", thisCol)

thisGroup.attr("transform", tranString)


}



//point testing

function darkerColour(colour) {

  let colArr = colour.split(",")
  
  let r = parseInt(colArr[0].substring(4))
  let g = parseInt(colArr[1])
  let b = parseInt(colArr[2])

  let darkener = 0.6

  r = d3.max([0, r * darkener])
  g = d3.max([0, g * darkener])
  b = d3.max([0, b * darkener])

  let rgb = "rgb(" + r + ", " + g + ", " + b + ")"
  console.log(colour)
  console.log(rgb)
  return rgb
}



//***********   POINT GENERATOR  **********//
//make tiles pointing down
//set tile area 30 x 50
function pathGenerator(){
  let h = 100
  let w = 70
  let mvm = Math.random()*50 - 25

let loop_points = [
  [(w/2) + mvm,0],
  [w, h*0.7],
  [w/2, h],
  [0, h*0.7],
  [(w/2) + mvm ,0]
]

let line_points = []
let x = 0
let div = 3
for (let i = 0; i < w/div; i++) {
  x = x + div
  let line = [
    [x , 0],
    [x, h]
  ]  
  line_points.push(line)
}

return {
  loop: loop_points, 
  lines: line_points,
  width: w, 
  height: h
}

}

