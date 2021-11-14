function GBS(){        // greedy Best First Search
    let openSet = [];
    let closedSet = [];

    openSet.push(startItem);
    let current = openSet.pop();
    if (current === startItem) {
          current.distance = 0;
          current.heuristic = heuristic(startItem, targetItem);
          current.cost = current.heuristic;
    }
     loop = setInterval(()=>{
          if(current!=targetItem){
            current.neighbors.forEach(neighbor =>{
               
                    if (!openSet.includes(neighbor) && !closedSet.includes(neighbor) && !neighbor.isWall){
                        openSet.push(neighbor);
                        let heur = heuristic(neighbor, targetItem);
                        neighbor.heuristic = heur;
                        neighbor.parent = current;
                      /*  ctx.fillStyle = 'rgba(150,255,0,.3)';
                        neighbor.draw();
                        ctx.fillStyle = '#000000';
                        neighbor.writeHeuristic(neighbor.heuristic);*/
                    }
            
            });
            ctx.fillStyle = 'rgba(255,0,0,.3)';
            current.draw();
            ctx.fillStyle = '#000000';
            current.writeHeuristic(current.heuristic);
            closedSet.push(current); 
            openSet.sort((a, b) => (a.heuristic < b.heuristic) ? 1 : -1);
            current = openSet.pop();
          }else {found = true;
              clearInterval(loop);}
    
          if (found){
            collectPath();
            DrawFoundPathBFS();
          }
    },time);
     
}


/*********************    GBS with no time interval   */

function GBSonDrag() {        
    let openSet = [];
    let closedSet = [];

    openSet.push(startItem);
    let current = openSet.pop();
    if (current === startItem) {
          current.distance = 0;
          current.heuristic = heuristic(startItem, targetItem);
          current.cost = current.heuristic;
    }
    
          while(current!=targetItem){
            current.neighbors.forEach(neighbor =>{
               
                    if (!openSet.includes(neighbor) && !closedSet.includes(neighbor) && !neighbor.isWall){
                        openSet.push(neighbor);
                        let heur = heuristic(neighbor, targetItem);
                        neighbor.heuristic = heur;
                        neighbor.parent = current;
                      /*  ctx.fillStyle = 'rgba(150,255,0,.3)';
                        neighbor.draw();
                        ctx.fillStyle = '#000000';
                        neighbor.writeHeuristic(neighbor.heuristic);*/
                    }
            
            });
            ctx.fillStyle = 'rgba(255,0,0,.3)';
            current.draw();
            ctx.fillStyle = '#000000';
            current.writeHeuristic(current.heuristic);
            closedSet.push(current); 
            openSet.sort((a, b) => (a.heuristic < b.heuristic) ? 1 : -1);
            current = openSet.pop();
          }
    
          if (targetItem.parent!=null){
            collectPath();
            DrawFoundPathBFSonDrag();
          }
   
     
}