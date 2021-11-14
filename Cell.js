class Cell {
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = 'white';
        this.north = null;
        this.south = null;
        this.east = null;
        this.west = null;
        this.neighbors = [];
        this.distance = Infinity;
        this.heuristic = 0;
        this.cost = Infinity;
        this.isWall = false;
        this.parent = null;
        this.edge = 0;
    }
    draw(){
        ctx.fillRect(this.x, this.y, this.size, this.size);
     }
    drawStartPoint(){
        ctx.fillStyle = 'rgb(119, 0, 255)';
        ctx.beginPath();
        ctx.arc(this.x+this.size/2, this.y+this.size/2, this.size/2,0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }

    drawTargetPoint(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x+this.size/2, this.y+this.size/2, this.size/2,0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x+this.size/2, this.y+this.size/2, (this.size/2)-2,0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x+this.size/2, this.y+this.size/2, (this.size/2)-4,0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }

    drawArrowNorth(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y+this.size);
        ctx.lineTo(this.x+this.size/2, this.y);
        ctx.lineTo(this.x+this.size, this.y+size);
        ctx.fill();
        ctx.closePath();
    }
    drawArrowSouth(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+this.size/2, this.y+this.size);
        ctx.lineTo(this.x+this.size, this.y);
        ctx.fill();
        ctx.closePath();
    }
    drawArrowEast(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+this.size, this.y+this.size/2);
        ctx.lineTo(this.x, this.y+this.size);
        ctx.fill();
        ctx.closePath();
    }
    drawArrowWest(){
        ctx.beginPath();
        ctx.moveTo(this.x, this.y+this.size/2);
        ctx.lineTo(this.x+this.size, this.y);
        ctx.lineTo(this.x+this.size, this.y+this.size);
        ctx.fill();
        ctx.closePath();
    }

    text(text){
        ctx.fillStyle='black';
        ctx.font = this.size/3 +'px Arial';
        ctx.fillText(text, this.x+this.size/3, this.y+this.size/2); 
    }

    writeDistance(text){
      //  ctx.fillStyle='black';
        ctx.font = '8px Arial';
        ctx.fillText(text, this.x, this.y+this.size); 
    }

    writeHeuristic(text){
        //  ctx.fillStyle='black';
          ctx.font = '8px Arial';
          ctx.fillText(text, this.x+this.size-16, this.y+this.size); 
      }
    
    update(color){
        this.color = color;
    }

    clear(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        this.text(this.edge);
    }

    reachTargetFromNorth(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.x+10, this.y);
        ctx.lineTo(this.x+this.size/2, this.y+this.size/4);
        ctx.lineTo(this.x+this.size-10, this.y);
        ctx.fill();
        ctx.closePath();
    }
    reachTargetFromSouth(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.x+10, this.y+this.size);
        ctx.lineTo(this.x+this.size/2, this.y+this.size-10);
        ctx.lineTo(this.x+this.size-10, this.y+this.size);
        ctx.fill();
        ctx.closePath();
    }
    reachTargetFromEast(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.x+this.size, this.y+10);
        ctx.lineTo(this.x+this.size-10, this.y+this.size/2);
        ctx.lineTo(this.x+this.size, this.y+this.size-10);
        ctx.fill();
        ctx.closePath();
    }
    reachTargetFromWest(){
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y+10);
        ctx.lineTo(this.x+10, this.y+this.size/2);
        ctx.lineTo(this.x, this.y+this.size-10);
        ctx.fill();
        ctx.closePath();
    }

    
}