function DFS (){
    let openSet = [];
    let closedSet = [];
    openSet.push(startItem);
    let current =null;
         loop = setInterval(function(){ 
        current = openSet.pop();
        if(current!=targetItem){
            current.neighbors.forEach(neighbor=>{
                if (!closedSet.includes(neighbor) && !neighbor.isWall){
                    neighbor.parent = current;
                    openSet.push(neighbor);
                }
            });
            ctx.fillStyle = 'rgba(0,255,0,.3)';
            current.draw();
            closedSet.push(current);
        }else {found = true;
               clearInterval(loop);}

        if (found){
        collectPath();
        DrawFoundPathBFS();
        }
    }, time);
}


let dfsDefinition = "<span>Depth-first search (DFS)</span> is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.";


/****************************    DFS with no time interval */

function DFSonDrag (){
    let openSet = [];
    let closedSet = [];
    openSet.push(startItem);
    let current =null;
    while (current!=targetItem){
        current= openSet.pop();
        current.neighbors.forEach(neighbor=>{
            if (!closedSet.includes(neighbor) && !neighbor.isWall){
                neighbor.parent = current;
                openSet.push(neighbor);
            }
        });
        ctx.fillStyle = 'rgba(0,255,0,.3)';
        current.draw();
        closedSet.push(current);
    }   
    if (targetItem.parent != null) {
        collectPath();
        DrawFoundPathBFSonDrag();
        }
}
