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

    this.isRolling = false


    this.rollVelocity = 10; // Initial roll velocity
   this.rollAcceleration = 0.2; // Rolling acceleration
     this.rollDeceleration = 0.1; // Rolling deceleration
    // this.isRolling = false; // Flag to indicate if the player is rolling
  }

  update() {
    // this is the blue box
    //  c.fillStyle = 'rgba(0, 0, 255, 0.5)'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    this.position.x += this.velocity.x;

    this.updateHitbox();

    this.checkForHorizontalCollisions();
    this.applyGravity();

    this.updateHitbox();

    //  c.fillRect(
    //    this.hitbox.position.x,
    //    this.hitbox.position.y,
    //    this.hitbox.width,
    //    this.hitbox.height
    //  )
    this.checkForVerticalCollisions();

    this.updateRolling()
  }
  updateRolling() {
    if (this.isRolling) {
      // Apply rolling movement with basic physics
      this.position.x += this.rollVelocity;

      // Apply deceleration to gradually slow down the rolling velocity
      this.rollVelocity *= (1 - this.rollDeceleration);

      // Stop rolling if the velocity becomes too slow
      if (Math.abs(this.rollVelocity) < 1) {
        this.isRolling = false;
        this.rollVelocity = 10; // Reset the roll velocity for the next roll
      }
    }
  }

  handleInput(keys) {
    console.log(keys)
    if (this.isRolling==true) return;
    if (this.preventInput) return;
    this.velocity.x = 0;
    if (keys.d.pressed) {
      this.switchSprite("runRight");
      this.velocity.x = 5;
      this.lastDirection = "right";
    } else if (keys.a.pressed) {
      this.switchSprite("runLeft");
      this.velocity.x = -5;
      this.lastDirection = "left";
    } 
  if(!keys.a.pressed && !keys.d.pressed && !keys.f.pressed){
      if (this.lastDirection === "left") this.switchSprite("idleLeft");
      else this.switchSprite("idleRight");
    }

    if(keys.f.pressed && keys.d.pressed) {
      this.switchSprite('rollRight')
      this.velocity.x = + 8 
      this.lastDirection = 'right' 
    } 
 if (keys.f.pressed && keys.a.pressed) {
      this.switchSprite("rollLeft");
      this.velocity.x = -8;
      this.lastDirection = "left";
    }
 if (keys.f.pressed && !keys.a.pressed && !keys.d.pressed) {
      this.velocity.x = this.lastDirection == 'left' ? -8 : 8;
      if (this.lastDirection === 'left') this.switchSprite("rollLeft");
      if (this.lastDirection === 'right') this.switchSprite("rollRight"); 
  
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
        if (this.velocity.x < -0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }

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

  checkForVerticalCollisions() {
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
}
