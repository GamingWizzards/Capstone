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

    this.isRolling = false;
    this.rollVelocity = 10;
    this.rollAcceleration = 0.2;
    this.rollDeceleration = 0.1;

    this.initialX = this.position.x;
    this.isDashing = false;
    this.dashDeceleration = 0.1;



    this.isWallSliding = false;
    this.wallSlideVelocity = 5;
    this.wallJumpVelocityX = 6;
    this.wallJumpVelocityY = -15;
    this.isWallJumping = false;
    this.isWallGrabbing = false;
  }

  update() {
    c.fillStyle = 'rgba(0, 0, 255, 0.5)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

    this.position.x += this.velocity.x;

    this.updateHitbox();

    this.checkForHorizontalCollisions();
    this.applyGravity();

    this.updateHitbox();

    this.checkForVerticalCollisions();

    this.updateRolling();

    this.updateDashing();

    c.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    )
  }


  handleInput(keys) {
    if (this.isRolling) return;
    if (this.isDashing) return;
    if (this.preventInput) return;
    this.velocity.x = 0;
  
    if (keys.d.pressed) {
      this.switchSprite('runRight');
      this.velocity.x = 5;
      this.lastDirection = 'right';
    } else if (keys.a.pressed) {
      this.switchSprite('runLeft');
      this.velocity.x = -5;
      this.lastDirection = 'left';
    }
  
    if (!keys.a.pressed && !keys.d.pressed && !keys.f.pressed && !keys.r.pressed) {
      if (this.lastDirection === 'left') this.switchSprite('idleLeft');
      else this.switchSprite('idleRight');
    }
    if (keys.f.pressed) {
      this.startRoll();
    }
  
    if (keys.f.pressed && keys.d.pressed) {
      this.switchSprite('rollRight');
      this.velocity.x = 8;
      this.lastDirection = 'right';
    }
    if (keys.f.pressed && keys.a.pressed) {
      this.switchSprite('rollLeft');
      this.velocity.x = -8;
      this.lastDirection = 'left';
    }
    if (keys.f.pressed && !keys.a.pressed && !keys.d.pressed) {
      this.velocity.x = this.lastDirection === 'left' ? -8 : 8;
      if (this.lastDirection === 'left') this.switchSprite('rollLeft');
      if (this.lastDirection === 'right') this.switchSprite('rollRight');
    }
    
    if (keys.r.pressed) {
      this.startDash();
    }
  
    if (keys.r.pressed && keys.d.pressed) {
      this.switchSprite('dashRight');
      this.velocity.x = 8;
      this.lastDirection = 'right';
    }
    if (keys.r.pressed && keys.a.pressed) {
      this.switchSprite('dashLeft');
      this.velocity.x = -8;
      this.lastDirection = 'left';
    }
    if (keys.r.pressed && !keys.a.pressed && !keys.d.pressed) {
      this.velocity.x = this.lastDirection === 'left' ? -8 : 8;
      if (this.lastDirection === 'left') this.switchSprite('dashLeft');
      if (this.lastDirection === 'right') this.switchSprite('dashRight');
    }

    
  
    if (keys.w.pressed && this.velocity.y >= 0 && this.body.blocked.right && this.canJumpRight) {
      this.setVelocityY(-200);
      this.setVelocityX(-200);
      this.canJumpRight = false;
      setTimeout(() => {
        this.canJumpRight = true;
      }, 3000);
    }
  
    if (keys.w.pressed) {
      if (this.isWallSliding) {
        this.isWallSliding = false;
        this.isWallJumping = true;
        this.velocity.x = this.lastDirection === 'left' ? this.wallJumpVelocityX : -this.wallJumpVelocityX;
        this.velocity.y = this.wallJumpVelocityY;
        this.switchSprite('jumpRight');
      } else {
        // Perform regular jump when 'w' key is pressed
        if (!this.isJumping) {
          this.isJumping = true;
          this.velocity.y = -10;
          this.switchSprite('jumpRight');
        }
      }
    }
  
    if (!keys.w.pressed) {
      this.isJumping = false;
    }
  
    if (this.velocity.y > 0) {
      if (this.isWallSliding) {
        console.log(this.isWallSliding)
        if (this.lastDirection === 'left') this.switchSprite('wallSlideLeft');
        else this.switchSprite('wallSlideRight');
      } else {
        if (this.lastDirection === 'left') this.switchSprite('fallLeft');
        else this.switchSprite('fallRight');
      }
    }
  
    if (this.velocity.y < 0) {
      if (this.lastDirection === 'left') this.switchSprite('jumpLeft');
      else this.switchSprite('jumpRight');
    }
  
    if (this.isWallGrabbing) {
      console.log(this.isWallGrabbing)
      if (this.lastDirection === 'left') this.switchSprite('wallGrabLeft');
      else this.switchSprite('wallGrabRight');
    }
  }

startRoll() {
  if (!this.isRolling) {
    this.isRolling = true;
    this.rollVelocity = this.lastDirection === 'left' ? -10 : 10;
    // Add any additional logic or animations for the roll
  }
}
updateRolling() {
  if (this.isRolling) {
    this.position.x += this.rollVelocity;
    this.rollVelocity *= 1 - this.rollDeceleration;

    if (Math.abs(this.rollVelocity) < 1) {
      this.isRolling = false;
      this.rollVelocity = this.lastDirection === 'left' ? -10 : 10;
    }
  }
}

startDash() {
  if (!this.isDashing && !this.isRolling) { // Check if not already dashing or rolling
    this.isDashing = true;
    this.dashVelocity = this.lastDirection === 'left' ? -12 : 12;
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

 checkForHorizontalCollisions() {
  for (let i = 0; i < this.collisionBlocks.length; i++) {
    const collisionBlock = this.collisionBlocks[i];

    if (
      this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
      this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
      this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
      this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
    ) {
      if (this.velocity.x < -0) {
        const offset = this.hitbox.position.x - this.position.x;
        this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
        break;
      }

      if (this.velocity.x > 0) {
        const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
        this.position.x = collisionBlock.position.x - offset - 0.01;
        break;
      }
    }

    // Check for wall collision on the left side
    if (
      this.hitbox.position.x === collisionBlock.position.x + collisionBlock.width &&
      this.hitbox.position.y + this.hitbox.height > collisionBlock.position.y &&
      this.hitbox.position.y < collisionBlock.position.y + collisionBlock.height
    ) {
      this.isWallSliding = true;
      this.isWallJumping = false;
      this.isWallGrabbing = false;
      return;
    }

    // Check for wall collision on the right side
    if (
      this.hitbox.position.x + this.hitbox.width === collisionBlock.position.x &&
      this.hitbox.position.y + this.hitbox.height > collisionBlock.position.y &&
      this.hitbox.position.y < collisionBlock.position.y + collisionBlock.height
    ) {
      this.isWallSliding = true;
      this.isWallJumping = false;
      this.isWallGrabbing = false;
      return;
    }
  }

  // No wall collision detected
  this.isWallSliding = false;
  this.isWallJumping = false;
  this.isWallGrabbing = false;
}

  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollisions() {
    // console.log(this.checkForVerticalCollisions)
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          break;
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
          this.position.y = collisionBlock.position.y - offset - 0.01;
          break;
        }
      }
    }
  }
}
