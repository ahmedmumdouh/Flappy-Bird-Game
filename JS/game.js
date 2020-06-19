import { birdClass } from './birdClass.js' ;
import { pipesClass } from './pipesClass.js' ;
import Component from './Component.js';
import Score from './Score.js'

// SELECT CVS
export const cvs = document.getElementById("bird");
export const ctx = cvs.getContext("2d");

// GAME VARS AND CONSTS
export let frames = 0;


// LOAD SPRITE IMAGE


const menuBg = new Image();
menuBg.src = "http://localhost/Flappy_Bird_ITI/img/menubg.jpg";



// LOAD SOUNDS
export const SCORE_S = new Audio();
SCORE_S.src = "http://localhost/Flappy_Bird_ITI/audio/point.wav";

const FLAP = new Audio();
FLAP.src = "http://localhost/Flappy_Bird_ITI/audio/flap.wav";

export const HIT = new Audio();
HIT.src = "http://localhost/Flappy_Bird_ITI/audio/hit.wav";

const SWOOSHING = new Audio();
SWOOSHING.src = "http://localhost/Flappy_Bird_ITI/audio/swooshing.wav";

export const DIE = new Audio();
DIE.src = "http://localhost/Flappy_Bird_ITI/audio/die.wav";

const CLICK = new Audio();
CLICK.src = "http://localhost/Flappy_Bird_ITI/audio/click.wav";


export const gameDifficulty = {
    current : 0,
    easy : 0,
    medium : 1,
    hard : 2,
    impossible:3
}



// GAME STATE
export const gameState = {
    current : 3,
    getReady : 0,
    game : 1,
    gameOver : 2,
    selectDiff: 3,
    selectCharacter: 4,
}

// // START BUTTON COORD
const startBtn = {
    x : 120,
    y : 263,
    w : 83,
    h : 29
}




// BACKGROUND
const bg = new Component(0, 0, 275, 225, 0, cvs.height-225);
export const fg = new Component(276, 0, 224, 110, 0, cvs.height - 110);
const gameoverImg = new Component(175, 228, 227, 200, cvs.width/2 - 227/2, 100);
const getReadyImg = new Component(28, 316, 124, 63, 100 , 150);
export const noMedal = new Component(311, 112, 45, 45, 71, 188);
const bronzeMedal = new Component(359, 157, 45, 45, 71, 188);
const silverMedal = new Component(360, 111, 45, 45, 71, 188);
const goldMedal = new Component(311, 157, 45, 45, 71, 188);

export let bird = new birdClass(gameDifficulty.current);
export let pipes = new pipesClass(gameDifficulty.current); 
export const score = new Score();

const blueBird = new Image();
blueBird.src = "http://localhost/Flappy_Bird_ITI/img/blueBird.png";

const pinkBird = new Image();
pinkBird.src = "http://localhost/Flappy_Bird_ITI/img/pinkBird.png";

const aglyBird = new Image();
aglyBird.src = "http://localhost/Flappy_Bird_ITI/img/aglyBird.png";

export const srcImg = new Image();

const easyBtn = new Image();
easyBtn.src = "http://localhost/Flappy_Bird_ITI/img/easy.png";

const hardBtn = new Image();
hardBtn.src = "http://localhost/Flappy_Bird_ITI/img/hard.png";

const mediumBtn = new Image();
mediumBtn.src = "http://localhost/Flappy_Bird_ITI/img/med.png";

const impBtn = new Image();
impBtn.src = "http://localhost/Flappy_Bird_ITI/img/imp.png";

const selectBtn = new Image();
selectBtn.src = "http://localhost/Flappy_Bird_ITI/img/select.png";


// // DRAW
function draw(){
    if(gameState.current == gameState.selectDiff){
        ctx.drawImage(menuBg, 0, 0, 404, 316, 0, 0, 320, 480);
        ctx.drawImage(easyBtn, 0, 0, 578, 277, 65, 90, 200,65)
        ctx.drawImage(mediumBtn, 0, 0, 578, 277, 65, 165, 200,65)
        ctx.drawImage(hardBtn, 0, 0, 578, 277, 65, 240, 200,65)
        ctx.drawImage(impBtn, 0, 0, 578, 277, 65, 310, 200,65)

    }
    else if (gameState.current == gameState.selectCharacter){
        ctx.drawImage(menuBg, 0, 0, 404, 316, 0, 0, 320, 480);
        ctx.drawImage(blueBird, 0, 0 , 276, 183, 20, 150, 125, 150);
        ctx.drawImage(pinkBird, 0, 0 , 170, 165, 220, 150, 100, 110);
        ctx.drawImage(aglyBird, 0, 0 , 225, 225, 110, 150, 125, 150);
        ctx.drawImage(selectBtn, 0, 0 , 578, 277, 45, 20, 240, 80);

    }
    else{
        ctx.fillStyle = "#70c5ce";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        
        bg.drawWithRepeat();
        pipes.draw();
        fg.drawWithRepeat();
        bird.draw();
        if(gameState.current == gameState.gameOver){
            gameoverImg.draw();
            if(score.value < 10){
                noMedal.draw();
            }
            else if(score.value >= 10 && score.value < 20){
                bronzeMedal.draw();
            }
            else if(score.value >= 20 && score.value < 30){
                silverMedal.draw();
            }
            if(score.value >= 30){
                goldMedal.draw();
            }   
        }
        if(gameState.current == gameState.getReady){
            getReadyImg.draw();
        }
        score.draw();
    }
    
}

// // UPDATE
function update(){
    if(gameState.current != gameState.selectCharacter && gameState.current != gameState.selectDiff){
        bird.update();
        if(gameState.current == gameState.game){
            fg.foregroundUpdate();
        }
        pipes.update();
    }
}

// // CONTROL THE GAME
cvs.addEventListener("click", function(evt){
    switch(gameState.current){
        case gameState.getReady:
            gameState.current = gameState.game;
            SWOOSHING.play();
            break;
        case gameState.game:
            if(bird.y - bird.radius <= 0) return;
            bird.flap();
            FLAP.play();
            break;
        case gameState.gameOver:
            let rect = cvs.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;
            // CHECK IF WE CLICK ON THE START BUTTON
            if(clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w 
            && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h){
                CLICK.play() ;
                pipes.reset();
                bird.speedReset();
                score.reset();
                gameState.current = gameState.getReady;
                
                
            }
            break;
        case gameState.selectCharacter:
            let rect1 = cvs.getBoundingClientRect();
            let clickX1 = evt.clientX - rect1.left;
            let clickY1 = evt.clientY - rect1.top;

            
            // Yellow bird is selected
            if(clickX1 >= 220 && clickX1 <= 220 + 125
            && clickY1 >= 165 && clickY1 <= 165 + 150){
                CLICK.play() ;
                srcImg.src = "http://localhost/Flappy_Bird_ITI/img/pinkSprite.png";
                gameState.current = gameState.getReady 
                }

            // Blue bird is selected
            else if(clickX1 >= 20 && clickX1 <= 20 + 62
            && clickY1 >= 150 && clickY1 <= 150 + 100){
                CLICK.play() ;
                srcImg.src = "http://localhost/Flappy_Bird_ITI/img/blueSprite.png";
                gameState.current = gameState.getReady
                }

            // Red bird is selected
            else if(clickX1 >= 110 && clickX1 <= 110 + 125
                && clickY1 >= 150 && clickY1 <= 150 + 150){
                    CLICK.play() ;
                    srcImg.src = "http://localhost/Flappy_Bird_ITI/img/aglySprite.png";
                    gameState.current = gameState.getReady
                    }
            break;

        case gameState.selectDiff:
            let rect2 = cvs.getBoundingClientRect();
            let clickX2 = evt.clientX - rect2.left;
            let clickY2 = evt.clientY - rect2.top;
            
            // Yellow bird is selected
            if(clickX2 >= 65 && clickX2 <= 65 + 200
            && clickY2 >= 90 && clickY2 <= 90 + 65){
                CLICK.play() ;
                gameDifficulty.current = gameDifficulty.easy;
                bird = new birdClass(gameDifficulty.current);
                pipes = new pipesClass(gameDifficulty.current);
                gameState.current = gameState.selectCharacter;
                }
            if(clickX2 >= 65 && clickX2 <= 65 + 200
            && clickY2 >= 165 && clickY2 <= 165 + 65){
                CLICK.play() ;
                gameDifficulty.current = gameDifficulty.medium;
                bird = new birdClass(gameDifficulty.current);
                pipes = new pipesClass(gameDifficulty.current);
                gameState.current = gameState.selectCharacter;
                }
            if(clickX2 >= 65 && clickX2 <= 65 + 200
            && clickY2 >= 240 && clickY2 <= 240 + 65){
                CLICK.play() ;
                gameDifficulty.current = gameDifficulty.hard;
                bird = new birdClass(gameDifficulty.current);
                pipes = new pipesClass(gameDifficulty.current);
                gameState.current = gameState.selectCharacter;
                }
            if(clickX2 >= 65 && clickX2 <= 65 + 200
            && clickY2 >= 310 && clickY2 <= 310 + 65){
                CLICK.play() ;
                gameDifficulty.current = gameDifficulty.impossible;
                bird = new birdClass(gameDifficulty.current);
                pipes = new pipesClass(gameDifficulty.current);
                gameState.current = gameState.selectCharacter;
                }
    }
});


// // LOOP
function loop(){
    update();
    draw();
    frames++;
    
    requestAnimationFrame(loop);
}
loop();
