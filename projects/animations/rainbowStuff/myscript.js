const svgC = d3.select(".container")
.append("svg")
.attr("height", 400)
.attr("width", 600)

for (i=0;i<200;i++) {

  svgC.append("rect")
  .attr("id", ()=> {return "rect_" + i})
  .attr("height", 400)
  .attr("width", 3)
  .attr("x", ()=> { return i*3})
  .attr("y", 0)
  .attr("fill", ()=> {
    return d3.interpolateRainbow(Math.random())
  })
}

flicker()

function flicker() {
  setTimeout( function() {
let rnd = Math.floor(Math.random()*200)
let rndText = "#rect_" + rnd
  d3.select(rndText).transition()
  .duration(1500)
  .attr("fill", ()=> {
    return d3.interpolateRainbow(Math.random())
  })

  requestAnimationFrame(flicker)}, 200)

}
