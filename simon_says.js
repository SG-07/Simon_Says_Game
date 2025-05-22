window.addEventListener("DOMContentLoaded", () => {
  let gameSeq = [];
  let userSeq = [];
  const color = ["yellow", "red", "purple", "green"];
  let highScore = [0];
  let isMuted = false;
  let game_state = false;
  let level = 0;

  // DOM Elements
  const btnStart = document.getElementById("start");
  const muteBtn = document.getElementById("mute-toggle");
  const muteWrapper = document.getElementById("mute-wrapper");
  const h3 = document.querySelector("h3");
  const allBtn = document.querySelectorAll(".box");

  // Sounds
  const highScoreSound = new Audio("sounds/victory.mp3");
  const perfect = new Audio("sounds/perfect.mp3");
  const gameOver = new Audio("sounds/game_over.wav");
  const sounds = [highScoreSound, perfect, gameOver];
  highScoreSound.volume = 0.4;

  // Start Game
  btnStart.addEventListener("click", () => {
    if (!game_state) {
      game_state = true;
      stopAllSounds();
      btnStart.disabled = true;

      // Hide other buttons, center mute
      document.getElementById("start").style.display = "none";
      document.getElementById("info").style.display = "none";
      muteWrapper.classList.add("centered");
      document.body.classList.remove("gameOver", "newRecord");
      document.body.classList.add("gameStart");


      levelUp();
    }
  });

  // Mute Toggle
  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    muteBtn.innerText = isMuted ? "🔊 Unmute" : "🔇 Mute";
    sounds.forEach(sound => sound.muted = isMuted);
  });

  // Button Click Handler
  function btnPress() {
    if (!game_state) return;

    const btn = this;
    const userColor = btn.getAttribute("id");
    userFlash(btn);
    userSeq.push(userColor);
    checkAnswer(userSeq.length - 1);
  }

  allBtn.forEach(btn => btn.addEventListener("click", btnPress));

  // Level Progression
  function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    const index = Math.floor(Math.random() * 4);
    const randomColor = color[index];
    const randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    setTimeout(() => {
        btnFlash(randomBtn);
    }, 350);
  }

  // Check User Input
  function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
      if (userSeq.length === gameSeq.length) {
        perfect.play();
        setTimeout(levelUp, 1000);
      }
    } else {
      let curScore = level - 1;
      let hScore = highScore[0];
      let isHighScore = false;

      if (curScore !== 0 && hScore < curScore) {
        highScore[0] = curScore;
        highScoreSound.play();
        isHighScore = true;
        document.body.classList.remove("gameOver", "gameStart");
        document.body.classList.add("newRecord");

      } else {
        curScore = 0;
        gameOver.play();
        document.body.classList.remove("newRecord", "gameStart");
        document.body.classList.add("gameOver");

      }

      h3.innerHTML = `Game over! Your score is <b>${curScore}</b>.<br> <b>Highest Score ${highScore[0]}</b>`;
      btnStart.innerText = 'Start';

      setTimeout(() => {
        reset();
      }, 1000);
    }
  }

  // Visual Flash (Game)
  function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
  }

  // Visual Flash (User Click)
  function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
  }

  // Reset Game
  function reset() {
    btnStart.disabled = false;
    gameSeq = [];
    userSeq = [];
    level = 0;

    // Reset layout
    document.body.classList.remove("gameOver", "newRecord");
    document.body.classList.add("gameStart");
    muteWrapper.classList.remove("centered");
    document.getElementById("start").style.display = "inline-block";
    document.getElementById("info").style.display = "inline-block";
    btnStart.innerText = "Start";

    setTimeout(() => {
      game_state = false;
    }, 1000);
  }

  // Stop All Sounds
  function stopAllSounds() {
    sounds.forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
});




