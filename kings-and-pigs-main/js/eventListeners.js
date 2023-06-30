window.addEventListener("keydown", (event) => {
  console.log(event);
  if (player.preventInput) return;
  switch (event.key) {
    case "w":
      // for (let i = 0; i < doors.length; i++) {
      //   const door = doors[i];

      //   if (
      //     player.hitbox.position.x + player.hitbox.width <=
      //       door.position.x + door.width &&
      //     player.hitbox.position.x >= door.position.x &&
      //     player.hitbox.position.y + player.hitbox.height >= door.position.y &&
      //     player.hitbox.position.y <= door.position.y + door.height
      //   ) {
      //     player.velocity.x = 0;
      //     player.velocity.y = 0;
      //     player.preventInput = true;
      //     player.switchSprite("enterDoor");
      //     door.play();
      //     return;
      //   }
      // }
      if (player.velocity.y === 0) player.velocity.y = -20;

      break;
    case "a":
      // move player to the left
      keys.a.pressed = true;
      break;
    case "d":
      // move player to the right
      keys.d.pressed = true;
      break;

    case "r":
      keys.r.pressed = true;
      break;
    case "a" && "r":
      // Code for dash left
      keys.r.pressed = true;

      break;
    case "d" && "r":
      // Code for dash right
      keys.r.pressed = true;

      break;

    case "f":
      keys.f.pressed = true;
      break;

    case "a" && "f":
      keys.f.pressed = true;
      break;

    case "d" && "f":
      keys.f.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "a":
      // move player to the left
      keys.a.pressed = false;

      break;
    case "d":
      // move player to the right
      keys.d.pressed = false;

      break;
    case "r":
      keys.r.pressed = false;
      break;
    case "a" && "r":
      // Code for dash left
      keys.r.pressed = false;

      break;
    case "d" && "r":
      // Code for dash right
      keys.r.pressed = false;

      break;

    case "f":
      keys.f.pressed = false;
      break;

    case "a" && "f":
      keys.f.pressed = false;
      break;

    case "d" && "f":
      keys.f.pressed = false;
      break;
  }
});
