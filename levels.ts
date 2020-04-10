const levels = [img`
    1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . 1
    1 . . . . . . . . . 1
    1 . . . . . . . . . 1
    1 . . . . . . . . . 1
    1 . . . . . . . . 1 1
    1 . . . . . . . . a 1
    1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1
`, img`
    1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . 1
    1 . . . . . . . . . 1
    1 . . . . . . . . a 1
    1 . . . . . 1 1 1 1 1
    1 . . 1 1 1 1 1 1 1 1
    1 1 . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1
`, img`
    1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . 9 1
    1 . . . . . . 1 1 1 1
    1 . . . . . 1 1 . . 1
    1 1 . . . 1 1 1 . 1 1
    1 1 1 . . . . . . 1 1
    1 1 1 1 . . . . . 1 1
    1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1
`, img`
    1 1 1 1 1 1 1 1 1 1 1
    1 . . . . 1 . . . . 1
    1 . 1 1 . . . 1 1 1 1
    1 . 1 1 1 . 1 1 . . 1
    1 . 1 1 1 . . . . . 1
    1 . . 1 1 1 1 1 1 . 1
    1 . b . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1
`, img`
    1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . 1
    1 1 . . 1 . 1 1 1 . 1
    1 . . 1 1 . . 1 1 . 1
    1 1 . . 1 1 . 1 1 . 1
    1 . . 1 1 . . . . . 1
    1 1 . 1 . . 1 . 1 b 1
    1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1
`, img`
    1 1 1 1 1 1 1 1 1 1 1
    1 c . . . . . . . . 1
    1 1 1 1 1 1 1 . . . 1
    1 1 1 . . . . . 1 1 1
    1 . . . 1 1 1 . . 1 1
    1 . . 1 1 1 1 . 1 1 1
    1 1 . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1
`, img`
    1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . 1
    1 1 . . . . . . . b 1
    1 . . 1 1 . . . 1 1 1
    1 1 . . 1 . . . . . 1
    1 . . 1 1 . . . . . 1
    1 1 . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1
`, img`
    1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . 1 1 1 1 1
    1 . 1 1 1 . . . . . 1
    1 . 1 1 1 1 1 1 1 1 1
    1 . 1 c . . . . . . 1
    1 . 1 1 1 1 1 1 . . 1
    1 . . . . . . . . 1 1
    1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1
`, img`
    1 1 1 1 1 1 1 1 1 1 1
    1 . . 1 . 1 . 1 . . 1
    1 . . . . . . . . . 1
    1 . . . . . . . . . 1
    1 . 1 . 1 . 1 . 1 . 1
    1 1 1 1 1 1 1 1 1 . 1
    1 c . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1
`];

const normalRoom = img`
    1 1 1 1 1 1 1 1 1 1 1
    1 . . . . . . . . . 1
    1 . . . . . . . . . 1
    1 . . . . . . . . . 1
    1 . . . . . . . . . 1
    1 . . . . . . . . . 1
    1 . . . . . . . . . 1
    1 1 1 1 1 1 1 1 1 1 1
    1 1 1 1 1 1 1 1 1 1 1
`
const endRoom = normalRoom.clone();
const holodeck = new Holodeck(levels[0]);

const whiteTile = image.create(16, 16);
whiteTile.fill(1);

scene.setTileMap(normalRoom);
scene.setTile(1, whiteTile, true)

let levelIndex = 0;
let endgame = false;
let score = 0;

function loadNextLevel(playerColumn: number, playerRow: number) {
    ++levelIndex;


    if (!levels[levelIndex]) {
        endGame();
        return;
    }
    
    thePlayer.left = (Math.max(thePlayer.left, playerColumn << 4))
    thePlayer.right = (Math.min(thePlayer.right, (playerColumn << 4) + 15))

    holodeck.transitionToLevel(levels[levelIndex], playerColumn, playerRow);
    percentComplete = ((levelIndex / levels.length) * 100) | 0;
}

function restartGame() {
    for (const s of sprites.allOfKind(SpriteKind.Enemy)) s.destroy();
    levelIndex = 0
    percentComplete = 0;
    timeRemaining = 60000;
    dashtimer = 0;
    cooldowntimer = 0;
    holodeck.transitionToLevel(levels[0])
    thePlayer.x = (screen.width >> 1) + 8;
    thePlayer.y = 60;
    thePlayer.ay = GRAVITY;
}

function endGame() {
    endgame = true;
    holodeck.destroy();
    scene.setTileMap(endRoom);
    scene.setTile(0, solidImage(15))
    scene.setTile(1, solidImage(1), true)

    info.setScore(timeRemaining)

    computer = new word.Bubble();
    computer.setAnchor((screen.width >> 1) + 8, screen.height >> 1);

    word.setColors(5, 2);
    word.setPagePauseLength(1000)

    computer.startMessage([
        word.page(
            word.line("life support restored", word.TextSpeed.Slow)
        ),
        word.page(
            word.line("i very much enjoyed", word.TextSpeed.Medium),
            word.line("our date! even tho u", word.TextSpeed.Medium),
            word.line("didnt bring flowers", word.TextSpeed.Medium),
        ),
        word.page(
            word.line("i will put another", word.TextSpeed.Medium),
            word.line("date on the calendar", word.TextSpeed.Medium),
            word.line("for tomorrow", word.TextSpeed.Medium),
        ),
        word.page(
            word.line("see you then", word.TextSpeed.Medium),
            word.line("<3<3<3<3<3<3", word.TextSpeed.Slow)
        )
    ], finishGame)
}

function finishGame() {
    const playerBubble = new word.Bubble();
    playerBubble.setAnchorSprite(thePlayer);
    word.setColors(playerBubbleFG, playerBubbleBG);

    playerBubble.startMessage([
        word.page(
            word.line("Sigh...", word.TextSpeed.Slow)
        ),
        word.page(
            word.line("...and now I need", word.TextSpeed.Medium),
            word.line("to factory reset", word.TextSpeed.Medium),
            word.line("the ship", word.TextSpeed.Medium)
        ),
        word.page(
            word.line("What a day!!!", word.TextSpeed.Slow)
        )
    ], () => game.over(true))
}

game.onUpdate(function () {
    if (timeRemaining <= 0) {
        game.splash("LIFE SUPPORT FAILED", "press a to restart")
        restartGame();
    }
})