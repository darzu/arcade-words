let introComplete = false;
let introStarted = false;

const warning = new word.Bubble();
warning.setAnchor((screen.width >> 1) + 8, screen.height >> 1);

const introMap = img`
    1 . 1 . 1 1 1 . 1 . . . 1 1 1
    1 . 1 . 1 . 1 . 1 . . . 1 . 1
    1 . 1 . 1 . 1 . 1 . . . 1 . 1
    1 1 1 . 1 . 1 . 1 . . . 1 . 1
    1 . 1 . 1 . 1 . 1 . . . 1 . 1
    1 . 1 . 1 1 1 . 1 1 1 . 1 1 1
    . . . . . . . . . . . . . . .
    1 1 . . . 1 . . 1 1 1 . 1 1 1
    1 . 1 . 1 . 1 . . 1 . . 1 . .
    1 . 1 . 1 . 1 . . 1 . . 1 . .
    1 . 1 . 1 1 1 . . 1 . . 1 1 .
    1 . 1 . 1 . 1 . . 1 . . 1 . .
    1 1 . . 1 . 1 . . 1 . . 1 1 1
`;

let introTiles = glitch.generateFrames(img`
    4 4 5 5 4 4 5 5
    5 4 4 5 5 4 4 5
    5 5 4 4 5 5 4 4
    4 5 5 4 4 5 5 4
    4 4 5 5 4 4 5 5
    5 4 4 5 5 4 4 5
    5 5 4 4 5 5 4 4
    4 5 5 4 4 5 5 4
`, 1, 0);
let bgTiles = glitch.getNewTileset(false, 2);

let introTileIndex = 0;

scene.setTile(1, solidImage(15));

word.setColors(1, 15);
word.setPagePauseLength(9999999);
warning.startMessage([
    word.page(
        word.line("Warning, this game", word.TextSpeed.Medium),
        word.line("features flashing", word.TextSpeed.Medium),
        word.line("lights and patterns.", word.TextSpeed.Medium),
        word.line("Press A to proceed", word.TextSpeed.Medium),
    )
]);

let waspressed = false;
game.onUpdate(function () {
    if (!introStarted && !warning.isPrinting()) {
        if (waspressed && !controller.A.isPressed()) {
            startIntro()
        }
        waspressed = controller.A.isPressed();
    }
})


function startIntro() {
    introStarted = true;
    warning.destroy();
    const title = scene.createRenderable(99, function (target: Image, camera: scene.Camera) {
        for (let x = 0; x < introMap.width; x++) {
            for (let y = 0; y < introMap.height; y++) {
                if (introMap.getPixel(x, y))
                    target.drawImage(introTiles[introTileIndex], (x << 3) + 20, (y << 3) + 3)
            }
        }
    })

    game.onUpdateInterval(50, function () {
        if (introComplete) return;
        else if (controller.A.isPressed()) {
            introComplete = true;
            title.destroy();
            introTiles = null;
            bgTiles = null;
            scene.setTile(0, solidImage(15))
            scene.setTile(1, solidImage(1), true)

            music.baDing.play()
            advanceCutscene()
            return;
        }

        introTileIndex = (introTileIndex + 1) % introTiles.length;
        bgTiles.setTileToNextFrame(0, false)
        scene.setTile(1, bgTiles.frames[bgTiles.index])
    })
}

function solidImage(color: number) {
    const c = image.create(16, 16);
    c.fill(color);
    return c;
}

