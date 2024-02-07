
export class BowlingGame {

    private rolls: number[] = []
    private readonly FRAMES = 10
    private readonly ALL_PINS = 10

    public roll(pins: number){
        this.rolls.push(pins)
    }
    public getScore(){
        let score = 0
        let firstTry = 0
        for (let frame = 0; frame < this.FRAMES; ++frame, firstTry+=2) {
            
            if(this.isStrike(firstTry)){
                score += this.scoreForStrike(firstTry--)
            }else {
                if (this.isSpare(firstTry)){
                    score += this.scoreForSpare(firstTry)
                }else{
                    score += this.scoreForFrame(firstTry)
                }
            }


            
            
        }
        return score
    }
    
    private scoreForFrame(firstTry: number){
        return this.rolls[firstTry] + this.rolls[firstTry+1]
    }
    private scoreForSpare(firstTry: number){
        return this.ALL_PINS + this.rolls[firstTry+2]
    }
    private scoreForStrike(firstTry: number){
        return this.ALL_PINS + this.rolls[firstTry+1] + this.rolls[firstTry+2]
    }
    private isSpare(firstTry: number){
        return this.rolls[firstTry] + this.rolls[firstTry+1] == this.ALL_PINS
    }
    private isStrike(firstTry: number){
        return this.rolls[firstTry] == this.ALL_PINS
    }
}