const ht = window.innerHeight * 0.9
const wd = window.innerWidth * 0.9
d3.select("body").style("background-color", ()=>{
  return d3.interpolateInferno(0)
})

const svgC = d3.select(".container")
.append("svg")
.attr("height", ht)
.attr("width", wd)


let circle_data = []
let size = 125
const xScale = d3.scaleLinear()
.range([0, (wd/2) * 0.95])
.domain([0, size-1])

const yScale = d3.scaleLinear()
.range([0, (ht/5) * 0.7])
.domain([0, size-1])

const yTransScale = d3.scaleLinear()
.range([0, 5])
.domain([0,size ])



for(i=0;i<size;i++) {

let sin = Math.sin(i/(size-1))
console.log(sin)
let obj = {"rx": xScale(i), "ry": yScale(i), "pos": yTransScale(i), "index": i}
  circle_data.push(obj)

}
console.log(circle_data)

const circleGroup = svgC.append("g")

let ellipses = circleGroup.selectAll("ellipse")
.data(circle_data)
.enter()

ellipses.append("ellipse")
.attr("id", (d,i)=> {return "id_" + i})
.attr("rx", (d,i)=>{return d.rx})
.attr("ry", (d,i)=>{return d.ry})
.attr("cx", 0)
.attr("cy", (d,i)=> { return  d.pos})
.attr("transform", (d,i)=>{
  return "translate(" + wd/2 + " " + /*(ht/2 + d.pos)*/ ht*0.52  + ")" })
.attr("fill", "none")
.style("stroke", (d,i)=>{
  return d3.interpolateInferno(1 - (i/(size-1)))
  //"blue"
})
.style("animation-name", "sinWobble")
.style("animation-duration", "20s")
.style("animation-delay", (d,i)=>{
  return (i)/24 + "s"
})
.style("animation-iteration-count", "infinite")
//.style("animation-timing-function", "linear")
.style("stroke-width", "8px")
.style("stroke-opacity", "100%")
