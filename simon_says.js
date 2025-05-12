let gameSeq = [];
let userSeq = [];
let color = ["yellow", "red", "purple", "green"];

let h3 = document.querySelector("h3");


let game_state = false;
let level = 0;

document.addEventListener("keypress" , () => {
    if(game_state == false) {
        console.log("Game started");
        game_state = true;
        levelUp();
    }
});

//function to check user input 
function checkAnswer(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerText = `Wrong button. Game over`;
    }
}

//function to flash button when called by game
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

//function to flash button when called by user
function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);
}

//function to make game progress
function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`; //to show level
    


    //to flash random button
    let index = Math.floor(Math.random() * 4);
    let randomColor = color[index];
    let randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);   //adding in game Sequnce array
    btnFlash(randomBtn);   
}



//button press by user
function btnPress() {
    console.log("Button was Pressed");
    let btn = this;
    let userColor = btn.getAttribute("id");
    console.log(userColor);
    userFlash(btn);
    userSeq.push(userColor);

    checkAnswer(userSeq.length-1);   //to check answer
}


let allBtn = document.querySelectorAll(".box");

for(btn of allBtn) {
    btn.addEventListener("click", btnPress);
}