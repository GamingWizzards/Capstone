class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
    super({ imageSrc, frameRate, animations, loop });

    this.position = {
      x: 200,

      y: 200,
    };

    this.velocity = {
      x: 0,

      y: 0,
    };

    this.sides = {
      bottom: this.position.y + this.height,
    };

    this.gravity = 1;

    this.collisionBlocks = collisionBlocks;

    this.lethalBlocks = lethalBlocks;

    this.isRolling = false;

    this.rollVelocity = 10;

    this.rollAcceleration = 0.2;

    this.rollDeceleration = 0.1;

    this.initialX = this.position.x;

    this.isDashing = false;

    this.dashDeceleration = 0.1;

    this.deathCount = 0; // Initialize death count

    // this.createDeathCounter(); // Create the death counter element

    // this.displayDeathCount(); // Display the initial death count
  }

  checkCollisionWithLethalBlocks() {
    const isCollidingWithLethalBlock = this.collisionBlocks.some(
      (collisionBlock) => {
        return (
          this.hitbox.position.x <=
            collisionBlock.position.x + collisionBlock.width &&
          this.hitbox.position.x + this.hitbox.width >=
            collisionBlock.position.x &&
          this.hitbox.position.y + this.hitbox.height >=
            collisionBlock.position.y &&
          this.hitbox.position.y <=
            collisionBlock.position.y + collisionBlock.height &&
          collisionBlock.isLethal
        );
      }
    );

    if (isCollidingWithLethalBlock) {
      console.log("Colliding with a lethal block!");

      this.handleDeath();
    }
  }

  handleDeath() {
    console.log("Colliding with a lethal block!");

    this.deathCount += 0.5; // Increment death count

    this.displayDeathCount(); // Display the updated death count

    respawnPlayer();
  }

  displayDeathCount() {
    const deathCountDisplay = document.getElementById("deathCountDisplay");

    deathCountDisplay.innerText = `Deaths: ${this.deathCount}`;
  }

  createDeathCounter() {
    const deathCounterElement = document.createElement("div");

    deathCounterElement.id = "deathCountDisplay";

    deathCounterElement.style.position = "fixed";

    deathCounterElement.style.top = "10px";

    deathCounterElement.style.left = "10px";

    deathCounterElement.style.color = "white";

    deathCounterElement.style.fontFamily = "Arial, sans-serif";

    deathCounterElement.style.fontSize = "14px";

    deathCounterElement.innerText = "Deaths: 0";

    document.body.appendChild(deathCounterElement);
  }

  deathCounter() {
    this.deathCount++; // Increment death count

    this.displayDeathCount(); // Display the updated death count
  }

  update() {
    this.position.x += this.velocity.x;

    this.updateHitbox();

    this.checkForHorizontalCollisions();

    this.applyGravity();

    this.updateHitbox();

    // this is the blue box

    //c.fillStyle = 'rgba(0, 0, 255, 0.5)'

    //c.fillRect(this.position.x, this.position.y, this.width, this.height)

    // c.fillRect(

    // this.hitbox.position.x,

    //this.hitbox.position.y,

    // this.hitbox.width,

    // this.hitbox.height

    // )

    this.checkForVerticalCollisions();

    this.updateRolling();

    this.updateDashing();

    this.checkForVerticalCollisions();

    // this.checkCollisionWithLethalBlocks();
  }

  handleInput(keys) {
    if (this.isRolling) return;

    if (this.isDashing) return;

    if (this.preventInput) return;

    this.velocity.x = 0;

    //Run left/right

    if (keys.d.pressed) {
      this.switchSprite("runRight");

      this.velocity.x = 5;

      this.lastDirection = "right";
    } else if (keys.a.pressed) {
      this.switchSprite("runLeft");

      this.velocity.x = -5;

      this.lastDirection = "left";
    }

    //Idle left/right
    else {
      if (this.lastDirection === "left") this.switchSprite("idleLeft");
      else this.switchSprite("idleRight");
    }

    //Fall left/right

    if (this.velocity.y > 0) {
      if (this.lastDirection === "left") this.switchSprite("fallLeft");
      else this.switchSprite("fallRight");
    }

    //Jump Left/right

    if (this.velocity.y < 0) {
      if (this.lastDirection === "left") this.switchSprite("jumpLeft");
      else this.switchSprite("jumpRight");
    }
    if (keys.Spacebar.pressed && this.checkForFloorCollision()) {
      jumpSound.play();
    }

    //Dash

    if (keys.shift.pressed) {
      this.startDash();
    }

    if (keys.shift.pressed && keys.d.pressed) {
      this.switchSprite("dashRight");

      this.velocity.x = 8;

      this.lastDirection = "right";
    }

    if (keys.shift.pressed && keys.a.pressed) {
      this.switchSprite("dashLeft");

      this.velocity.x = -8;

      this.lastDirection = "left";
    }

    if (
      keys.shift.pressed &&
      !keys.a.pressed &&
      !keys.d.pressed &&
      !keys.Spacebar.pressed
    ) {
      this.velocity.x = this.lastDirection === "left" ? -8 : 8;

      if (this.lastDirection === "left") this.switchSprite("dashLeft");

      if (this.lastDirection === "right") this.switchSprite("dashRight");
    }

    //Roll

    if (keys.f.pressed) {
      this.startRoll();
    }

    if (keys.f.pressed && keys.d.pressed) {
      this.switchSprite("rollRight");

      this.velocity.x = 8;

      this.lastDirection = "right";
    }

    if (keys.f.pressed && keys.a.pressed) {
      this.switchSprite("rollLeft");

      this.velocity.x = -8;

      this.lastDirection = "left";
    }

    if (
      keys.f.pressed &&
      !keys.a.pressed &&
      !keys.d.pressed &&
      !keys.Spacebar.pressed
    ) {
      this.velocity.x = this.lastDirection === "left" ? -8 : 8;

      if (this.lastDirection === "left") this.switchSprite("rollLeft");

      if (this.lastDirection === "right") this.switchSprite("rollRight");
    }

    // Wall Slide left/right

    if (
      keys.a.pressed &&
      this.position.x !== 0 &&
      !this.checkForFloorCollision() &&
      this.checkForWallCollision("left") &&
      this.velocity.y >= 1 // Check if sliding down the wall
    ) {
      this.velocity.y = 1; // Adjust the sliding speed as needed

      this.switchSprite("wallSlideLeft");
    } else if (
      keys.d.pressed &&
      this.position.x !== 0 &&
      !this.checkForFloorCollision() &&
      this.checkForWallCollision("right") &&
      this.velocity.y >= 1 // Check if sliding down the wall
    ) {
      this.velocity.y = 1; // Adjust the sliding speed as needed

      this.switchSprite("wallSlideRight");
    }

    // Wall Jump

    if (
      (checkKeyPressed("a") || checkKeyPressed("d")) &&
      checkKeyPressed(" ") &&
      !this.checkForFloorCollision() &&
      this.velocity.y >= 1
    ) {
      console.log("Wall jump!");

      const wallJumpForce = 8; // Adjust the jump force to control the distance

      const oppositeDirection =
        this.lastDirection === "left" ? "right" : "left";

      if (this.checkForWallCollision("left") && checkKeyPressed("d")) {
        this.velocity.y = -20; // Adjust the jump height as needed

        // Diagonal X-position change

        const jumpXVelocity = 50; // Adjust the X-velocity to control the smoothness and distance

        this.velocity.x = jumpXVelocity; // Set the initial horizontal jump velocity

        this.switchSprite(
          `jump${
            oppositeDirection.charAt(0).toUpperCase() +
            oppositeDirection.slice(1)
          }`
        ); // Change the sprite animation accordingly
      } else if (this.checkForWallCollision("right") && checkKeyPressed("a")) {
        this.velocity.y = -20; // Adjust the jump height as needed

        // Diagonal X-position change

        const jumpXVelocity = -50; // Adjust the X-velocity to control the smoothness and distance

        this.velocity.x = jumpXVelocity; // Set the initial horizontal jump velocity

        this.switchSprite(
          `jump${
            oppositeDirection.charAt(0).toUpperCase() +
            oppositeDirection.slice(1)
          }`
        ); // Change the sprite animation accordingly
      }
    }
  }

  checkForFloorCollision() {
    const floorOffset = 5; // Adjust as needed to ensure accurate collision detection

    const floorHitbox = {
      position: {
        x: this.hitbox.position.x,

        y: this.hitbox.position.y + this.hitbox.height + floorOffset,
      },

      width: this.hitbox.width,

      height: floorOffset * 2,
    };

    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        floorHitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height &&
        floorHitbox.position.y + floorHitbox.height >=
          collisionBlock.position.y &&
        floorHitbox.position.x + floorHitbox.width >=
          collisionBlock.position.x &&
        floorHitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width
      ) {
        return true; // Floor collision detected
      }
    }

    return false; // No floor collision
  }

  checkForWallCollision(direction) {
    const wallOffset = 5; // Adjust as needed to ensure accurate collision detection

    const wallHitbox = {
      position: {
        x:
          this.hitbox.position.x +
          (direction === "left" ? -wallOffset : this.hitbox.width + wallOffset),

        y: this.hitbox.position.y,
      },

      width: wallOffset * 2,

      height: this.hitbox.height,
    };

    // Check if x is equal to 0 to prevent wall collision at x = 0

    if (this.position.x === 0 && direction === "left") {
      return false; // No wall collision
    }

    let wallCollisionDetected = false;

    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        wallHitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        wallHitbox.position.x + wallHitbox.width >= collisionBlock.position.x &&
        wallHitbox.position.y + wallHitbox.height >=
          collisionBlock.position.y &&
        wallHitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        wallCollisionDetected = true;

        break;
      }
    }

    /* if (wallCollisionDetected) {

       this.velocity.y = 0;

       this.canJump = true; // Allow jumping again

       keys.w.pressed = false; // Reset the 'w' key press state to allow jumping again

     }*/

    //  if (

    //   wallHitbox.position.y + wallHitbox.height >= this.position.y &&

    //   wallHitbox.position.y <= this.position.y + this.height &&

    //   wallHitbox.position.x <= this.position.x + this.width &&

    //   wallHitbox.position.x + wallHitbox.width >= this.position.x

    // ) {

    //   wallCollisionDetected = true;

    // }

    return wallCollisionDetected;
  }

  startRoll() {
    if (!this.isRolling) {
      this.isRolling = true;

      this.rollVelocity = this.lastDirection === "left" ? -16 : 16;

      // Add any additional logic or animations for the roll
    }
  }

  updateRolling() {
    if (this.isRolling) {
      const previousX = this.position.x;

      this.position.x += this.rollVelocity;

      this.rollVelocity *= 1 - this.rollDeceleration;

      if (Math.abs(this.rollVelocity) < 1) {
        this.position.x = previousX;

        this.isRolling = false;

        this.rollVelocity = this.lastDirection === "left" ? -16 : 16;
      }
    }
  }

  startDash() {
    if (!this.isDashing && !this.isRolling) {
      // Check if not already dashing or rolling

      this.isDashing = true;

      this.dashVelocity = this.lastDirection === "left" ? -12 : 12;

      this.dashDuration = 0; // Initialize the dash duration

      this.maxDashDuration = 15; // Adjust this value according to your needs

      // Add any additional logic or animations for the dash
    }
  }

  updateDashing() {
    if (this.isDashing) {
      if (this.dashDuration < this.maxDashDuration) {
        this.position.x += this.dashVelocity;

        this.dashDuration++;
      } else {
        this.isDashing = false;

        this.dashVelocity = 0;
      }
    }
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) return;

    this.currentFrame = 0;

    this.image = this.animations[name].image;

    this.frameRate = this.animations[name].frameRate;

    this.frameBuffer = this.animations[name].frameBuffer;

    this.loop = this.animations[name].loop;

    this.currentAnimation = this.animations[name];
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 58,

        y: this.position.y + 34,
      },

      width: 50,

      height: 53,
    };
  }

  //left and right

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // if a collision exists

      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        // collision on x axis going to the left

        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x;

          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;

          break;
        }

        // collision on x axis going to the right

        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;

          this.position.x = collisionBlock.position.x - offset - 0.01;

          break;
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity;

    this.position.y += this.velocity.y;
  }

  // up and down

  checkForVerticalCollisions() {
    let isCollidingWithLethalBlock = false;

    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (collisionBlock.isLethal) {
          isCollidingWithLethalBlock = true;
        } else {
          if (this.velocity.y < 0) {
            this.velocity.y = 0;

            const offset = this.hitbox.position.y - this.position.y;

            this.position.y =
              collisionBlock.position.y + collisionBlock.height - offset + 0.01;

            break;
          }

          if (this.velocity.y > 0) {
            this.velocity.y = 0;

            const offset =
              this.hitbox.position.y - this.position.y + this.hitbox.height;

            this.position.y = collisionBlock.position.y - offset - 0.01;

            break;
          }
        }
      }
    }

    if (isCollidingWithLethalBlock) {
      console.log("Colliding with a lethal block!");

      this.handleDeath();
    }
  }
}
