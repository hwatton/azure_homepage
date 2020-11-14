const ht = 500
const wd = 600
//d3.select("body").style("background-color", "black")

const cx = wd/2
const cy = ht/2

const svgC = d3.select(".container")
.append("svg")
.attr("height", ht)
.attr("width", wd)



const lineFunc = d3.line()
.x((d)=> { return d.x})
.y((d)=> { return d.y})
.curve(d3.curveLinear)


for (j=0;j<180;j++) {

let groupOne = svgC.append("g")

let pathData = [
  {"x":0, "y":0},
  {"x":250, "y":0},
  {"x":250, "y":10},
  {"x":0, "y":0}
]

let triPath = groupOne.append("clipPath")
.attr("id", "triangleClip")
.append("path")
.attr("d", lineFunc(pathData))



for (i=0;i<30;i++) {

let rect = groupOne.append("rect")
.attr("clip-path", "url(#triangleClip)")
.attr("x", ()=>{return 0.7*((Math.random()*wd) - wd/2)})
.attr("y", ()=>{return 0.7*((Math.random()*ht - ht/2))})
.attr("height", ()=>{return 40 + Math.random()*20})
.attr("width", ()=>{return 55 + Math.random()*40})
.attr("fill", ()=>{return d3.interpolateTurbo(Math.random())})

}

groupOne
.attr("transform", "translate("+ cx + " " + cy + ") rotate(" + j*2 + ")")


}
