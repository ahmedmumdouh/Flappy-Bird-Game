
import { cvs, ctx , frames ,gameState ,srcImg, fg ,DIE, gameDifficulty} from './game.js' ;
const DEGREE = Math.PI/180;


export class birdClass { 
    constructor(){
        this.animation = [
            {sX: 276, sY : 112},
            {sX: 276, sY : 139},
            {sX: 276, sY : 164},
            {sX: 276, sY : 139} 
        ] ;
        this.xDest = 50; 
        this.yDest = 150 ;
        this.wSrc = 34 ;
        this.hSrc = 26 ;   
        this.frame  = 0 ;      
        this.speed = 0 ;
        this.rotation  = 0 ; 
        //console.log(gameDifficulty.current);
        
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
                this.medium() ;             // medium settings (By defaults)
          }
          this.radius = (this.wDest-2)/2 ;
          this.wingSlowRate = Math.floor(this.jump-1) ;               
          this.hDest = this.wDest-10 ; 


    }
	easy(){
        this.gravity  = 0.1 ;      
        this.wDest = 30 ;
        this.jump  = 2.2 ; 
    }
    medium(){
        this.gravity  = 0.15 ;      
        this.wDest = 30 ;
        this.jump  = 3 ; 
    }
    hard(){
        this.gravity  = 0.25 ;      
        this.wDest = 35 ;
        this.jump  = 4.5 ; 
    }
    impossible(){
        this.gravity  = 0.25 ;      
        this.wDest = 40 ;
        this.jump  = 5.5 ; 
    }
	

    draw(){
        let bird = this.animation[this.frame];
        
        ctx.save();
        ctx.translate(this.xDest, this.yDest);
        ctx.rotate(this.rotation);
        ctx.drawImage(srcImg, bird.sX, bird.sY, this.wSrc, this.hSrc,- this.wDest/2, - this.hDest/2, this.wDest, this.hDest);
        
        ctx.restore();
    }

    flap(){
        this.speed = - this.jump;
    }

    update(){
    // IF THE GAME STATE IS GET READY STATE, THE BIRD MUST FLAP SLOWLY
        this.period = gameState.current == gameState.getReady ? this.wingSlowRate*2 : this.wingSlowRate ;
        // WE INCREMENT THE FRAME BY 1, EACH PERIOD
        this.frame += frames%this.period == 0 ? 1 : 0;
        // FRAME GOES FROM 0 To 4, THEN AGAIN TO 0
        this.frame = this.frame%this.animation.length;
        
        if(gameState.current == gameState.getReady){
            this.yDest = 150; // RESET POSITION OF THE BIRD AFTER GAME OVER
            this.rotation = 0 * DEGREE;
        }else{
            this.speed += this.gravity;
            this.yDest += this.speed;
            
            if(this.yDest + this.hDest/2 >= cvs.height - fg.h){
                this.yDest = cvs.height - fg.h - this.hDest/2;
                if(gameState.current == gameState.game){
                    DIE.play();
                    gameState.current = gameState.gameOver;
                    
                }
            }
            
            // IF THE SPEED IS GREATER THAN THE JUMP MEANS THE BIRD IS FALLING DOWN
            if(this.speed >= this.jump){
                this.rotation = 90 * DEGREE;
                this.frame = 1;
            }else{
                this.rotation = -25 * DEGREE;
            }
        }  
    }
    speedReset (){
            this.speed = 0;
        }

    
  } 

