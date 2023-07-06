const pressedKeys = {};

window.addEventListener('keydown', (event) => {
  if (player.preventInput) return;

  const key = event.key.toLowerCase(); // Convert the key to lowercase

  pressedKeys[key] = true;

  switch (key) {
    case 'w':
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
    case 's':
      // Code for dash
      keys.s.pressed = true;
      break;
    case 'f':
      keys.f.pressed = true;
      break;
  }
});

window.addEventListener('keyup', (event) => {
  const key = event.key.toLowerCase(); // Convert the key to lowercase

  pressedKeys[key] = false;

  switch (key) {
    case 'w':
      // move player to the left
      keys.w.pressed = false;
      break;
    case 'a':
      // move player to the left
      keys.a.pressed = false;
      break;
    case 'd':
      // move player to the right
      keys.d.pressed = false;
      break;
    case 's':
      // Code for dash
      keys.s.pressed = false;
      break;
    case 'f':
      keys.f.pressed = false;
      break;
  }
});

function checkKeyPressed(key) {
  return pressedKeys[key.toLowerCase()] === true; // Convert the key to lowercase for consistency
}
