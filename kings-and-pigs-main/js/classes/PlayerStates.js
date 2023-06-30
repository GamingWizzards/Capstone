export class Rolling extends Player{
    constructor(player){
        super('roll');
        this.player = player;
    }
    handleInput(keys){
        if(keys.f.pressed) {
            this.switchSprite('rollRight')
            this.velocity.x = + 8 
            this.lastDirection = 'right' 
          } else if(keys.f.pressed) {
            this.switchSprite('rollLeft')
            this.velocity.x = -8
            this.lastDirection = 'left'
    }
    
}
}