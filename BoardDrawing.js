class BoardDrawing {
    constructor (canvaId){
        this.currentCanva = $('#'+canvaId)[0];
        console.log(this.currentCanva);
        this.canvaContext = this.currentCanva.getContext("2d");
    }

    drawLine(startX,startY,endX,endY){
        this.canvaContext.moveTo(startX,startY);
        this.canvaContext.lineTo(endX,endY);
        this.canvaContext.stroke();

    }
    drawObject(x,y,imgId){
       
        var img = $('#'+ imgId)[0];
        this.canvaContext.drawImage(img,x,y);
    }

    
    drawRect(xStart,yStart,size,color,weapon){
        this.canvaContext.fillStyle = color;
        this.canvaContext.fillRect(xStart,yStart,size,size);
        if (weapon){
        console.log(weapon);
        var drawX = 800/this.length * xStart + (800/this.length - 40) / 2;
        var drawY = 800/this.length * yStart + (800/this.length - 40) / 2;
        var drawImage = weapon.image;
        this.drawObject(drawX,drawY,drawImage);
        //var drawX = 800/size * xStart + (800/size - 40) / 2;
        //var drawY = 800/size * yStart + (800/size - 40) / 2;
        //console.log(size);
       // var drawImage = weapon.image;
        //this.drawObject(drawX,drawY,drawImage);

        }

        
    }
}