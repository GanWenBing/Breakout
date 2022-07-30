const blockWidth = 80;
const blockHeight = 20;
const containerWidth = 300;
const containerHeight = 500;
const blockArr =[];
let blockIndex = 0;
let blockColumn = 4;
let blockRow = 3;
let colWidth = containerWidth/blockColumn;
let padding = colWidth/4;



class Block{
    constructor(xAxis, yAxis, width, height){
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.width = width;
        this.height = height;
    }
}

const blockProp = {
    w: colWidth,
    h: padding,
}

const block = () => {
    for (let i = 0; i < blockColumn; i++){
        for(let j = 0; j < blockRow; j++){
            blockArr[blockIndex] = new Block(padding/2+(i)*colWidth,(colWidth*4)+j*(colWidth-padding),blockProp.w-padding,blockProp.h)
            blockIndex++; 
            $block = $('<div>');
            $block.addClass('block');
            //idnum++
            //console.log(blockArr)
            $block.css('height', blockProp.h +'px').css('width', blockProp.w-padding + 'px').css('background-color','blue').css('position','absolute');
            $('.container').append($block);
            $block.css('left', padding/2+(i)*(colWidth) + 'px').css('bottom', (colWidth*4.5)+j*(colWidth-2*padding) + 'px')
        }
    }
}

//Player
const playerWidth = 60;
const playerHeight = 10;
const playerStart = [containerWidth/2-playerWidth/2, 10]; 
let currentPosition = playerStart;
let Blockscore = 0;
let lifePoint = 3;

const player = () => {
    const $player = $('<div>');
    $player.addClass('Player');
    $player.css('width', playerWidth+ 'px').css('height', playerHeight+ 'px').css('background-color', 'red');
    $('.container').append($player);
    playerPosition();
}

const playerPosition = () =>{
    $('.Player').css('left', currentPosition[0]+ 'px').css('bottom', currentPosition[1]+'px').css('position','absolute');
}

const playerMove = () =>{
    $(document).keydown((e) =>{
        if(e.keyCode === 37){
            if(currentPosition[0] > 0){
                currentPosition[0] -= 10;
                playerPosition();
                ballMove();
            }
        }if(e.keyCode === 39){
            if(currentPosition[0]< containerWidth-playerWidth){
                currentPosition[0] += 10;
                playerPosition();
                ballMove();
            }
        }
    })
      
}

//Ball
const ballProp = [10, 10];
const ballStart = [containerWidth/2-ballProp[0]/2, playerHeight+ballProp[1]+10];
let currentBall = ballStart;
const ball = () =>{
    const $ball = $('<div>');
    $ball.addClass('ball');
    $ball.css('border-radius','50%').css('background-color','green');
    $ball.css('width', ballProp[0]+'px').css('height', ballProp[1]+ 'px');
    $('.container').append($ball);
    ballPosition();
}

//draw the ball position
const ballPosition = () =>{
    $('.ball').css('left',currentBall[0]+ 'px').css('position', 'absolute').css('bottom',currentBall[1]+'px');
}


// const isRunning = true;
// Move the ball
const ballMove = () =>{ 
    currentBall[0] += ballDirection[0];
    currentBall[1] += ballDirection[1];
    ballPosition();
    checkforCollision();
}
const checkforCollision = () =>{
    //check for block collision
    for( let i = 0; i < blockArr.length; i++){
        if(
            (currentBall[0] > blockArr[i].xAxis) && (currentBall[0] < (blockArr[i].xAxis + blockArr[i].width)) && 
            (currentBall[1] > blockArr[i].yAxis) && (currentBall[1] < (blockArr[i].yAxis + blockArr[i].height))
            ){
            console.log(currentBall)
            console.log(i)
            Blockscore++;
            $('.score').text('Score: '+ Blockscore)
            $('.block:eq('+ i +')').remove();
            changeblockdirection();
            //changeDirection();
            blockArr.splice(i,1);
            console.log(blockArr)
            if(blockArr.length === 0){
                alert('win');
            }
        } 
        
    }

    //check wall collision
    if (currentBall[0] >= containerWidth-ballProp[0] || currentBall[0] <= 0){
        ballDirection[0] = -ballDirection[0];   
    }
    if(currentBall[1] >= containerHeight-ballProp[1]){
        ballDirection[1] = -ballDirection[1];
    }

    // check paddle collision
    if(
        (currentBall[0] > currentPosition[0] && currentBall[0] < currentPosition[0] + playerWidth) &&
        (currentBall[1] > currentPosition[1] && currentBall[1] < currentPosition[1] + playerHeight)
        ){
            changeDirection();
        }
     
    // check for gameover
    if(currentBall[1]<= 0){
        clearInterval(timerId);
        lifePoint--;
        $('.Life').text('Life: '+ lifePoint);
        if(lifePoint === 0){
            alert('Lose')
        }
        retryButton();
        retryclick();
        
    }
}

let timerId = setInterval(ballMove,20);
let ballDirection = [3,2]

const changeDirection = () =>{
    if(ballDirection[0] === ballDirection[0] && ballDirection[1] === ballDirection[1]){
        ballDirection[1] = -ballDirection[1];
        return
    }
    if(ballDirection[0] === ballDirection[0] && ballDirection[1] == -ballDirection[1]){
        ballDirection[0] = -ballDirection[0];
        return
    }
    if(ballDirection[0] === -ballDirection[0] && ballDirection[1] === -ballDirection[1]){
        ballDirection[1] = ballDirection[1];
        return
    }
    if(ballDirection[0] === -ballDirection[0] && ballDirection[1] === ballDirection[1]){
        ballDirection[0] = ballDirection[0];
        return
    }
}

const changeblockdirection = () =>{
    if(ballDirection[0] === -ballDirection[0] && ballDirection[1] === ballDirection[1]){
        ballDirection[1] = -ballDirection[1];
    }
    if(ballDirection[0] === ballDirection[0] && ballDirection[1] === ballDirection[1]){
        ballDirection[1] = -ballDirection[1];
    }   
}

const score = () =>{
    const $score = $('<div>');
    $score.addClass('score').text('Score: '+ Blockscore).css('color','white').css('font-size','20px')
    $('.container').append($score);
}

const threeLife = () =>{
    const $threeLife = $('<div>');
    $threeLife.addClass('Life').text('Life: '+ 3).css('color','white').css('font-size','20px');
    $('.container').append($threeLife);
}

const retryButton = () =>{
    const $retry = $('<button>');
    $('.container').append($retry);
    $retry.addClass('retry').text('Continue');
    $($retry).css('position','absolute').css('left',(containerWidth/2-25) +'px').css('bottom',(containerHeight/2) +'px');
}

const retryclick = () =>{
    $('.retry').on('click',resetGame);
}

const resetPlayer = [containerWidth/2-playerWidth/2, 10]
const resetBall = [containerWidth/2-ballProp[0]/2, playerHeight+ballProp[1]]

const ballMove1 = () =>{
    currentBall[0] = resetBall[0];
    currentBall[1] = resetBall[1];
    currentPosition[0] = resetPlayer[0];
    currentPosition[1] = resetPlayer[1];
    playerPosition();
    ballPosition();
    checkforCollision();
}

const resetGame = () =>{
    timerId = setInterval(ballMove,20);
    ballMove1()
    $('.retry').remove();
}

const test = () =>{
    const $testPlay = $('<div>');
    $testPlay.addClass('testPlay').css('border','2px solid white').css('position','absolute');
    $testPlay.css('top','-0.5%').css('left','100%')
    $testPlay.css('width',containerWidth/2+ 'px').css('height',containerHeight+'px')
    $('.container').append($testPlay);
    const $startButton = $('<div>');
    $testPlay.append($startButton);
    $startButton.css('width','100px').css('height','30px').css('border','1px solid white');
    $startButton.text('Start').css('color','white').css('position','absolute');
    $startButton.css('left',containerWidth/10 +'px').css('bottom', '10px').css('')
}



$(()=>{
    const $container = $('<div>');
    $container.addClass('container')
    $container.css('width', containerWidth +'px').css('height', containerHeight+ 'px').css('border', '2px solid white').css('position','absolute').css('top','10%').css('left','35%')
    // $('body').css('background-image','url("+ https://media.npr.org/assets/img/2022/05/27/Sagittarius_A_black_hole_swarm_vert-05b6e17e76931e0c5bf153034bbfca1867d650e4.jpg + ")').css('top','0px').css('left','0px').css('background-size', 'cover')
    const $breakout = $('<div>');
    $breakout.addClass('breakout').text('BreakOut').css('color','white').css('font-size','30px');
    $('body').append($breakout);
    $('.breakout').css('position','absolute').css('top','5%').css('left','45%')
    $('body').css('background-color','black');
    $('body').append($container);
    //gameStart();
    test();
    score();
    threeLife();
    block();   
    player();
    ball();
    playerMove();
    //setInterval(ballMove,40);
    //ballMove1();
    
})