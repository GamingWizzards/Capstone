window.addEventListener('keydown', (event) => {
  let jumpCount = 0
  if (player.preventInput) return
  switch (event.key) {
    case 'w':
      if (player.velocity.y === 0) player.velocity.y = -23;

      break
    case 'a':
      // move player to the left
      keys.a.pressed = true
      break
    case 'd':
      // move player to the right
      keys.d.pressed = true
      break
    case 'a' && 's':
      // Code for dash left
      keys.s.pressed = true

      break
    case 'd' && 's':
      // Code for dash right
      keys.s.pressed = true

  }
})

window.addEventListener('keyup', (event) => {
  switch (event.key) {
    case 'w':
      // move player to the left
      keys.w.pressed = false

      break
    case 'a':
      // move player to the left
      keys.a.pressed = false

      break
    case 'd':
      // move player to the right
      keys.d.pressed = false

      break
    case 'a' && 's':
      // Code for dash left
      keys.s.pressed = false

      break
    case 'd' && 's':
      // Code for dash right
      keys.s.pressed = false

      break

  }
})