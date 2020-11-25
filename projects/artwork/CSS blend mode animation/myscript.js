
const ht = 500 //minimum resolution/width
const wd = 500 //minimum resolution/width - mobile layout will be dfficult (but not impossible!) - maybe smaller grid.
const fontHeight = ht / 40


/* Note: mpst of this is outdated. I need to crack through it to sort useful from extraneous*/

/*const colOptions = [
  {id: "blue", string: "rgba(0,0,255)", url:"url(#blueGradient)"},
  {id: "green", string: "rgba(0,255,0)", url:"url(#greenGradient)"},
  {id: "red", string: "rgba(255,0,0)", url: "url(#redGradient)"}
]
*/
const svg = d3.select(".svgHolder").append("svg")
.attr("class", "gameSVG")
//.attr("height",ht)
//.attr("width", wd)
.attr("viewBox", "0 0 500 500")
.attr("preserveAspectRatio", "xMinYMin meet")
.style("width", "90%")
.style("max-width", "550px")


const left = {x: wd/4, y: ht/2}
const right = {x: wd*0.75, y: ht/2}
const numLines = 150


    
const lineFunc = d3.line()
.x((d)=>{return d.x})
.y((d)=>{return d.y})

const lineGroup = svg.append("g")
const circleGroupOne = svg.append("g")
const circleGroupTwo = svg.append("g")

const colours = [
  "black",
  "blue",
  "magenta",
  "red",
  "yellow",
  "white",
  "green",
  "cyan"

]
const colRange = d3.ticks(0,1,colours.length)
console.log(colRange)
const colourScale = d3.scaleLinear()
.range(colRange)
.domain(colours)

let cols = [
  "rgb(255,0,0)", 
  "rgb(0,255,0)",
  "rgb(0,0,255)"
]

let circleCols = [
  "rgb(75,0,0)", 
  "rgb(0,75,0)",
  "rgb(0,0,75)"
]

let k = 0

for (i=0; i<numLines; i++) {

  let lines = []
  lines.push(
    {x: 0, y: ht * (i/numLines)},
    {x: wd, y: ht * (i/numLines)}
    )

  lineGroup.append("path")
  .attr("class", "thing")
  .attr("d", lineFunc(lines))
  .attr("fill", "none")
  .style("stroke",()=>{
  //why isn't the custom range working?
    return circleCols[k]
  })
  .style("stroke-width", "8px")

  if (k >= 2) {
    k = 0
  }else{
    k++
  }

}



///


let dataset = []
  let cx = wd/2
  let cy = ht/2
  let rad = d3.min([(ht/2)-20, (wd/2)-20])
  let rad_two = Math.random()*(rad*0.3)
  let circleRad = rad * 0.3
  let radius = rad *0.5
  let up = true

  let circles = []

  for (i=0;i<3;i++){

    let x = cx + circleRad * Math.cos(2 * Math.PI * i / 3);
    let y = cy + circleRad * Math.sin(2 * Math.PI * i / 3);

    circles.push({cx:x, cy:y, r:radius, col:cols[i]})


  }

  for (i=0;i<100;i++){

  if (up) {
    let x = cx + rad * Math.cos(2 * Math.PI * i / 100);
    let y = cy + rad * Math.sin(2 * Math.PI * i / 100);

    let x2 = cx + rad_two * Math.cos(2 * Math.PI * (i+1) / 100);
    let y2 = cy + rad_two * Math.sin(2 * Math.PI * (i+1) / 100);

up = !up
    dataset.push([{x: x, y:y},{x: x2, y:y2}])
  }else{
    let x = cx + rad_two * Math.cos(2 * Math.PI * i / 100);
    let y = cy + rad_two * Math.sin(2 * Math.PI * i / 100);

    let x2 = cx + rad * Math.cos(2 * Math.PI * (i+1) / 100);
    let y2 = cy + rad * Math.sin(2 * Math.PI * (i+1) / 100);

up = !up
    dataset.push([{x: x, y:y},{x: x2, y:y2}])

  }
  }

  let cirs = circleGroupOne.selectAll("circle")
  .data(circles)
  .enter()

  cirs.append("circle")
  .attr("class", "thing spinnerCW")
  .attr("cx", d=> d.cx)
  .attr("cy", d=> d.cy)
  .attr("r", d=> d.r)
  .attr("fill", d=> d.col)






/* 

  for (i=0; i<dataset.length; i++) {

  
    circleGroupOne.append("path")
    .attr("class", "thing spinnerCW")
    .attr("d", lineFunc(dataset[i]))
    .attr("fill", "none")
    .style("stroke","rgb(255, 0, 0)")
    .style("stroke-width", "3px")
  
  }

  for (i=0; i<dataset.length; i++) {

  
    circleGroupTwo.append("path")
    .attr("class", "thing spinner")
    .attr("d", lineFunc(dataset[i]))
    .attr("fill", "none")
    .style("stroke","rgb(0, 255, 0)")
    .style("stroke-width", "3px")
  
  }

 */

