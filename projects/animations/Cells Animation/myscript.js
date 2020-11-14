const ht = window.innerHeight *0.9
const wd = window.innerWidth *0.9

const pointCount = 282

const cx = wd/2
const cy = ht/2
const radius = d3.min([cy * 0.9, cx*0.9])
//let points = []

let scope  = Math.floor(pointCount*0.1) // 0.2 = 20%
let interval = 0.25
let upper_bound = scope;
let lower_bound = -scope;
let mean = 0;
let std = scope/4;

let dataset = create_data(interval, upper_bound, lower_bound, mean, std)
let dataExt = d3.extent(dataset, (d)=> {return d.y})

let rotato_potato = 0 //this will get added to for the transform

const dataScale = d3.scaleLinear()
.range([0,1])
.domain(dataExt)

dataset.forEach((item, i) => {
  item.y =  dataScale(item.y)
});


let tempData = makePoints()

let xExt = d3.extent(tempData,(d)=>{
  return d[0]
})
console.log(xExt)
let yExt = d3.extent(tempData,(d)=>{
  return d[1]
})

  let xAv = (xExt[1]+xExt[0])/2
  let yAv = (yExt[1]+yExt[0])/2





const svgC = d3.select(".container").append("svg")
.attr("height", ht)
.attr("width", wd)



  const lineFunc = d3.line()
  .x((d)=> { return d[0]})
  .y((d)=> { return d[1]})
  .curve(d3.curveLinear)

let col = d3.interpolateRainbow(Math.random())


const bacteriaGroup = svgC.append("g")
const nucleus = svgC.append("g")
//const bacteriaPathData = lineFunc(tempData)


let bacteria = bacteriaGroup.selectAll("path")
.data([tempData])
.enter()


  bacteria.append("path")
  .attr("id", "bacteriaPath")
  .attr("class", "blob")
  .attr("d", (d)=>{
    return lineFunc(d)})
  .attr("fill", ()=>{
    let tmpA = col.split(",")
    let t1 = tmpA[0].split("(")
    let c1 = parseInt(t1[1])
    let c2 = parseInt(tmpA[1])
    let c3 = parseInt(tmpA[2])

    c1 = c1+ (255 - c1)*0.5
    c2 = c2+ (255 - c2)*0.5
    c3 = c3+ (255 - c3)*0.5

    let reText = "rgb(" + c1 + "," + c2 + "," + c3 + ")"

    //console.log(reText)
    return reText

  })
  .style("stroke", col)
  .style("stroke-width", "20px")
  .on("click", (d)=>{ transitionBlob()})

  nucleus.append("circle")
  .attr("id", "nucleus")
  .attr("cx", xAv)
  .attr("cy", yAv)
  .attr("r", 20)
  .style("stroke", col)
  .style("stroke-width", "6px")
  .attr("fill", "#fffdd1")



function transitionBlob() {
  let newData = makePoints()

let xExtent = d3.extent(newData,(d)=>{
  return d[0]
})
let yExtent = d3.extent(newData,(d)=>{
  return d[1]
})

  let xAv2 = (xExtent[1]+xExtent[0])/2
  let yAv2 = (yExtent[1]+yExtent[0])/2

  let nucleus_position = [{"x":xAv2,"y":yAv2}]
console.log(nucleus_position)
  let cool = newCol(Math.random())
  //console.log(cool)
  let colData = cool
    let tmpA = colData.split(",")
    let t1 = tmpA[0].split("(")
    let c1 = parseInt(t1[1])
    let c2 = parseInt(tmpA[1])
    let c3 = parseInt(tmpA[2])

    c1 = c1+ (255 - c1)*0.5
    c2 = c2+ (255 - c2)*0.5
    c3 = c3+ (255 - c3)*0.5

    let reText = "rgb(" + c1 + "," + c2 + "," + c3 + ")"


d3.select("#nucleus")
.transition()
.duration(8000)
.ease(d3.easeLinear)
.attr("cx", ()=>{
  console.log("y")
  return xAv2})
.attr("cy", yAv2)
.style("stroke", cool)

rotato_potato = rotato_potato +25

  let dataObj = [{"path":newData,"colour":cool,"liteColour":reText}]
  d3.select("#bacteriaPath").data(dataObj).enter()


  d3.select("#bacteriaPath")
  .transition()
  .duration(8000)
  .ease(d3.easeLinear)
  .attr("transform", "rotate(" + rotato_potato + ")")
  .attr("d", (d)=>{
    return lineFunc(d.path)})


  .attr("fill", (d)=>{
  return d.liteColour
  })
  .style("stroke", cool)
  .on("end", ()=>{transitionBlob()})


}

  function makePoints() {
let points = []

    let radArray = []
    for (i=0;i<pointCount;i++){
    radArray.push(radius)
    }

    for (j=0;j<5;j++) { // 5 bumps...

    let minus = Math.floor(Math.random()*2 - 1)

    let pants = loopNumber(Math.floor(Math.random()*radArray.length),radArray.length,dataset.length) // don't ask for more than 2 x the size of the array.

    pants.forEach((item, i) => {

    let tmp = radArray[item]


    let newVal = tmp + (0.2*tmp*dataset[i].y*minus)
    //console.log(newVal)
    radArray[item] = newVal

    });

    }


    for(i = 0; i < pointCount; i++) {

    let rado = radArray[i]

        let x = cx + rado * Math.cos(2 * Math.PI * i / pointCount);
        let y = cy + rado * Math.sin(2 * Math.PI * i / pointCount);

        rado = rado + (1/rado*rado)*50
        let tx = cx + rado * Math.cos(2 * Math.PI * i / pointCount);
        let ty = cy + rado * Math.sin(2 * Math.PI * i / pointCount);


        let angle = Math.sin(2 * Math.PI * i / pointCount)

if (i/15 == parseInt(i/15)) {
    points.push([x ,y])
    points.push([tx,ty])
   points.push([x ,y])
  }else{
      points.push([x ,y])
    }

    }

    points.push(points[0])

    return points
  }



function loopNumber(arrayStartpoint, arraylength, numsToReturn) {
  let output = []
  for (i=0;i<numsToReturn;i++){
    if (arrayStartpoint + i < arraylength) {
      output.push(arrayStartpoint + i)
    }else{
      output.push(arrayStartpoint + i - arraylength)
    }
  } //for
  return output
}

function newCol(num) {

let ret = d3.interpolateRainbow(num)
return ret
}

function create_data(interval, upper_bound, lower_bound, mean, std) {
            let n = Math.ceil((upper_bound - lower_bound) / interval)
            let data = [];

            x_position = lower_bound;
            for (i = 0; i < n; i++) {
                data.push({
                    "y": jStat.normal.pdf(x_position, mean, std),
                    "x": x_position
                })
                x_position += interval
            }
            return (data);
        }
