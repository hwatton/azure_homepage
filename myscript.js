d3.select("body").style("background-color", "black")

const col = d3.interpolateRainbow(Math.random())

d3.selectAll(".dropdown-item")
.on("hover", ()=>{

    console.log(d3.select(this).attr("class"))

})


d3.select(".navbar")
.style("border-color", col)

function borderChng() {
  setTimeout(()=>{

let tmpCol = d3.interpolateRainbow(Math.random())

  d3.selectAll(".colourPath")
  .transition()
  .duration(2000)
  .style("border-color", tmpCol)

requestAnimationFrame(borderChng)
}, 2100)

}

borderChng()
