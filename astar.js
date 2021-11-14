function astar(){
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
                    let distance = current.distance + neighbor.edge;
                    let heur = heuristic(neighbor, targetItem);
                    let cost = distance + heur;
                  
                    if (cost < neighbor.cost) {
                            neighbor.cost = cost;
                            neighbor.distance = distance;
                            neighbor.heuristic = heur;
                            neighbor.parent = current;
                    }
                }
            });
            ctx.fillStyle = 'rgba(150,255,0,.3)';
            current.draw();
            ctx.fillStyle = '#000000';
            current.writeDistance(current.distance);
            current.writeHeuristic(current.heuristic);
            closedSet.push(current); 
            openSet.sort((a, b) => (a.cost < b.cost) ? 1 : -1);
            current = openSet.pop();
          }else {found = true;
              clearInterval(loop);}
    
          if (found){
            collectPath();
            DrawFoundPathBFS();
          }
    },time);
     
}


function heuristic(a,b){
  return (Math.abs(a.x- b.x) + Math.abs(a.y - b.y))/size;   //   manhattan value 
}
/************ pythagorean  
function heuristic(a,b){
    let h = (Math.sqrt(
      Math.pow((a.x/size-b.x/size),2) + Math.pow((a.y/size-b.y/size),2)
  ));
   
  return parseFloat(h).toFixed(2);
}*/


let aStarDefinition = "<span>A* algorithm </span> is an informed search algorithm, or a best-first search, meaning that it is formulated in terms of weighted graphs: starting from a specific starting node of a graph, it aims to find a path to the given goal node having the smallest cost (least distance travelled, shortest time, etc.).";


//***********************    A * with mo time interval  */
function astarOnDrag(){
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
                  let distance = current.distance + neighbor.edge;
                  let heur = heuristic(neighbor, targetItem);
                  let cost = distance + heur;
                
                  if (cost < neighbor.cost) {
                          neighbor.cost = cost;
                          neighbor.distance = distance;
                          neighbor.heuristic = heur;
                          neighbor.parent = current;
                  }
                  ctx.fillStyle = 'rgba(150,255,0,.3)';
                  neighbor.draw();
                  ctx.fillStyle = '#000000';
                  neighbor.writeDistance(neighbor.distance);
                  neighbor.writeHeuristic(neighbor.heuristic);
                
              }
          });
          closedSet.push(current); 
          openSet.sort((a, b) => (a.cost < b.cost) ? 1 : -1);
          current = openSet.pop();
        }
  
  if (targetItem.parent!=null){
    collectPath();
    DrawFoundPathBFSonDrag();
  }
}