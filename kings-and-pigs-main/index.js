let enemies = [];
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const startButton = document.getElementById('start-button');
const startContainer = document.getElementById('start-container');
const gameContainer = document.getElementById('game-container');
const backgroundAudio = document.getElementById('background-music-2')


// const audioContext = new (window.AudioContext || window.AudioContext)();
// const jumpSound = new Audio('./sounds/MYLK_vocal_huh_dry.wav');
// const collisionSound = new Audio('./sounds/collision.wav');


canvas.width = 64 * 32 // 2048
canvas.height = 64 * 18 // 1152

let parsedCollisions
let collisionBlocks
let background
let doors
let lethalBlocks

const player = new Player({
  imageSrc: './img/AssetPack/Light/idle_blink/idleRight.png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 8,
      loop: true,
      imageSrc: './img/AssetPack/Light/idle_blink/idleRight.png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 8,
      loop: true,
      imageSrc: './img/AssetPack/Light/idle_blink/idleLeft.png',
    },
    runRight: {
      frameRate: 10,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/AssetPack/Light/run/runRight.png',
    },
    runLeft: {
      frameRate: 10,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/AssetPack/Light/run/runLeft.png',
    },
    jumpRight: {
      frameRate: 4,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/AssetPack/Light/jump/jumpRight.png',
    },
    jumpLeft: {
      frameRate: 4,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/AssetPack/Light/jump/jumpLeft.png',
    },
    wallSlideRight: {
      frameRate: 4,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/AssetPack/Light/wall_slide/wallSlideRight.png',
    },
    wallSlideLeft: {
      frameRate: 4,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/AssetPack/Light/wall_slide/wallSlideLeft.png',
    },
    wallGrabRight: {
      frameRate: 13,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/AssetPack/Light/wall_grab/wallGrabRight.png',
    },
    wallGrabLeft: {
      frameRate: 13,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/AssetPack/Light/wall_grab/wallGrabLeft.png',
    },
    rollRight: {
      frameRate: 20,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/AssetPack/Light/roll/rollRight.png',
    },
    rollLeft: {
      frameRate: 20,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/AssetPack/Light/roll/rollLeft.png',
    },
    fallRight: {
      frameRate: 4,
      frameBuffer: 1,
      loop: true,
      imageSrc: './img/AssetPack/Light/fall/fallRight.png',
    },
    fallLeft: {
      frameRate: 4,
      frameBuffer: 1,
      loop: true,
      imageSrc: './img/AssetPack/Light/fall/fallLeft.png',
    },
    dashRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/AssetPack/Light/dash/dashRight.png',
    },
    dashLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/AssetPack/Light/dash/dashLeft.png',
    },
    attackRight: {
      frameRate: 10,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/AssetPack/Light/attack1/attackRight.png',
    },
    enterDoor: {
      frameRate: 20,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/AssetPack/Light/roll/rollLeft.png',
      onComplete: () => {
        console.log('completed animation')
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            level++

            if (level === 6) level = 1
            levels[level].init()
            player.switchSprite('idleRight')
            player.preventInput = false
            gsap.to(overlay, {
              opacity: 0,
            })
          },
        })
      },
    },
  },
})

function GameCheckpoint(x, y, imageSrc) {
  this.x = x;
  this.y = y;
  this.width = 64; // adjust as needed
  this.height = 128; // adjust as needed
  this.image = new Image();
  this.image.src = imageSrc;
  this.draw = function(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

let checkpoints = [
  new GameCheckpoint(498, 3880, './img/Lantern.png'), //spawn
  

  new GameCheckpoint(2688, 3560, './img/Lantern.png'), //start green
  new GameCheckpoint(5060, 3780, './img/Lantern.png'), //green 1
  new GameCheckpoint(5244, 4400, './img/Lantern.png'), //green 2
  new GameCheckpoint(5696, 2700, './img/Lantern.png') ,//green 3

  new GameCheckpoint(1064, 2910, './img/Lantern.png'), //start purple 
  new GameCheckpoint(450, 2325, './img/Lantern.png'), //purple 1
  new GameCheckpoint(1268, 2000, './img/Lantern.png'), //purple 2
  new GameCheckpoint(1268, 1165, './img/Lantern.png'), //purple 3
  new GameCheckpoint(2300, 1745, './img/Lantern.png') ,//purple 4
  // Add more as needed...
];

let lastCheckpoint = checkpoints[0]

function updateCheckpoints() {
  for (let i = 0; i < checkpoints.length; i++) {
    let checkpoint = checkpoints[i];

    // Check if the player has passed through the checkpoint
    if (
      player.position.x > checkpoint.x &&
      player.position.x < checkpoint.x + checkpoint.width &&
      player.position.y > checkpoint.y &&
      player.position.y < checkpoint.y + checkpoint.height
    ) {
      // Update the lastCheckpoint
      lastCheckpoint = checkpoint;
      // console.log("Checkpoint updated to:", checkpoint);
      console.log("Checkpoint updated to:");
     // Show the pop-up message
     const checkpointPopup = document.getElementById('checkpoint-popup');
     checkpointPopup.style.opacity = 1;

     // Hide the pop-up message after 2 seconds (adjust as needed)
     setTimeout(() => {
       checkpointPopup.style.opacity = 0;
     }, 2000);

     break;
    }
  }
}

function respawnPlayer() {
  // console.log("Resetting checkpoint...");
  player.position.x = lastCheckpoint.x;
  player.position.y = lastCheckpoint.y;
  // console.log("Checkpoint has been reset!");
}



let currentCheckpoint = checkpoints[0]

const camera = new window.Camera(player, { width: canvas.width, height: canvas.height })

let level = 1;
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D()
      collisionBlocks = parsedCollisions.createObjectsFrom2D()
      player.collisionBlocks = collisionBlocks
      player.position.x = 1662.79
      player.position.y = 2502.94

      if (player.currentAnimation) player.currentAnimation.isActive = false

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/AmissaTutorialMap.png',
      })

      doors = [
        new Sprite({
          position: {
            x: 7600,
            y: 580,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
      ]
      lethalBlocks = parsedCollisions.createObjectsFrom2D(collisionsLevel2);
      player.lethalBlocks = lethalBlocks; 
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLethalLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 250;
      player.position.y = 3844;
      // player.position.x = 250;
      // player.position.y = 3844;
      if (player.currentAnimation) player.currentAnimation.isActive = false;
           
      // Spawn enemies at specific locations on the map
           enemies.push(new Enemy(500, 100, 2, "./img/Ninja/enemy/Bug/idlemove/Bug Enemy_Animation 1_0.png")); 
           enemies.push(new Enemy(1000, 300, 3, "./img/Ninja/enemy/Bug/idlemove/Bug Enemy_Animation 1_0.png"));

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/AmissasEchoMap.png',
      });

      doors = [
        // new Sprite({
        //   position: {
        //     x: 165,
        //     y: 3760,
        //   },
        //   imageSrc: './img/teleporter.png',
        //   frameRate: 12,
        //   frameBuffer: 20,
        //   loop: true,
        //   autoplay: false,
        // }),
        //orange
        new Sprite({
          position: {
            x: 5200,
            y: 1308,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
        //purple
        new Sprite({
          position: {
            x: 250,
            y: 800,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
        //green
        new Sprite({
          position: {
            x: 7200,
            y: 2705,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
      ];
      lethalBlocks = parsedCollisions.createObjectsFrom2D(collisionsLethalLevel1);
      player.lethalBlocks = lethalBlocks; 
      //need two doors(technically 3;boss level) 1 to lead right and 1 to lead left
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLethalLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 250;
      player.position.y = 3844;
      // player.position.x = 250;
      // player.position.y = 3844;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/AmissasEchoMap.png',
      });
      doors = [
        // new Sprite({
        //   position: {
        //     x: 165,
        //     y: 3760,
        //   },
        //   imageSrc: './img/teleporter.png',
        //   frameRate: 12,
        //   frameBuffer: 20,
        //   loop: true,
        //   autoplay: false,
        // }),
        //orange
        new Sprite({
          position: {
            x: 5200,
            y: 1308,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
        //purple
        new Sprite({
          position: {
            x: 250,
            y: 800,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
        //green
        new Sprite({
          position: {
            x: 7200,
            y: 2705,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
      ];
      lethalBlocks = parsedCollisions.createObjectsFrom2D(collisionsLethalLevel1);
      player.lethalBlocks = lethalBlocks; 
      //need two doors(technically 3;boss level) 1 to lead right and 1 to lead left
    },
  },
  4: {
    init: () => {
      parsedCollisions = collisionsLethalLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 250;
      player.position.y = 3844;
      // player.position.x = 250;
      // player.position.y = 3844;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/AmissasEchoMap.png',
      });

      doors = [
        // new Sprite({
        //   position: {
        //     x: 165,
        //     y: 3760,
        //   },
        //   imageSrc: './img/teleporter.png',
        //   frameRate: 12,
        //   frameBuffer: 20,
        //   loop: true,
        //   autoplay: false,
        // }),
        //orange
        new Sprite({
          position: {
            x: 5200,
            y: 1308,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
        //purple
        new Sprite({
          position: {
            x: 250,
            y: 800,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
        //green
        new Sprite({
          position: {
            x: 7200,
            y: 2705,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
      ];
      lethalBlocks = parsedCollisions.createObjectsFrom2D(collisionsLethalLevel1);
      player.lethalBlocks = lethalBlocks; 
      //need two doors(technically 3;boss level) 1 to lead right and 1 to lead left
    },
  },
  5: {
    init: () => {
      parsedCollisions = collisionsLethalLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 250;
      player.position.y = 3844;
      // player.position.x = 250;
      // player.position.y = 3844;
      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/AmissasEchoMap.png',
      });

      doors = [
        // new Sprite({
        //   position: {
        //     x: 165,
        //     y: 3760,
        //   },
        //   imageSrc: './img/teleporter.png',
        //   frameRate: 12,
        //   frameBuffer: 20,
        //   loop: true,
        //   autoplay: false,
        // }),
        //orange
        new Sprite({
          position: {
            x: 5200,
            y: 1308,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
        //purple
        new Sprite({
          position: {
            x: 250,
            y: 800,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
        //green
        new Sprite({
          position: {
            x: 7200,
            y: 2705,
          },
          imageSrc: './img/teleporter.png',
          frameRate: 12,
          frameBuffer: 20,
          loop: true,
          autoplay: false,
        }),
      ];
      lethalBlocks = parsedCollisions.createObjectsFrom2D(collisionsLethalLevel1);
      player.lethalBlocks = lethalBlocks; 
      //need two doors(technically 3;boss level) 1 to lead right and 1 to lead left
    },
  },



}

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  shift: {
    pressed: false,
  },
  q: {
    pressed: false,
  },
  e: {
    pressed: false,
  },
  Spacebar: {
    pressed: false,
  },
  f: {
    pressed: false
  }
}

const overlay = {
  opacity: 0,
}


function animate() {
  window.requestAnimationFrame(animate)

  if(gameStarted) {
    startContainer.style.display = 'none';
    gameContainer.style.display = 'block';
  } else {
    startContainer.style.display = 'block';
    gameContainer.style.display = 'none';
  }
  

  // Update camera here, before you start drawing.
  camera.update()

  // Clear the entire canvas
  c.clearRect(0, 0, canvas.width, canvas.height)

  // Save the context state
  c.save()

  // Translate the context by the negative of the camera's offset
  c.translate(-camera.offset.x, -camera.offset.y)

  background.draw()

  //Collision walls code to see collisionsBlocks
  // collisionBlocks.forEach((collisionBlock) => {
  // collisionBlock.draw()
  // })

  doors.forEach((door) => {
    door.draw()
  })
  

  
  updateCheckpoints();

  for(let i = 0; i < checkpoints.length; i++) {
    checkpoints[i].draw(c);
  }
  
  player.handleInput(keys)
  player.draw()
  player.update()

  c.save()
  c.globalAlpha = overlay.opacity
  c.fillStyle = 'black'
  c.fillRect(camera.offset.x, camera.offset.y, canvas.width, canvas.height)
  c.restore()

  c.restore()

  enemies.forEach((enemy) => {
    enemy.update(player);
    enemy.draw(c);
    enemy.checkCollision(player);
  });
}

startButton.addEventListener('click', () => {
  startContainer.style.opacity = '0'; // Fade out the start container
  setTimeout(() => {
    startContainer.style.display = 'none'; // Hide the start container
    gameContainer.classList.add('fade-in'); // Fade in the game container
    gameStarted = true;
  
    if (gameStarted === true) {
      playBackground('background-music-2', 0.1);
    }
  }, 1000); // Adjust the delay (in milliseconds) to match the transition duration

});

let gameStarted = false

// function setVolume(audioId, volume) {
//   const audio = document.getElementById(audioId);
//   audio.volume = volume;
// }

function playBackground(audioId, volume) {
  const audio = document.getElementById(audioId);
  audio.volume = volume
  audio.play();
}



levels[level].init()
animate()

