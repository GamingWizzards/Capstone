class Enemy {
  constructor(imageSrcLeft, imageSrcRight, canvasWidth, canvasHeight, blocks) {
      do {
          this.x = Math.random() * canvasWidth;
          this.y = Math.random() * canvasHeight;
      } while (this.checkCollisionWithBlocks(blocks));

      this.speed = 1;

      this.imageLeft = new Image();
      this.imageLeft.src = imageSrcLeft;

      this.imageRight = new Image();
      this.imageRight.src = imageSrcRight;

      // We start with the assumption that enemy is facing left
      this.image = this.imageLeft;

      this.hitBox = {
        x: this.x,
        y: this.y,
        width: this.image.width,
        height: this.image.height
      };
  }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y);
        // Draw hit box (for debugging purposes)
        ctx.strokeStyle = 'red'; // color of the hit box
        ctx.strokeRect(this.hitBox.x, this.hitBox.y, this.hitBox.width, this.hitBox.height);
    }

    update(playerPosition) {
        this.updateDirection(playerPosition);
        this.updateHitbox();
    }

    updateHitbox() {
        this.hitBox.x = this.x;
        this.hitBox.y = this.y;
    }
  
    updateDirection(playerPosition) {
        let dx = playerPosition.x - this.x;
        let dy = playerPosition.y - this.y;
  
        let distance = Math.sqrt(dx * dx + dy * dy);
    
        let range = 200; // set the range as needed
  
        if (distance < range) { // check if the distance is less than the range
          let moveX = dx / distance;
          let moveY = dy / distance;
    
          this.x += moveX * this.speed;
          this.y += moveY * this.speed;

          // Update the image based on direction of movement
          this.image = dx > 0 ? this.imageRight : this.imageLeft;
        }
    }

    checkCollisionWithBlocks(blocks) {
      for(let i = 0; i < blocks.length; i++) {
          if(this.x < blocks[i].position.x + blocks[i].width &&
             this.x + this.image.width > blocks[i].position.x &&
             this.y < blocks[i].position.y + blocks[i].height &&
             this.y + this.image.height > blocks[i].position.y) {
              return true;
          }
      }
      return false;
  }
}
