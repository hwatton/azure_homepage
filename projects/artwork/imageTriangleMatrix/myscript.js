let ht = 500
let wd = 700

//image credits all due to picsum. 

const link  = "https://picsum.photos/" + wd + "/" + ht + ""

const img = d3.select(".container")
.append("img")
.attr("id", "image")
.attr("src", link)
.attr("width", wd)
.attr("height", ht)

console.log("do some stuff")

ht = ht
wd = wd

let svgC = d3.select(".container")
.append("svg")
.attr("id", "svgC")
.attr("height", ht )
.attr("width", wd)
.on("click", ()=>{
    console.log("clicked")

    let linkTwo = "https://picsum.photos/" + wd + "/" + ht +""

d3.select("#image")
.attr("src", linkTwo)

})



const triGroup = svgC.append("g")
const numX = 10 + (Math.floor(Math.random()*20)) //the number in a row
const numY = Math.floor(numX/2) //the number of rows
const triWid = (wd-0) / numX
const triHei = (ht-0) / numY 

let counter = 0

for (let j = 0;j<(numY + 1);j++) {

    if ( j/2 != parseInt(j/2) ) {

        for (let i = 0;i<(numX + 1);i++) {

            let triPath = lineFunc(makeTriangle(triHei, triWid))
            let offX = i * triWid
            let offY = j* triHei
            let id = "id_" + counter
            let tranString = "translate(" + (offX - (triWid/2)) + ", " + offY + ")"
        
        //pointy down
            triGroup.append("path")
            .attr("d", triPath)
            .attr("id", id)
            .attr("fill", "black")
            .attr("class", "triangle")
            .attr("transform", tranString)
            .style("fill-opacity", "100%")
        
        //pointy up
        counter++
        tranString = "translate(" + ((offX - (triWid/2)) + triWid) + ", " + offY + ") rotate(180)"
        id = "id_" + counter

        triGroup.append("path")
            .attr("d", triPath)
            .attr("id", id)
            .attr("fill", "black")
            .attr("class", "triangle")
            .attr("transform", tranString)
            .style("fill-opacity", "100%")


            counter++

        } //for i

       

            }else{
              

for (let i = 0;i<numX;i++) {

    let triPath = lineFunc(makeTriangle(triHei, triWid))
    let offX = i * triWid
    let offY = j* triHei
    let tranString = "translate(" + offX + ", " + offY + ")"
    let id = "id_" + counter

//pointy down
    triGroup.append("path")
    .attr("d", triPath)
    .attr("id", id)
    .attr("fill", "black")
    .attr("class", "triangle")
    .attr("transform", tranString)
    .style("fill-opacity", "100%")

//pointy up
counter++

id = "id_" + counter

tranString = "translate(" + (offX + triWid) + ", " + offY + ") rotate(180)"

triGroup.append("path")
    .attr("d", triPath)
    .attr("id", id)
    .attr("fill", "black")
    .attr("class", "triangle")
    .attr("transform", tranString)
    .style("fill-opacity", "100%")


    counter++
} //for i

} // if Even


} //for j

function flashy(){
    setTimeout(()=>{
let rnd = Math.floor(Math.random()*counter)

let id = "#id_" + rnd


if (Math.random()*100 > 90) {

   // let aR = [rnd, rnd-numX*2-2, rnd+1,rnd-numX*2] //makes a triangle if youre lucky
const tRan = Math.floor(Math.random()*(numX*0.5))
   let aR = []
   for (z=0;z<tRan;z++) {
       aR.push(Math.floor(Math.random()*counter))
   }

for (let k=0;k<aR.length;k++){
let eye =   "#id_" + aR[k]

d3.select(eye)
.transition()
.duration(3000)
.style("fill-opacity", "0%")
.on("end", ()=>{


    d3.select(eye)
    .transition()
.duration(6500)
.style("fill-opacity", "90%")
})

}
flashy()

}else{
    
d3.select(id)
.transition()
.duration(3000)
.style("fill-opacity", "0%")
.on("end", ()=>{


    d3.select(id)
    .transition()
.duration(6500)
.style("fill-opacity", "90%")
})


        //requestAnimationFrame(flashy)
        flashy()

} // ifelse

    }, 50)
}

//requestAnimationFrame(flashy)
flashy()




// functions.............

function lineFunc(arr) {

    const line = d3.line()
    .x(d=> d[0])
    .y(d=> d[1])

    return line(arr)
}

function makeTriangle(height, width) {
let points  = [
    [0,0],
    [width, 0],
    [width/2, height],
    [0,0]
]
return points
}


