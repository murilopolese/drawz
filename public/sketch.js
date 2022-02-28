let socket = io()

let selectedTool = 'brush'
let selectedColor = '#ff0055'

function selectTool(tool) {
  console.log('selectTool', tool)
  selectedTool = tool
}

function selectColor(color) {
  console.log('selectColor', color)
  selectedColor = color
}

function setup() {
  createCanvas(500, 500)
  background(250)
}

function draw() {
  if (mouseIsPressed) {
    stroke(selectedColor)
    socket.emit(selectedTool, selectedColor, mouseX, mouseY, pmouseX, pmouseY)
  }
}

socket.on('brush', function(color, mouseX, mouseY, pmouseX, pmouseY) {
  stroke(color)
  strokeWeight(dist(mouseX, mouseY, pmouseX, pmouseY))
  line(mouseX, mouseY, pmouseX, pmouseY)
})
socket.on('line', function(color, mouseX, mouseY, pmouseX, pmouseY) {
  stroke(color)
  strokeWeight(2)
  line(mouseX, mouseY, pmouseX, pmouseY)
})
socket.on('spray', function(color, mouseX, mouseY, pmouseX, pmouseY) {
  noStroke()
  fill(color)
  for (let i = 0; i < 10; i++) {
    circle(mouseX + random(-5, 5), mouseY + random(-5, 5), 2)
  }
})
