
const size = 500
const ht = size
const wd = window.innerWidth*0.97



const svgC = d3.select(".svgContainer").append("svg")

.attr("height", ht)
.attr("width", wd)

.on("click", ()=>{
  theSelector()
})

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


function theSelector() {

if(!moving) {
  moving = true
  requestAnimationFrame(autoSelector)
}else{
  moving = false
}
}

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
