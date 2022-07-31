const blockWidth = 80;
const blockHeight = 20;
const containerWidth = 300;
const containerHeight = 500;
const blockArr =[];
let blockIndex = 0;
let blockColumn = 6;
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
            blockArr[blockIndex] = new Block(padding/2+(i)*colWidth-colWidth/40,(colWidth*7)+j*(colWidth-2*padding),blockProp.w-padding,blockProp.h)
            blockIndex++; 
            $block = $('<div>');
            $block.addClass('block');
            $block.css('height', blockProp.h +'px').css('width', blockProp.w-padding + 'px').css('background-color','blue').css('position','absolute');
            $('.container').append($block);
            $block.css('left', padding/2+(i)*(colWidth)-colWidth/40 + 'px').css('bottom', (colWidth*7)+j*(colWidth-2*padding) + 'px')
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
const ballStart = [containerWidth/2-ballProp[0]/2, playerHeight+ballProp[1]];
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


//let timer = setInterval(ballMove,10);
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
            //changeblockdirection();
            changeDirection();
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
    if(currentBall[1]<= 10){
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

//Game interface
const test = () =>{
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
    const $testPlay = $('<div>');
    $testPlay.addClass('testPlay').css('border','2px solid white').css('position','absolute');
    $testPlay.css('top','-0.5%').css('left','100%')
    $testPlay.css('width',containerWidth/2+ 'px').css('height',containerHeight+'px')
    $('.container').append($testPlay);
    const $startButton = $('<button>');
    $testPlay.append($startButton);
    $startButton.addClass('startButton')
    $startButton.css('width','100px').css('height','40px').css('border','1px solid white').css('background-color','red');
    $startButton.text('Start').css('color','white').css('position','absolute').css('font-size','20px');
    $startButton.css('left',containerWidth/11 +'px').css('bottom', '10px').css('text-align','center');
    clearInterval(timerId);
    $('.startButton').on('click',(() =>{
        timerId = setInterval(ballMove,20);
    }))
    const $rule = $('<button>');
    $('.testPlay').append($rule);
    $rule.addClass('rule');
    $rule.css('width','100px').css('height','20px').css('border','1px solid white').css('background-color','white');
    $rule.text('Rule').css('color','black').css('position','absolute').css('font-size','15px');
    $rule.css('left',containerWidth/11 +'px').css('bottom', '70px').css('text-align','center');
    gameRule();
    $('.rule').on('click',(()=>{
        $('.desciption').show('slow');
        $('.rule').on('click',(()=>{
            $('.desciption').hide();
        }))
    }))
    

}

const gamerule = "In Breakout, a layer of bricks lines the top third of the screen and the goal is to destroy them all by repeatedly bouncing a ball off a paddle into them by using 'left' and 'right' key."
const gamerule2 = "The player has three life. The game is over once the player use up three life. "
const gameRule = () =>{
    const $desciption = $('<div>');
    $('.testPlay').append($desciption);
    $desciption.addClass('desciption');
    $desciption.css('width','100px').css('height','300px').css('background-color','white');
    $desciption.text(gamerule + gamerule2).css('color','black').css('position','absolute').css('font-size','10px');
    $desciption.css('left',containerWidth/12 +'px').css('bottom', '100px').css('text-align','center');
    $desciption.hide();
}


const gameLevel1 = () =>{
    const $level1 = $('<button>');
    $level1.addClass('level1').text('Easy')
    $level1.css('width','100px').css('height','50px').css('background-color','white').css('border','1px solid white');
    $level1.css('left',containerWidth/11 +'px').css('bottom', '420px').css('text-align','center').css('position','absolute');
    $('.testPlay').append($level1);
    $('.level1').on('click',()=>{
        $('.level1').css('border','3px solid blue')
    });
    $('.level1').on('click',()=>{
        final();
    });
}


const gameLevel2 = () =>{
    const $level2 = $('<button>');
    $level2.addClass('level2').text('Medium')
    $level2.css('width','100px').css('height','50px').css('background-color','white').css('border','1px solid white');
    $level2.css('left',containerWidth/11 +'px').css('bottom', '350px').css('text-align','center').css('position','absolute');
    $('.testPlay').append($level2);
    $('.level2').on('click',()=>{
        $('.level2').css('border','3px solid blue')
    });
    $('.level2').on('click',()=>{
        final2();
    });
}

const gameLevel3 = () =>{
    const $level3 = $('<button>');
    $level3.addClass('level3').text('Hard')
    $level3.css('width','100px').css('height','50px').css('background-color','white').css('border','1px solid white');
    $level3.css('left',containerWidth/11 +'px').css('bottom', '280px').css('text-align','center').css('position','absolute');
    $('.testPlay').append($level3);
    $('.level3').on('click',()=>{
        $('.level3').css('border','3px solid blue')
    });
    $('.level3').on('click',()=>{
        final3();
    });
}



const final = () =>{
    score();
    threeLife();
    block();   
    player();
    ball();
    playerMove(); 
}

const final2 = () =>{
    blockColumn = 6;
    blockRow = 4;
    timerId = setInterval(ballMove,10);
    score();
    threeLife();
    block();   
    player();
    ball();
    playerMove(); 
}

const final3 = () =>{
    blockColumn = 6;
    blockRow = 5;
    timerId = setInterval(ballMove,5);
    score();
    threeLife();
    block();   
    player();
    ball();
    playerMove(); 
}



$(()=>{
    //final();
    test();
    gameLevel1();
    gameLevel2();
    gameLevel3();
    
    
})