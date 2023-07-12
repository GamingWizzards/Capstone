const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 64 * 32; // 2048
canvas.height = 64 * 18; // 1152

let parsedCollisions;
let collisionBlocks;
let background;
let doors;

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
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/king/enterDoor.png',
      onComplete: () => {
        console.log('completed animation');
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            transitionToMap(doors.destinationLevel); // Call transitionToMap function with destinationLevel
            player.switchSprite('idleRight');
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});

const camera = new window.Camera(player, { width: canvas.width, height: canvas.height });

let level = 1 || 2 || 3
let destinationLevel = level;

const levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 222;
      player.position.y = 530;

      if (player.currentAnimation) player.currentAnimation.isActive = false;
      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/TransitionRed.png',
      });

      doors = [
        new Sprite({
          position: {
            x: 640,
            y: 2048,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
          destinationLevel: 2,
        }),
        new Sprite({
          position: {
            x: 4448,
            y: 2068,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
          destinationLevel: 3,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 196;
      player.position.y = 2836;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/TransitionRed2.png',
      });

      doors = [
        new Sprite({
          position: {
            x: 2724,
            y: 2802,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      player.position.x = 250;
      player.position.y = 3844;

      if (player.currentAnimation) player.currentAnimation.isActive = false;

      background = new Sprite({
        position: {
          x: 0,
          y: 0,
        },
        imageSrc: './img/RightSideMap.png',
      });

      doors = [
        new Sprite({
          position: {
            x: 2724,
            y: 2802,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
          destinationLevel: 1,
        }),
        new Sprite({
          position: {
            x: 248,
            y: 1016,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
          destinationLevel: 1,
        }),
        new Sprite({
          position: {
            x: 5144,
            y: 1532,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
          destinationLevel: 1,
        }),
        new Sprite({
          position: {
            x: 7208,
            y: 3000,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
          destinationLevel: 1,
        }),
      ];
    },
  },
};

const transitionToMap = (destinationLevel) => {
  // Update the current level or perform any other necessary actions based on the destination map
  switch (destinationLevel) {
    case 2:
      level = 2;
      levels[level].init();
      break;
    case 3:
      level = 3;
      levels[level].init();
      break;
    default:
      // Handle unknown destination maps or fallback to level 1
      level = 1;
      levels[level].init();
      break;
  }

  // Additional transition logic, if needed
};

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
    pressed: false,
  },
};

const overlay = {
  opacity: 0,
};

function animate() {
  window.requestAnimationFrame(animate);

  // Update camera here, before you start drawing.
  camera.update();

  // Clear the entire canvas
  c.clearRect(0, 0, canvas.width, canvas.height);

  // Save the context state
  c.save();

  // Translate the context by the negative of the camera's offset
  c.translate(-camera.offset.x, -camera.offset.y);

  background.draw();

  doors.forEach((door) => {
    door.draw();
  });

  player.handleInput(keys);
  player.draw();
  player.update();

  c.save();
  c.globalAlpha = overlay.opacity;
  c.fillStyle = 'black';
  c.fillRect(camera.offset.x, camera.offset.y, canvas.width, canvas.height);
  c.restore();

  c.restore();
}

levels[level].init();
animate();
