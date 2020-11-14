const folders = [
  {text:"100Lines", function:hundredLines},
  {text:"Bubble Popper", function:bubble_popper},
  {text:"Calendulaceum", function:calendulaceum},
  {text:"Cells Animation", function:cellAnimation},
  {text:"Mouseover Circle Grid", function:mouseoverCircleGrid},
  {text:"Origami", function:origami},
  {text:"Rainbow animation", function:rainbowThing},
  {text:"Sine Waver", function:sineWaver},
  {text:"Sparkler", function:sparkler}
]

const foldersData = []

folders.forEach((item, i) => {
  foldersData.push({text:item, function:mouseoverCircleGrid })
});


//  const colLocal = d3.interpolateRainbow(Math.random())

//let listGroup = d3.select(".svgHolder").append("g")
let listDiv = d3.select(".svgHolder")
.append("div")
.attr("class", "listDiv")
.style("max-width", "200")
.style("overflow", "hidden")


let list = listDiv
.append("ul")
.style("overflow", "hidden")

//.style("margin", "0")

let listItems = list.selectAll("a")
.data(folders)
.enter()

let div = listItems.append("a")
.attr("id", (d,i)=>{
  let ref = "id_" + i
  return ref
})
.attr("class", "colourList")
.on("click",(d,i)=>{
  d3.select(".listDiv").transition()
  .duration(2000)
  //.style("opacity", "0%")
  .style("width", "0")
  .on("end", ()=>{

//d3.select(".listDiv").remove()
d3.select(".listDiv")
.style("display", "none")


let animationDiv = d3.select(".svgHolder")
.append("div")
.attr("class", "animationDiv")
.style("margin", "30px")
.style("opacity", "100%")
.style("text-align", "center")

let winWid = window.innerWidth*0.98
    let svgC = animationDiv.append("svg")
    .attr("class", "svgContainer")
    .style("height", "70%")
    .attr("preserveAspectRatio", "xMinYMin meet")
    .attr("viewBox", "0 0 " + winWid + " 500")
    .style("background-color", "none")
    .on("click", ()=>{
      let hider = d3.select(".svgContainer")
      .transition()
      .duration(1500)
      .style("opacity", "0")
      .on("end",()=>{
        d3.select(".animationDiv").remove()

        d3.select(".listDiv")
        .style("display", "inline")
        .style("width", "100%")

      })



    })

    animationDiv.transition()
    .duration(1500)
    .style("opacity", "100%")
    .on("end", ()=>{
      d.function()
    })





  })








})
//.style("max-width", "20%")
.style("padding-left", "0px")
.style("display", "block")
.style("cursor", "pointer")
.style("margin-top", "1px")
.style("margin-bottom", "1px")
.style("padding-top", "12px")
.style("padding-bottom", "12px")
.style("overflow", "hidden")
.style("white-space", "nowrap")
  .text((d,i)=>{return d.text})
  .style("color", col)
  .on("mouseover", (d,i)=>{
    let selRef = "#id_" + i
    d3.select(selRef)
    .transition()
    .duration(100)
    .style("color", ()=>{
      return d3.interpolateRainbow(Math.random())
    })
  })
  .on("mouseout", (d,i)=>{
    let selRef = "#id_" + i
    d3.select(selRef)
    .transition()
    .duration(1000)
    .style("color", col)
  })



/*
d3.select("#id_0")
.style("background-image", "url(100Lines/thumb.png)")
.style("background-color", "black")

d3.select("#id_1")
.style("background-image", "url(bubble_popper/thumb.png)")
.style("background-color", "black")
*/
function origami() {
  const ht = 500
  const wd = 500
  const svgC = d3.select(".svgContainer")
  const pathGroup = svgC.append("g")



  /* Each of the following functions returns an
  array of points. This was initially done in
  separate csv files with interactive menus,
  but i have rewritten it and hard coded a
  selection of svg data in this file. It's just simpler
  in this edited view on my portfolio site.*/

  const lineFunc = d3.line()
  .x((d)=> { return d.x})
  .y((d)=> { return d.y})
  .curve(d3.curveLinear)

/*
  let max = d3.max(data, (d)=>{return d3.max(d)})
  let min = d3.min(data, (d)=>{
if (d!=0){
    return d3.min(d)}else{return null}
  }
) */
const animals = [
  {function:stag},
    {function:butterfly},
      {function:crane},
        {function:elephant},
          {function:fox},
          {function:swan}
]

let index = Math.floor(Math.random()*animals.length)

let data = animals[index].function()
//console.log(data)
//scale
let xR = []
let yR = []

data.forEach((item, i) => {

  if(item[0]!=0){xR.push(item[0])}
  if(item[2]!=0){xR.push(item[2])}
  if(item[1]!=0){yR.push(item[1])}
  if(item[3]!=0){yR.push(item[3])}


});

let y_max = d3.max(yR)
let x_max = d3.max(xR)
let y_min = d3.min(yR)
let x_min = d3.min(xR)

let extent_one = d3.extent([x_min,y_min,x_max,y_max])

  let scaleUp = d3.scaleLinear()
  .range([0,500])
  .domain(extent_one)
//scale

data.forEach((item, i) => {
//  let ex = i * (wd/data.length)
//  lines.push([{x:ex,y:0},{x:ex,y:500}])
let objArr = [{x:scaleUp(item[0]),y:scaleUp(item[1])},{x:scaleUp(item[2]),y:scaleUp(item[3])}]
let eye = "id_" + i
  pathGroup.append("path")
  .attr("d", lineFunc(objArr))
  .attr("class", "colourPath")
  .attr("id", eye)
  .attr("fill", "none")
  .style("stroke", "red")
  .style("stroke-width", "1px")

});


function newLines() {
console.log("yes")
setTimeout(()=>{

let ind = Math.floor(Math.random()*animals.length)

let newData = animals[ind].function()

//console.log(newData)
let x = []
let y = []

newData.forEach((item, i) => {

  if(item[0]!=0){x.push(item[0])}
  if(item[2]!=0){x.push(item[2])}
  if(item[1]!=0){y.push(item[1])}
  if(item[3]!=0){y.push(item[3])}


});

let ymax = d3.max(y)
let xmax = d3.max(x)
let ymin = d3.min(y)
let xmin = d3.min(x)

let ext = d3.extent([0,xmin,ymin,xmax,ymax])

  let scale = d3.scaleLinear()
  .range([0,500])
  .domain(ext)

  let pairedData = []

  newData.forEach((item, i) => {
    pairedData.push(
      [{x:scale(item[0]) ,y:scale(item[1])},{x:scale(item[2]) ,y:scale(item[3])}]
    )
  });

  //console.log(pairedData)

for (i=0;i<pairedData.length;i++) {

let id = "#id_" + i
console.log(id)
  d3.select(id)
.transition()
.duration(2000)
.attr("d", (d,i)=>{return pairedData[i]})

}

requestAnimationFrame(newLines)
},4000)

}

newLines()

  function stag() {
    let arr = [
    [151.6,433.73,114.88,254.95],
    [151.6,504.77,151.6,433.73],
    [139.62,516.74,151.6,504.77],
    [158.78,514.34,139.62,516.74],
    [174.74,393.03,158.78,514.34],
    [190.7,430.54,114.88,254.95],
    [201.08,524.72,190.7,430.54],
    [193.25,537.34,201.38,524.34],
    [211.1,535.09,193.1,537.34],
    [215.45,393.03,210.66,535.09],
    [151.6,171.95,114.88,254.95],
    [210.66,168.36,117.28,174.34],
    [173.94,136.03,210.66,168.36],
    [112.49,162.82,174.74,136.03],
    [117.28,174.34,112.49,162.37],
    [194.37,107.83,178.41,140.15],
    [235.73,96.42,194.23,108.39],
    [227.35,32.57,235.33,96.42],
    [266.64,98.57,227.35,32.57],
    [220,110.45,267.09,98.48],
    [217.45,128,220.12,110],
    [222.73,125.8,182.77,143.8],
    [240.19,143.22,221.69,125.84],
    [192.3,152.52,240.35,143.22],
    [199.61,251.06,214.3,148.25],
    [267.99,401.41,208.66,391.83],
    [209.06,391.83,197.09,362.93],
    [339.83,380.66,267.99,401.41],
    [363.33,306.3,340.98,380.66],
    [316.68,274.51,363.77,306.83],
    [198.42,284.08,316.68,274.51],
    [378.14,380.66,339.83,380.66],
    [352.15,345.19,378.14,380.66],
    [362.05,359.15,362.8,306.83],
    [348.3,515.54,348.3,380.66],
    [357.3,515.54,348.3,515.54],
    [378.14,380.66,357.3,515.54],
    [307.8,459.95,306.3,390.23],
    [314.8,459.95,307.8,459.95],
    [323.8,384.95,314.8,459.95],
    [197.09,362.93,199.61,251.06],
    [178.41,140.15,219.91,110.45],
    [250.54,116.59,218.79,117.09],
    [266.21,98.57,249.88,116.59],
    [305.71,269.96,199.16,279.3],
    [307.38,274.63,304.71,269.96],
    [129.58,288.04,199.61,251.06],
    [178.41,401.41,195.89,362.93],
    [213.05,453.69,190.7,430.54],
    [166.76,453.69,151.6,433.73],
    [158.78,514.34,151.6,504.77],
    [210.66,535.09,201.08,523.4],
    [245.88,103.66,227.35,32.57],
    [366.54,456.51,348.3,380.66],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
    ]
  return arr
  }

  function butterfly() {

  let arr = [[278.06,165.08,104.5,165.08],
  [277.6,271.28,277.6,165.08],
  [191.57,258.85,104.75,165.08],
  [277.6,165.08,191.57,258.85],
  [254.71,356.67,217.37,312.67],
  [217.37,312.67,200.37,248.67],
  [277.6,270.33,217.37,312.67],
  [276.37,271.28,254.71,356.67],
  [203.04,258.85,191.57,258.85],
  [292.73,165.08,466.29,165.08],
  [293.18,271.28,293.18,165.08],
  [379.21,258.85,466.04,165.08],
  [293.18,165.08,379.21,258.85],
  [316.08,356.67,353.41,312.67],
  [353.41,312.67,370.41,248.67],
  [293.18,270.33,353.41,312.67],
  [294.41,271.28,316.08,356.67],
  [367.75,258.85,379.21,258.85],
  [293.18,258.85,277.6,258.85],
  [293.18,165.08,277.6,165.08],
  [285.75,203.17,277.6,195.15],
  [285.1,203.15,293.23,195.15],
  [203.5,133.82,104.5,165.08],
  [265.75,165.08,203.5,133.82],
  [404.25,133.82,305.25,165.08],
  [466.5,165.08,404.25,133.82],
  [274.75,149.45,265.54,164.59],
  [296.75,149.45,274.75,149.45],
  [306.61,165.08,296.75,149.45],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0],
  [0,0,0,0]
  ]

    return arr
  }

  function crane() {
    let arr = [
    [202.42,337.2,135.75,129.96],
    [28.51,458.94,202.42,337.2],
    [320,361.84,28.51,458.94],
    [202.42,337.2,319.29,361.84],
    [244.45,296.62,135.75,129.96],
    [244.45,296.62,202.42,337.2],
    [311.45,308.58,244.45,296.62],
    [328.92,429.86,312.17,308.13],
    [214.26,422.46,202.42,398.07],
    [328.92,429.86,266.72,415.9],
    [266.72,378.2,266.72,415.9],
    [410.98,199.51,328.92,429.86],
    [363.44,206.07,410.98,199.51],
    [312.17,308.13,363.44,206.07],
    [491.31,253.61,410.98,199.51],
    [397.87,237.21,491.31,253.61],
    [374.26,402.46,337.8,406.07],
    [266.72,415.9,214.26,422.46],
    [404.43,237.21,369.95,402.46],
    [410.98,358.52,378.2,361.84],
    [548.84,296.62,389,308.13],
    [547.05,296.62,410.98,358.52],
    [404.43,218.62,491.31,253.61],
    [389,308.58,410.98,358.52],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
    ]
  return arr
  }

  function elephant() {
    let arr = [
    [218.76,543.57,173.76,543.57],
    [114.99,337.75,174.04,543.57],
    [158.86,248.41,114.99,337.75],
    [277.59,225.24,158.86,248.41],
    [284.91,215.48,233.69,267.92],
    [381.82,195.48,284.91,215.48],
    [411.33,367.92,381.25,195.18],
    [376.8,543.57,411.4,367.92],
    [342.08,543.57,376.68,543.57],
    [114.99,337.75,342.78,543.57],
    [369.31,440.66,411.65,367.92],
    [233.69,267.92,369.31,440.66],
    [369.31,440.66,284.91,215.48],
    [476.33,367.92,411.33,367.92],
    [529.42,280.02,476.33,367.92],
    [476.33,367.92,421.55,212.5],
    [453.1,301.25,501.84,278.08],
    [535.53,304.01,521.46,292.89],
    [529.42,280.02,535.53,304.01],
    [265.07,472.64,218.23,543.57],
    [163.45,508.11,218.23,543.57],
    [381.82,513.29,342.78,543.57],
    [112.4,374.45,114.93,337.75],
    [124.3,370.86,112.4,374.07],
    [95.68,377.61,112.78,366.5],
    [117.22,377.61,95.68,377.61],
    [112.4,374.07,117.22,377.61],
    [117.22,372.71,117.22,378.11],
    [421.55,212.5,381.25,195.48],
    [501.84,278.08,529.42,279.56],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
    ]
  return arr
  }

  function fox() {
    let arr = [
    [479.92,257.1,356.36,337.1],
    [230.66,258.64,356.36,337.1],
    [284.29,185.63,230.17,259.88],
    [429.3,185.61,479.54,257.45],
    [356.75,337.1,284.16,185.84],
    [356.36,337.1,428.96,185.84],
    [263.77,99.18,263.77,213.92],
    [450.32,99.18,450.32,213.92],
    [336.36,185.63,263.77,99.18],
    [316.36,561.91,276.36,286.84],
    [396.23,561.91,434.13,286.84],
    [377.73,185.63,450.32,99.18],
    [263.77,99.18,284.29,185.63],
    [449.68,99.18,429.16,185.63],
    [429.75,185.74,283.88,185.74],
    [356.61,336.34,356.18,561.9],
    [356.24,548.6,316.34,561.56],
    [395.88,561.56,356.24,548.6],
    [199.06,412.14,275.18,286.76],
    [199.93,529.8,242.12,561.71],
    [200,530.45,199.32,411.54],
    [163.75,554.1,232.05,554.1],
    [162.26,554.08,200.16,529.78],
    [137.37,535.34,181.37,541.95],
    [162.44,554.1,137.44,535.26],
    [241.68,561.71,396.04,561.64],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
    ]
  return arr
  }

  function swan() {
    let arr = [
    [185.65,315.53,494.8,238.7],
    [385.65,211.87,185.65,315.53],
    [371.02,268.58,385.65,211.87],
    [392.36,489.92,494.8,238.7],
    [219.8,489.92,392.36,489.92],
    [219.8,489.92,185.65,315.53],
    [219.8,489.92,494.8,238.7],
    [476.5,440.53,392.36,489.92],
    [434.43,382.6,502.72,353.33],
    [502.72,353.33,476.5,440.53],
    [392.36,489.92,502.72,353.33],
    [111.7,389.69,219.8,489.92],
    [187.11,145.97,111.87,389.92],
    [106.38,156.99,212.48,142.97],
    [170.78,407.54,212.48,142.97],
    [170.61,406.79,219.8,487.48],
    [111.87,389.92,170.78,407.54],
    [159.43,113.9,212.48,142.97],
    [106.38,156.99,159.43,113.9],
    [218.55,119.57,159.43,113.9],
    [212.48,142.97,218.55,119.57],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
    ]
  return arr
  }

}

function mouseoverCircleGrid() {

  /*
  REDO this to spread it out better
  and to make it more responsive, a bit like
  the chevron one where you load in all possibilitues
  from the beginnning

  this could be handled by state in a react thing

  */

const wd = window.innerWidth*0.95
const ht = 500

let svg = d3.select(".svgContainer")



const cR = 20 //circle radius

const wtarg =  Math.floor(wd/(cR*2) )
const htarg =  Math.floor(ht/(cR*2) )
const tot = wtarg * htarg
let dtta = []
let dx, dy, hyp, k

let tx = Math.floor(Math.random()*wtarg)
let ty = Math.floor(Math.random()*htarg)
//console.log(tx + "  " + ty)

for (i=0;i<wtarg;i++) {
  for (j=0;j<htarg;j++) {
dx = i
dy = j
//console.log(Math.floor(htarg/i))
dtta.push(
  {x: dx, y: dy}

)
}
}


//make a max hypotenuse here.

let xMax = d3.max([wtarg - tx,tx - wtarg])
let yMax = d3.max([htarg - ty,ty - htarg])
//console.log(wtarg - tx + " " +  tx - wtarg)
//console.log(xMax + "  " + yMax)
let hMax= hypoTarg(xMax, yMax,tx,ty)

const colsC = d3.scaleLinear()
.range([0,1])
//.domain([0,hMax]);
.domain([0,wtarg-1]);

const ysC = d3.scaleLinear()
.range([cR,ht-cR])
.domain([0,htarg-1]);

let xsC = d3.scaleLinear()
.range([cR,wd-cR])
.domain([0,wtarg]);

  let u = svg.selectAll("circle")
  .data(dtta)

  u.enter()
  .append("circle")
  .attr("r", cR)
  .merge(u)
  .attr("cx" , function(d,i) {

    return  xsC(d.x) })
  .attr("cy", function(d,i) {

    return ysC(d.y)
  })
  .attr("fill", function(d,i){
//console.log(d)
    return d3.interpolateRainbow(colsC(hypoTarg(d.x,d.y,tx,ty)))})
    .on("mouseover",function(d) {
//var iD = d3.select(this)
//var ms = iD.split("_")
//var clx = parseInt(ms[0])
//var cly = parseInt(ms[1])
upData(d.x,d.y)

    })

  u.exit().remove()

  function hypoTarg(a,b,ta,tb) {
let zx = d3.max([ta,a]) - d3.min([ta,a])
let zy = d3.max([tb,b]) - d3.min([tb,b])
let hy = Math.sqrt(Math.pow(zx,2) + Math.pow(zy,2))
return hy
  }

//function upData(mx,my) {
//console.log("doing it")
//dtta = []
///  for (i=0;i<wtarg;i++) {
//    for (j=0;j<htarg;j++) {
//  dx = d3.max([mx,j]) - d3.min([mx,j])
//  dy = d3.max([my,i]) - d3.min([my,i])
  //console.log(dx + "  " + dy)
//  hyp = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))
//  dtta.push(hyp)
//}
//}
  //console.log(dtta[k])

function upData(a,b) {
  dx = a
  dy = b
d3.selectAll("circle")
.transition().duration(1000).attr("fill", function(d,i) {
return d3.interpolateRainbow(colsC(hypoTarg(d.x,d.y,a,b)))

})

}
}

function bubble_popper() {
  const wd = window.innerWidth*0.95
  const ht = 500

/*
  setTimeout(function(){
  	d3.select(".note").transition().duration(4500).style("color", "black").on("end", function() {
  		d3.select(".note").remove()
  	})
  },2000)
*/
  svgCont = d3.select(".svgContainer")


  const curve = d3.line().curve(d3.curveNatural)
  const colScale = d3.scaleLinear()
  .range(["#9acd32","#99FF00","#33CC00"])
  .domain([0,50,100])

  function translateAlong(path) {
    let l = path.getTotalLength();

    return function(d, i, a) {
      return function(t) {
        let p = path.getPointAtLength(t * l);

        return "translate(" + p.x + "," + p.y + ")";
      };
    };
  }

  let fps = 3
let count = 0
  function drawbubs() {



  setTimeout(function(){
    if(count<40){
  let bubz = bubblePath2()
  let exis = bubz[0]
count++
  let path = svgCont
  .append("path")
  .attr("d", curve(bubz))
  .attr("fill", "none");
  let radius = 10 + Math.floor(Math.random()*60)
  let col = colScale(Math.floor(Math.random()*100))

  let bubble = svgCont.append("circle")
  .data([{col:col}])
  .attr("r", function() {return radius})
  .attr("cx", function() {return 0})
  .attr("cy", function() {return 0})
  .attr("stroke", col)
  .attr("fill","black")
  .on("mouseover", function(d,i){

   let tt = d3.select(this).attr("transform")
    let tr = d3.select(this).attr("r")
    let tts = tt.substring(10,100)
    tt = tts.substring(0,tts.length-1)
    tt = tt.split(",")
    tr = parseInt(tr)
    let tx = parseInt(tt[0])
    let ty = parseInt(tt[1])
    let stz = Math.floor(Math.random()*7) + 5

    drawStarburst(stz,tx,ty,tr,d.col)

    d3.select(this)
    .remove();

    count--

  });

  function transition() {
    bubble.transition()
        .duration(15000)
        .attrTween("transform", translateAlong(path.node()))
        .on("end", ()=>{
          //console.log("bubbble ended")
          count--
        //  transition
        });
      }

  transition()

} //if count
  requestAnimationFrame(drawbubs);

}, 300)
}; //drawbubs

drawbubs()
//  requestAnimationFrame(drawbubs)

  function bubblePath2(){
    let stX = -wd/8 + Math.floor(Math.random()*(wd + wd/8))
    let stY = ht + 70
    let endX = stX + Math.floor(Math.random()*wd/8)
    let endY = -250
    let midX1 = stX + (endX - stX)/2 + ((Math.round(Math.random()) * 2 - 1) * 50)
    let midY1 = ht*0.7 + ((Math.round(Math.random()) * 2 - 1) * 50)
    let midX2 = stX + (endX - stX)/2 + ((Math.round(Math.random()) * 2 - 1) * 50)
    let midY2 = ht*0.25 + ((Math.round(Math.random()) * 2 - 1) * 50)

    return  [[stX,stY],[midX1,midY1],[midX2,midY2],[endX,endY]]
  }

  const drawLine = d3.line()  //add this outside the function if preferable
                          .x(function(d) { return d.x })
                          .y(function(d) { return d.y });

  function drawStarburst(stars,cx,cy,r,color) {

    const burstLength = 5
    for (i=0;i<stars;i++) {
      let lineData = [ { "x": cx - r,   "y": cy -r},  { "x": cx - burstLength -r,  "y": cy - burstLength -r}]

      svgCont.append("path")
      .attr("d",drawLine(lineData))
      .attr("stroke", color)
      .attr("stroke-weight",20)
      .attr("transform","rotate (" + i*(360/stars) + " " + cx + " " + cy + ")")
      .transition()
      .duration(350)
      .attr("d", drawLine([{ "x": cx - 2*burstLength - r,   "y": cy - 2*burstLength - r},  { "x": cx - 2*burstLength -r,  "y": cy - 2*burstLength -r}]))
      .remove()



    }


  }

}

function calendulaceum() {

  const wd = window.innerWidth *0.95
  const ht = 500

  const svgCont = d3.select(".svgContainer")


  const target = 30
  const sqX = Math.floor(wd/(target+target/10))
  const sqY = Math.floor(ht/(target+target/10))
  const myCol = d3.scaleLinear()
  .range(["#518eff","#bf00ff","#0e7c61","#008000","#39ff14","#aaff00","yellow","orange","red"])
  .domain([0,25,55,200,770,860,925,975,1000]);
  //domain is 1000 max

  let bcksq = svgCont.append("rect")
  .attr("height" , ()=>{return ((target*1.1)*sqY)+(target*0.1)})
  .attr("width" , ()=>{return ((target*1.1)*sqX)+(target*0.1)})
  .attr("fill", "white")



  function jeepers(x,y) {
    if(k > 15) {
  let rx = Math.floor(Math.random()*x)
  let ry = Math.floor(Math.random()*y)
  let id = "r" + rx + "_" + ry
  d3.select("."+id).transition().attr("fill",function(){

  var colin = Math.floor(Math.random()*1000)
  return myCol(colin)
  }).duration(2000);
  }
   else {
    k=k+1

  };
  }

  for (i=0; i<sqX; i++){
  for (j=0; j<sqY; j++){
  svgCont.append("rect")
  .attr("class", function(){
    return "r" + i + "_" + j})
  .attr("height", function() {return target})
  .attr("width", function() {return target})
  .attr("x", function() {return target/10 + (i*(target + target/10))})
  .attr("y", function() {return target/10 + (j*(target + target/10))})
  .attr("fill",function() {
    var colin = Math.floor(Math.random()*1000)
    return myCol(colin)
  });
  }
  }
  let k = 0
  setInterval(function(){jeepers(sqX,sqY)}, 0);

}

function cellAnimation() {

  const ht = 500
  const wd = window.innerWidth *0.97

  const pointCount = 282

  const cx = wd/2
  const cy = ht/2
  const radius = d3.min([cy * 0.8, cx*0.8])
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
  //console.log(xExt)
  let yExt = d3.extent(tempData,(d)=>{
    return d[1]
  })

    let xAv = (xExt[1]+xExt[0])/2
    let yAv = (yExt[1]+yExt[0])/2

  const svgC = d3.select(".svgContainer")
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
    .style("transform-origin","50% 50%")
    .style("stroke-linecap", "round")
    .style("stroke-width", "20px")
    //.on("click", (d)=>{ transitionBlob()})

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
  //console.log(nucleus_position)
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
    //console.log("y")
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
    transitionBlob()

}

function sineWaver(){

  const ht = 600
  const wd = window.innerWidth*0.95

  const lineNum = 1800

  const svgC = d3.select(".svgContainer")

  svgC.style("opacity", "0%")

  svgC.transition().duration(4000)
  .style("opacity", "100%")

  const lineFunc = d3.line()
  .x((d)=> { return d.x})
  .y((d)=> { return d.y})

  const lineGroup = svgC.append("g")
  const lineSize = 15 // this has rnd(10) added to it
  let target_x = Math.random()*wd
  let target_y = Math.random()*ht

  const colourFunc = d3.scaleLinear()
  .range(["green","yellow", "orange", "red", "magenta", "purple"])
  .domain([0,0.15,0.3,0.5,0.75,1])

  let maxDist = getMaxDist(ht, wd, target_x, target_y)



  for (i=0;i<lineNum;i++) {

  let targetData = [{"x": target_x, "y":target_y,"rx":(Math.random()*(wd*1.2)) - (wd*0.1), "ry":(Math.random()*(ht*1.2)) - (ht*0.1)}]
  let tmp = "path_" + i

    let path = lineGroup.selectAll(tmp)
    .data(targetData)
    .enter()

    path.append("path")
    .attr("class", "line")
    .attr("id", tmp)
    .attr("d", function(d) {


      return getLineData(d.x, d.y, d.rx, d.ry)})
    .attr("fill", "none")
    .style("stroke", ()=> {
      return colourFunc(Math.random())

    })
    .style("stroke-width", "2px")


  }

  function newData() {

  setTimeout(function() {

    target_x = Math.random()*wd
    target_y = Math.random()*ht

  for (i=0;i<lineNum;i++) {

    let str = "#path_" + i
    let dt = d3.select(str)
    .data()

  let clickedData = [
    {"x": target_x,
    "y":target_y,
    "rx":dt[0].rx,
    "ry":dt[0].ry}
  ]
  //console.log(clickedData)
  let thisPath = d3.select(str)

  thisPath
  .data(clickedData)
  .enter()

  thisPath.transition()
  .duration(3000)
  .ease(d3.easeLinear)
  .attr("d", function(d) {

    return getLineData(d.x, d.y, d.rx, d.ry)})

  } //for i
  requestAnimationFrame(newData)
  }, 3200)

  } //newData

  //
  target_x = Math.random()*wd
  target_y = Math.random()*ht

for (i=0;i<lineNum;i++) {

  let str = "#path_" + i
  let dt = d3.select(str)
  .data()

let clickedData = [
  {"x": target_x,
  "y":target_y,
  "rx":dt[0].rx,
  "ry":dt[0].ry}
]
//console.log(clickedData)
let thisPath = d3.select(str)

thisPath
.data(clickedData)
.enter()

thisPath.transition()
.duration(3000)
.ease(d3.easeLinear)
.attr("d", function(d) {

  return getLineData(d.x, d.y, d.rx, d.ry)})

}
  //

  requestAnimationFrame(newData)

  function pythag(x,y) {

  return Math.sqrt(x*x + y*y)
  }

  function getMaxDist(height, width, x, y) {

  let one = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
  let two = Math.sqrt(Math.pow((width-x), 2) + Math.pow(y, 2))
  let three = Math.sqrt(Math.pow((width-x), 2) + Math.pow((height-y), 2))
  let four = Math.sqrt(Math.pow(x, 2) + Math.pow(height-y, 2))

  let mX = d3.max([one, two, three, four])

    return mX
  }



  function getLineData(tx,ty, x1, y1) {


  let xDist = tx - x1
  let yDist = ty - y1

  let diagonalDistance = pythag(xDist, yDist)
  let mxDist = getMaxDist(ht,wd,tx,ty)

  let angle = (diagonalDistance/mxDist) * 5 + (0.2*(Math.random()*2-1))
  let siZe = (lineSize + Math.random()*10) // hypotenuse of triangle

  let x2 = x1 + Math.sin(angle) * siZe
  let y2 = y1 + Math.cos(angle) * siZe

  let lineData = [
    {"x":x1, "y":y1},
    {"x":x2, "y":y2}
  ]
  //console.log(lineData)


  return lineFunc(lineData)
  }

}

function sparkler() {
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
  const svgC = d3.select(".svgContainer")
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

}

function rainbowThing() {
  const ht = 500
  const wd = window.innerWidth * 0.95

  const svgC = d3.select(".svgContainer")
  .append("svg")
  .attr("height", ht)
  .attr("width", wd)


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
  .attr("y", ht*0.1)
  .attr("height", ht*0.8)
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

  //console.log("happening")
    let cirk = svgC.selectAll(".test_circle") // join the new data
    .data(newData)

    let cirkEnter = cirk.enter()

    cirk.merge(cirkEnter)

  cirk.transition()
  .duration(100)
  .attr("fill", function(d) {
    return d3.interpolateRainbow(d)
  })
  requestAnimationFrame(updateData)
}, 50)
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

}

function hundredLines() {

  const size = 500
  const ht = size
  const wd = window.innerWidth*0.97
  const svgC = d3.select(".svgContainer").append("svg")

  let moving = true
  const colourArray = [
    ["#ff1493","#120052","#652ec7", "#00c2ba", "#82e0bf","#ff1493"],
    ["#FF3C00", "#FF7600", "#FF9D00", "#FF6701", "#FF3C00"],
    ["#050305", "#120a3d", "#412854", "#4cc35b", "#68da23", "#050305"],
    ["#b7ff00", "#7eff00", "#46c34c", "#479f78", "#cfffb1", "#b7ff00"],
    ["#00ff45", "#40f916", "#89ff00", "#00ff11", "#75ff0a","#00ff45"],
    ["#fb00be", "#ff0000", "#ff00ce", "#ff07a9", "#ee006c", "#fb00be"],
    ["#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4b0082", "#ee82ee","#ff0000"]
  ]
  let colourAmount = colourArray.length

  const pathGroup = svgC.append("g")
  .attr("class", "spinner")
  .style("transform-origin", ()=>{return wd/2 + " " + ht/2})


  const lineFunc = d3.line()
  .x((d)=> { return d.x})
  .y((d)=> { return d.y})
  .curve(d3.curveLinear)

  const data = linesAndLinesTwo()

  let myCol = d3.scaleLinear()

  //console.log(data)

  const paths = pathGroup.selectAll("path")
  .data(data)
  .enter()

  let tmpDex = Math.floor(Math.random()*colourArray.length)

  paths.append("path")
  .attr("class", "hundredLines")
  .attr("d", (d)=>{return lineFunc(d)})
  .attr("fill", "none")
  .style("stroke", (d,i)=>{

    myCol.range(colourArray[tmpDex])
    .domain(d3.ticks(0,1,colourArray[tmpDex].length))
  return myCol(i/99)

    //return d3.interpolateRainbow(i/99)

  })

  function autoSelector() {
    if (moving) {
  setTimeout(()=>{
     const funcs = [
       linesAndLinesTwo(),
       doubleSpiroStar(),
       smallerSpiroStar(),
       triangleTippedWheel(),
       wobbleStar(),
       fourAngleCircle(),
       fourCircle(),
       madness(),
       chevronStar(),
       superMegaStar(),
       megaSpiroStar(),
       megaStar(),
        geometricStarCannonTwo(),
       geometricStarCannon(),
       circleWheelInside(),
       circleWheel(),
       manyPointStar(),
       madStar(),
      weirdStar(),
      lineStar(),
      linesAndLines(),
      angleWheelL(),
      angleWheelR(),
      fivePointStar(),
      fiftyPointStar()
    ]

    const cols = [
      d3.interpolateRainbow(),
      d3.interpolateTurbo(),
      d3.interpolateMagma()
    ]


    let num = funcs.length
    let colNum = cols.length
    let index = Math.floor(Math.random()*num)
    let newData = funcs[index]
    let colIndex = Math.floor(Math.random()*colNum)
    let col = cols[colNum]
    let numo = Math.random()*2

    tmpDex = Math.floor(Math.random()*colourArray.length)
    //retain colour - make some that chnage it up.
    pathGroup.selectAll("path")
    .data(newData)
    .transition()
    .duration(2500)
    .ease(d3.easeLinear)
    .attr("d", (d)=>{return lineFunc(d)})
    .style("stroke", (d,i)=>{
      myCol.range(colourArray[tmpDex])
      .domain(d3.ticks(0,1,colourArray[tmpDex].length))
    return myCol(i/99)
    })


  requestAnimationFrame(autoSelector)

  },3000)
  } //if moving

  }

  requestAnimationFrame(autoSelector)



  function fivePointStar() { //f5
    /*
  creates arrays of inner points and outer points
  it's a total badBoy
  then returns 10 paths that make up each line between those points
    */
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
  let inner_rad = rad/2
  let outer = []
  let inner = []
  let inward = true

  for (i=0;i<5;i++) {
    let vi = i + 0.5
    let x = cx + rad * Math.cos(2 * Math.PI * i / 5)
    let y = cy + rad * Math.sin(2 * Math.PI * i / 5)
    outer.push({x:x,y:y})
    let x_two = cx + inner_rad * Math.cos(2 * Math.PI * vi / 5)
    let y_two = cy + inner_rad * Math.sin(2 * Math.PI * vi / 5)
      inner.push({x:x_two,y:y_two})

  }

  let stx, sty, fx, fy

  outer.push(outer[0])
  //inner + outer compiled
  let oC = 0
  let iC = 0

  for (j=0;j<10;j++){
  if (inward) {
  //inward
  stx = outer[oC].x
  sty = outer[oC].y

  fx = inner[iC].x
  fy = inner[iC].y

  oC = oC + 1
  }else{
  //outward
    stx = inner[iC].x
    sty = inner[iC].y

    fx = outer[oC].x
    fy = outer[oC].y

    iC = iC +1
  }

  for (i=0;i<10;i++){

    let x = stx + ((fx - stx)*((i)/10))
    let y = sty + ((fy - sty)*((i)/10))
    let x2 = stx + ((fx - stx)*((i+1)/10))
    let y2 = sty + ((fy - sty)*((i+1)/10))

    dataset.push([{x: x, y:y},{x: x2, y:y2}])

  }
  inward = !inward
  }

   return dataset
  }

  function lineStar() { //f4
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])


    for (i=0;i<100;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 100);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 100);
      let x2 = cx
      let y2 = cy


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    return dataset
  }

  function linesAndLines() { //f4
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])


    for (i=0;i<100;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 200);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 200);
      let x2 = cx + rad * Math.cos(2 * Math.PI * -i / 200)
      let y2 = cy + rad * Math.sin(2 * Math.PI * -i / 200)


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    return dataset
  }

  function linesAndLinesTwo() { //f4
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])


    for (i=0;i<50;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 100);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 100);
      let x2 = cx + rad * Math.cos(2 * Math.PI * -i / 100)
      let y2 = cy + rad * Math.sin(2 * Math.PI * -i / 100)


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    for (i=0;i<50;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * (i+25) / 100);
      let y = cy + rad * Math.sin(2 * Math.PI * (i+25) / 100);
      let x2 = cx + rad * Math.cos(2 * Math.PI * (-i+25) / 100)
      let y2 = cy + rad * Math.sin(2 * Math.PI * (-i+25) / 100)


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }



    return dataset
  }

  function triangleTippedWheel() { //f4
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let radDip = 0.25 + Math.random()*0.75


    for (i=0;i<25;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * (i-0.5) / 25);
      let y = cy + rad * Math.sin(2 * Math.PI * (i-0.5) / 25);
      let x2 = cx + rad * Math.cos(2 * Math.PI * (i+0.5) / 25);
      let y2 = cy + rad * Math.sin(2 * Math.PI * (i+0.5) / 25);

      dataset.push([{x: x, y:y},{x: x2, y:y2}])

       x = cx + rad * Math.cos(2 * Math.PI * (i+0.5) / 25);
       y = cy + rad * Math.sin(2 * Math.PI * (i+0.5) / 25);
       x2 = cx + (rad*radDip) * Math.cos(2 * Math.PI * (i+0.5) / 25);
       y2 = cy + (rad*radDip) * Math.sin(2 * Math.PI * (i+0.5) / 25);

      dataset.push([{x: x, y:y},{x: x2, y:y2}])

       x = cx + (rad*radDip) * Math.cos(2 * Math.PI * (i+0.5) / 25);
       y = cy + (rad*radDip) * Math.sin(2 * Math.PI * (i+0.5) / 25);
       x2 = cx + rad * Math.cos(2 * Math.PI * (i-0.5) / 25);
       y2 = cy + rad * Math.sin(2 * Math.PI * (i-0.5) / 25);

      dataset.push([{x: x, y:y},{x: x2, y:y2}])

       x = cx + (rad*radDip) * Math.cos(2 * Math.PI * (i+0.5) / 25);
       y = cy + (rad*radDip) * Math.sin(2 * Math.PI * (i+0.5) / 25);
       x2 = cx
       y2 = cy

      dataset.push([{x: x, y:y},{x: x2, y:y2}])

    }

    return dataset
  }

  function wobbleStar() { //f4
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
  let k = 0
  let tmp = 0
  let wobDepth = 1 + Math.random()*4

    for (i=0;i<10;i++){

      for (j=0;j<5;j++) {
        tmp = rad - ((j/5)*(rad/wobDepth))
        let x = cx + tmp * Math.cos(2 * Math.PI * k / 100);
        let y = cy + tmp * Math.sin(2 * Math.PI * k / 100);
        let x2 = cx
        let y2 = cy
        dataset.push([{x: x, y:y},{x: x2, y:y2}])
        k++
      }

      for (j=4;j>-1;j--) {
        tmp = rad - ((j/5)*(rad/wobDepth))
        let x = cx + tmp * Math.cos(2 * Math.PI * k / 100);
        let y = cy + tmp * Math.sin(2 * Math.PI * k / 100);
        let x2 = cx
        let y2 = cy
        dataset.push([{x: x, y:y},{x: x2, y:y2}])
        k++
      }



    }

    return dataset
  }

  function fourCircle() { //f4
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad2 = rad*0.75
    let rad3 = rad*0.5
    let rad4 = rad*0.25


    for (i=0;i<25;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 25);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 25);
      let x2 = cx + rad * Math.cos(2 * Math.PI * (i+1) / 25);
      let y2 = cy + rad * Math.sin(2 * Math.PI * (i+1) / 25)

      dataset.push([{x: x, y:y},{x: x2, y:y2}])

       x = cx + rad2 * Math.cos(2 * Math.PI * i / 25);
       y = cy + rad2 * Math.sin(2 * Math.PI * i / 25);
       x2 = cx + rad2 * Math.cos(2 * Math.PI * (i+1) / 25);
       y2 = cy + rad2 * Math.sin(2 * Math.PI * (i+1) / 25)

      dataset.push([{x: x, y:y},{x: x2, y:y2}])

       x = cx + rad3 * Math.cos(2 * Math.PI * i / 25);
       y = cy + rad3 * Math.sin(2 * Math.PI * i / 25);
       x2 = cx + rad3 * Math.cos(2 * Math.PI * (i+1) / 25);
       y2 = cy + rad3 * Math.sin(2 * Math.PI * (i+1) / 25)

      dataset.push([{x: x, y:y},{x: x2, y:y2}])

       x = cx + rad4 * Math.cos(2 * Math.PI * i / 25);
       y = cy + rad4 * Math.sin(2 * Math.PI * i / 25);
       x2 = cx + rad4 * Math.cos(2 * Math.PI * (i+1) / 25);
       y2 = cy + rad4 * Math.sin(2 * Math.PI * (i+1) / 25)

      dataset.push([{x: x, y:y},{x: x2, y:y2}])



    }

    return dataset
  }

  function fourAngleCircle() { //f4
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad2 = rad*0.75
    let rad3 = rad*0.5
    let rad4 = rad*0.25


    for (i=0;i<25;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 25);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 25);
      let x2 = cx + (rad*0.9) * Math.cos(2 * Math.PI * (i+2) / 25);
      let y2 = cy + (rad*0.9) * Math.sin(2 * Math.PI * (i+2) / 25)

      dataset.push([{x: x, y:y},{x: x2, y:y2}])

       x = cx + rad2 * Math.cos(2 * Math.PI * i / 25);
       y = cy + rad2 * Math.sin(2 * Math.PI * i / 25);
       x2 = cx + (rad2*0.9) * Math.cos(2 * Math.PI * (i+2) / 25);
       y2 = cy + (rad2*0.9) * Math.sin(2 * Math.PI * (i+2) / 25)

      dataset.push([{x: x, y:y},{x: x2, y:y2}])

       x = cx + rad3 * Math.cos(2 * Math.PI * i / 25);
       y = cy + rad3 * Math.sin(2 * Math.PI * i / 25);
       x2 = cx + (rad3*0.9) * Math.cos(2 * Math.PI * (i+2) / 25);
       y2 = cy + (rad3*0.9) * Math.sin(2 * Math.PI * (i+2) / 25)

      dataset.push([{x: x, y:y},{x: x2, y:y2}])

       x = cx + rad4 * Math.cos(2 * Math.PI * i / 25);
       y = cy + rad4 * Math.sin(2 * Math.PI * i / 25);
       x2 = cx + (rad4*0.9) * Math.cos(2 * Math.PI * (i+2) / 25);
       y2 = cy + (rad4*0.9) * Math.sin(2 * Math.PI * (i+2) / 25)

      dataset.push([{x: x, y:y},{x: x2, y:y2}])



    }

    return dataset
  }

  function madness() { //f4
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])


    for (i=0;i<100;i++){

      let rnd = Math.random()*100
      let x = cx + rad * Math.cos(2 * Math.PI * rnd / 100);
      let y = cy + rad * Math.sin(2 * Math.PI * rnd / 100);

  rnd = Math.random()*100

      let x2 = cx + rad * Math.cos(2 * Math.PI * rnd / 100);
      let y2 = cy + rad * Math.sin(2 * Math.PI * rnd / 100);


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    return dataset
  }

  function angleWheelR() { //f2
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad_two = Math.random()*(rad)

    for (i=0;i<100;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 100);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 100);
      let x2 = cx + rad_two * Math.cos(2 * Math.PI * (i+2) / 100);
      let y2 = cy + rad_two * Math.sin(2 * Math.PI * (i+2) / 100);


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    return dataset
  }

  function madStar() {
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad_two = Math.random()*(rad)

    for (i=0;i<100;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 100);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 100);
      let x2 = cx + rad_two * Math.cos(2 * Math.PI * (i+50) / 100);
      let y2 = cy + rad_two * Math.sin(2 * Math.PI * (i+50) / 100);


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    return dataset
  }

  function megaStar() {
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad_two = Math.random()*(rad)

    for (i=0;i<100;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 200);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 200);
      let x2 = cx + rad * Math.cos(2 * Math.PI * (i+100) / 200);
      let y2 = cy + rad * Math.sin(2 * Math.PI * (i+100) / 200);


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    return dataset
  }

  function chevronStar() {
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad_two = rad/2
    let depth = 2 + Math.random()*20

    for (i=0;i<50;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 50);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 50);
      let x2 = cx + rad_two * Math.cos(2 * Math.PI * (i+depth) / 50);
      let y2 = cy + rad_two * Math.sin(2 * Math.PI * (i+depth) / 50);

      dataset.push([{x: x, y:y},{x: x2, y:y2}])
      dataset.push([{x: x2, y:y2},{x: cx, y:cy}])

    }

    return dataset
  }

  function superMegaStar() {
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.max([(ht/2)+20, (wd/2)+20])


    for (i=0;i<100;i++){
      let x = cx + (rad * 2) * Math.cos(2 * Math.PI * i / 200);
      let y = cy + (rad * 2) * Math.sin(2 * Math.PI * i / 200);
      let x2 = cx + (rad * 2) * Math.cos(2 * Math.PI * (i+100) / 200);
      let y2 = cy + (rad * 2) * Math.sin(2 * Math.PI * (i+100) / 200);


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    return dataset
  }

  function megaSpiroStar() {
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad_two = Math.random()*(rad)
    let newDist = Math.random()*60 + 20

    for (i=0;i<100;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 100);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 100);
      let x2 = cx + rad * Math.cos(2 * Math.PI * (i+newDist) / 100);
      let y2 = cy + rad * Math.sin(2 * Math.PI * (i+newDist) / 100);


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    return dataset
  }

  function smallerSpiroStar() {
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
  rad = rad*0.25 + rad*Math.random()*0.75
    let newDist = Math.random()*60 + 20

    for (i=0;i<100;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 100);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 100);
      let x2 = cx + rad * Math.cos(2 * Math.PI * (i+newDist) / 100);
      let y2 = cy + rad * Math.sin(2 * Math.PI * (i+newDist) / 100);


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    return dataset
  }

  function doubleSpiroStar() {
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
  rad = rad*0.25 + rad*Math.random()*0.5
    let newDist = Math.random()*60 + 20

    for (i=0;i<50;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 50);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 50);
      let x2 = cx + rad * Math.cos(2 * Math.PI * (i+newDist) / 50);
      let y2 = cy + rad * Math.sin(2 * Math.PI * (i+newDist) / 50);


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    rad = d3.min([(ht/2)-20, (wd/2)-20])

    for (i=0;i<50;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 50);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 50);
      let x2 = cx + rad * Math.cos(2 * Math.PI * (i+newDist) / 50);
      let y2 = cy + rad * Math.sin(2 * Math.PI * (i+newDist) / 50);


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }






    return dataset
  }

  function manyPointStar() {

    //make a ziggy zagger
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad_two = Math.random()*(rad*0.6)
    let up = true

  for (k=0;k<5;k++) {
  let tmp = []

    for (i=0;i<20;i++){
  let iV = i + (k*0.5)
    if (up) {
      let x = cx + rad * Math.cos(2 * Math.PI * iV / 20);
      let y = cy + rad * Math.sin(2 * Math.PI * iV / 20);

      let x2 = cx + rad_two * Math.cos(2 * Math.PI * (iV+1) / 20);
      let y2 = cy + rad_two * Math.sin(2 * Math.PI * (iV+1) / 20);

  up = !up
      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }else{
      let x = cx + rad_two * Math.cos(2 * Math.PI * iV / 20);
      let y = cy + rad_two * Math.sin(2 * Math.PI * iV / 20);

      let x2 = cx + rad * Math.cos(2 * Math.PI * (iV+1) / 20);
      let y2 = cy + rad * Math.sin(2 * Math.PI * (iV+1) / 20);

  up = !up
      dataset.push([{x: x, y:y},{x: x2, y:y2}])

    }

  } //i
  }//k

    return dataset
  }

  function fiftyPointStar() { //f2

    //make a ziggy zagger
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad_two = Math.random()*(rad*0.6)
    let up = true

    for (i=0;i<100;i++){

    if (up) {
      let x = cx + rad * Math.cos(2 * Math.PI * i / 100);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 100);

      let x2 = cx + rad_two * Math.cos(2 * Math.PI * (i+1) / 100);
      let y2 = cy + rad_two * Math.sin(2 * Math.PI * (i+1) / 100);

  up = !up
      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }else{
      let x = cx + rad_two * Math.cos(2 * Math.PI * i / 100);
      let y = cy + rad_two * Math.sin(2 * Math.PI * i / 100);

      let x2 = cx + rad * Math.cos(2 * Math.PI * (i+1) / 100);
      let y2 = cy + rad * Math.sin(2 * Math.PI * (i+1) / 100);

  up = !up
      dataset.push([{x: x, y:y},{x: x2, y:y2}])

    }
    }

    return dataset
  }

  function weirdStar() { //f2

    //make a ziggy zagger
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad_two = Math.random()*(rad*0.6)
    let up = true

    for (i=0;i<100;i++){

    if (up) {
      let x = cx + rad * Math.cos(2 * Math.PI * i / 100);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 100);

      let x2 = cx + rad_two * Math.cos(3 * Math.PI * (i+1) / 100);
      let y2 = cy + rad_two * Math.sin(3 * Math.PI * (i+1) / 100);

  up = !up
      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }else{
      let x = cx + rad_two * Math.cos(3 * Math.PI * i / 100);
      let y = cy + rad_two * Math.sin(3 * Math.PI * i / 100);

      let x2 = cx + rad * Math.cos(2 * Math.PI * (i+1) / 100);
      let y2 = cy + rad * Math.sin(2 * Math.PI * (i+1) / 100);

  up = !up
      dataset.push([{x: x, y:y},{x: x2, y:y2}])

    }
    }

    return dataset
  }

  function angleWheelL() { //f3
    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad_two = Math.random()*(rad)

    for (i=0;i<100;i++){
      let x = cx + rad * Math.cos(2 * Math.PI * i / 100);
      let y = cy + rad * Math.sin(2 * Math.PI * i / 100);
      let x2 = cx + rad_two * Math.cos(2 * Math.PI * (i-2) / 100);
      let y2 = cy + rad_two * Math.sin(2 * Math.PI * (i-2) / 100);


      dataset.push([{x: x, y:y},{x: x2, y:y2}])
    }

    return dataset
  }

  function circleWheel() {  //f1
  let dataset = []
  let cx = wd/2
  let cy = ht/2
  let rad = d3.min([(ht/2)-20, (wd/2)-20])

  for (i=0;i<50;i++){
    let x = cx + rad * Math.cos(2 * Math.PI * i / 50);
    let y = cy + rad * Math.sin(2 * Math.PI * i / 50);
    let x2 = cx + rad * Math.cos(2 * Math.PI * (i+1) / 50);
    let y2 = cy + rad * Math.sin(2 * Math.PI * (i+1) / 50);

    dataset.push([{x: x, y:y},{x: x2, y:y2}])

     x = cx + rad * Math.cos(2 * Math.PI * i / 50);
     y = cy + rad * Math.sin(2 * Math.PI * i / 50);
     x2 = cx
     y2 = cy

    dataset.push([{x: x, y:y},{x: x2, y:y2}])

  }

  return dataset
  }

  function circleWheelInside() {  //f1
  let dataset = []
  let cx = wd/2
  let cy = ht/2
  let rad = d3.min([(ht/2)-20, (wd/2)-20])
  let rad_two = rad*0.75

  for (i=0;i<50;i++){
    let x = cx + rad_two * Math.cos(2 * Math.PI * i / 50);
    let y = cy + rad_two * Math.sin(2 * Math.PI * i / 50);
    let x2 = cx + rad_two * Math.cos(2 * Math.PI * (i+1) / 50);
    let y2 = cy + rad_two * Math.sin(2 * Math.PI * (i+1) / 50);

    dataset.push([{x: x, y:y},{x: x2, y:y2}])

     x = cx + rad * Math.cos(2 * Math.PI * i / 50);
     y = cy + rad * Math.sin(2 * Math.PI * i / 50);
     x2 = cx
     y2 = cy

    dataset.push([{x: x, y:y},{x: x2, y:y2}])

  }

  return dataset
  }

  function geometricStarCannon() {

    let dataset = []
    let cx = wd/2
    let cy = ht/2
    let rad = d3.min([(ht/2)-20, (wd/2)-20])
    let rad_two = rad*0.1

    for (i=0;i<10;i++){
  let ncx = cx + rad * Math.cos(2 * Math.PI * i / 10)
  let ncy = cy + rad * Math.sin(2 * Math.PI * i / 10)
    for (j=0;j<10;j++) {
      let x = ncx + rad * Math.cos(2 * Math.PI * j / 10)
      let y = ncy + rad * Math.sin(2 * Math.PI * j / 10)
      let x2 = ncx + rad * Math.cos(2 * Math.PI *( j+1) / 10)
      let y2 = ncy + rad * Math.sin(2 * Math.PI *( j + 1) / 10)
      dataset.push([{x: x, y:y},{x: x2, y:y2}])

    }
    }
    return dataset
  }

  function geometricStarCannonTwo() {

      let dataset = []
      let cx = wd/2
      let cy = ht/2
      let rad = d3.min([(ht/2)-20, (wd/2)-20])
      let rad_two = rad*0.1

      for (i=0;i<20;i++){
    let ncx = cx + rad * Math.cos(2 * Math.PI * i / 20)
    let ncy = cy + rad * Math.sin(2 * Math.PI * i / 20)
      for (j=0;j<5;j++) {
        let x = ncx + rad * Math.cos(2 * Math.PI * j / 5)
        let y = ncy + rad * Math.sin(2 * Math.PI * j / 5)
        let x2 = ncx + rad * Math.cos(2 * Math.PI *( j+1) / 5)
        let y2 = ncy + rad * Math.sin(2 * Math.PI *( j + 1) / 5)
        dataset.push([{x: x, y:y},{x: x2, y:y2}])

      }
      }
      return dataset
  }

}
