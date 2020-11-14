console.log("datavis loaded")

let dt = d3.json("dataVis.json")
dt.then((fullData)=>{
let data = fullData.blogItems

let dataDiv = d3.select(".dataVizPage")


data.forEach((item, i) => {
  let dataCard = dataDiv
  .append("div")
  .attr("class", "dataCard colourPath")
  .style("border-color", col)
  .on("click", ()=>{
    window.open(item.url, '_self')
  })



  dataCard.append("h4")
  .text(item.heading)



let gridCont = dataCard.append("div")
.attr("class", "dataDetails")

//HERE! SORT OUT THE STYLES AND THROW IN A GRID THING
console.log(item)



gridCont.append("p")
  .text(item.text)
  .style("width", "80%")
  .style("height", "100%")
  .style("margin-right", "20px")


  gridCont.append("img")
    .attr("src", item.image)
    .attr("height", 120)
    .style("border-style", "solid")
    .style("border-color", "black")
    .style("border-width", "1px")
    .style("margin-bottom", "20px")



});




})
