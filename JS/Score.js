import {gameState, ctx, cvs, srcImg, noMedal} from './game.js'
export default class Score{

    value = 0;
    best = parseInt(localStorage.getItem("flappyBirdBest") || 0);

    draw(){
        
        

        if(gameState.current == gameState.game){
            ctx.lineWidth = 2;
            ctx.fillStyle = "white";
            ctx.font = "40px Play";
            //Score during playing
            ctx.fillText(this.value, cvs.width/2, 50);
            ctx.strokeText(this.value, cvs.width/2, 50);
        }
        else if(gameState.current == gameState.gameOver){
            
            ctx.font = "25px Play";
            ctx.fillStyle = "red";
            // Gameover score
            ctx.fillText(this.value, 225, 195);
            ctx.strokeText(this.value, 225, 195);
            // Gameover best score
            ctx.fillText(this.best, 225, 237);
            ctx.strokeText(this.best, 225, 237);
            
        }

        
    }
    reset(){
        this.value = 0;
    }
}
