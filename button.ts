const BUTTON_FRAMES = [img`
    . . . . . . . . . . . . . . . 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . c b c c c c 1
    . . . . . . . . c b c c c c c 1
    . . . . . . . . c c c c c c c 1
    . . . . . . . . c c c c c c c 1
    . . . . . . . . c c c c c c c 1
    . . . . . . . . c c c c c c c 1
    . . . . . . . . c c c c c c c 1
    . . . . . . . . c c c c c c c 1
    . . . . . . . . c c c c c c c 1
    . . . . . . . . c c c c c c c 1
    . . . . . . . . c c c c c c c 1
    . . . . . . . . . c c c c c c 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . . . . . . . 1
`, img`
    . . . . . . . . . . . . . . . 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . c b c c c 1
    . . . . . . . . . c b c c c c 1
    . . . . . . . . . c c c c c c 1
    . . . . . . . . . c c c c c c 1
    . . . . . . . . . c c c c c c 1
    . . . . . . . . . c c c c c c 1
    . . . . . . . . . c c c c c c 1
    . . . . . . . . . c c c c c c 1
    . . . . . . . . . c c c c c c 1
    . . . . . . . . . c c c c c c 1
    . . . . . . . . . c c c c c c 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . . . . . 1
`, img`
    . . . . . . . . . . . . . . . 1
    . . . . . . . . . . . . c c c 1
    . . . . . . . . . . . c b c c 1
    . . . . . . . . . . c b c c c 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . . c c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . . c c c 1
    . . . . . . . . . . . . . . . 1
`, img`
    . . . . . . . . . . . . . . . 1
    . . . . . . . . . . . . . c c 1
    . . . . . . . . . . . . c b c 1
    . . . . . . . . . . . c b c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . . c c c 1
    . . . . . . . . . . . . . c c 1
    . . . . . . . . . . . . . . . 1
`, img`
    . . . . . . . . . . . . . . . 1
    . . . . . . . . . . . . . c c 1
    . . . . . . . . . . . . c b c 1
    . . . . . . . . . . . . b c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . c c c c 1
    . . . . . . . . . . . . c c c 1
    . . . . . . . . . . . . c c c 1
    . . . . . . . . . . . . . c c 1
    . . . . . . . . . . . . . . . 1
`]

let loadedButtonFrames: Image[];

function createButton(wallDirection: CollisionDirection, location: tiles.Location) {
    switch (wallDirection) {
        case CollisionDirection.Right:
            loadedButtonFrames = BUTTON_FRAMES;
            break;
        case CollisionDirection.Left:
            loadedButtonFrames = BUTTON_FRAMES.map(function (value: Image, index: number) {
                const res = value.clone();
                res.flipX();
                return res;
            });
            break;
        case CollisionDirection.Bottom:
            loadedButtonFrames = BUTTON_FRAMES.map(function (value: Image, index: number) {
                return rotate(value);
            });
            break;
        case CollisionDirection.Top:
            loadedButtonFrames = BUTTON_FRAMES.map(function (value: Image, index: number) {
                const res = rotate(value);
                res.flipY();
                return res;
            });
            break;
    }

    const btn = sprites.create(loadedButtonFrames[0], SpriteKind.Enemy);
    tiles.placeOnTile(btn, location)
    btn.z = wallDirection;
}

function rotate(src: Image) {
    const res = image.create(src.height, src.width);

    for (let x = 0; x < src.width; x++) {
        for (let y = 0; y < src.height; y++) {
            res.setPixel(y, x, src.getPixel(x, y))
        }
    }

    return res;
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite: Sprite, otherSprite: Sprite) {
    let overlap = 1;

    switch (otherSprite.z) {
        case CollisionDirection.Left:
            overlap = (otherSprite.left + 8) - sprite.left;
            sprite.left = Math.max(sprite.left, otherSprite.left + 4)
            break;
        case CollisionDirection.Right:
            overlap = sprite.right - (otherSprite.right - loadedButtonFrames[0].width);
            break;
        case CollisionDirection.Top:
            overlap = otherSprite.right - sprite.left;
            break;
        case CollisionDirection.Bottom:
            overlap = otherSprite.right - sprite.left;
            break;
    }

    if (overlap > loadedButtonFrames.length - 1) {
        sprites.allOfKind(SpriteKind.Enemy).forEach(function (value: Sprite, index: number) {
            value.destroy();
        })
        otherSprite.destroy();

        if (holodeck.isDone())
        loadNextLevel(otherSprite.x >> 4, otherSprite.y >> 4);

        clickSound.play()
        buttonSound.play()
        return;
    }

    otherSprite.setImage(loadedButtonFrames[overlap])
})