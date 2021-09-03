var first = document.getElementById("canvas");
var loc = first.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeBottom = new Image();
let pipeUp = new Image();

bird.src = "ImgFlap/bird.png"
bg.src = "imgFlap/bg.png"
fg.src = "imgFlap/fg.png"
pipeBottom.src = "imgFlap/pipeBottom.png"
pipeUp.src = "imgFlap/pipeUp.png"

let pipe = [];
pipe[0] = {
    x: first.width,
    y: 0,
}

let gap = 90;

let xPos = 50;
let yPos = 100;
let gravity = 1;
let score = 0;


function paint(){
    loc.drawImage(bg, 0, 0);

    for(let i = 0 ; i < pipe.length ; i++ ){
        loc.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        loc.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x: first.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if(xPos + bird.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
                || yPos + bird.height >= first.height - fg.height){

                return alert(`${score} - your score`) && location.reload();
                    
                }
        if(pipe[i].x == 5){
            score++;
        }
                
    }
    
    loc.drawImage(fg, 0, first.height - fg.height);
    loc.drawImage(bird, xPos, yPos);

    loc.fillStyle = "#000";
    loc.font = "24px Verdana";
    loc.fillText("Счет: " + score, 10, first.height - 20);

    yPos += gravity;
    requestAnimationFrame(paint);

}

document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -=40;
}





pipeUp.onload = paint;