function djikstra(){
    let openSet = [];
    let closedSet = [];

    openSet.push(startItem);
    let current = openSet.pop();
    if (current === startItem)  current.distance = 0;
 
     loop = setInterval(()=>{
          if(current!=targetItem){
            current.neighbors.forEach(neighbor =>{
                if (!openSet.includes(neighbor) && !closedSet.includes(neighbor) && !neighbor.isWall){
                    openSet.push(neighbor);
                    let distance = current.distance + neighbor.edge;
                    if (distance < neighbor.distance) {
                           neighbor.distance = distance;
                           neighbor.parent = current;
                    }
                }
            });
            ctx.fillStyle = 'rgba(150,255,0,.3)';
            current.draw();
            ctx.fillStyle = '#000000';
            current.writeDistance(current.distance);
            closedSet.push(current); 
            openSet.sort((a, b) => (a.distance < b.distance) ? 1 : -1);
            current = openSet.pop();
          }else {found = true;
              clearInterval(loop);}
    
          if (found){
            collectPath();
            DrawFoundPathBFS();
          }
    },time);
     
}

   
let djikstraDefinition = "<span>Dijkstra's algorithm</span> is the iterative algorithmic process to provide us with the shortest path from one specific starting node to all other nodes of a graph. It is different from the minimum spanning tree as the shortest distance among two vertices might not involve all the vertices of the graph.";

/***************      djikstra with no time interval */

function djikstraOnDrag(){
    let openSet = [];
    let closedSet = [];

    openSet.push(startItem);
    let current = openSet.pop();
    if (current === startItem)  current.distance = 0;
 

          while(current!=targetItem){
            current.neighbors.forEach(neighbor =>{
                if (!openSet.includes(neighbor) && !closedSet.includes(neighbor) && !neighbor.isWall){
                    openSet.push(neighbor);
                    let distance = current.distance + neighbor.edge;
                    if (distance < neighbor.distance) {
                           neighbor.distance = distance;
                           neighbor.parent = current;
                    }
                }
            });
            ctx.fillStyle = 'rgba(150,255,0,.3)';
            current.draw();
            ctx.fillStyle = '#000000';
            current.writeDistance(current.distance);
            closedSet.push(current); 
            openSet.sort((a, b) => (a.distance < b.distance) ? 1 : -1);
            current = openSet.pop();
          }
    
          if (targetItem.parent!=null){
            collectPath();
            DrawFoundPathBFSonDrag();
          }

     
}








/*function djikstra(){
    const loop = setInterval(function(){
        if (stack.length>0){
            let temp = stack.pop();
            if (temp === targetItem)  {
                found = true;
                clearInterval(loop);
            }
            if(temp.isVisited)ctx.fillStyle = 'rgba(0,255,0,.3)';
            else ctx.fillStyle = 'rgba(255,255,0,.3)';
            temp.draw();
            temp.isVisited = true;
            for (let i=0; i<temp.neighbors.length; i++){
                if(!temp.neighbors[i].isVisited && !temp.neighbors[i].isWall ){
                    let tempDistance = temp.distance + temp.neighbors[i].edge;
                    if (temp.neighbors[i].distance>tempDistance) {
                        temp.neighbors[i].distance = tempDistance;
                        temp.neighbors[i].parent = temp;
                        ctx.fillStyle = '#000000';
                        temp.neighbors[i].writeDistance(temp.neighbors[i].distance);
                    }
                    if (!stack.includes(temp.neighbors[i]))stack.push(temp.neighbors[i]);
                }
            }
            stack.sort((a, b) => (a.distance < b.distance) ? 1 : -1);
        }
    
        if (found)  {
            collectPath();
            DrawFoundPathBFS();
        }
    
    }, time);
}*/

 