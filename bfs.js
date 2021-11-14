function BFS (){
    let openSet = [];
    let closedSet = [];
    openSet.push(startItem);
    let current =null;
       loop = setInterval(function(){ 
        current = openSet.shift();
        if(current!=targetItem){
            current.neighbors.forEach(neighbor=>{
                if (!openSet.includes(neighbor) && !closedSet.includes(neighbor) && !neighbor.isWall){
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

function collectPath(){
    if (targetItem.parent != null){
        let revWay = [];
                let tempTarget = targetItem;
                while(tempTarget.parent.parent!=null){
                    revWay.push(tempTarget.parent);
                    tempTarget = tempTarget.parent;
                }
                way = revWay.reverse();
    }
}



/***************     draw the path and the arrows */
function DrawFoundPathBFS(){
    if (way.length>0){
        let ind = 0;
        setInterval(function(){
                        ctx.fillStyle = 'rgba(0, 0, 0, .3)';
                        if (ind==0){
                        if (way[0].x<startItem.x) way[0].drawArrowWest();
                        if (way[0].x>startItem.x) way[0].drawArrowEast();
                        if (way[0].y<startItem.y) way[0].drawArrowNorth();
                        if (way[0].y>startItem.y) way[0].drawArrowSouth();
                        }    
                        
                        if (ind>0 && ind<way.length){
                            if (way[ind].x<way[ind-1].x) way[ind].drawArrowWest(); 
                            if (way[ind].x>way[ind-1].x) way[ind].drawArrowEast(); 
                            if (way[ind].y<way[ind-1].y) way[ind].drawArrowNorth();
                            if (way[ind].y>way[ind-1].y) way[ind].drawArrowSouth(); 
                        way[ind-1].clear();  
                        ctx.fillStyle='rgba(13, 209, 121, 0.7)'; 
                        way[ind-1].draw();
                        ctx.fillStyle = '#ff0000';
                        if (algo =='djikstra' || algo =='aStar') way[ind-1].writeDistance(way[ind-1].distance);
                        if (algo =='aStar') way[ind-1].writeHeuristic(way[ind-1].heuristic);
                        }
                        if (ind == way.length-1){
                            way[ind].clear();  
                            ctx.fillStyle='rgba(13, 209, 121, 0.7)'; 
                            way[ind].draw();
                            ctx.fillStyle = '#ff0000';
                            if (algo =='djikstra' || algo =='aStar') way[way.length-1].writeDistance(way[way.length-1].distance);
                            if (algo =='aStar') way[way.length-1].writeHeuristic(way[way.length-1].heuristic);
                        }

                        if (ind<way.length)ind++;
                        else inProcess = false;
                        
                    },time); 
                    if (way[way.length-1].x<targetItem.x) targetItem.reachTargetFromWest();
                    if (way[way.length-1].x>targetItem.x) targetItem.reachTargetFromEast();
                    if (way[way.length-1].y<targetItem.y) targetItem.reachTargetFromNorth();
                    if (way[way.length-1].y>targetItem.y) targetItem.reachTargetFromSouth(); 
    }
    else inProcess = false;
}



let bfsDefinition = "<span>Breadth-first search (BFS)</span> is an algorithm for searching a tree data structure for a node that satisfies a given property. It starts at the tree root and explores all nodes at the present depth prior to moving on to the nodes at the next depth level.";

/*************************    On drag and drop  BFS algo and path drawing with no time interval */
function BFSonDrag (){
    let openSet = [];
    let closedSet = [];
    openSet.push(startItem);
    let current =null;
    while (current!=targetItem){
        current= openSet.shift();
        current.neighbors.forEach(neighbor=>{
            if (!openSet.includes(neighbor) && !closedSet.includes(neighbor) && !neighbor.isWall){
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


function DrawFoundPathBFSonDrag(){
    if (way.length>0){
        for (let ind = 0; ind <way.length; ind++){
                        ctx.fillStyle = 'rgba(0, 0, 0, .3)';
                        if (ind==0){
                        if (way[0].x<startItem.x) way[0].drawArrowWest();
                        if (way[0].x>startItem.x) way[0].drawArrowEast();
                        if (way[0].y<startItem.y) way[0].drawArrowNorth();
                        if (way[0].y>startItem.y) way[0].drawArrowSouth();
                        }    
                        
                        if (ind>0 && ind<way.length){
                            if (way[ind].x<way[ind-1].x) way[ind].drawArrowWest(); 
                            if (way[ind].x>way[ind-1].x) way[ind].drawArrowEast(); 
                            if (way[ind].y<way[ind-1].y) way[ind].drawArrowNorth();
                            if (way[ind].y>way[ind-1].y) way[ind].drawArrowSouth(); 
                        way[ind-1].clear();  
                        ctx.fillStyle='rgba(13, 209, 121, 0.7)'; 
                        way[ind-1].draw();
                        ctx.fillStyle = '#ff0000';
                        if (algo =='djikstra' || algo =='aStar') way[ind-1].writeDistance(way[ind-1].distance);
                        if (algo =='aStar') way[ind-1].writeHeuristic(way[ind-1].heuristic);
                        }
                        if (ind == way.length-1){
                            way[ind].clear();  
                            ctx.fillStyle='rgba(13, 209, 121, 0.7)'; 
                            way[ind].draw();
                            ctx.fillStyle = '#ff0000';
                            if (algo =='djikstra' || algo =='aStar') way[way.length-1].writeDistance(way[way.length-1].distance);
                            if (algo =='aStar' || algo == 'GBS') way[way.length-1].writeHeuristic(way[way.length-1].heuristic);
                        }
                        
                    } 
                    if (way[way.length-1].x<targetItem.x) targetItem.reachTargetFromWest();
                    if (way[way.length-1].x>targetItem.x) targetItem.reachTargetFromEast();
                    if (way[way.length-1].y<targetItem.y) targetItem.reachTargetFromNorth();
                    if (way[way.length-1].y>targetItem.y) targetItem.reachTargetFromSouth(); 
    }
    inProcess = false;
}


