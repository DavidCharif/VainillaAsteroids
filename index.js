(function(){
const FPS = 30 // frames Per Second
const SHIP_SIZE = 30 // height in pixels
const TURN_SPEED = 360 // Turn speed in degress per second
const SHIP_THRUST = 5 // Acceleration of the ship in pixels per second

/** @type {HTMLCanvasElement} */
const canv = document.getElementById('gameCanvas')
const context = canv.getContext('2d')        

//Event handlers
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function keyDown(/** @type {KeyBoardEvent}*/ ev) {    
    switch (ev.keyCode) {
        case 37:  // left (Rotate ship left)
            console.log('left')
            ship.rotation = TURN_SPEED / 180 *Math.PI / FPS
            break
        case 38:  // Up arrow (thrust the ship forward)
        ship.thrusting = true

            break
        case 39: // right arrow (Rotate ship right)
            ship.rotation = -TURN_SPEED / 180 *Math.PI / FPS
            break
    }
}

function keyUp (/** @type {KeyBoardEvent}*/ ev) {    
    switch (ev.keyCode) {
        case 37:  // left (stop ship left)            
            ship.rotation = 0
            break
        case 38:  // Up arrow (thrust the ship forward)
        ship.thrusting = false
        
            break
        case 39: // right arrow (Rotate ship right)
            ship.rotation = 0
            break
    }
}

// Game loop
setInterval(update, 1000/ FPS)

const ship = {
    x: canv.width / 2,
    y: canv.height / 2,
    r: SHIP_SIZE / 2,
    a: 90 / 180 * Math.PI, // convert to radians
    rotation: 0,
    thrusting : false, 
    thrust : {
        x:0,
        y:0
    }
}

function update() {
    // draw space 
    context.fillStyle = "black"
    context.fillRect(0,0,canv.width, canv.height)
    // thurst the ship
    if (ship.thrusting) {
        ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS
        ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS
    }
    // draw ship
    context.strokeStyle = "white"
    context.lineWidth = SHIP_SIZE / 20
    context.beginPath()
    context.moveTo( //Nose ship
        ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
        ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
    )
    context.lineTo( // rear left
        ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (2 / 3 *Math.sin(ship.a) - Math.cos(ship.a))
    )
    context.lineTo( // rear right
    ship.x - ship.r * (2 / 3 *Math.cos(ship.a) - Math.sin(ship.a)),
    ship.y + ship.r * (2 / 3 *Math.sin(ship.a) + Math.cos(ship.a))
)
    context.closePath()
    context.stroke()
    // rotate ship
    ship.a += ship.rotation
    // move ship
    ship.x += ship.thrust.x
    ship.y += ship.thrust.y
    // centerDOt
    context.fillStyle = 'red'
    context.fillRect(ship.x - 1, ship.y - 1, 2, 2)
}


})()
