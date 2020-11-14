//imoprve this by making a slice viewbox for the art work icture.,


let dt = d3.json("blog.json")
dt.then((dtta)=>{


  dtta.blogItems.forEach((item, i) => {

    let data = item
    console.log(data)

    let card = d3.select(".leftcolumn")
    .append("div")
    .attr("class", "card colourPath")
    .style("border-color", col)
    .on("click", ()=>{
      window.open(data.url, '_self')
    })

    card.append("h4")
    .text(data.heading)


    card.append("h6")
    .text(data.description + " " + data.dateCreated)


let imgDiv = card.append("div")
.style("height", "100")
.attr("class", "cardImage")
.style("overflow", "hidden")

    imgDiv.append("img")
    .attr("src", data.image)
  //  .attr("preserveAspectRatio", "xMidYMax slice")

    card.append("br")
    card.append("p")
    .attr("class", "cardText")
    .text(data.text)

  });





})
