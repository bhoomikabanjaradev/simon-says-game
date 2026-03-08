//game press-> any key to start ->light flash press "old+new"flashes /if wrong game over
//in real its a verbal sentence remembering game

let gameSeq =[];
let userSeq =[];


let btns = ["red","green","yellow","blue"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3= document.querySelector("h3");

// 1.
document.addEventListener("keypress", function(){ //press any keyboard key to start not mouse click 
    if(started == false){
        console.log("game is started");//by clicking one time ->game start in 2nd time game get level Up
        started = true;
    
        levelUp();  //Game started -> level up
    }
}); 
 
function gameFlash(btn){
    btn.classList.add("flash");//a new flash class added to btn ..and styling for flash class also appylied due added in css
    setTimeout(function(){     // change in white
        btn.classList.remove("flash"); //after kuch time remove this class
    },250);//after 250 millisec
    //Note: by hovering/selecting setTimeout tells ( //its parameter seq )

}
function userFlash(btn){
    btn.classList.add("userflash"); // userflash ->change in green
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
}

// 2.
function levelUp(){
    userSeq=[]; //MAJOR Change : Reset the userSeq from starting (again empty value in next level)
    level++;
    
    h2.innerText=`Level ${level}`;//Update level 


    //random btn choose->random color Choosen
    let randIdx= Math.floor(Math.random()*3); //0 1 2 3 
    let randColor = btns[randIdx];//calling btn of idx
    let randBtn= document.querySelector(`.${randColor}`);//used `` not "" string Bcz calling a Class
    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);
    gameSeq.push(randColor); //push randColor to seq-> when game flash
    console.log(gameSeq);   //print gameSeq list
    gameFlash(randBtn);  //flashing random color
    //flash by the game

}
// 4.
//checking user ans
function checkAns(idx){ //idx (last user idx) ->as argument here
    // console.log("curr level:",level); //tracking current level
    // let idx = level-1; //as idx 0 means 1 color -> means idx+1= level or idx =level-1

                                        //in middle -> next btn press wait. like GameSeq=[y,b,g,r] and we upto y b g, upto this ..we have to wait for the last value Flash
    if(userSeq[idx] === gameSeq[idx]){ 
        // console.log("same value"); 
        if(userSeq.length == gameSeq.length){ //in last -> level up
            // levelUp()
           
            setTimeout(levelUp , 1000);//calling levelUp(),delay of 1s from going 1 level to another
            let highestSeq = userSeq;
            h3.innerHTML=`Your Highest score is <b>${highestSeq.length}<b>`; //H.W
        }
    }else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;//else wrong game over
        document.querySelector("body").style.backgroundColor="red";   //1. Select 2.change color
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        
    //5.
        reset();
    }
}

// 3.
function btnPress(){  // btnPress-> all work after pressing of btn
    // console.log(this); //btn which pressed
    let btn = this;
    userFlash(btn); //flash by the user press

    userColor = btn.getAttribute("id");//id -> color nikalne ke liye .get att se id att ki value lege ....Bcz id value is color of btn
    console.log(userColor);//userpressed color print
    userSeq.push(userColor);//push userColor to seq-> when user flash
//4.
    checkAns(userSeq.length-1); //last btn idx-> as parameter here

}

let allBtns = document.querySelectorAll(".btn"); //allbtns
for(btn of allBtns){  //user btns
    btn.addEventListener("click",btnPress); //btnPress ->as callback function(calling fun() iniside fun())
    // Note : all btn are different -> as in there own-own function scope
}

//5.
function reset(){
    started = false;
    gameSeq=[];
    userSeq=[];
    level =0; //level again restart with level 0
    
    
}



