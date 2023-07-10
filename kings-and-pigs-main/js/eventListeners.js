const pressedKeys = {};

window.addEventListener('keydown', (event) => {
  if (player.preventInput) return;

  const key = event.key.toLowerCase(); // Convert the key to lowercase

  pressedKeys[key] = true;

  switch (key) {
    case ' ':
      if (player.velocity.y === 0) player.velocity.y = -25;
      break;
    case 'a':
      // move player to the left
      keys.a.pressed = true;
      break;
    case 'd':
      // move player to the right
      keys.d.pressed = true;
      break;
    case 'shift':
      // Code for dash
      keys.shift.pressed = true;
      break;
    case 'f':
      keys.f.pressed = true;
      break;
    case 'w':
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i]

        if (
          player.hitbox.position.x + player.hitbox.width <=
          door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0
          player.velocity.y = 0
          player.preventInput = true
          player.switchSprite('enterDoor')
          door.play()
          return
        }
      }
      break
  }
});

window.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase(); // Convert the key to lowercase

  pressedKeys[key] = false;

  switch (key) {
    case ' ':
      // move player to the left
      keys.Spacebar.pressed = false;
      break;
    case 'a':
      // move player to the left
      keys.a.pressed = false;
      break;
    case 'd':
      // move player to the right
      keys.d.pressed = false;
      break;
    case 'shift':
      // Code for dash
      keys.shift.pressed = false;
      break;
    case 'f':
      keys.f.pressed = false;
      break;
  }
});

function checkKeyPressed(key) {
  return pressedKeys[key.toLowerCase()] === true; // Convert the key to lowercase for consistency
}
