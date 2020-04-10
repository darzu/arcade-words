// Add your code here

//% color=#29918a icon="\uf27b"
//% groups='["Words"]'
namespace words {
    /**
     * Create a word bubble
     */
    //% blockId=create_word_bubble
    //% block="new word bubble"
    //% blockSetVariable=myWordBubble
    //% group="Words" weight=50 blockGap=8 
    export function createWordBubble(): word.Bubble {
        return new word.Bubble();
    }

    //% block="say $lines then"
    //% bubble.shadow=variables_get
    //% bubble.defl=bubble
    //% handlerStatement
    //% group="Words" weight=50 blockGap=8 
    export function sayThen(bubble: word.Bubble, lines: string[], onEnd: () => {}) {
        let ls = lines.map(l => word.line(l, word.TextSpeed.Medium))
        bubble.startMessage([
            new word.MessagePage(ls)
        ], onEnd);

    }
}