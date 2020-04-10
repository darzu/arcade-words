let timeRemaining = 60000;
let percentComplete = 0;

const HUD_MAX_OFFSET = 25;
const hud = scene.createRenderable(0, function (target: Image, camera: scene.Camera) {
    if (!introStarted || endgame) return;
    target.fillRect(0, target.height - 10, target.width, 10, 1)
    
    if (!introComplete) {
        printHUDText(target, "PRESS A TO START", 32)
    }
    else if (!cutsceneReallyOver) {
        if (controller.A.isPressed()) printHUDText(target, "HOLD A TO SKIP", 38, false, 15)
    }
    else {
        timeRemaining -= game.currentScene().eventContext.deltaTimeMillis;
        timeRemaining = Math.max(timeRemaining, 0);
        printHUDText(target, "" + Math.idiv(timeRemaining, 10000), target.width - HUD_MAX_OFFSET);
        printHUDText(target, "" + Math.idiv((timeRemaining % 10000), 1000), target.width - HUD_MAX_OFFSET + 5);
        printHUDText(target, ".", target.width - HUD_MAX_OFFSET + 9);
        printHUDText(target, "" + Math.idiv((timeRemaining % 1000), 100), target.width - HUD_MAX_OFFSET + 14, true);
        printHUDText(target, "" + Math.idiv(timeRemaining % 100, 10), target.width - HUD_MAX_OFFSET + 19, true);

        printHUDText(target, `${percentComplete}%`, 0)
    }


    if (!holodeck.isDone()) {
        printHUDText(target, "Recalibrating...", 24)
    }
    else if (cutsceneReallyOver) {
        printHUDText(target, "A-JUMP B-DASH", 36)

        let color = 15;

        if (cooldowntimer > 0) {
            color = 11;
        }
        else if (dashtimer > 0) {
            color = 8;
        }
        printHUDText(target, "B-DASH", 78, false, color)
    }
})

function printHUDText(target: Image, char: string, offset: number, small = false, color = 15) {
    if (small) {
        target.print(char, offset, target.height - 7, color, image.font5);
    }
    else {
        target.print(char, offset, target.height - 9, color);
    }
}