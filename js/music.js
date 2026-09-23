(function () {
  const AUDIO_ID = "rachika-bg-music";
  const BUTTON_ID = "rachika-music-toggle";
  const SRC = "assets/music/rachika-love-beat.mp3";

  function initMusic() {
    let audio = document.getElementById(AUDIO_ID);
    if (!audio) {
      audio = document.createElement("audio");
      audio.id = AUDIO_ID;
      audio.src = SRC;
      audio.loop = true;
      audio.preload = "auto";
      audio.volume = 0.32;
      document.body.appendChild(audio);
    }

    let button = document.getElementById(BUTTON_ID);
    if (!button) {
      button = document.createElement("button");
      button.id = BUTTON_ID;
      button.type = "button";
      button.setAttribute("aria-label", "Play or pause background music");
      button.innerHTML = "♫";
      button.title = "Background music";
      document.body.appendChild(button);
    }

    if (!document.getElementById("rachika-music-style")) {
      const style = document.createElement("style");
      style.id = "rachika-music-style";
      style.textContent = `
        #${BUTTON_ID}{
          position:fixed;right:18px;top:18px;z-index:99999;
          width:46px;height:46px;border:1px solid rgba(255,255,255,.28);
          border-radius:50%;background:rgba(35,20,38,.72);
          color:#fff;font-size:21px;line-height:1;
          display:grid;place-items:center;cursor:pointer;
          box-shadow:0 8px 25px rgba(0,0,0,.25);
          backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
          transition:transform .2s ease,background .2s ease;
        }
        #${BUTTON_ID}:hover{transform:scale(1.08);background:rgba(55,28,58,.9)}
        #${BUTTON_ID}.playing{box-shadow:0 0 0 5px rgba(255,150,205,.10),0 8px 25px rgba(0,0,0,.25)}
      `;
      document.head.appendChild(style);
    }

    function updateButton() {
      const playing = !audio.paused;
      button.textContent = playing ? "♫" : "🔇";
      button.classList.toggle("playing", playing);
    }

    button.addEventListener("click", async () => {
      try {
        if (audio.paused) {
          await audio.play();
          localStorage.setItem("rachikaMusic", "on");
        } else {
          audio.pause();
          localStorage.setItem("rachikaMusic", "off");
        }
      } catch (e) {
        // Browser autoplay policy may require this click; retrying is intentionally silent.
      }
      updateButton();
    });

    audio.addEventListener("play", updateButton);
    audio.addEventListener("pause", updateButton);

    // Browsers generally block autoplay with sound. If the user has previously
    // enabled music, try to resume it; otherwise the first button click starts it.
    if (localStorage.getItem("rachikaMusic") === "on") {
      audio.play().catch(() => {});
    }
    updateButton();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMusic);
  } else {
    initMusic();
  }
})();
