/*
var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        return "Hello Tip";
    })

var svgSelection = bodySelection.append("svg")
    .attr("width", 200)
    .attr("height", 200);
svgSelection.call(tip);
*/
let cities;


d3.csv('cities.csv', d3.autoType).then(data=>{
    console.log('cities', data);
    cities = data.filter( d => {
        if(d.eu == true){
            return d;
        }
    })
    console.log("European cities",cities)

    d3.select(".city-count").text("Number of cities: " + cities.length);
    const width = 700;
    const height = 550;

    const svg = d3
        .select('.population-plot')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    let circles = svg
        .selectAll('circle')
        .data(cities)
        .enter()
        .append('circle')
        .attr('fill', 'pink')
        .attr('cx', (d,i) => d.x)
        .attr('cy', (d,i) => d.y)
        .attr('r', (d,i) => {
            if(d.population < 1000000)
                return 4;
            else
                return 8;
        });
    
    let circle_labels = svg
        .selectAll('text')
        .data(cities)
        .enter()
        .append('text')
        .attr('x', (d, i) => d.x)
        .attr('y', (d, i) => d.y)
        .text((d, i) => {
            if (d.population >= 1000000)
                return d.city;
        })
        .attr('font-size', 11)
        .attr('text-anchor', 'middle')
        .attr('dx', -10)
        .attr('dy', +15);
})

let buildings;

d3.csv('buildings.csv', d3.autoType).then(data =>{
  buildings = data;
  buildings.sort((a, b) => parseInt(b.height_ft) - parseInt(a.height_ft));
  console.log("buildings by height", buildings);

  const bar_height = 35;
  const right_margin = 200;

  const svg = d3
    .select('.building-plot')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500);

  let bars = svg
    .selectAll('rect')
    .data(buildings)
    .enter()
    .append('rect')
    .attr('height', bar_height)
    .attr('width', (d, i) => d.height_px)
    .attr('fill', 'skyblue')
    .attr('x', right_margin)
    .attr('y', (d, i) => (bar_height+8)*i)
    .on('click', d=>{
        let data = d.path[0].__data__;
        d3.select('.image')
            .attr('src', (d,i) => 'img/'+data.image);
        d3.select('.building')
            .text(d=>data.building)
            .attr('font-size', 100);
        d3.select('.country')
            .text(d =>data.country);
        d3.select('.city')
            .text(d=>data.city);
        d3.select('.height')
            .text(d => data.height_ft +"ft");
        d3.select('.floors')
            .text(d =>data.floors);
        d3.select('.completed')
            .text(d => data.completed);
    });
 
    let bar_labels = svg
        .selectAll('text')
        .data(buildings)
        .enter()
        .append('text')
        .text((d,i) => d.building)
        .attr('y',(d,i) => (bar_height+9)*i+bar_height/2)
        .attr('font-size',13);
 
    let height_labels = svg
      .selectAll('.height_label')
      .data(buildings)
      .enter()
      .append('text')
      .text((d, i) => d.height_ft + 'ft')
      .attr('x', (d, i) => right_margin + d.height_px)
      .attr('y', (d, i) => (bar_height + 8) * i + bar_height / 2)
      .attr('text-anchor', 'end')
      .attr('font-size', 13);

})