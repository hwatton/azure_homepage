const ht = 650
const wd = 800

const svgC = d3.select(".container")
.append("svg")
.attr("height", ht)
.attr("width", wd)

const colRange = d3.scaleLinear()
.domain([0,1/6,2/6,3/6,4/6,5/6,1])
.range(["#ff0000","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#ff0000"])

const lineObj = d3.line()
.x(d=> d.x)
.y(d=> d.y)

const xScale = d3.scaleLinear()
.domain([0,500])
.range([10, 900])

//bottom row of xPoints
let rPoints = [0]
for (i=0;i<9;i++) {
rPoints.push(Math.floor(Math.random()*800))
}
rPoints.push(800)

console.log(rPoints)
rPoints.sort(function(a,b) {return a-b})
console.log(rPoints)
let xPointsBottom = []
let rT = 0
for (i=0;i<10;i++) {
  let size = rPoints[i+1] - rPoints[i]
  
  let gap = size/80

  console.log(gap)
  for (j=0;j<80;j++) {
    rT = rT + (gap)
    xPointsBottom.push(rT)
  }
}

//top row of xPoints
rPoints = [0]
for (i=0;i<9;i++) {
rPoints.push(Math.floor(Math.random()*800))
}
rPoints.push(800)

console.log(rPoints)
rPoints.sort(function(a,b) {return a-b})
console.log(rPoints)
let xPointsTop = []
rT = 0
for (i=0;i<10;i++) {
  let size = rPoints[i+1] - rPoints[i]
  
  let gap = size/80

  console.log(gap)
  for (j=0;j<80;j++) {
    rT = rT + (gap)
    xPointsTop.push(rT)
  }
}




console.log(xPointsBottom)

for (i=0;i<800;i++) {
  let arr = []
arr.push({x:xPointsTop[i], y:650})
arr.push({x:xPointsBottom[i], y:200 + Math.abs(-400 + i)}) 

svgC.append("path")
.attr("d", lineObj(arr))
.attr("fill", "none")
.style("stroke", ()=>{return colRange(i/500)})
.style("stroke-width", "4px")
.style("stroke-linecap", "round")
.style("stroke-opacity", "0.2")

}




   

     






  


