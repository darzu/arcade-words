/**
 * Tilemap guide:
 *  0 - Foreground, no wall
 *  1 - Background, wall
 *  2 - Foreground, during transition
 *  3 - Background, during transition
 */

class Holodeck {
    protected map: Image;
    protected tilesets: GlitchTileset[];
    protected colorIndices: number[];
    protected playerColumn: number;
    protected playerRow: number;
    
    started: boolean;

    remaining: number[];
    cleanup: number[];

    tilesetGenerated: boolean;

    constructor(map: Image) {
        scene.centerCameraAt((screen.width >> 1) + 8, (screen.height >> 1) + 10)
        this.map = map.clone();
        this.tilesets = [];
        this.colorIndices = [];

        this.cleanup = [];
        this.remaining = [];

        this.started = false;

        game.onUpdateInterval(50, () => {
            if (this.started) this.tilesets.forEach((t, i) => t.setTileToNextFrame(i, this.isWall(i)))
        });

        let seed = Math.randomRange(0, 5)
        for (let i = 0; i < 4; i++) {
            this.colorIndices[i] = seed + i
        }
        // this.updateTilesets();

        // scene.setTileMap(this.map)

        // this.transitionToLevel(this.map)
    }

    isWall(index: number) {
        return !!(index & 1);
    }

    updateTileset(index: number) {
        this.tilesets[index] = glitch.getNewTileset(!this.isWall(index), this.colorIndices[index]);
        this.colorIndices[index] = (this.colorIndices[index] + 1) % 1000;
    }

    updateTilesets() {
        for (let i = 0; i < 4; i++) {
            this.updateTileset(i)
        }
    }

    transitionToLevel(level: Image, playerColumn = 0, playerRow = 0) {
        if (!this.started) {
            this.updateTilesets();
            this.started = true;
        }
        if (playerColumn > 0 && playerRow > 0) {
            this.playerColumn = playerColumn;
            this.playerRow = playerRow;

            scene.setTileAt(scene.getTile(this.playerColumn - 1, this.playerRow), 3);
            scene.setTileAt(scene.getTile(this.playerColumn + 1, this.playerRow), 3);
            scene.setTileAt(scene.getTile(this.playerColumn, this.playerRow - 1), 3);
            scene.setTileAt(scene.getTile(this.playerColumn, this.playerRow + 1), 3);
        }
        else {
            this.playerColumn = -1;
            this.playerRow = -1;
        }

        this.remaining = [];
        for (let i = 0; i < level.width * level.height; i++) {
            this.remaining.push(i);
        }

        this.cleanup = [];
        this.tilesetGenerated = false;
        this.map = level.clone();
        this.updateTileset(2)
        this.updateTileset(3)
    }

    next() {
        const isCleanup = this.remaining.length === 0;

        if (isCleanup && !this.tilesetGenerated) {
            this.tilesetGenerated = true;

            do {
                this.updateTileset(0)
                this.updateTileset(1)
            } while (this.tilesets[0].color === this.tilesets[1].color)
        }

        const arr = isCleanup ? this.cleanup : this.remaining;
        const index = Math.randomRange(0, arr.length - 1);

        const tile = arr[index];
        arr.splice(index, 1);

        const column = (tile % this.map.width);
        const row = (Math.idiv(tile, this.map.width))

        if (isCleanup) {
            switch (this.map.getPixel(column, row)) {
                case 9:
                    createButton(CollisionDirection.Top, tiles.getTileLocation(column, row));
                    scene.setTileAt(scene.getTile(column, row), 0);
                    break;
                case 10:
                    createButton(CollisionDirection.Right, tiles.getTileLocation(column, row));
                    scene.setTileAt(scene.getTile(column, row), 0);
                    break;
                case 11:
                    createButton(CollisionDirection.Bottom, tiles.getTileLocation(column, row));
                    scene.setTileAt(scene.getTile(column, row), 0);
                    break;
                case 12:
                    createButton(CollisionDirection.Left, tiles.getTileLocation(column, row));
                    scene.setTileAt(scene.getTile(column, row), 0);
                    break;
                default:
                    scene.setTileAt(scene.getTile(column, row), this.map.getPixel(column, row));
                    break;
            }
        }
        else {
            this.cleanup.push(tile);

            if (this.map.getPixel(column, row) === 0) {
                if (this.playerColumn > 0 && this.playerRow > 0 && Math.abs(column - this.playerColumn) === 1 && Math.abs(row - this.playerRow) === 1) {
                    scene.setTileAt(scene.getTile(column, row), 3);
                }
                else {
                    scene.setTileAt(scene.getTile(column, row), 2);
                }
            }
            else {
                scene.setTileAt(scene.getTile(column, row), 3);
            }
        }
    }

    isDone() {
        return this.remaining.length === 0 && this.cleanup.length === 0;
    }

    destroy() {
        this.remaining = [];
        this.cleanup = [];
        this.started = false;
    }
}

game.onUpdate(function () {
    if (holodeck && !holodeck.isDone()) {
        for (let i = 0; i < 4; i++) {
            holodeck.next();
            if (holodeck.isDone()) return;
        }
    }
})