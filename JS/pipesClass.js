import { cvs, ctx , frames ,gameState ,srcImg, HIT ,SCORE_S, bird ,score, gameDifficulty} from './game.js' ;

export class pipesClass {
    
    constructor(){
        this.position = [] ;
    
        this.top = {
            sX : 553,
            sY : 0
        } ;
        this.bottom = {
            sX : 502,
            sY : 0
        } ;
        
        this.wSrc  = 53 ;
        this.hSrc  = 400;
        this.hDes  = 400;
        this.maxYPos = -150;
        
        switch(gameDifficulty.current) {
            case 0:
                this.easy() ; 
              break;
            case 1:
                this.medium() ; 
              break;
            case 2:
                this.hard() ; 
              break;
            case 3:
                this.impossible() ;
              break;
            default:
              this.medium() ;       // medium settings (By defaults)
          }
    }
    
    
    draw (){
        for(let i  = 0; i < this.position.length; i++){
            let p = this.position[i];
            
            let topYPos = p.y;
            let bottomYPos = p.y + this.hDes + this.gap;
            
            // top pipe
            ctx.drawImage(srcImg, this.top.sX, this.top.sY, this.wSrc, this.hSrc, p.x, topYPos, this.wDes, this.hDes);  
            
            // bottom pipe
            ctx.drawImage(srcImg, this.bottom.sX, this.bottom.sY, this.wSrc, this.hSrc, p.x, bottomYPos, this.wDes, this.hDes);  
        }
    }
    
    update (){
        if(gameState.current !== gameState.game) return;
        
        if(frames%this.distBetweenPipes == 0){
            this.position.push({
                x : cvs.width,
                y : this.maxYPos * ( Math.random() + 1)
            });
        }
        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];
            
            let bottomPipeYPos = p.y + this.hDes + this.gap;
            
            // COLLISION DETECTION
            // TOP PIPE
            if(bird.xDest + bird.radius > p.x && bird.xDest - bird.radius < p.x + this.wDes && bird.yDest + bird.radius > p.y && bird.yDest - bird.radius < p.y + this.hDes){
                gameState.current = gameState.gameOver;
                HIT.play();
            }
            // BOTTOM PIPE
            if(bird.xDest + bird.radius > p.x && bird.xDest - bird.radius < p.x + this.wDes && bird.yDest + bird.radius > bottomPipeYPos && bird.yDest - bird.radius < bottomPipeYPos + this.hDes){
                gameState.current = gameState.gameOver;
                HIT.play();
            }
            
            // MOVE THE PIPES TO THE LEFT
            p.x -= this.dx;
            
            // if the pipes go beyond canvas, we delete them from the array
            if(p.x + this.wDes <= 0){
                this.position.shift();
                score.value += 1;
                SCORE_S.play();
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    }
    
    reset (){
        this.position = [];
    }
    easy(){
        this.wDes  = 35 ;                   // pipe width
        this.gap = 120 ;                     // distance between TopPipe and BottomPipe
        this.dx = 2;                    //speed of frames
        this.distBetweenPipes = 80  ;          //distance 
    }
    medium(){
        this.wDes  = 50 ;                   // pipe width
        this.gap = 100 ;                     // distance between TopPipe and BottomPipe
        this.dx = 3;                    //speed of frames
        this.distBetweenPipes = 60  ;          //distance 
    }
    hard(){
        this.wDes  = 60 ;                   // pipe width
        this.gap = 80 ;                     // distance between TopPipe and BottomPipe
        this.dx = 4;                    //speed of frames
        this.distBetweenPipes = 50  ;          //distance
    }
    impossible(){
        this.wDes  = 70 ;                   // pipe width
        this.gap = 82 ;                     // distance between TopPipe and BottomPipe
        this.dx = 6;                    //speed of frames
        this.distBetweenPipes = 40  ;          //distance 
    }
    
}