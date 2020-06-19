import {ctx, srcImg} from './game.js'


export default class Component{
    constructor(sX,sY,w,h,dX,dY){
        this.sX = sX;
        this.sY = sY;
        this.w = w;
        this.h = h;
        this.dX = dX;
        this.dY = dY;
    }

    drawWithRepeat(){
        ctx.drawImage(srcImg, this.sX, this.sY, this.w, this.h, this.dX, this.dY, this.w, this.h);
        ctx.drawImage(srcImg, this.sX, this.sY, this.w, this.h, this.dX + this.w, this.dY, this.w, this.h);
    }

    draw(){
        ctx.drawImage(srcImg, this.sX, this.sY, this.w, this.h, this.dX, this.dY, this.w, this.h);
    }

    // Make the ground move seems like its moving 
    // To simulate that the bird is moving forwards
    foregroundUpdate(){
        this.dX = (this.dX - 2) % (this.w / 2)
    }
}
