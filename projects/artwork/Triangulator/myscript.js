const triWid = 30
const gap = 2
const numTris = 20
const pow = 6*Math.pow(Math.random(), 1.5) // the power for the colour interpolator - higher number darker/bluer.


const wd = numTris*(triWid+gap) 
const ht = wd - gap



const svgC = d3.select(".svgHolder").append("svg")
.attr("height", ht)
.attr("width", wd)


//.style("background-color", "#ffe6ee")

const triangleGroup = svgC.append("g")
.attr("class", "triangleGroup")



const spc = triWid+gap
let triData = []

const lineFunction = d3.line()
.x(function(d) { return d.x; })
.y(function(d) { return d.y; })

for (j=0;j<numTris;j++){
  
for (i=0;i<numTris;i++){
  triData.push({x:i*spc + gap, y:j*(spc*2) })
  triData.push({y:j*(spc*2) , x:i*spc+triWid})
  triData.push({x:(i*spc)+(triWid/2), y:triWid*2 + gap + j*(spc*2)})
  triData.push({x:i*spc + gap, y:j*(spc*2) })
  
  
  
  triangleGroup.append("path")
  .attr("d", lineFunction(triData))
  .attr("fill", ()=> {
    return d3.interpolateTurbo(Math.pow(Math.random(), pow))
  })
  
  triData = []
} // i 

} //j

/* POINTING UP LOOPS */

for (j=0;j<numTris;j++){
  
for (i=0;i<numTris+1;i++){
  triData.push({x:i*spc - triWid/2, y:j*(spc*2) + gap + triWid*2})
  triData.push({y:j*(spc*2) + gap + triWid*2, x:i*spc+triWid - triWid/2 -gap})
  triData.push({x:(i*spc)+(triWid/2) - triWid/2, y: j*(spc*2)})
  triData.push({x:i*spc - triWid/2, y:j*(spc*2) + gap + triWid*2})
  
  
  
  triangleGroup.append("path")
  .attr("d", lineFunction(triData))
  .attr("fill", ()=> {
    return d3.interpolateTurbo(Math.pow(Math.random(), pow))
  })
  
  triData = []
} // i 

} //j


