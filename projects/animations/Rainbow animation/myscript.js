const ht = window.innerHeight
const wd = window.innerWidth * 0.8

const svgC = d3.select(".container")
.append("svg")
.attr("height", ht)
.attr("width", wd)

d3.select("body")
.style("background-color", "black")

const dNum = []
const cirNum = 200
let k = 0
for (i=0;i<cirNum;i++) {
  dNum.push(k)
  k = betweenOne(k)
}
const pad = 50
let circle = svgC.selectAll("rect")
.data(dNum)
.enter()
.append("rect")
.attr("class", "test_circle")
.attr("x", (d,i)=> { return ((wd)/cirNum * i)})
.attr("y", ht/4)
.attr("height", ht/2)
.attr("width", ()=>{ return wd/cirNum*1.5})
.attr("fill", function(d) {
  return d3.interpolateRainbow(d)
})






function updateData() {

setTimeout(function() {
  let curData =  svgC.selectAll(".test_circle").data()

let newData = []
for (i=0;i<curData.length;i++) {
  newData.push(betweenOne(curData[i]))
}

console.log("happening")
  let cirk = svgC.selectAll(".test_circle") // join the new data
  .data(newData)

  let cirkEnter = cirk.enter()

  cirk.merge(cirkEnter)

cirk.transition()
.duration(200)
.attr("fill", function(d) {
  return d3.interpolateRainbow(d)
})
requestAnimationFrame(updateData)
}, 180)
}

requestAnimationFrame(updateData)


function betweenOne(input) {


  let out = (input + 0.007)
let reth = 0
    if ( out > 1) {

      reth =  out - 1
    }else{
      reth = out
    }

return reth
}
