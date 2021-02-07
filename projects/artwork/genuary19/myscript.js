const ht = 600
const wd = 600

const svgC = d3.select(".container")
.append("svg")
.attr("height", ht)
.attr("width", wd)

let sclMax = 100

const scale = d3.scaleLinear()
.domain([0,sclMax])
.range([-25, 625])

const colScale = d3.scaleLinear()
.domain([100,0])
.range(["rgb(0, 0, 0)", "rgb(0,0,0)"])

const lineFunc = d3.line()
.x(d=> scale(d.x))
.y(d=> scale(d.y))
.curve(d3.curveNatural)

for (j=100;j>-1;j--) {
let data = pathGen(j, sclMax)

svgC.append("path")
.attr("d", lineFunc(data))
.attr("fill", ()=>{
    
        return colScale(j) 
        //return colScale(Math.random()*100)
    


})
.style("stroke", ()=>{
    //return "white"
    return d3.interpolateRainbow(Math.random())

})
.style("stroke-width", "1px")


}



function pathGen(yin, topX) {
//uses 101 x points as standard, with 100 as max
//grid is based on 100 x 100
let arr = []
arr.push({x:-10, y:110}) //add bottom left corner
for (i=0;i<topX+1;i++) {
   // let yNew = (100 - (yin)+1) - Math.random()*yin*0.5
    let yNew = 100 - yin + yin/16 - (Math.random()*yin/8)
 arr.push({x:i, y:yNew})   
}

arr.push({x:110, y:110}) //add bottom right corner
return arr
}

