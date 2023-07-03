class Player extends Sprite {
  constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
    super({ imageSrc, frameRate, animations, loop })
    this.position = {
      x: 200,
      y: 200,
    }

    this.velocity = {
      x: 0,
      y: 0,
    }

    this.canJump = true;

    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.gravity = 1

    this.collisionBlocks = collisionBlocks
  }

  update() {
    // this is the blue box
    c.fillStyle = 'rgba(0, 0, 255, 0.5)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    this.position.x += this.velocity.x

    this.updateHitbox()

    this.checkForHorizontalCollisions()
    this.applyGravity()

    this.updateHitbox()

    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // )
    this.checkForVerticalCollisions()
  }

  handleInput(keys) {
    if (this.preventInput) return
    if (keys.w.pressed && player.velocity.y === 0) player.velocity.y = -23;
    this.velocity.x = 0
    //Run left/right
    if (keys.d.pressed) {
      this.switchSprite('runRight')
      this.velocity.x = 5
      this.lastDirection = 'right'
    } else if (keys.a.pressed) {
      this.switchSprite('runLeft')
      this.velocity.x = -5
      this.lastDirection = 'left'
    }

    //Idle left/right
    else {
      if (this.lastDirection === 'left') this.switchSprite('idleLeft')
      else this.switchSprite('idleRight')
    }

    //Fall left/right
    if (this.velocity.y > 0) {
      if (this.lastDirection === 'left') this.switchSprite('fallLeft')
      else this.switchSprite('fallRight')
    }

    //Jump Left/right
    if (this.velocity.y < 0) {
      if (this.lastDirection === 'left') this.switchSprite('jumpLeft')
      else this.switchSprite('jumpRight')
    }

    //Dash left/right
    if (keys.d.pressed && keys.s.pressed) {
      this.switchSprite('dashRight');
      this.velocity.x = 10;
      this.lastDirection = 'right';
    } else if (keys.a.pressed && keys.s.pressed) {
      this.switchSprite('dashLeft');
      this.velocity.x = -10;
      this.lastDirection = 'left';
    }

    //Wall Slide left/right
    if (
      (keys.a.pressed && this.position.x !== 0 && !this.checkForFloorCollision()) &&
      this.checkForWallCollision('left')
    ) {
      this.velocity.y = 1; // Adjust the sliding speed as needed
      this.switchSprite('wallSlideLeft');
    } else if (
      (keys.d.pressed && this.position.x !== 0 && !this.checkForFloorCollision()) &&
      this.checkForWallCollision('right')
    ) {
      this.velocity.y = 1; // Adjust the sliding speed as needed
      this.switchSprite('wallSlideRight');
    }

    if (keys.w.pressed && this.velocity.y === 0 && this.canJump) {
      this.velocity.y = -23;
      this.canJump = false;
    }

    //Wall
    if (keys.w.pressed && !this.canJump) {
      if (this.checkForWallCollision('left')) {
        this.velocity.x = 300;
        this.velocity.y = -600;
        this.switchSprite('right');
      } else if (this.checkForWallCollision('right')) {
        this.velocity.x = -300;
        this.velocity.y = -600;
        this.switchSprite('left');
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
        floorHitbox.position.y <= collisionBlock.position.y + collisionBlock.height &&
        floorHitbox.position.y + floorHitbox.height >= collisionBlock.position.y &&
        floorHitbox.position.x + floorHitbox.width >= collisionBlock.position.x &&
        floorHitbox.position.x <= collisionBlock.position.x + collisionBlock.width
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
        x: this.hitbox.position.x + (direction === 'left' ? -wallOffset : this.hitbox.width + wallOffset),
        y: this.hitbox.position.y,
      },
      width: wallOffset * 2,
      height: this.hitbox.height,
    };

    // Check if x is equal to 0 to prevent wall collision at x = 0
    if (this.position.x === 0 && direction === 'left') {
      return false; // No wall collision
    }

    let wallCollisionDetected = false;

    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        wallHitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        wallHitbox.position.x + wallHitbox.width >= collisionBlock.position.x &&
        wallHitbox.position.y + wallHitbox.height >= collisionBlock.position.y &&
        wallHitbox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        wallCollisionDetected = true;
        break;
      }
    }

    if (wallCollisionDetected) {
      this.velocity.y = 0;
      this.canJump = true; // Allow jumping again
      keys.w.pressed = false; // Reset the 'w' key press state to allow jumping again
    }

    return wallCollisionDetected;
  }





  switchSprite(name) {
    if (this.image === this.animations[name].image) return
    this.currentFrame = 0
    this.image = this.animations[name].image
    this.frameRate = this.animations[name].frameRate
    this.frameBuffer = this.animations[name].frameBuffer
    this.loop = this.animations[name].loop
    this.currentAnimation = this.animations[name]
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34,
      },
      width: 50,
      height: 53,
    }
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      // if a collision exists
      if (
        this.hitbox.position.x <=
        collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
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
          const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;

          break;
        }
      }
    }
  }


  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

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
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.hitbox.position.y - this.position.y
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0
          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height
          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }
}
