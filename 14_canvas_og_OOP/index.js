var x = 20
var speed = 10
var r = 40

var g = 2
var h_x
var h_y = 0
var h_speed = 5
var h_r = 28.67
var h_velo = 0.9
var friction = 0.99

//P5 setup() bliver kaldt EN gang før siden vises 
function setup() {
    var canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent('page1')

    h_x = windowWidth / 2
}

function draw() {
    frameRate(60)
    background(220, 100, 50)

    //håndter kugle 1
    fill('lightblue')
    circle(x, 100, r)

    x = x + speed
    if (x > windowWidth - r / 2 || x < r / 2) {
        speed = -speed
    }

    //håndter kugle 2
    fill(100, 80, 220)
    noStroke()

    //fald ned mod jorden
    h_velo += g
    h_velo *= friction
    h_y += h_velo
    circle(h_x, h_y, h_r)

    if (h_y > windowHeight - h_r / 2) {
        h_y = windowHeight - h_r/2
        h_velo = -h_velo
    }
    select('#info').html(`Velocity: ${round(h_velo, 2)}`)
}

function keyPressed(){
    if(key == ' '|| key=='z'){
        h_velo+=-10
    }
}