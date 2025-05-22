window.addEventListener("DOMContentLoaded", () => {
  let gameSeq = [];
  let userSeq = [];
  let color = ["yellow", "red", "purple", "green"];
  let highScore = [0];
  let isMuted = false;
  let game_state = false;
  let level = 0;

  // DOM elements
  const btnStart = document.getElementById("start");
  const muteBtn = document.getElementById("mute-toggle");
  const h3 = document.querySelector("h3");
  const allBtn = document.querySelectorAll(".box");

  // Sounds
  const highScoreSound = new Audio("sounds/victory.mp3");
  const perfect = new Audio("sounds/perfect.mp3");
  const gameOver = new Audio("sounds/game_over.wav");
  highScoreSound.volume = 0.4;
  const sounds = [highScoreSound, perfect, gameOver];

  // Start button logic
  btnStart.addEventListener("click", () => {
    if (!game_state) {
      game_state = true;
      stopAllSounds();
      btnStart.disabled = true;
      document.getElementById("start").style.display = "none";
      document.getElementById("info").style.display = "none";
      muteBtn.classList.add("centered");
      levelUp();
    }
  });

  // Mute toggle
  muteBtn.addEventListener("click", () => {
    isMuted = !isMuted;
    muteBtn.innerText = isMuted ? "🔊 Unmute" : "🔇 Mute";
    sounds.forEach(sound => sound.muted = isMuted);
  });

  // Game logic
  function checkAnswer(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
      if (userSeq.length === gameSeq.length) {
        perfect.play();
        setTimeout(levelUp, 1000);
      }
    } else {
      let curScore = level - 1;
      let hScore = highScore[0];
      if (curScore !== 0 && hScore < curScore) {
        highScore[0] = curScore;
        highScoreSound.play();
      } else {
        curScore = 0;
        gameOver.play();
      }

      h3.innerHTML = `Game over! Your score is <b>${curScore}</b>.<br> <b>Highest Score ${highScore[0]}</b>`;
      btnStart.innerText = 'Start';
      document.body.classList.add("gameOver");

      setTimeout(() => {
        document.body.classList.remove("gameOver");
        reset();
      }, 1000);
    }
  }

  function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
  }

  function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(() => btn.classList.remove("userFlash"), 250);
  }

  function levelUp() {
    userSeq = [];
    level++;
    h3.innerText = `Level ${level}`;
    const index = Math.floor(Math.random() * 4);
    const randomColor = color[index];
    const randomBtn = document.querySelector(`.${randomColor}`);
    gameSeq.push(randomColor);
    btnFlash(randomBtn);
  }

  function btnPress() {
    if (!game_state) return;
    const btn = this;
    const userColor = btn.getAttribute("id");
    userFlash(btn);
    userSeq.push(userColor);
    checkAnswer(userSeq.length - 1);
  }

  allBtn.forEach(btn => btn.addEventListener("click", btnPress));

  function reset() {
    btnStart.disabled = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    muteBtn.classList.remove("centered");
    document.getElementById("start").style.display = "inline-block";
    document.getElementById("info").style.display = "inline-block";
    btnStart.innerText = "Start";
    document.body.style.backgroundColor = "white";
    setTimeout(() => {
      game_state = false;
    }, 1000);
  }

  function stopAllSounds() {
    sounds.forEach(sound => {
      sound.pause();
      sound.currentTime = 0;
    });
  }
});
