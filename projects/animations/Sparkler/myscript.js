//const ht = 268.02841
const wd = 700.011852
let stopped = false
/*
height="258.02841mm"
width="549.72424mm"
*/
const ht = 420.309532
let sparkler
let backCounter = 0
const svgC = d3.select(".container")
.append("svg")
.attr("viewBox", "0 0 " + wd + " " + ht)
.attr("preserveAspectRatio", "xMinYMin meet")
//.attr("height", ht)
//.attr("width", wd)
let defs = svgC.append("defs")
.append("radialGradient")
.attr("id", "circleGrad")


let stop_one = defs.append("stop")
.attr("offset", "0%")
.attr("stop-color", "rgb(255,223,0)")

let stop_two = defs.append("stop")
.attr("offset", "16%")
.attr("stop-color", "rgb(55,54,0)")

let stop_three = defs.append("stop")
.attr("offset", "32%")
.attr("stop-color", "rgb(22,19,0)")

let stop_four = defs.append("stop")
.attr("offset", "100%")
.attr("stop-color", "black")

let bht = 5000
let bwd = 5000

let bckSq = svgC.append("rect")
.attr("id", "bckSq")
.attr("width", bwd)
.attr("height", bht)
.attr("x", 0)
.attr("y", 0)
.attr("fill", "url(#circleGrad)")

const wordGroup = svgC.append("g")
const sparkGroup = svgC.append("g")


const pData = "m 83.040651,202.11081 c 0,0 18.298149,-15.40239 9.78668,-24.74075 0,0 -12.6336,-2.94888 -17.299,20.65708 -4.0442,20.4628 41.801479,19.59182 33.293369,48.05209 -7.39032,24.72121 -44.060669,-1.50303 -24.126409,-17.41187 23.818199,-19.00848 17.038619,-20.85431 55.584419,-28.91509 8.30901,-1.7376 6.43899,141.3953 -17.2071,139.26087 -20.39401,-1.84089 17.50742,-133.49568 25.89801,-139.61206 8.39059,-6.11639 21.73364,-0.18899 25.04092,9.73288 3.14425,9.43277 -3.44124,40.15712 -14.07961,34.20685 -5.57515,-3.11831 -3.2128,-16.44197 8.12649,-29.38765 10.77538,-12.30188 26.99262,-11.88413 46.10523,-13.45125 13.43087,-1.10125 26.47082,-18.31314 23.5132,-20.49332 0,0 -18.1967,-1.07032 -25.87547,18.20714 -4.27006,10.71995 -7.71152,28.40181 7.14288,27.15797 14.8544,-1.24384 21.28379,-31.69033 22.14021,-41.51455 1.19072,-13.6591 -4.80538,37.17201 23.84589,34.9651 16.19205,-1.24722 21.41696,-20.41875 27.01646,-23.23929 5.37348,-2.70669 21.34358,-14.2008 24.53509,-13.51813 2.64544,0.56586 -27.76329,53.43307 -2.34518,67.27729 25.4181,13.84422 103.01003,-162.930703 85.73385,-167.944053 -17.27621,-5.01334 -51.26003,138.946543 -47.48027,173.720353 0.86836,7.98883 21.97023,-66.3375 29.22465,-61.57797 2.94765,1.93389 -20.66882,21.17189 -17.3869,28.72619 2.02065,4.6511 12.90219,39.89331 46.39027,24.71456 37.92389,-34.41434 75.28046,-157.706933 68.17463,-158.560173 -7.10584,-0.85324 -61.06467,122.608203 -30.49752,142.437573 30.56718,19.82937 88.18801,-45.48506 80.87916,-51.59347 -10.21295,-8.53557 -33.8014,13.3816 -30.74623,36.00976 2.52754,18.72041 39.62877,21.21327 58.11113,3.47003 30.52675,-29.30591 22.57137,-39.73276 17.79175,-43.25292 -4.77957,-3.52015 -30.07829,2.91097 4.57369,42.13013 20.81887,23.56284 4.1592,48.20846 -17.36082,45.85122 -21.52002,-2.35724 21.03562,-73.91834 63.28399,-60.52475"

const path = wordGroup.append("path")
.attr("d", pData)
.attr("fill", "none")
.attr("stroke", "black")
//.attr("transform", "translate(-70.143826,-76.140561)")
.attr("transform", "translate(0,0)")

const sparkCol = d3.scaleLinear()
.range(["white", "gold", "white"])
.domain([0,0.85,1])

function translateAlong(path) { // this function, partly found on stackOF I think, lost the reference!
let l = path.getTotalLength();

return function(d, i, a) {
return function(t) {
  let p = path.getPointAtLength(t * l);

  //return "translate(" + (p.x -70.143826) + "," + (p.y-76.140561) + ")";
  return "translate(" + (p.x ) + "," + (p.y) + ")";
};
};
}

function transition() {

  bubble.transition()
      .duration(85000)
  .ease(d3.easeLinear)
      .attrTween("transform", translateAlong(path.node()))
      .on("end", ()=>{

        stopped = true
      });

    }

let bubble = svgC.append("circle")
.attr("id", "pointer")
.attr("r", 1)
.attr("cx",0)
.attr("cy",0)
.attr("fill", "#ff4500")
.style("stroke", "none")
.attr("opacity", "55%")

transition()
reporter()



const lineFunc = d3.line()
.x((d)=> { return d.x})
.y((d)=> { return d.y})
.curve(d3.curveLinear)

function reporter() {

  backCounter++

  sparkler = setTimeout(()=>{
      let tmp = d3.select("#pointer").attr("transform")
      let strArr= tmp.slice(10).split(",")
      let new_x = parseInt(strArr[0]) //+ 10 + Math.random()*10
      let new_y = parseInt(strArr[1])
      let x_two = new_x + 1 + Math.pow(Math.random(),7)*14
      let xDiff = new_x - parseInt(strArr[0])

      let p_diddy = [
        {x:new_x, y:new_y},
        {x:x_two, y:new_y}
      ]
let t_origin = parseInt(strArr[0]) +  " " + parseInt(strArr[1])
let transString = "translate("+ xDiff + " " + 0 + ") rotate(" + Math.random()*360 + ")"
let col = sparkCol(Math.random())

if (backCounter>10){
d3.select("#bckSq")
.attr("x", parseInt(strArr[0])- bwd/2)
.attr("y", parseInt(strArr[1])-bht/2)
.attr("fill-opacity", ()=>{return Math.random()*0.4})
backCounter = 0

}

let spark = sparkGroup.append("path")
.attr("d", lineFunc(p_diddy))
.attr("class", "spark")
.attr("transform", transString)
.attr("transform-origin", t_origin)
.attr("fill", "white")
.attr("stroke", col)
.attr("stroke-width", "0.75px")
.style("stroke-opacity", "100%")

spark.transition()
.duration(1200)
.attr("stroke-opacity", "0")
//.on("end", ()=>{
  //spark.remove()

 //})
if (!stopped) {
  requestAnimationFrame(reporter)
}


},0)
}
reporter()
