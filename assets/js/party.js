// Function to generate heavy confetti bursts continuously
    function startInfiniteConfetti() {
      const defaults = { startVelocity: 40, spread: 360, ticks: 80, zIndex: 1000 };

      setInterval(function() {
        const particleCount = 20 + Math.random() * 30; // 20–50 particles per burst
        confetti(Object.assign({}, defaults, {
          particleCount,
          origin: { x: Math.random(), y: Math.random() * 0.5 }, // drop from top half
        }));
      }, 150); // every 150ms for dense rain
      const cat = document.getElementById("cat");
      cat.style.display = "block";
      const boule = document.getElementById("boule");
      boule.style.display = "block";
      const volume = document.getElementById("volume");
      volume.style.display = "block";
      startSecretSong();
     // setTimeout(() => cat.style.display = "none", 5000);
    }

    function startRainbow() {
      let rainbow = false, interval;
      document.addEventListener('keydown', e => {
          rainbow = !rainbow;
          if (rainbow) {
            let hue = 0;
            interval = setInterval(() => {
              document.body.style.backgroundColor = `hsl(${hue}, 80%, 50%)`;
              hue = (hue + 5) % 360;
            }, 100);
          } else {
            clearInterval(interval);
            document.body.style.backgroundColor = '';
          }
      });
    }

    function startSecretSong(){
      const audio = document.getElementById('myAudio');
      const pauseBtn = document.getElementById('pauseBtn');
      audio.play();
      lowerVolumeBtn.addEventListener('click', () => {
        audio.volume = Math.max(0, audio.volume - 0.2); // decrease by 10%
      });

      

      raiseVolumeBtn.addEventListener('click', () => {
        audio.volume = Math.min(1, audio.volume + 0.2); // increase by 10%
      
      });
       pauseBtn.addEventListener('click', () => {
        audio.pause();
      });
    }

