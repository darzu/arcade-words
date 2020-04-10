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

}