const ht = 120;
const wd = 200;


d3.select("body").style(
  "background-color",
  "white"
);

var loadR = d3
  .select(".graphs")
  .append("svg")
  .attr("height", 50)
  .attr("width", 200);

loadR
  .append("rect")
  .attr("height", 20)
  .attr("width", 0.1)
  .attr("x", 10)
  .attr("y", 15)
  .attr("fill", "#377eb8")
  .transition()
  .duration(2000)
  .attr("width", 180)
  .on("end", function () {
    d3.select(this).remove();
  });

const viewboxString = "0 0 " + ht + " " + wd;
const svgC = d3
  .select("svg")
  //.attr("height", ht).attr("width", wd);

  .attr("preserveAspectRatio", "xMinYMin meet")
  .attr("viewBox", "0 0 200 120");

const dt = d3.csv("ecdcCOV19-08072020.csv");
dt.then(function (data) {
  /* FILTERING DATA FOR :
United_States_of_America
BRAZIL
UK
ITALY
MEXICO
FRANCE
Spain
INDIA
Iran
* These countries have the 9 highest cumulative deaths from COVID 19
I have not worked it out in this module as it is tricky to do 'on the fly'
without expensively looping through evrything.
For the purposes of this, it will suffice.
*/
  const dataUS = data.filter(function (d) {
    return d.geoId == "US";
  });

  const dataBR = data.filter(function (d) {
    return d.geoId == "BR";
  });

  const dataUK = data.filter(function (d) {
    return d.geoId == "UK";
  });

  const dataMX = data.filter(function (d) {
    return d.geoId == "MX";
  });

  const dataFR = data.filter(function (d) {
    return d.geoId == "FR";
  });

  const dataES = data.filter(function (d) {
    return d.geoId == "ES";
  });

  const dataIN = data.filter(function (d) {
    return d.geoId == "IN";
  });

  const dataIT = data.filter(function (d) {
    return d.geoId == "IT";
  });

  const dataIR = data.filter(function (d) {
    return d.geoId == "IR";
  });

  // DATA LOADED
  const allData = [
    dataUS,
    dataBR,
    dataUK,
    dataIT,
    dataMX,
    dataFR,
    dataES,
    dataIN,
    dataIR,
  ];

  const timeConv = d3.timeParse("%d/%m/%Y");
  const Maximums = [];

  loadR.transition().duration(1500).attr("width", 40);

  for (i = 0; i < allData.length; i++) {
    let dmx = 0;
    let cmx = 0;
    let dtmx = [];

    allData[i].forEach((d) => {
      let dt = d.dateRep.split("/");
      let nDat = dt[1] + "-" + dt[0] + "-" + dt[2];
      //above: absolute hack for the date. could do better!

      d.cases = parseInt(d.cases);
      d.deaths = d3.max([parseInt(d.deaths), 0]);
      d.popData2019 = parseInt(d.popData2019);
      d.dateRep = new Date(nDat);

      dmx = d3.max([dmx, d.deaths]);
      cmx = d3.max([cmx, d.cases]);
      dtmx = d3.max([dtmx, d.dateRep]);
    });

    dtmx = d3.extent(allData[i], function (d) {
      return d.dateRep;
    });

    Maximums.push({
      geoId: allData[i][0].geoId,
      caseMax: cmx,
      deathMax: dmx,
      dateExt: dtmx,
    });
  } // for loop - sorting out data types and getting Max's

  let dateFilter = new Date("03-01-20");

  const filDat = [];
  for (i = 0; i < 9; i++) {
    filDat.push(
      allData[i].filter(function (d) {
        return d.dateRep > dateFilter;
      })
    );
  }
  
  const avline = averLine(filDat, 10);

  const padding = 5;
  const padBottom = ht * 0.15;
  const padLeft = wd * 0.15;
  const xScale = d3.scaleTime().range([padLeft, wd - padLeft]);

  const yScale = d3.scaleLinear().range([ht - padBottom - padding, 0]);

  const yScaleD = d3.scaleLinear().range([ht - padBottom, 0]);

  const yAxis = d3.axisLeft().ticks(5).scale(yScale);
  const xAxis = d3.axisBottom().ticks(5).scale(xScale);

  const line = d3
    .line()
    .x(function (d) {
      return xScale(d.dateRep);
    })
    .y(function (d) {
      return yScaleD(d.deaths);
    });

  // *************** DRAWING LOOP ENGAGE ***************//
  const dLen = allData.length;

  for (j = 0; j < 3; j++) {
    let iD = "#container_" + j;
    for (i = 0; i < 3; i++) {
      let indexNo = j * 3 + i;
      var newDiv = d3
        .select(iD)
        .append("div")
        .attr("class", "holder")
        .style("min-width", "30%");

      xScale.domain([dateFilter, Maximums[indexNo].dateExt[1]]); //just testing. will loop through.
      yScale.domain([0, Maximums[indexNo].deathMax]);
      yScaleD.domain([0, Maximums[indexNo].deathMax]);

      var svgEl = newDiv
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 200 120");

      svgEl
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0 " + (ht - padBottom) + ")")
        .call(xAxis);

      svgEl
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + padLeft + " " + padding + ")")
        .call(yAxis);

      
      const lines = svgEl
        .selectAll("lines")
        .data(filDat[indexNo])
        .enter()
        .append("g");

      lines
        .append("path")
        .attr("class", function (d) {
          return d.geoId;
        })
        .attr("d", function (d) {
          return line(avline[indexNo]);
        })
        .attr("fill", "none")
        .attr("stroke", () => {
          return "red";
        })
        .attr("stroke-width", "0.5");

      yScale.domain([Maximums[indexNo].deathMax, 0]);

      let svgLink = filDat[indexNo][1].geoId + ".svg";
      let geoClass = filDat[indexNo][1];
  

      newDiv
        .append("img")
        .attr("class", "flag")
        .attr("src", svgLink)
        .attr("height", 20)
        .attr("width", 20);

      const bars = svgEl
        .selectAll("bars")
        .data(filDat[indexNo])
        .enter()
        .append("g");

      let bWidth = (wd - 5 - padLeft) / filDat[indexNo].length;
      bars
        .append("rect")
        .attr("height", (d) => {
          return yScale(d.deaths);
        })
        .attr("width", bWidth)
        .attr("x", function (d) {
          return xScale(d.dateRep);
        })
        .attr("y", (d) => {
          return ht - padBottom - yScale(d.deaths);
        })
        .attr("fill", () => {
          return d3.schemeSet1[indexNo];
        })
        .style("fill-opacity", "50%");
    } //for loop drawing  i
  } //j

  d3.selectAll(".axis").style("font-size", 5).style("stroke-width", 0.5);

  const slider = d3.select(".slider").on("change", function () {
    let scope = this.value;
     let newData = averLine(filDat, scope);
    console.log(newData);
    console.log(scope);
    for (i = 0; i < 9; i++) {
      let geoClass = "." + filDat[i][0].geoId;

      console.log(geoClass);
      yScaleD.domain([0, Maximums[i].deathMax]);

      d3.selectAll(geoClass)
        .transition()
        .duration(1000)
        .attr("d", function (d) {
          return line(newData[i]);
        });
    }
    d3.select(".sliderText").text(
      "Line data represents the average of the " + scope + " previous days."
    );

    d3.select(".iconAttribution").style("opacity", "100%");
  });
}); //csv load

function averLine(data, scope) {
   let avScope = 2 * Math.floor(scope / 2);
  let avScopeHalf = avScope / 2;
  avline = [];
  for (j = 0; j < data.length; j++) {
    let tempArr = [];
    let limit = data[j].length;
    for (i = avScope; i < limit; i++) {
      let nums = 0;
      for (k = -avScope; k < 0; k++) {
        nums = nums + data[j][i + k].deaths;
      } // k

      let average = nums / avScope;
     
      try {
        tempArr.push({
          deaths: average,
          dateRep: data[j][i - avScope].dateRep,
        });
      } catch {
        console.log(i + " " + j + " " + k);
      }
    } // i

    avline.push(tempArr);
  } // j
  return avline;
} 