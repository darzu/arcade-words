const JUMP_HEIGHT = 16;
const GRAVITY = 200;
const JUMP_VELOCITY = Math.sqrt(2 * GRAVITY * JUMP_HEIGHT)
const MOVE_SPEED = 45;

const DASH_SPEED = 100;
const DASH_JUMP = 70;
const DASH_TIME = 300;
const DASH_COOLDOWN = 50;

let cooldowntimer = 0;
let dashtimer = 0;

const thePlayer = sprites.create(img`
    1 1 1 1
    1 1 1 1
    1 1 1 1
    1 1 1 1
`, SpriteKind.Player)

thePlayer.x = (screen.width >> 1) + 8;
thePlayer.bottom = 100

thePlayer.setFlag(SpriteFlag.Invisible, true)


let isFalling = false;
let dashAvailable = true;

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (thePlayer.isHittingTile(CollisionDirection.Bottom) && cutsceneReallyOver) {
        thePlayer.vy = -JUMP_VELOCITY
        jumpSound.play()
        isFalling = true;
    }
})

controller.A.onEvent(ControllerButtonEvent.Released, function () {
    if (dashtimer === 0)
        thePlayer.vy = Math.max(thePlayer.vy, 0)
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (cooldowntimer === 0 && dashtimer === 0 && dashAvailable) {
        startDash();
    }
})

controller.B.onEvent(ControllerButtonEvent.Released, function () {
    if (dashtimer > 0) {
        endDash();
    }
})

let lastVy = 0;
let lastVx = 0;
game.onUpdate(function () {
    if (cutsceneReallyOver) {
        if (dashtimer === 0) {
            thePlayer.vx = 0;
            if (controller.left.isPressed()) thePlayer.vx -= MOVE_SPEED;
            if (controller.right.isPressed()) thePlayer.vx += MOVE_SPEED;
        }

        if (thePlayer.isHittingTile(CollisionDirection.Bottom)) {
            if (dashtimer === 0) dashAvailable = true;
            
            if (isFalling) {
                isFalling = false;

                if (lastVy > 50) {
                    landSound.play();
                }
            }
        }
        else {
            isFalling = true;

            const playerCol = thePlayer.x >> 4;
            const playerRow = thePlayer.y >> 4;

            const t = game.currentScene().tileMap as tiles.legacy.LegacyTilemap;

            if (dashtimer > 0) {
                if (
                    (thePlayer.isHittingTile(CollisionDirection.Right) && lastVx > 0 && !t.isObstacle(playerCol + 1, playerRow)) ||
                    (thePlayer.isHittingTile(CollisionDirection.Left) && lastVx < 0 && !t.isObstacle(playerCol - 1, playerRow))
                ) {
                    thePlayer.vx = lastVx;
                    thePlayer.bottom = Math.min(thePlayer.bottom, ((playerRow + 1) << 4) - 1);
                    thePlayer.top = Math.max(thePlayer.top, playerRow << 4);
                }
            }

        }
        lastVy = thePlayer.vy;
        lastVx = thePlayer.vx;
    }
    
    if (dashtimer) {
        dashtimer -= game.currentScene().eventContext.deltaTimeMillis;

        if (dashtimer <= 0) {
            endDash();
        }
    }

    if (cooldowntimer) {
        cooldowntimer -= game.currentScene().eventContext.deltaTimeMillis;

        if (cooldowntimer <= 0) {
            cooldowntimer = 0;
        }
    }
})



function startDash() {
    if (controller.up.isPressed()) thePlayer.setVelocity(0, -DASH_JUMP)
    else if (controller.right.isPressed()) thePlayer.setVelocity(DASH_SPEED, 0)
    else if (controller.down.isPressed()) thePlayer.setVelocity(0, DASH_JUMP)
    else if (controller.left.isPressed()) thePlayer.setVelocity(-DASH_SPEED, 0)
    else return;

    dashtimer = DASH_TIME;
    thePlayer.startEffect(effects.trail)
    thePlayer.image.fill(8);

    thePlayer.ay = 0;
    dashAvailable = false;
}

function endDash() {
    thePlayer.ay = GRAVITY;
    dashtimer = 0;
    cooldowntimer = DASH_COOLDOWN;
    effects.clearParticles(thePlayer)
    thePlayer.image.fill(1);
}

music.setVolume(50)

const landSound = new music.Melody('!400,200^100')
const jumpSound = new music.Melody('@10,50,255,50 !450,50^470')
const clickSound = new music.Melody('@5,50,100,19 ~5 !900,20')
const buttonSound = new music.Melody('@5,50,100,80 !300,20')