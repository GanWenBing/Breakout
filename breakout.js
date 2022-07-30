console.log($)

const gameStart = () =>{
    const $h1 = $('<h1>');
    $h1.text('BreakOut');
    $h1.css('text-align', 'center');
    $('.container').append($h1);
    const $button = $('<button>');
    $button.attr('id', 'startButton');
    $button.text('Start');
    $button.css('justify-content', 'center')
    $h1.append($button);

    $('#startButton').on('click',() =>{
        $h1.hide();
    })
}

class Block{
    constructor(xAxis, yAxis, width, height){
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.width = width;
        this.height = height;
    }
}


const blockWidth = 80;
const blockHeight = 20;
const blockArr =[];
let blockIndex = 0;
let numBlockCol = 8;
let numBlockRow = 2;
let colWidth = 600/numBlockCol;
let padding = colWidth/4;
let idnum = 0;

const blockProp = {
    w: colWidth,
    h: padding,
}

const block = () => {
    for (let i = 0; i < numBlockCol; i++){
        for(let j = 0; j < numBlockRow; j++){
            blockArr[blockIndex] = new Block(padding/2+(i)*(colWidth),(colWidth*4.5)+j*(colWidth-2*padding),blockProp.w-padding,blockProp.h)
            blockIndex++; 
            //console.log(blockArr)  
            $block = $('<div>');
            $block.addClass('block'+idnum);
            idnum++
            //console.log(blockArr)
            $block.css('height', blockProp.h +'px').css('width', blockProp.w-padding + 'px').css('background-color','blue').css('position','absolute');
            $('.container').append($block);
            $block.css('left', padding/2+(i)*(colWidth) + 'px').css('bottom', (colWidth*4.5)+j*(colWidth-2*padding) + 'px')
        }
    }
}

const playerStart = [275, 10];
let currentPosition = playerStart;

const player = () => {
    const $player = $('<div>');
    $player.addClass('Player');
    $player.css('width', '60px').css('height', '10px').css('background-color', 'red');
    $('.container').append($player);
    playerPosition();
}

const playerPosition = () =>{
    $('.Player').css('left', currentPosition[0]+ 'px').css('bottom', currentPosition[1]+'px').css('position','absolute')
}

const playerMove = () =>{
    $(document).keydown((e) =>{
        if(e.keyCode === 37){
            if(currentPosition[0] > 5){
                currentPosition[0] -= 10;
                playerPosition();
            }
        }if(e.keyCode === 39){
            if(currentPosition[0]< 530){
                currentPosition[0] += 10;
                playerPosition();
            }
        }
    })
      
}


const ballStart = [300, 20];
// const ballStart = [7.5, 330];
let currentBall = ballStart;
const ball = () =>{
    const $ball = $('<div>');
    $ball.addClass('ball');
    $ball.css('border-radius','50%').css('background-color','black');
    $ball.css('width', '10px').css('height', '10px');
    $('.container').append($ball);
    ballPosition();
}

//draw the ball
const ballPosition = () =>{
    $('.ball').css('left',currentBall[0]+ 'px').css('position', 'absolute').css('bottom',currentBall[1]+'px');
}


// Move the ball
const ballMove = () =>{
    currentBall[0] += xDirection;
    currentBall[1] += yDirection;
    ballPosition();
    checkforCollision();
}


const checkforCollision = () =>{
    //check for block collision
    console.log(blockArr[1].xAxis)
    for( let i = 0; i < blockArr.length; i++){
        if(
            ((currentBall[0] > blockArr[i].xAxis) && (currentBall[0] < (blockArr[i].xAxis + blockArr[i].width))) && 
            (currentBall[1] > blockArr[i].yAxis) && (currentBall[1]< (blockArr[i].yAxis + blockArr[i].height))
            ){
            console.log(currentBall)
            yDirection = -2;
            xDirection = -2;
            changeDirection();
            $('div.block'+ i ).remove();
            blockArr.splice(i,1);
            console.log(blockArr)
            
            
        }
        

    }


    //check wall collision
    if (currentBall[0] >= 590 || currentBall[1] >= 390 || currentBall[0]<=0){
        changeDirection();
    }


    // check paddle collision
    if(
        (currentBall[0] > currentPosition[0] && currentBall[0] < currentPosition[0] + 60) &&
        (currentBall[1] > currentPosition[1] && currentBall[1] < currentPosition[1] + 10)
        ){
            changeDirection();
        }
    // check for gameover
    if(currentBall[1]<= 0){
        clearInterval(timerId);
    }
}

let xDirection = -2;
let yDirection = 2;

const changeDirection = () =>{
    if(xDirection === 2 && yDirection == 2){
        yDirection = -2;
        return
    }
    if(xDirection == 2 && yDirection == -2){
        xDirection = -2;
        return
    }
    if(xDirection == -2 && yDirection == -2){
        yDirection = 2;
        return
    }
    if(xDirection === -2 && yDirection === 2){
        xDirection = 2;
        return
    }
}

const changeblockdirection = () =>{

}

let timerId = setInterval(ballMove,60);


$(()=>{
    const $container = $('<div>');
    $container.addClass('container')
    $container.css('height', '400px').css('width', '600px').css('border', '2px solid black').css('position','absolute');
    $('body').append($container);
    //gameStart();
    block();   
    player();
    ball();
    playerMove();
    setInterval(ballMove,50);
})


