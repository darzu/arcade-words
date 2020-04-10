let cutsceneIndex = -5;

const infoBubble = new word.Bubble();
infoBubble.setAnchor((screen.width >> 1) + 8, 40)

let computer = new word.Bubble();
computer.setAnchor((screen.width >> 1) + 8,  screen.height >> 1);

const playerBubble = new word.Bubble();
playerBubble.setAnchorSprite(thePlayer);
const glitchString = "...............................";

const playerBubbleBG = 1;
const playerBubbleFG = 15;
const compBubbleBG = 15;
const compBubbleFG = 9;

let cutsceneOver = false;
let cutsceneReallyOver = false;

let advanceTime = 0;

function advanceCutscene() {
    switch (cutsceneIndex) {
        case -5:
            thePlayer.x = 24;
            thePlayer.setFlag(SpriteFlag.Invisible, false);
            animation.runImageAnimation(
                thePlayer,
                [img`
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                `, img`
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                `, img`
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                `, img`
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                `, img`
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                `, img`
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                `, img`
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b c c c c b b b
                    b b b c c c c b b b
                    b b b c c c c b b b
                    b b b c c c c b b b
                `, img`
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b d d d d b b b
                    b b b d d d d b b b
                    b b b d d d d b b b
                    b b b d d d d b b b
                `, img`
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b b b b b b b b
                    b b b 1 1 1 1 b b b
                    b b b 1 1 1 1 b b b
                    b b b 1 1 1 1 b b b
                    b b b 1 1 1 1 b b b
                `, img`
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b b b b b b b .
                    b b b 1 1 1 1 b b .
                    b b b 1 1 1 1 b b .
                    b b b 1 1 1 1 b b .
                    b b b 1 1 1 1 b b .
                `, img`
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b b b b b . . .
                    b b b 1 1 1 1 . . .
                    b b b 1 1 1 1 . . .
                    b b b 1 1 1 1 . . .
                    b b b 1 1 1 1 . . .
                `, img`
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b b b . . . . .
                    b b b 1 1 1 1 . . .
                    b b b 1 1 1 1 . . .
                    b b b 1 1 1 1 . . .
                    b b b 1 1 1 1 . . .
                `, img`
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b . . . . . . .
                    b b b 1 1 1 1 . . .
                    b b b 1 1 1 1 . . .
                    b b b 1 1 1 1 . . .
                    b b b 1 1 1 1 . . .
                `, img`
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . . . . . . . .
                    b . . 1 1 1 1 . . .
                    b . . 1 1 1 1 . . .
                    b . . 1 1 1 1 . . .
                    b . . 1 1 1 1 . . .
                `, img`
                    . . . . . . . . . .
                    . . . . . . . . . .
                    . . . . . . . . . .
                    . . . . . . . . . .
                    . . . . . . . . . .
                    . . . . . . . . . .
                    . . . . . . . . . .
                    . . . . . . . . . .
                    . . . . . . . . . .
                    . . . . . . . . . .
                    . . . . . . . . . .
                    . . . . . . . . . .
                    . . . 1 1 1 1 . . .
                    . . . 1 1 1 1 . . .
                    . . . 1 1 1 1 . . .
                    . . . 1 1 1 1 . . .
                `],
                60,
                false
            );
            advanceTime = 1500;

            word.setColors(1, 15);
            word.setPagePauseLength(750);
            infoBubble.startMessage([
                word.page(
                    word.line("In the holo-chamber", 15),
                    word.line("of the galaxy class", 15),
                    word.line("cruiser, the USS Comet", 15),
                )
            ]);

            break;
        case -4:
            thePlayer.setImage(img`
                1 1 1 1
                1 1 1 1
                1 1 1 1
                1 1 1 1
            `)

            thePlayer.bottom = 112;
            thePlayer.x = 28;
            thePlayer.vx = 15;

            break;
        case -3:
            word.setColors(playerBubbleFG, playerBubbleBG);
            word.setPagePauseLength(1000);
            playerBubble.startMessage([
                word.page(
                    word.line("Ugh!", word.TextSpeed.Slow),
                    word.line("What a day!", word.TextSpeed.Slow)
                ),
                word.page(
                    word.line("First we hit that", word.TextSpeed.Medium),
                    word.line("asteroid belt...", word.TextSpeed.Medium)
                ),
                word.page(
                    word.line("Then we lost half", word.TextSpeed.Medium),
                    word.line("our fuel escaping", word.TextSpeed.Medium),
                    word.line("from that black hole!", word.TextSpeed.Medium)
                ),
                word.page(
                    word.line("Well, now it's time", word.TextSpeed.Medium),
                    word.line("to wind down...", word.TextSpeed.Medium)
                ),
                word.page(
                    word.line("Computer!", word.TextSpeed.Medium)
                )
            ], advanceCutscene);
            break;
        case -2:
            word.setColors(compBubbleFG, compBubbleBG);
            word.setPagePauseLength(1000);
            computer.startMessage([
                word.page(
                    word.line("YES, DAVE?", word.TextSpeed.Slow),
                )
            ], advanceCutscene);
            break;
        case -1:
            word.setColors(playerBubbleFG, playerBubbleBG);
            word.setPagePauseLength(1000);
            playerBubble.startMessage([
                word.page(
                    word.line("Load up that sim", word.TextSpeed.Medium),
                    word.line("I downloaded from", word.TextSpeed.Medium),
                    word.line("the message boards", word.TextSpeed.Medium)
                )
            ], advanceCutscene);
            break;
        case 0:
            word.setColors(compBubbleFG, compBubbleBG);
            word.setPagePauseLength(100)
            computer.startMessage([
                word.page(
                    word.line("LOADING EXECUTABLE:", word.TextSpeed.Slow),
                    word.line("\"BEACH BONFIRE", word.TextSpeed.Slow),
                    word.line("ROMANCE\" <3<3<3   ", word.TextSpeed.Slow)
                ),
                word.page(
                    word.line("SCULPTING LANDSCAPE...", word.TextSpeed.Medium),
                    word.line("GENERATING TEXTURES...", word.TextSpeed.Medium)
                ),
                word.page(
                    word.line("PLACING OBJECTS...", word.TextSpeed.Medium),
                    word.line("RENDER1NG W@TER...", word.TextSpeed.Medium),
                ),
            ], advanceCutscene);
            break;
        case 1:
            word.setColors(compBubbleFG, compBubbleBG);
            word.setPagePauseLength(10);
            computer.startMessage([
                word.page(
                    word.line("CR3aTiNG PHySI S...", word.TextSpeed.Medium),
                    word.line("$. _+ .........................", 20),
                    word.line(glitchString, 30),
                    word.line(glitchString, 40),
                    word.line(glitchString, 50)
                ),
                word.page(
                    word.line(glitchString, 60),
                    word.line(glitchString, 70),
                    word.line(glitchString, 80),
                    word.line(glitchString, 90)
                ),
                word.page(
                    word.line(glitchString, 100),
                    word.line(glitchString, 110),
                    word.line(glitchString, 110),
                    word.line(glitchString, 110)
                ),
                word.page(
                    word.line(glitchString, 110),
                    word.line(glitchString, 110),
                    word.line(glitchString, 110),
                    word.line(glitchString, 110)
                ),
                word.page(
                    word.line(glitchString, 110),
                    word.line(glitchString, 110),
                    word.line(glitchString, 110),
                    word.line(glitchString, 110)
                ),
                word.page(
                    word.line("...", 2)
                )
            ], advanceCutscene);
            break;
        case 2:
            word.setColors(playerBubbleFG, playerBubbleBG);
            word.setPagePauseLength(1000)
            playerBubble.startMessage([
                word.page(
                    word.line("Uh... Computer?", word.TextSpeed.Slow),
                )
            ], advanceCutscene)
            break;
        case 3:
            word.setColors(compBubbleFG, compBubbleBG);
            word.setPagePauseLength(1000)
            computer.startMessage([
                word.page(
                    word.line("REBOOTING...", 4),
                )
            ], advanceCutscene);
            break;
        case 4:
            holodeck.transitionToLevel(levels[0]);
            word.setColors(5, 1);
            word.setPagePauseLength(2000)
            computer.startMessage([
                word.page(
                    word.line("STARTING", word.TextSpeed.Medium),
                    word.line("SIMULATION", word.TextSpeed.Medium),
                )
            ], advanceCutscene);
            break;
        case 5:
            word.setColors(playerBubbleFG, playerBubbleBG);
            word.setPagePauseLength(1000)
            playerBubble.startMessage([
                word.page(
                    word.line("Computer...?", word.TextSpeed.Slow),
                    word.line("Why do you sound", word.TextSpeed.Fast),
                    word.line("different?", word.TextSpeed.Fast)
                ),
                word.page(
                    word.line("This doesn't look", word.TextSpeed.Fast),
                    word.line("right either...", word.TextSpeed.Fast),
                )
            ], advanceCutscene)
            break;
        case 6:
            cutsceneOver = true;
            word.setColors(5, 2);
            word.setPagePauseLength(1000)
            computer.startMessage([
                word.page(
                    word.line("hello, i am ur", word.TextSpeed.Medium),
                    word.line("date for this", word.TextSpeed.Medium),
                    word.line("evening", word.TextSpeed.Medium),
                ),
                word.page(
                    word.line("our date will", word.TextSpeed.Medium),
                    word.line("consist of a", word.TextSpeed.Medium),
                    word.line("series of obstacles", word.TextSpeed.Medium),
                ),
                word.page(
                    word.line("press the button", word.TextSpeed.Medium),
                    word.line("to advance the", word.TextSpeed.Medium),
                    word.line("date", word.TextSpeed.Medium),
                ),
                word.page(
                    word.line("life support", word.TextSpeed.Medium),
                    word.line("systems are now", word.TextSpeed.Medium),
                    word.line("offline...", word.TextSpeed.Slow)
                )
            ], advanceCutscene);
            break;
        case 7:
            cutsceneOver = true;
            word.setColors(playerBubbleFG, playerBubbleBG);
            word.setPagePauseLength(1000)
            playerBubble.startMessage([
                word.page(
                    word.line("UHHHHHHHHHHHHH", word.TextSpeed.Fast),
                    word.line("HHHHHHHHHHH...", word.TextSpeed.Fast),
                ),
                word.page(
                    word.line("Computer! End", word.TextSpeed.Fast),
                    word.line("the simulation!", word.TextSpeed.Fast),
                )
            ], advanceCutscene);
            break;

        case 8:
            word.setColors(5, 2);
            word.setPagePauseLength(1000)
            computer.startMessage([
                word.page(
                    word.line("the simulation", word.TextSpeed.Medium),
                    word.line("will end at the", word.TextSpeed.Medium),
                    word.line("end of the date", word.TextSpeed.Medium),
                ),
                word.page(
                    word.line("sixty seconds of", word.TextSpeed.Medium),
                    word.line("oxygen remaining", word.TextSpeed.Medium),
                ),
                word.page(
                    word.line("good luck!!!", word.TextSpeed.Slow),
                ),
            ], advanceCutscene);
            break;
        case 9:
            cutsceneReallyOver = true;
            thePlayer.ay = GRAVITY;
    }

    cutsceneIndex++;
}

let count = 0;

game.onUpdate(function () {
    if (holodeck.started && !cutsceneOver && !cutsceneReallyOver && holodeck.isDone()) {
        holodeck.transitionToLevel(levels[0]);
    }

    if (!cutsceneReallyOver && introComplete) {
        if (advanceTime) {
            advanceTime -= game.currentScene().eventContext.deltaTimeMillis;

            if (advanceTime <= 0) {
                advanceTime = 0;
                advanceCutscene();
            }
        }

        if (thePlayer.vx && thePlayer.x >= (screen.width >> 1) + 8) {
            thePlayer.vx = 0;
            thePlayer.x = (screen.width >> 1) + 8;
            advanceCutscene();
        }

        if (controller.A.isPressed()) {
            count++

            if (count > 50) skipCutscene();
        }
        else {
            count = 0;
        }
    }
})

function skipCutscene() {
    if (!cutsceneReallyOver) {
        cutsceneOver = true;
        cutsceneReallyOver = true;
        advanceTime = 0;
        thePlayer.vx = 0;
        thePlayer.ay = GRAVITY
        playerBubble.destroy();
        computer.destroy();
        infoBubble.destroy();
        holodeck.transitionToLevel(levels[0])
    }
}



