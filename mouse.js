class Mouse {

    constructor(){
       
        this.clientX = 0;
        this.clientY = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.screenX = 0;
        this.screenY = 0;
    }
     
    selectCell(functionParameter){
        window.addEventListener('click', functionParameter);
    }

   
}


