let gameSeq = [];
let userSeq = [];
let color = ["yellow", "red", "purple", "green"];
let highScore = [0];
let isMuted = false;


//sounds
let highScoreSound = new Audio("sounds/victory.mp3");
let perfect = new Audio("sounds/perfect.mp3");
let gameOver = new Audio("sounds/game_over.wav");
highScoreSound.volume = 0.4;
const sounds = [highScoreSound, perfect, gameOver];



let h3 = document.querySelector("h3");



let game_state = false;
let level = 0;
let btnStart = document.querySelector(".start");

btnStart.addEventListener("click" , () => {
    if(game_state == false) {
        console.log("Game started");
        game_state = true;
        stopAllSounds();
        btnStart.disabled = true;
        levelUp();

        // Hide buttons
        document.getElementById("start").style.display = "none";
        document.getElementById("info").style.display = "none";
        
    }
});

//function to check user input 
function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            perfect.play();
            setTimeout(levelUp, 1000);
        }
    } else {
        let curScore = level - 1;
        let hScore = highScore[0];
        if(curScore !=0 ) {
            if(hScore < curScore) {
                hScore = curScore;
                highScore[0] = hScore;
                highScoreSound.play();
            }
        } else {
            curScore = 0;
        }
        
        h3.innerHTML = `Game over! Your score is <b>${curScore} </b>.<br> <b>Highest Score ${hScore} </b>.`;
        btnStart.innerText = 'Start'
        document.querySelector("body").style.backgroundColor = "red";
        gameOver.play();
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
            reset();
        }, 1000);
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


//function to reset the Game
function reset() {
    btnStart.disabled = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    document.getElementById("start").style.display = "inline-block";
    document.getElementById("info").style.display = "inline-block";
    btnStart.innerText = "Start";
    document.querySelector("body").style.backgroundColor = "white";
    setTimeout( () => {
        game_state = false;
    }, 1000);
    
}

function stopAllSounds() {
    highScoreSound.pause();
    highScoreSound.currentTime = 0;

    perfect.pause();
    perfect.currentTime = 0;

    gameOver.pause();
    gameOver.currentTime = 0;
}

const muteBtn = document.getElementById("mute-toggle");

muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    muteBtn.innerText = isMuted ? "🔊 Unmute" : "🔇 Mute";
    
    sounds.forEach(sound => {
        sound.muted = isMuted;
    });
});
