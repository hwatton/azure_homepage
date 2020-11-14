const ht = 500
const wd = 600

const svgC = d3.select(".container")
.append("svg")
.attr("height", ht)
.attr("width", wd)


// so, this thing. bit of a challenge.
/*
todo: sort out the dateformat for the xScale
- need to change data types!!!!
get a basic line to work using yield vs time
enable filtering by source_key
place weather data behind it / with it (opacity etc)

*/
const xAxisGroup = svgC.append("g")
const yAxisGroup = svgC.append("g")
const weatherGroup = svgC.append("g")
const lineGroup = svgC.append("g")
const format = d3.timeParse("%d-%m-%Y %I:%M")
const pad = 30

let yScale = d3.scaleLinear()
.range([ht-(pad*2), pad])

let xScale = d3.scaleTime()
.range([pad*2, wd-pad])


const lineFunc = d3.line()
.x((d)=> {
  return xScale(d.DATE_TIME)})
.y((d)=> {
  return yScale(d.TOTAL_YIELD)})
.curve(d3.curveLinear)

const sd = d3.csv("Plant_1_Generation_Data.csv")

sd.then(function(data) {






console.log(data)

data.forEach((item, i) => {
  item.TOTAL_YIELD = parseInt(item.TOTAL_YIELD)
  item.DATE_TIME  = format(item.DATE_TIME)
});



  let yieldExt = d3.extent(data, function(d) {
    return d.TOTAL_YIELD
  })

  let dateExt = d3.extent(data, function(d) {
    return d.DATE_TIME
  })


yScale.domain(yieldExt)

xScale.domain(dateExt)
//console.log(data)
const unique_keys = [...new Set(data.map(item => item.SOURCE_KEY))]
//console.log(unique_keys)



let myColScale = d3.scaleLinear()
.range([0,1])
.domain([0,unique_keys.length-1])


const x_axis = d3.axisBottom()
.scale(xScale)
.ticks(5)

const y_axis = d3.axisLeft()
.scale(yScale)

yAxisGroup
.attr("transform", "translate(" + pad*2 + "," + pad +")")
.call(y_axis)


xAxisGroup
.attr("transform", "translate(" + 0 + "," + (ht - pad) +")")
.call(x_axis)


// Drawing

let clicked = []

unique_keys.forEach((item, i) => {

  let thisData = data.filter((d)=> {
    return d.SOURCE_KEY === item

  })

clicked.push({"clicked": false})
//console.log(i)

let eyeDee = "id_" + item

  let leftDiv = d3.select(".source_keys")
  .append("div")
  .attr("class","rectholder")
  .data(item)


  .on("click", function(d,i) {
let id = "#id_" + item
    let action = d3.select(id + "_hoverer")
    .transition()
    .duration(500)
    .style("opacity", "90%")

    let otherAction = d3.select(id + "_line").transition().duration(1500)
    .style("stroke-opacity", "100%")
    .style("stroke-width", "5px")


  })

  let line = lineGroup.append("path")
  .attr("id", eyeDee + "_line")
  .attr("d", lineFunc(thisData))
  .attr("fill", "none")
  .style("stroke", ()=> {
    return d3.interpolateTurbo(myColScale(i))
  })
  .style("stroke-width", "2px")
  .style("stroke-opacity", "0%")

let hoverDiv = leftDiv.append("div")
.attr("id", eyeDee + "_hoverer")
.attr("class", "hoverer")
.text("  source " + (i+1))
.style("opacity", "0%")
.style("background-color", "none")




  let svgDiv = leftDiv.append("svg")
  .attr("class", "legend")
  //.style("position", "fixed")
  .attr("width", wd/6)
  .attr("height", ht/(unique_keys.length*1.5))

  svgDiv.append("rect")
  .attr("class", "legendRect")
  .attr("id", eyeDee)
  .attr("width", 100)
  .attr("height", ht/(unique_keys.length*1.5))
  .attr("fill", ()=> {
    return d3.interpolateTurbo(myColScale(i))
  })
  .style("fill-opacity", "90%")




}); //drawing loop for each source_key

/* main interactive chart drawn up, now load weather and map that behind it.*/

const weatherData = d3.csv("Plant_1_Weather_Sensor_Data.csv")

weatherData.then(function(wata) {

const format = d3.timeParse("%Y-%m-%d %I:%M:%S")
console.log(wata[0])

  wata.forEach((item, i) => {
    item.AMBIENT_TEMPERATURE = parseFloat(item.AMBIENT_TEMPERATURE)
    item.MODULE_TEMPERATURE = parseFloat(item.MODULE_TEMPERATURE)
    item.DATE_TIME  = format(item.DATE_TIME)
  });
  console.log(wata[0])

  let ambTempExt = d3.extent(wata, function(d) {
    return d.AMBIENT_TEMPERATURE
  })

  let modTempExt = d3.extent(wata, function(d) {
    return d.MODULE_TEMPERATURE
  })

let tempExt = d3.extent(ambTempExt.concat(modTempExt))


const tempScaleY = d3.scaleLinear()
.range([ht/2 +pad*2, ht/2 -pad*2])
.domain(tempExt)

const lineFuncAmbTemp = d3.line()
.x((d)=> {
  return xScale(d.DATE_TIME)})
.y((d)=> {
  return tempScaleY(d.AMBIENT_TEMPERATURE)})
.curve(d3.curveLinear)

const lineFuncModTemp = d3.line()
.x((d)=> {
  return xScale(d.DATE_TIME)})
.y((d)=> {
  return tempScaleY(d.MODULE_TEMPERATURE)})
.curve(d3.curveLinear)

// drawing weather dateformat


let modTempLine = weatherGroup.append("path")
.attr("d", lineFuncModTemp(wata))
.attr("fill", "none")
.style("stroke", "gold")
.style("stroke-width", "2px")

let ambTempLine = weatherGroup.append("path")
.attr("d", lineFuncAmbTemp(wata))
.attr("fill", "none")
.style("stroke", "orange")
.style("stroke-width", "2px")






})






}) // csv load async
