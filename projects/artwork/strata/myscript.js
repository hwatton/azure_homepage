const ht = 500
const wd = 500

//make some strata things


const svgC = d3.select(".container")
.append("svg")
.attr("height", ht)
.attr("width", wd)
.style("background-color", ()=>{return d3.interpolateViridis(Math.random())})





/*
no, lets make a pathn from points along the way.
rules:
paths goes left to right in 100 increments.
x = wd/100
y should go up and down.
if k < threshold, keep going up, else, go down, reset threshold apply inverse rule.
y = last y  + rand()*3 + min increase


other idea, start with an array of 100 x 100
each loop, select a target cell, and x-spread and y-spread
then, an amplitude.

move target cell by amplitude * 1
move cells within x-spread , yspread by hyp/max distance to/from cell * amplitude.
*/
let data = []
for (i=0;i<100;i++) {
  let tmp = []

  for (j=0;j<100;j++) {
  tmp.push([j,i])

}
 tmp.push([100,100])
tmp.push([0,100])
tmp.push([0,0])
data.push(tmp)
}

//console.log(data)
const cycles = 20

for (i=0;i<cycles;i++) {
let tx = Math.floor(Math.random()*100)
let ty = Math.floor(Math.random()*100)
let xSpread = 35 + Math.floor(Math.random()*35) // this is half of the spread <x>

let rFact = 35
let amp = Math.floor((Math.random()*rFact) - (rFact*0.5))
let ySpread = amp + Math.floor(Math.random()*95)



let xSprSize = xSpread*2 + 1
let ySprSize = ySpread*2 + 1

let maxHyp = Math.sqrt(Math.pow(tx - (tx - xSpread -1),2)+Math.pow(ty - (ty - ySpread -1),2))


for (x=0; x<xSprSize;x++) {
  for (y=0; y<ySprSize;y++) {

let xRef = tx - xSpread -1 + x
let yRef = ty - ySpread -1 + y


let hyp = Math.sqrt(Math.pow(tx - xRef,2)+Math.pow(ty - yRef,2))

if (xRef<0 || xRef > 99 || yRef<0 || yRef> 99) {

}else{
  let stVal = data[xRef][yRef][1]
  stVal = stVal - amp*(1 - hyp/maxHyp)

data[xRef][yRef][1] = stVal

} //if
} // y
} // x

} //cycles





console.log(data)
const xScale = d3.scaleLinear()
.range([-10,wd+30])
.domain([0,99])

const yScale = d3.scaleLinear()
.range([ht + 10, -10])
.domain([0,100])


const lineFunc = d3.line()
.x((d)=> {
  return xScale(d[0])})
.y((d)=> {
  return yScale(d[1])})
.curve(d3.curveNatural)

function lin(d) {
  console.log(d)
  return lineFunc(d)
}

for (i=0;i<100;i++) {
  svgC.append("path")
  .attr("d", lineFunc(data[i]))
  .attr("fill", ()=>{
    return d3.interpolateViridis(Math.pow(Math.random(),3))
  })
  .attr("stroke", "black")
  .attr("stroke-width", "0.25px")
}
