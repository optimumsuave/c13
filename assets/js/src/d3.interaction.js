var links = [
  {source: "CMD", target: "CMD", type: "licensing", fillColor: "#333", depth: 0},
  {source: "Workshops", target: "CMD", type: "licensing", fillColor: "rgb(240, 240, 240)", depth: 3},
  {source: "Resources", target: "CMD", type: "licensing", fillColor: "rgb(199, 199, 199)", depth: 3},

  {source: "HTML", target: "Resources", type: "licensing", fillColor: "rgb(229, 77, 38)", depth: 1},
  // {source: "Semantic Elements", target: "HTML", type: "licensing", fillColor: "rgb(229, 77, 38)", depth: 2},
  // {source: "Metadata", target: "HTML", type: "licensing", fillColor: "rgb(229, 77, 38)", depth: 2},

  {source: "CSS", target: "Resources", type: "licensing", fillColor: "rgb(2, 112, 187)", depth: 1},
  // {source: "Webfonts", target: "CSS", type: "licensing", fillColor: "rgb(2, 112, 187)", depth: 2},
  // {source: "Box Model", target: "CSS", type: "licensing", fillColor: "rgb(2, 112, 187)", depth: 2},
  // {source: "Floating", target: "CSS", type: "licensing", fillColor: "rgb(2, 112, 187)", depth: 2},
  // {source: "Typography", target: "CSS", type: "licensing", fillColor: "rgb(2, 112, 187)", depth: 2},

  {source: "JAVASCRIPT", target: "Resources", type: "licensing", fillColor: "#ffb200", depth: 1},
  // {source: "jQuery", target: "JAVASCRIPT", type: "licensing", fillColor: "#ffb200", depth: 2},
  // {source: "Backbone.js", target: "JAVASCRIPT", type: "licensing", fillColor: "#ffb200", depth: 2},
  // {source: "AJAX", target: "JAVASCRIPT", type: "licensing", fillColor: "#ffb200", depth: 2},

  {source: "Web Design", target: "Resources", type: "licensing", fillColor: "#5CCF00", depth: 1},
  // {source: "Responsive", target: "Web Design", type: "licensing", fillColor: "#5CCF00", depth: 2},
  // {source: "Mobile First", target: "Web Design", type: "licensing", fillColor: "#5CCF00", depth: 2},   
  // {source: "Wireframing", target: "Web Design", type: "licensing", fillColor: "#5CCF00", depth: 2},

  {source: "Business for Web", target: "Resources", type: "licensing", fillColor: "#F0F", depth: 1},
  // {source: "Clients", target: "Business for Web", type: "licensing", fillColor: "#F0F", depth: 2},
  // {source: "Analytics", target: "Business for Web", type: "licensing", fillColor: "#F0F", depth: 2},   
  // {source: "Hosting", target: "Business for Web", type: "licensing", fillColor: "#F0F", depth: 2},
  // {source: "Domain Names", target: "Business for Web", type: "licensing", fillColor: "#F0F", depth: 2},
];

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, fillColor: link.fillColor, depth: link.depth});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target, fillColor: link.fillColor});
});

// nodes = d3.data(links);

var width = 960,
    height = 500;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(function(d){
      return d.depth*150;
    })
    .linkStrength(0.9)
    .friction(0.8)
    .gravity(0.8)
    .theta(0.1)
    .chargeDistance(500)
    .charge(-2000)
    .on("tick", tick)
    .start();

var svg = d3.select(".interaction").append("svg")
    .attr("width", width)
    .attr("height", height);

// Per-type markers, as they don't inherit styles.
// svg.append("defs").selectAll("marker")
//     .data(["suit", "licensing", "resolved"])
//   .enter().append("marker")
//     .attr("id", function(d) { return d; })
//     .attr("viewBox", "0 -5 10 10")
//     .attr("refX", 40)
//     .attr("refY", -1.5)
//     .attr("markerWidth", 6)
//     .attr("markerHeight", 6)
//     .attr("orient", "auto")
//   .append("path")
//     .attr("d", "M0,-5L10,0L0,5");

var path = svg.append("g").selectAll("path")
    .data(force.links())
  .enter().append("path")
    .attr("class", function(d) { return "link " + d.type; })
    .attr("marker-end", function(d) { return "url(#" + d.type + ")"; });

var circle = svg.append("g").selectAll("circle")
    .data(force.nodes())
    .enter().append("circle")
    .attr("r", function(d){
      if(d.index == 0){
        return 24;
      } else {
        return 24;
      }
    })
    .attr("fill", function(d){ return d.fillColor; })
    .call(force.drag);
// force.stop();
var n = force.nodes().length;
ypos = [];
force.nodes().forEach(function(d, i) {
  // if(typeof d.depth !== "undefined") {
    // console.log("yeee", d.depth);
    if(typeof ypos[d.depth] == "undefined"){
      ypos[d.depth] = 0;
    }
    ypos[d.depth]++;
    d.py = ypos[d.depth] * (40/d.depth);
    d.px = d.depth * (width/8)+140;
    // d.fixed = true;
    if(d.depth != 0) {
      // d.fixed = true;
    }
    if(d.depth == 1) {
      d.py = ypos[d.depth] * 50;
    }


    // ypos[d.depth]++;
    // d.py = (height-1000/ypos[d.depth]);
    // d.px = ypos[d.depth] * (width/8)+140;
    // d.fixed = true;
    // if(d.depth == 1) {
      // d.fixed = true;
    // }
          
           
    // } else {
    //   d.px = d.depth * width/6;
    // }
  // }
});

// var circle = svg.selectAll("circle")
//     .data(force.links())
force.nodes()[0].fixed = true;
force.nodes()[0].name = "";
force.nodes()[0].px = $(window).width()/2;
force.nodes()[0].py = 240;
// console.log(force.nodes()[0]);

// force.nodes()[1].fixed = true;
// force.nodes()[1].px = 70;
// force.nodes()[1].py = 340;

// force.resume();


circle.on("click", function(d) {
  // force.stop();
  if (d3.event.defaultPrevented) return; // ignore drag
  force.links().forEach(function(dd,i){
    if(dd.target.name == d.name) {
      force.nodes()[dd.source.index].fixed = false;
      console.log("MATCH",force.nodes()[dd.target.index]);
    } else {
      force.fixed = true;
    }
  })
  // d.px = width/2;
  d.fixed = true;
  // d.py = height/2;
  force.resume();
  // force.nodes()[d.index].
  force.stop();

  // var _this = this;
  circle.attr("style", "display:none");
  text.attr("style", "display: none");
  // force.nodes().forEach(function(dd,i){
  //   d3.select(dd).attr("style", "display:none");
  //   // d3.select(force.links()[i]).attr("style", "display:none");
  // });
  d3.select(this).attr("style", "display: block").transition().duration(900).attr("r", width*2);

  // console.log(this, d);
  
  $("section .top").css("background", "transparent");
  $("section").addClass("closed");
  $("header").addClass("stuck");
  $("section .title").html(d.name).fadeIn(2000);
  setTimeout(function(){
    $(".color-top").css("background", d.fillColor);
  }, 900);
  setTimeout(function(){
    $("section .stuff").fadeIn(500);
  }, 1000);
  // $("section").css("background-color", d.fillColor)
});


$(".logo").click(function(){
  $("body").animate({scrollTop: 0}, 500);
  setTimeout(function(){
    circle.attr("style", "display:block").transition().duration(1000).attr("r", function(d){
      if(d.index == 0){
        return 34;
      } else {
        return 20;
      }
    });
  }, 500);
  $(".color-top").css("background", "transparent");
  $("section").removeClass("closed");
  $("header").removeClass("stuck");
  // $("section .top").fadeOut();
  setTimeout(function(){
    text.attr("style", "display:block");
  }, 1400);
  $("section .title").fadeOut(200);
  $("section .stuff").hide();

  // force.stop();
  // force.start();
});


var text = svg.append("g").selectAll("text")
    .data(force.nodes())
  .enter().append("text")
    .attr("x", 30)
    .attr("y", ".31em")
    .attr("style", "font-size:0.8em;text-align:center;")
    .attr("fill", function(d){ return d.fillColor; })
    // .attr("fill", "#222")
    // .attr("fill", "#ffb200")
    .text(function(d) { return d.name; });



// Use elliptical arc path segments to doubly-encode directionality.
function tick() {
  path.attr("d", linkArc);
  path.attr("stroke", function(d){ return d.fillColor });
  path.attr("opacity",0.4);
  // path.attr("stroke", "#333");
  circle.attr("transform",transform);
  text.attr("transform", transform);
}

function linkArc(d) {
  var dx = d.target.x - d.source.x,
      dy = d.target.y - d.source.y,
      dr = Math.sqrt(dx * dx + dy * dy);
      // if(d.depth != 1) {
        // return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
      // } else {
        return "M" + d.source.x + "," + d.source.y + " L" + d.target.x + "," + d.target.y;
      // }
}

function transform(d) {
  return "translate(" + d.x + "," + d.y + ")";
}
