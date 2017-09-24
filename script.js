$zoom = 1

class Node {
  constructor(x, y, orientation) {
    const mutation_rate = 0.05;
    var signed_mutation = Math.random() - 0.5
    var mutation        = signed_mutation * mutation_rate
    this.orientation    = (orientation + mutation) % 1

    var x_mutation = Math.cos(this.orientation * (Math.PI * 2));
    var y_mutation = Math.sin(this.orientation * (Math.PI * 2));
    this.x = x + (x_mutation * $zoom);
    this.y = y + (y_mutation * $zoom);
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
  $zoom = window.devicePixelRatio;
  canvas.height = window.innerHeight * $zoom;
  canvas.width  = window.innerWidth  * $zoom;
  canvas.style.width  = canvas.width  / $zoom;
  canvas.style.height = canvas.height / $zoom;

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
  var nodes = [];
  nodes.push(new Node(canvas.width / 2, canvas.height / 2, 0));
  setInterval(function() {
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
      context.fillRect(0, 125 * $zoom, canvas.width, canvas.height);
      universes++;
      generations_c = 0;
      nodes = [];
      nodes.push(new Node(canvas.width / 2, canvas.height / 2, Math.random()));
    }



    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, 125 * $zoom);
    context.fillStyle = "white";
    context.font      = 12 * $zoom + "px sans-serif";

    context.fillText("Organisms", 25 * $zoom, 25 * $zoom);
    context.fillText(organisms,   25 * $zoom, 50 * $zoom);

    context.fillText("Generations", 100 * $zoom, 25 * $zoom);
    context.fillText(generations,   100 * $zoom, 50 * $zoom);

    context.fillText("Universes", 175 * $zoom, 25  * $zoom);
    context.fillText(universes,   175 * $zoom, 50 * $zoom);
  }, 1);
});
