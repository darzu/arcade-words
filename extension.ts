// Add your code here

//% color=#29918a icon="\uf27b"
//% groups='["Words"]'
namespace words {
    let wordSpeed = word.TextSpeed.Medium;

    /**
     * Create a word bubble
     */
    //% blockId=create_word_bubble
    //% block="new word bubble"
    //% blockSetVariable=bubble
    //% group="Words" weight=50 blockGap=8 
    export function createWordBubble(): word.Bubble {
        return new word.Bubble();
    }

    //% block="$bubble say $lines then"
    //% bubble.shadow=variables_get
    //% bubble.defl=bubble
    //% handlerStatement=1
    //% group="Words" weight=50 blockGap=8 
    export function sayThen(bubble: word.Bubble, lines: string[], onEnd: () => void) {
        let ls = lines.map(l => word.line(l, wordSpeed))
        bubble.startMessage([
            new word.MessagePage(ls)
        ], onEnd);

    }

    //% block="$bubble say $lines"
    //% bubble.shadow=variables_get
    //% bubble.defl=bubble
    //% group="Words" weight=50 blockGap=8 
    export function say(bubble: word.Bubble, lines: string[]) {
        sayThen(bubble, lines, () => {})
    }

    export function spriteSay(sprite: Sprite, lines: string[]) {
        // NOTE: disabled because redundant
        //% block="$sprite say $lines"
        //% sprite.shadow=variables_get
        //% sprite.defl=mySprite
        //% group="Words" weight=50 blockGap=8 
        let bubble = createWordBubble();
        setAnchorSprite(bubble, sprite);
        sayThen(bubble, lines, () => { })
    }

    //% block="attach $bubble to $sprite"
    //% bubble.shadow=variables_get
    //% bubble.defl=bubble
    //% sprite.shadow=variables_get
    //% sprite.defl=sprite
    //% group="Words" weight=50 blockGap=8 
    export function setAnchorSprite(bubble: word.Bubble, sprite: Sprite) {
        bubble.setAnchorSprite(sprite);
    }

    //% block="position $bubble at x $x y $y"
    //% bubble.shadow=variables_get
    //% bubble.defl=bubble
    //% group="Words" weight=50 blockGap=8 
    export function setAnchor(bubble: word.Bubble, x: number, y: number) {
        bubble.setAnchor(x, y)
    }

    //% block="center $bubble text $center"
    //% bubble.shadow=variables_get
    //% bubble.defl=bubble
    //% group="Words" weight=50 blockGap=8 
    export function center(bubble: word.Bubble, center: boolean) {
        bubble.setCentered(center)
    }

    //% block="set bubble foreground $fg and background $bg"
    //% fg.shadow="colorindexpicker"
    //% bg.shadow="colorindexpicker"
    //% group="Words" weight=50 blockGap=8 
    export function setColors(fg: number, bg: number) {
        word.setColors(fg, bg);
    }

    //% block="set word speed $speed"
    //% group="Words" weight=50 blockGap=8 
    export function setWordSpeed(speed: word.TextSpeed) {
        wordSpeed = speed;
    }

    
}