class Player {
    constructor(playerName,playerImage,playerId){
        this.name = playerName;
        this.id = playerId;
        this.life = 100,
        this.coordX = 0,
        this.coordY = 0,
        this.weapon = 4, // arme défaut
        this.action = "normal", //mode combat
        this.image = playerImage; // classe
        this.finishRound = null;
    };
    changeMode(){
        if(this.action == "normal"){
            this.action = "defense"
        }else{
            this.action = "normal"
        }
    }
    attack(playerTouched,damage){
        playerTouched.isInjured(damage)
    }
    isInjured(damage){
        if(this.action == "normal"){
            this.life = this.life - damage;
        }else{
            this.life = this.life - damage / 2;
            this.changeMode();
        }
    }
    isDead(){
        return this.life <= 0;    
    }

}
