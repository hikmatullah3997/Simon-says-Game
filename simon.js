 let gameseq=[];
 let userseq=[];

 let boxes=["red","gray","yellow","blue"];

 let start=false;
 let level=0;
 let h2=document.querySelector("h2");
 let levelcount=0;

 const bgMusic = document.getElementById('backgroundMusic');
 const gameOverSound = document.getElementById('gameOverSound');

  
 document.addEventListener("keypress",function(){
 
    if(start==false){
        console.log("Game has started");
       
        start=true;
        bgMusic.currentTime = 0;
        bgMusic.play();
        levelUp();
    }
   
 });

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}


function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}


 function levelUp(){
    userseq=[];
    level++;
    h2.innerText= `level ${level} `;

    let ranIdx=Math.floor(Math.random()*4);
    let randombox=boxes[ranIdx];

    let randbtn=document.querySelector(`.${randombox}`)
    gameseq.push(randombox);
    console.log(gameseq);
    gameFlash(randbtn);
 }


 
 function checkAns(index){
    const overlay = document.querySelector('.game-overlay');
    if(userseq[index] === gameseq[index]){
        if(userseq.length == gameseq.length){
          setTimeout(levelUp,1000);
        } 
    }else{
        bgMusic.pause();

        overlay.style.backgroundImage = 'url("scaryimg.jpeg")';
        gameOverSound.currentTime = 5.9;
        gameOverSound.play();
        
        overlay.style.backgroundImage = 'url("scaryimg.jpeg")';
        overlay.style.display = 'block';
        h2.innerHTML= `Game over: <b> Your score was ${level}<b> <br>  press any key to start`;
       
        let h3=document.querySelector("h3");
        if(level>levelcount){
            levelcount=level;
            h3.innerText=`your higgest score was ${levelcount}`;
        }
        setTimeout(() => { 
            overlay.style.display = 'none';
            // Stop game over sound after 3 seconds
            setTimeout(() => gameOverSound.pause(), 1500);
        }, 1500);
        reset();
    }
 }

 function buttonPress(){
     let box=this;
     userFlash(box);

     userColor=box.getAttribute("id");
     console.log(userColor);
     userseq.push(userColor);
  
     checkAns(userseq.length-1);
 }

 let allBoxes=document.querySelectorAll(".boxes");
 for(box of allBoxes){
    box.addEventListener("click", buttonPress)

  
 }
 function reset(){
    start=false;
    gameseq=[];
    userseq=[];

   
    bgMusic.pause();
    
   
    level=0; 
 }