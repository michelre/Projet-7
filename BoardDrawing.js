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

    
    drawRect(xStart,yStart,size,color){
        this.canvaContext.fillStyle = color;
        this.canvaContext.fillRect(xStart,yStart,size,size);
    }
}