
const cvs = document.getElementById("btns");
const ctx = cvs.getContext("2d");

const CLICK = new Audio();
CLICK.src = "http://localhost/Flappy_Bird_ITI/audio/click.wav";

const MENU = new Audio();
MENU.src = "http://localhost/Flappy_Bird_ITI/audio/MainMenu_music.mp3";
MENU.play();


const play = new Image();
play.src = "http://localhost/Flappy_Bird_ITI/img/play.png";

ctx.drawImage(play, 0, 0, 578, 277, 45, 45, 240,80);

const howToPlay = new Image();
howToPlay.src = "http://localhost/Flappy_Bird_ITI/img/how-to.png";

ctx.drawImage(howToPlay, 0, 0, 578, 277, 45, 145, 240,80);

const about = new Image();
about.src = "http://localhost/Flappy_Bird_ITI/img/about.png";

ctx.drawImage(about, 0, 0, 578, 277, 45, 245, 240,80);

const quit = new Image();
quit.src = "http://localhost/Flappy_Bird_ITI/img/quit.png";

ctx.drawImage(quit, 0, 0, 578, 277, 45, 345, 240,80);

cvs.addEventListener("click", function(evt){
    let rect = cvs.getBoundingClientRect();
    let clickX = evt.clientX - rect.left;
    let clickY = evt.clientY - rect.top;
                
    //  Play now is selected
    if(clickX >= 45 && clickX <= 45 + 240
        && clickY >= 45 && clickY <= 45 + 80){
            CLICK.play();
            setTimeout(function () {
                window.location.replace("game.html")
            }, 200); 
            
        }

    //  How to play  is selected
    if(clickX >= 45 && clickX <= 45 + 240
        && clickY >= 145 && clickY <= 145 + 80){
            CLICK.play();
            setTimeout(function () {
                window.location.replace("HowToPlay.html")
            }, 200);   
        }

    // About us is selected
    if(clickX >= 45 && clickX <= 45 + 240
        && clickY >= 245 && clickY <= 245 + 80){
            CLICK.play();
            setTimeout(function () {
                window.location.replace("AboutUs.html") ;
            }, 200);
        }

    // Quit is selected
    if(clickX >= 45 && clickX <= 45 + 240
        && clickY >= 345 && clickY <= 345 + 80){
            CLICK.play();
            window.close();
        }
});

setTimeout(function () {
    if(window.location.hash != '#r') {
        window.location.hash = 'r';
        window.location.reload(1);
    }
}, 100);


setInterval(function(){const MENU = new Audio();
    MENU.src = "http://localhost/Flappy_Bird_ITI/audio/MainMenu_music.mp3";
    MENU.play();} , 332000) ; 
