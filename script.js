
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
        .attr('fill', 'skyblue')
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
        .attr('dx', 8)
        .attr('dy', -10);
})

let buildings;

d3.csv('buildings.csv', d3.autoType).then(data =>{
  buildings = data;
  buildings.sort((a, b) => parseInt(b.height_ft) - parseInt(a.height_ft));
  console.log("buildings by height", buildings);

  const bar_height = 40;
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
    .attr('fill', 'orange')
    .attr('x', right_margin)
    .attr('y', (d, i) => (bar_height+8)*i)
    .on('click', (d,i)=>{
        d3.select('.image')
            .attr('src', 'img/'+i.image);
        d3.select('.building')
            .text(i.building)
            .attr('font-size', 100);
        d3.select('.country')
            .text(i.country);
        d3.select('.city')
            .text(i.city);
        d3.select('.height')
            .text(i.height_ft +"ft");
        d3.select('.floors')
            .text(i.floors);
        d3.select('.completed')
            .text(i.completed);
    });
 
    let bar_labels = svg
        .selectAll('text')
        .data(buildings)
        .enter()
        .append('text')
        .text((d,i) => d.building)
        .attr('x', 5)
        .attr('y',(d,i) => (bar_height+8)*i+ bar_height/2)
        .attr('font-size',13);
 
    let height_labels = svg
      .selectAll('.height_label')
      .data(buildings)
      .enter()
      .append('text')
      .text((d, i) => d.height_ft + 'ft')
      .attr('x', (d, i) => right_margin + d.height_px-10)
      .attr('y', (d, i) => (bar_height + 8) * i + bar_height / 2)
      .attr('text-anchor', 'end')
      .attr('fill','white')
      .attr('font-size', 13);

})