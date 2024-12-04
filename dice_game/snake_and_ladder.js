let points = [];
let width = 600;
let height = 600;
let bh = height/10;
let bw = width/10;
let ladders=[
{  start : 8,      end : 36      },
{  start : 24,     end : 79      },
{  start : 12,     end : 67      },
{  start : 19,     end : 96      },
{  start : 60,     end : 80      },
];

let snakes=[
{  start : 47,      end : 5,    path : [23]      },
{  start : 73,      end : 23,   path : [85,66   ,47]  },
{  start : 70,      end : 10,   path : [53,48,14]     },
// {  start : 68,      end : 35,    path : [77]     },
{  start : 98,      end : 39,    path : [80,63,56]     },
// {  start : 91,      end : 83,    path : [69,64,62]     },
]
let nameSpaceUri = "http://www.w3.org/2000/svg";

function createBoard(){
    let svg = document.getElementById("svg");
    svg.setAttribute("viewBox",`0 0 ${width} ${height}`)
    for(let i=0;i<10;i++){
        for(let j=0;j<10;j++){
            if(i%2===0){
                points.push({
                    row : i+1,
                    column:  j+1,
                    x:j*bw+bw/2,
                    y:height-i*bh-bh/2
                });
            }else{
                points.push({
                    row : i+1,
                    column:  j+1,
                    x:width-j*bw-bw/2,
                    y:height-i*bh-bh/2
                });

            }
        }
    }
    let board = document.getElementById("board");

    for(let i=0;i<100;i++){
        let point = points[i];
        

        let rect = document.createElementNS(nameSpaceUri,"rect");
        rect.setAttribute("x",point.x-bw/2);
        rect.setAttribute("y",point.y-bh/2);
        rect.setAttribute("width",bw);
        rect.setAttribute("height",bh);
        // rect.setAttribute("fill","#4089ff");
        rect.style.strokeWidth = "1px";
        board.appendChild(rect);


        let text = document.createElementNS(nameSpaceUri,"text");
        text.textContent = i+1;
        text.setAttribute("x",point.x);
        text.setAttribute("y",point.y);
        text.setAttribute("text-anchor","middle");
        board.appendChild(text);

    }
}

window.onload = ()=>{
    createBoard()
    startGame();
           roleDice();
}


function startGame(){
    let board = document.getElementById("board");
    createLadders(ladders);
    createSnakes(snakes)
   
}

function restart(){
    let restart = document.getElementsByClassName(".restart-btn");
    window.addEventListener()
}




function createSnakes(snakes){
    let snakeContainer = document.getElementById("snake");
    for(let i= 0;i<snakes.length;i++){
        let snakeEl = document.createElementNS(nameSpaceUri,'g');
        snakeContainer.appendChild(snakeEl);
        snakeEl.setAttribute("class","snake snake-animate snake-"+i)
        let snake = snakes[i];
        let { start,end} =snake;
        let startPoint = points[start-1];
        let endPoint = points[end-1];
        snakeEl.style.transformOrigin = `${endPoint.x}px ${endPoint.y}px`                            


        

        let path = document.createElementNS(nameSpaceUri,"path");
        if(snake.path){
            let paths = snake.path.concat([]);
            if(paths.length%2==1){
                paths.push(end)
            }else{
                paths[paths.length-1] = end;
            }
            let pathSets =[];
            for(let i=0;i<paths.length;i+=2){
                pathSets.push({
                    turn :points[ paths[i]-1],
                    to : points[paths[i+1]-1],
                })
            }
            path.setAttribute("d",`M${startPoint.x},${startPoint.y} `
                +pathSets.map(each=>{
                return `Q${each.turn.x},${each.turn.y} ${each.to.x},${each.to.y}`
            }).join(" "))

        }else{
            path.setAttribute("d",`M${startPoint.x},${startPoint.y} L${endPoint.x},${endPoint.y}`)
        }
        path.style.transformOrigin = `${endPoint.x}px ${endPoint.y}px`                            
        path.style.strokeWidth = "8px";
        path.style.stroke = "rgb(175 81 68)";
        path.style.fill = "none";
        let path2 = path.cloneNode();
        let path3 = path.cloneNode();

        path3.setAttribute("marker-start","url(#snake-head)");
        path3.setAttribute("marker-end","url(#snake-tail)");
        snakeEl.appendChild(path);
        snakeEl.appendChild(path2);
        snakeEl.appendChild(path3);
        path2.style.transform = "rotate(1.5deg)"
        path3.style.transform = "rotate(-1.5deg)"
        path.style.stroke = "#fed29d";
        path.style.strokeWidth = "8px";


       
    }
}



function createLadders(ladders){
    let ladderContainer = document.getElementById("ladder");
    let ladderWidth = 20;
    let diviation = ladderWidth/2;
    for(let i= 0;i<ladders.length;i++){
        let ladderEl = document.createElementNS(nameSpaceUri,'g');
        ladderContainer.appendChild(ladderEl);
        ladderEl.setAttribute("class"," ladder-animate ladder ladder-"+i)

        let { start,end} =ladders[i];
        let startPoint = points[start-1];
        let endPoint = points[end-1];
        let colDiff =  (Math.abs(startPoint.column-endPoint.column))
        let rowDiff =  (Math.abs(startPoint.row-endPoint.row))
        ladderEl.style.transformOrigin = `${startPoint.x}px ${startPoint.y}px`                            


        let xDiviation = ladderWidth *((10-colDiff)/10 * (1+(rowDiff)/100));
        let yDiviation = ladderWidth*((0+(colDiff)/10) *  (1+(10-(rowDiff))/100));

        // let xDiviation = ladderWidth *( (0+(10-colDiff)/100) * (1+(rowDiff)/100));
        // let yDiviation = ladderWidth*((0+(colDiff)/10) *  (1+(10-(rowDiff))/100));

        // console.log(i,start,end,startPoint,endPoint,colDiff,rowDiff)

        let path1 = document.createElementNS(nameSpaceUri,"path");
        let path2 = document.createElementNS(nameSpaceUri,"path");
        path1.setAttribute("d",`M${startPoint.x-xDiviation},${startPoint.y+yDiviation} L${endPoint.x-xDiviation},${endPoint.y+yDiviation}`)

        path2.setAttribute("d",`M${startPoint.x+xDiviation},${startPoint.y-yDiviation} L${endPoint.x+xDiviation},${endPoint.y-yDiviation}`)
                            
        path1.style.strokeWidth = "5px";
        path1.style.stroke = "#666";
        ladderEl.appendChild(path1);
        path2.style.strokeWidth = "5px";
        path2.style.stroke = "#666";
        ladderEl.appendChild(path2);
        let length = path2.getTotalLength();
        for(let j=30;j<length-20;j=j+30){
            let p1 = path1.getPointAtLength(j)
            let p2 = path2.getPointAtLength(j)
            let slab = document.createElementNS(nameSpaceUri,"path");
            slab.setAttribute("d",`M${p1.x},${p1.y} L${p2.x},${p2.y}`)
            slab.style.strokeWidth = "5px";
            slab.style.stroke = "#666";
            ladderEl.appendChild(slab);
        }
    }
}

