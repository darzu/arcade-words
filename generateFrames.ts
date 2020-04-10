namespace glitch {
    export function generateFrames(first: Image, dx: number, dy: number) {
        const res = [first];

        if (dx === 0 && dy === 0) {
            return res;
        }

        let next: Image;
        let prev = first;
        while (true) {
            if (dx) {
                for (let i = 0; i < Math.abs(dx); i++) {
                    next = shiftHorizontal(prev, dx < 0)
                }
                prev = next;
            }
            if (dy) {
                for (let i = 0; i < Math.abs(dy); i++) {
                    next = shiftVertical(prev, dy < 0)
                }
            }

            if (next.equals(first)) break;
            res.push(next);
            prev = next;
        }

        return res;
    }

    function shiftVertical(src: Image, negative: boolean) {
        const shifted = image.create(src.width, src.height);

        if (negative) {
            shifted.drawTransparentImage(src, 0, 1);
            shifted.drawTransparentImage(src, 0, -src.height + 1);
        }
        else {
            shifted.drawTransparentImage(src, 0, -1);
            shifted.drawTransparentImage(src, 0, src.height - 1);
        }

        return shifted;
    }

    function shiftHorizontal(src: Image, negative: boolean) {
        const shifted = image.create(src.width, src.height);

        if (negative) {
            shifted.drawTransparentImage(src, 1, 0);
            shifted.drawTransparentImage(src, -src.width + 1, 0);

        }
        else {
            shifted.drawTransparentImage(src, -1, 0);
            shifted.drawTransparentImage(src, src.width - 1, 0);
        }

        return shifted;
    }


    const diagonal1 = img`
        f f 1 1 1 1 f f f f 1 1 1 1 f f
        f f f 1 1 1 1 f f f f 1 1 1 1 f
        f f f f 1 1 1 1 f f f f 1 1 1 1
        1 f f f f 1 1 1 1 f f f f 1 1 1
        1 1 f f f f 1 1 1 1 f f f f 1 1
        1 1 1 f f f f 1 1 1 1 f f f f 1
        1 1 1 1 f f f f 1 1 1 1 f f f f
        f 1 1 1 1 f f f f 1 1 1 1 f f f
        f f 1 1 1 1 f f f f 1 1 1 1 f f
        f f f 1 1 1 1 f f f f 1 1 1 1 f
        f f f f 1 1 1 1 f f f f 1 1 1 1
        1 f f f f 1 1 1 1 f f f f 1 1 1
        1 1 f f f f 1 1 1 1 f f f f 1 1
        1 1 1 f f f f 1 1 1 1 f f f f 1
        1 1 1 1 f f f f 1 1 1 1 f f f f
        f 1 1 1 1 f f f f 1 1 1 1 f f f
    `;
    const diagonal2 = diagonal1.clone();
    diagonal2.flipY();

    const zag1 = img`
        1 1 1 1 f f f f 1 1 1 1 f f f f
        1 1 1 f f f f 1 1 1 1 f f f f 1
        1 1 f f f f 1 1 1 1 f f f f 1 1
        1 f f f f 1 1 1 1 f f f f 1 1 1
        1 1 f f f f 1 1 1 1 f f f f 1 1
        1 1 1 f f f f 1 1 1 1 f f f f 1
        1 1 1 1 f f f f 1 1 1 1 f f f f
        f 1 1 1 1 f f f f 1 1 1 1 f f f
        f f 1 1 1 1 f f f f 1 1 1 1 f f
        f f f 1 1 1 1 f f f f 1 1 1 1 f
        f f f f 1 1 1 1 f f f f 1 1 1 1
        1 f f f f 1 1 1 1 f f f f 1 1 1
        f f f f 1 1 1 1 f f f f 1 1 1 1
        f f f 1 1 1 1 f f f f 1 1 1 1 f
        f f 1 1 1 1 f f f f 1 1 1 1 f f
        f 1 1 1 1 f f f f 1 1 1 1 f f f
    `;
    const zag2 = zag1.transposed();

    let zagIndex = Math.randomRange(0, 15)

    function getZag() {
        zagIndex = (zagIndex + 1) % 16;
        switch (zagIndex) {
            case 0:
                return generateFrames(zag1, -1, -1);
            case 1:
                return generateFrames(zag1, 1, -1);
            case 2:
                return generateFrames(zag1, 1, 1);
            case 3:
                return generateFrames(zag1, -1, 1);
            case 4:
                return generateFrames(zag1, 0, -1);
            case 5:
                return generateFrames(zag1, 1, 0);
            case 6:
                return generateFrames(zag1, 0, 1);
            case 7:
                return generateFrames(zag1, -1, 0);
            case 8:
                return generateFrames(zag2, -1, -1);
            case 9:
                return generateFrames(zag2, 1, -1);
            case 10:
                return generateFrames(zag2, 1, 1);
            case 11:
                return generateFrames(zag2, -1, 1);
            case 12:
                return generateFrames(zag2, 0, -1);
            case 13:
                return generateFrames(zag2, 1, 0);
            case 14:
                return generateFrames(zag2, 0, 1);
            case 15:
                return generateFrames(zag2, -1, 0);
        }

        return null;
    }

    let dIndex = Math.randomRange(0, 11)

    function getDiagonal() {
        dIndex = (dIndex + 1) % 12
        switch (dIndex) {
            case 0:
                return generateFrames(diagonal1, -1, 1);
            case 1:
                return generateFrames(diagonal1, 1, -1);
            case 2:
                return generateFrames(diagonal1, 0, -1);
            case 3:
                return generateFrames(diagonal1, 1, 0);
            case 4:
                return generateFrames(diagonal1, 0, 1);
            case 5:
                return generateFrames(diagonal1, -1, 0);
            case 6:
                return generateFrames(diagonal2, 1, 1);
            case 7:
                return generateFrames(diagonal2, -1, -1);
            case 8:
                return generateFrames(diagonal2, 0, -1);
            case 9:
                return generateFrames(diagonal2, 1, 0);
            case 10:
                return generateFrames(diagonal2, 0, 1);
            case 11:
                return generateFrames(diagonal2, -1, 0);
        }

        return null;
    }


    const foregroundColors = [4, 6, 8];
    const backgroundColors = [2, 4, 6, 8, 10];

    let zag = false;

    export function getNewTileset(foreground: boolean, colorIndex: number) {
        let color: number;
        if (foreground) {
            color = ((colorIndex % 3) + 2) * 2
            
        }
        else {
            color = ((colorIndex % 5) + 1) * 2
        }

        // console.log(`fg? ${foreground} c ${color}`)

        zag = Math.random() < 0.5;

        return new GlitchTileset(zag ? getZag() : getDiagonal(), color);
    }
}

class GlitchTileset {
    index: number;
    constructor(public frames: Image[], public color: number) {
        this.index = 0;
        this.frames = frames.slice().map(f => {
            const s = f.clone();
            s.replace(1, color)
            s.replace(15, color + 1)
            return s;
        })
    }

    setTileToNextFrame(tileIndex: number, isWall: boolean) {
        scene.setTile(tileIndex, this.frames[this.index], isWall);
        this.index = (this.index + 1) % this.frames.length;
    }
}