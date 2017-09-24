class Node {
  constructor(x, y, orientation) {
    const zoom = 2;
    const min_gens_for_cycle = 20;
    const max_possible_mutation = 1 / min_gens_for_cycle
    var absolute_mutation = Math.random() * max_possible_mutation
    var mutation          = absolute_mutation - (max_possible_mutation / 2)
    this.orientation      = (orientation + mutation) % 1

    var x_mutation = Math.cos(this.orientation * (Math.PI * 2));
    var y_mutation = Math.sin(this.orientation * (Math.PI * 2));
    this.x = x + (x_mutation * zoom);
    this.y = y + (y_mutation * zoom);
  }

  propagate(context) {
    context.fillStyle = "#fff";
    context.fillRect(this.x, this.y, 1, 1);
    var children = [];
    var number_of_children = Math.floor(Math.random() * 3);
    for (var i = 0; i < number_of_children; i++) {
      children.push(new Node(this.x, this.y, this.orientation));
    }
    return children;
  }
}

document.addEventListener("DOMContentLoaded", function(event) {
  var universes     = 1;
  var generations   = 1;
  var organisms     = 1;

  var canvas = document.getElementsByTagName("canvas")[0];

  const context = canvas.getContext("2d");
  const r = window.devicePixelRatio;
  canvas.height = window.innerHeight * r;
  canvas.width  = window.innerWidth  * r;
  canvas.style.width  = canvas.width  / r;
  canvas.style.height = canvas.height / r;

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  var nodes = [];
  nodes.push(new Node(canvas.width / 2, canvas.height / 2, 0));
  setInterval(function() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, 225);
    context.fillStyle = "white";
    context.font      = "24px sans-serif";

    context.fillText("Total",         25, 100);
    context.fillText("Organisms /",   25, 150);
    context.fillText("Generations /", 25, 200);

    context.fillText("Organism", 325, 50);
    context.fillText(organisms,  325, 100);

    context.fillText("Generation", 475, 50);
    context.fillText(generations,  475, 100);
    context.fillText(Math.round(organisms/generations), 475, 150);

    context.fillText("Universe", 625, 50);
    context.fillText(universes,  625, 100);
    context.fillText(Math.round(organisms/universes), 625, 150);
    context.fillText(Math.round(generations/universes), 625, 200);

    context.fillText("λ", 925, 50);
    context.fillText("1", 925, 100);

    context.fillText("Mutation", 1075, 50);
    context.fillText("2.5%", 1075, 100);

    generations++;
    if (nodes.length) {
      new_nodes = [];
      for (var i = 0; i < nodes.length; i++) {
        var children = nodes[i].propagate(context);
        for (var j = 0; j < children.length; j++) {
          new_nodes.push(children[j]);
          organisms++;
        }
      }
      nodes = new_nodes.slice();
    } else {
      context.fillStyle = "black";
      context.fillRect(0, 225, canvas.width, canvas.height);
      universes++;
      generations_c = 0;
      nodes = [];
      nodes.push(new Node(canvas.width / 2, canvas.height / 2, Math.random()));
    }
  }, 1);
});
