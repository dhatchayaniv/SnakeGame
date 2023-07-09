 const snakeArea= document.getElementById('snakeboard');//canvas element used to display a picture
 const context= snakeArea.getContext('2d');
 const gamescore=document.getElementById('totalScore');

 const widthCover = snakeArea.width;
 const heightCover = snakeArea.height;

 const UNIT =15;//taking food value should be divide by 500 width and height
  let foodX;
  let foodY;
  let xDir =15;
  let yDir =0;
  let score=0;
  let alive=true;
  let GameStart=false;
  
  let snake=[
    {x:UNIT*3,y:0},
    {x:UNIT*2 ,y:0 },
    {x:UNIT*1, y:0},
    {x:0,y:0}
  ]

window.addEventListener('keydown',Keypress)

 startGame()

 function startGame(){
        context.fillStyle = '#a1e6ad';
        //fillRect(xStart,yStart,width,height)
        context.fillRect(0,0,widthCover,heightCover)
        //when values in html are get and stored in variables we cannot change values in JS
        snakeFood();
        GiveFood();
        drawSnake();
        
 }

 function Restart(){
    context.fillStyle ='#a1e6ad'
    context.fillRect(0,0,widthCover,heightCover)
 }


 function snakeFood(){
     foodX= Math.floor(Math.random()*widthCover/UNIT)*UNIT
     foodY = Math.floor(Math.random()*heightCover/UNIT)*UNIT
 }


function GiveFood(){
    context.fillStyle = 'black' ;
    context.fillRect(foodX,foodY,UNIT,UNIT);
}

function drawSnake(){
    context.fillStyle ='#9ca541';
    context.strokeStyle= 'black';
    snake.forEach((snakePart)=>{
        context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT);
        context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT);
    })
}

function moveSnake(){
    const head = {x:snake[0].x+xDir,
                  y:snake[0].y+yDir}

    snake.unshift(head)//moving head to the first action
    if(snake[0].x==foodX &&snake[0].y==foodY){
        score+=1;
        gamescore.textContent=score;
        snakeFood()
    }
    else{
  snake.pop()//deleting the tail
}

}

function nextMove(){
    if(alive){
    setTimeout(()=>{
           Restart();
           GiveFood();
           moveSnake();
           drawSnake();
           checkGameOver();
           nextMove();
    },100)//speed of the snake
}
else{
    Restart();
    context.font = "bold 25px arial";
    context.fillStyle = "red";
    context.textAlign = "center";
    context.fillText ("YOU LOST YOUR GAME!",widthCover/2,heightCover/2);
}
}

function Keypress(event){
    if(!GameStart){
        GameStart=true;
        nextMove();
    }
    const left =37
    const up = 38
    const right = 39
    const down = 40

    switch(true){
        case(event.keyCode==left  && xDir!=UNIT):
              xDir=-UNIT;
              yDir=0;
        break;
        //left key pressed and not going right
        case(event.keyCode==right && xDir!=-UNIT):
              xDir=UNIT;
              yDir=0;
        break;
        //right key pressed and not going left
        case(event.keyCode==up   && yDir!=UNIT):
               xDir=0;
               yDir=-UNIT;
        break;
        //UP key pressed and not going down
        case(event.keyCode==down && yDir!=-UNIT):
                xDir=0;
                yDir=UNIT;
        break;
        //down key pressed and not going up
    }
}

function checkGameOver(){//can be given in if
    switch(true){//setting boundaries for game
        case(snake[0].x<0):
        case(snake[0].x>=widthCover):
        case(snake[0].y<0):
        case(snake[0].y>=heightCover):
           alive=false;
        break;
        
    }
}