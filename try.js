let first = document.getElementById("canvas");
let loc = first.getContext("2d");

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeBottom = new Image();
let pipeUp = new Image();

bird.src = 'ImgFlap/bird.png';
bg.src = 'ImgFlap/bg.png';
fg.src = 'ImgFlap/fg.png';
pipeBottom.src = 'ImgFlap/pipeBottom.png';
pipeUp.src = 'ImgFlap/pipeUp.png';


document.addEventListener('keydown', jump);

function jump() {
    yPos -= 40;
}

let xPos = 50;
let yPos = 200;
let grav = 1;

let mas = [];
mas[0] = {
    x : first.width,
    y : 0 
}


let gap = 90;
function print(){

    
    loc.drawImage(bg, 0, 0);
    for(let i = 0; i < mas.length; i++){
        loc.drawImage(pipeUp, mas[i].x, mas[i].y);
        loc.drawImage(pipeBottom, mas[i].x, mas[i].y + pipeUp.height + gap);
        mas[i].x--;
    

    if(mas[i].x == 125){
        mas.push({
            x : first.width,
            y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        });
    }
    

   
    if(xPos + bird.width >= mas[i].x
        && xPos <= mas[i].x + pipeUp.width
        && (yPos <= mas[i].y + pipeUp.height
            || yPos + bird.height >= mas[i].y + pipeUp.height + gap) || yPos + bird.height >= first.height - fg.height
        ){
            location.reload();
        }


    }
    loc.drawImage(bird, xPos, yPos),
    
    loc.drawImage(fg, 0, first.height -fg.height)
    yPos +=grav; 
    requestAnimationFrame(print);
    
}
pipeBottom.onload = print;