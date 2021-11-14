const canvas = document.querySelector('canvas');
const pargraph = document.querySelector('p');
const ctx = canvas.getContext('2d');
const lbl = document.getElementById('cord');
const lbl1 = document.getElementById('lbl1');
const start = document.getElementById('start');
const end = document.getElementById('end');
const obs = document.getElementById('obstacle');
const breadedFS = document.getElementById('bfs');
const reset = document.getElementById('reset');
const depthFS = document.getElementById('dfs');
const djikst = document.getElementById('djikst');
const toolTip = document.getElementById('toolTip');
const Adjustment = document.getElementById('Adjustment');
const close = document.getElementById('close');
const close1 = document.getElementById('close1');
const aStar = document.getElementById('aStar');
const gbs = document.getElementById('gbs');
const cellSizer = document.getElementById('cellSizer');
const animationTime = document.getElementById('animationTime');
const pathClearer = document.getElementById('clearPath');
const boardClearer = document.getElementById('clearBoard');
const ButtonsList = [breadedFS, depthFS, djikst, aStar, gbs];
const toolsList = [start, end, obs];
let choosen = 0;
let numberOfStarts = 0;
let numberOfTargets = 0;
let startItem = null;
let targetItem = null;
let time = 100;
let size = 40;
let cells = [];
let cellsMatrix = [];
let way  = [] ;
let found = false;
let algo =null;
canvas.width = 400;
canvas.height =400;
let numberOfColumn = canvas.width/size;
let numberOfRows = canvas.height/size;
let inProcess = false;
let loop;


/**     fill array of cells  */
function fillBorad(size){
let num = 1;
for (let row=0; row< numberOfRows; row++){
    for (let col=0; col<numberOfColumn; col++){
        let cell = new Cell(col*size, row*size, size);
        cell.edge = 1;//Math.floor(Math.random()*19)+1;
        
        /**   color white and gray based on cell position */
        if (num%2==0){ cell.color = 'white';}
        else {cell.color = 'rgb(226, 226, 226)';}
       
        /**   filling up cell's neighbors  */
        if (row==0) cell.north=null;
        else{
            /* north*/
            cell.north = cellsMatrix[row-1][cells.length]; 
            cell.neighbors.push(cellsMatrix[row-1][cells.length]);
            /* south */
            cellsMatrix[row-1][cells.length].south = cell;
            cellsMatrix[row-1][cells.length].neighbors.push(cell);
        }

        if (col==0) cell.west=null;
        else{
            /* west */
            cell.west = cells[cells.length-1];
            cell.neighbors.push(cells[cells.length-1]);
            /* east */
            cells[cells.length-1].east = cell;
            cells[cells.length-1].neighbors.push(cell);
        }
        
        cells.push(cell);
         
        num++;
    }
    cellsMatrix.push(cells);
    cells=[];
    if (size!=30) num++;
}
}
fillBorad(size);

/**     draw borad     */
function board(){
cellsMatrix.forEach(matxRow => matxRow.forEach(item =>{ctx.fillStyle = item.color; 
                                                item.draw(); 
                                                item.text(item.edge);
                                                }
                                        )  
    
             );
}
board();

function drawStart(item, event){
    if (numberOfStarts===0){
        if (item.x <= event.clientX-ctx.canvas.offsetLeft && item.x+item.size >= event.clientX-ctx.canvas.offsetLeft
                && item.y <= event.clientY-ctx.canvas.offsetTop && item.y+item.size >= event.clientY-ctx.canvas.offsetTop){
                
                item.drawStartPoint();
                numberOfStarts=1;  
                item.distance = 0; 
                startItem = item;
        }
    }
}

function drawTarget(item, event){
    if (numberOfTargets===0){
        if (item.x <= event.clientX-ctx.canvas.offsetLeft && item.x+item.size >= event.clientX-ctx.canvas.offsetLeft
                && item.y <= event.clientY-ctx.canvas.offsetTop && item.y+item.size >= event.clientY-ctx.canvas.offsetTop){
                   
                    item.drawTargetPoint();     
                    numberOfTargets=1; 
                    targetItem=item;
        }
    }
}

function drawObstacle(item, event){
    if (item.x <= event.clientX-ctx.canvas.offsetLeft && item.x+item.size >= event.clientX-ctx.canvas.offsetLeft
            && item.y <= event.clientY-ctx.canvas.offsetTop && item.y+item.size >= event.clientY-ctx.canvas.offsetTop){
             if (!item.isWall){
                    ctx.fillStyle = 'rgb(144, 101, 21)';
                    item.isWall = true;
                    ctx.fillRect(item.x+2, item.y+2, item.size-2, item.size-2);
             }else{
                 ctx.fillStyle = item.color;
                 item.isWall = false;
                 item.clear();
             }
      }
}


/***        canvas on click draw shapes  */
canvas.addEventListener('click',(event)=>{
   // lbl.innerHTML = event.clientX   + "  "+event.clientY;
   switch (choosen){
    case 1: cellsMatrix.forEach(cells=>cells.forEach(item =>drawStart(item, event)));
            break;
    case 2: cellsMatrix.forEach(cells=>cells.forEach(item =>drawTarget(item, event)));
            break;
    case 3: cellsMatrix.forEach(cells=>cells.forEach(item =>drawObstacle(item, event)));
            break;
    default: return alert('start point and/or target undefined');
    }
});


/***       tools choices on click  */
start.addEventListener('click', ()=> {choosen=1; activateTools(start)});
end.addEventListener('click', ()=> {choosen=2; activateTools(end)});
obs.addEventListener('click', ()=> {choosen=3; activateTools(obs)});

reset.addEventListener('click', ()=>window.location.reload());

depthFS.addEventListener('click',()=>{
    if (startItem===null || targetItem===null) return alert('start point and/or target undefined !!');
            inProcess = true;
            lbl1.innerHTML = "DFS Algorithm";
            algo = 'DFS';
            addClass(depthFS);
            pargraph.innerHTML = dfsDefinition;
            if (window.innerWidth>600){
                toolTip.style.visibility='visible';}
            resetSetup();
            DFS();
        });

breadedFS.addEventListener('click',()=> { 
    if (startItem===null || targetItem===null) return alert('start point and/or target undefined !!');
            inProcess = true;
            lbl1.innerHTML = "BFS Algorithm";
            algo = 'BFS';
            addClass(breadedFS);
            pargraph.innerHTML = bfsDefinition;
            if (window.innerWidth>600){
                toolTip.style.visibility='visible';}
            resetSetup();
            BFS();
    });

djikst.addEventListener('click', ()=>{
    if (startItem===null || targetItem===null) return alert('start point and/or target undefined !!');
            inProcess = true;
            lbl1.innerHTML = "Djikstra's Algorithm";
            algo = 'djikstra';
            addClass(djikst);
            pargraph.innerHTML = djikstraDefinition;
            if (window.innerWidth>600){
                toolTip.style.visibility='visible';}
            resetSetup();
            djikstra();
});


aStar.addEventListener('click', ()=>{
    if (startItem===null || targetItem===null) return alert('start point and/or target undefined !!');
            inProcess = true;
            lbl1.innerHTML = "A* Algorithm";
            algo= 'aStar';
            addClass(aStar);
            pargraph.innerHTML = aStarDefinition;
            if (window.innerWidth>600){
                toolTip.style.visibility='visible';}
            resetSetup();
            astar();
});

gbs.addEventListener('click', ()=>{
    if (startItem===null || targetItem===null) return alert('start point and/or target undefined !!');
            inProcess = true;
            lbl1.innerHTML = "Greedy Best First Search Algorithm";
            algo= 'GBS';
            addClass(gbs);
            pargraph.innerHTML = aStarDefinition;
            if (window.innerWidth>600){
                toolTip.style.visibility='visible';}
            resetSetup();
            GBS();
});

close.addEventListener('click', ()=>toolTip.style.visibility='hidden');
close1.addEventListener('click', ()=>Adjustment.style.visibility='hidden');

function addClass(element){
    ButtonsList.forEach(item=>item.classList.remove('active'));
    element.classList.add('active');
}

function activateTools(element){
    toolsList.forEach(item=>item.classList.remove('activeShape'));
    element.classList.add('activeShape');
}

/*****************             drag and move start and target items  ************* */

canvas.addEventListener('mousedown', (event)=>{
    if(inProcess == false){
        if (startItem !=null){
            if (matchItem(startItem, event)) {
                canvas.addEventListener('mousemove', onStartItemMove);
                canvas.addEventListener('mouseup', stopMovigStartItem);
            }
        }

        if (targetItem !=null){
            if (matchItem(targetItem, event)) {
                canvas.addEventListener('mousemove', onTargetItemMove);
                canvas.addEventListener('mouseup', stopMovigTargetItem);           
            }
        }
    }
});


function matchItem(item, event){
    if (numberOfStarts===1){
        if (item.x <= event.clientX-ctx.canvas.offsetLeft && item.x+item.size >= event.clientX-ctx.canvas.offsetLeft
                && item.y <= event.clientY-ctx.canvas.offsetTop && item.y+item.size >= event.clientY-ctx.canvas.offsetTop){
                    return true;
        }
        else return false;
    }
}

/******************          controlling start item listener */
function moveStartItem( event){
    cellsMatrix.forEach(row => row.forEach(col => {
        if (matchItem(col, event)) {
            if (targetItem == null || targetItem !=col ){
                startItem.clear();
                startItem = col;
                startItem.drawStartPoint();
            }
        }
    }));
}

function onStartItemMove(event){
    moveStartItem(event);
    resetSetup();
    if (algo === 'DFS') DFSonDrag();
    if (algo === 'BFS') BFSonDrag();
    if (algo === 'aStar')astarOnDrag();
    if (algo === 'GBS')GBSonDrag();
    if (algo === 'djikstra')djikstraOnDrag();
}

function stopMovigStartItem(event){
    canvas.removeEventListener('mousemove', onStartItemMove);
    canvas.removeEventListener('mouseup', stopMovigStartItem);
}

/*********************     controlling target Item listener */

function moveTargetItem( event){
    cellsMatrix.forEach(row => row.forEach(col => {
        if (matchItem(col, event)) {
            if (startItem == null || startItem !=col ){
                targetItem.clear();
                targetItem = col;
                targetItem.drawTargetPoint();
            }
        }
    }));
}

function onTargetItemMove(event){
    moveTargetItem(event);
    resetSetup();
    if (algo === 'DFS') DFSonDrag();
    if (algo === 'BFS') BFSonDrag();
    if (algo === 'aStar')astarOnDrag();
    if (algo === 'GBS')GBSonDrag();
    if (algo === 'djikstra')djikstraOnDrag();
}

function stopMovigTargetItem(event){
    canvas.removeEventListener('mousemove', onTargetItemMove);
    canvas.removeEventListener('mouseup', stopMovigTargetItem);
}

function clearPath(){
    way.forEach(item => item.clear());
    cellsMatrix.forEach(row => row.forEach(col => col.parent = null));
}

function clearBoard(){
    way.forEach(item => item.clear());
    cellsMatrix.forEach(row => 
        row.forEach(col => {
                col.distance = Infinity;
                col.cost = Infinity;
                col.heuristic = 0;
                col.parent = null;
                col.clear();
        }));
}

function checkForWalls(){
    cellsMatrix.forEach(row => 
        row.forEach(col => {
                if (col.isWall) {
                    ctx.fillStyle = 'rgb(144, 101, 21)';
                    ctx.fillRect(col.x+2, col.y+2, col.size-2, col.size-2);
                };
        }));
}

function resetSetup(){
    clearBoard();
    clearInterval(loop);
    if (startItem != null) startItem.drawStartPoint();
    if (targetItem != null) targetItem.drawTargetPoint();
    checkForWalls();
    way=[];
    found = false;
    inProcess=false;
}

cellSizer.oninput = function (){
    size = this.value * 10;
    if (this.value == 3){
        canvas.width = 390;
        canvas.height = 390;
    }  
    else {
        canvas.width = 400;
        canvas.height = 400;
    }
    cellsMatrix = [];
    numberOfColumn = Math.floor(canvas.width/size);
    numberOfRows = Math.floor(canvas.height/size); 
   
    fillBorad(size);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board();
}

animationTime.oninput = function (){
   time = this.value*10;
}

pathClearer.addEventListener('click',()=> clearPath());

boardClearer.addEventListener('click',()=> resetSetup());