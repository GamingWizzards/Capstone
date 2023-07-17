function Enemy(x, y, speed, image) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.image = new Image();
    this.image.src = image;
  }
  
  Enemy.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.x, this.y);
  };
  
  Enemy.prototype.update = function (player) {
    // Simple movement: move towards the player if they are within a certain range
    let dx = player.position.x - this.x;
    let dy = player.position.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
  
    if (distance < 200) { // Adjust the range as needed
      // Normalize the direction vector (dx, dy)
      let directionX = dx / distance;
      let directionY = dy / distance;
  
      // Move towards the player
      this.x += directionX * this.speed;
      this.y += directionY * this.speed;
    }
  };
  
  Enemy.prototype.checkCollision = function (player) {
    // Calculate the distance between the player and the enemy
    let dx = player.position.x - this.x;
    let dy = player.position.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
  
    // Define a collision threshold (adjust as needed)
    const collisionThreshold = 20;
  
    // Check if the distance is within the collision threshold
    if (distance < collisionThreshold) {
      // Handle player's death
      player.die();
    }
  };
  