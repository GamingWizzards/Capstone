// class Bot extends Sprite {
//     constructor({ x, y, width, height, message }) {
//       super({ x, y, width, height });
  
//       this.message = message;
//       this.isActive = true;
//     }
  
//     draw(c) {
//       // Implement the rendering of the bot, e.g., a speech bubble or character model
//     }
  
//     checkForPlayerInteraction(playerHitbox) {
//       if (this.isActive && playerHitbox.position.x <= this.position.x + this.width && playerHitbox.position.x + playerHitbox.width >= this.position.x &&
//         playerHitbox.position.y + playerHitbox.height >= this.position.y && playerHitbox.position.y <= this.position.y + this.height) {
//         return true;
//       }
//       return false;
//     }
//   }
// Define the Bot class
class Bot extends Sprite {
    constructor({ x, y, width, height, message }) {
      super({ x, y, width, height });
  
      this.message = message;
      this.isActive = true;
    }
  
    draw(c) {
      // Implement the rendering of the bot, e.g., a speech bubble or character model
      // For example, you can draw a simple speech bubble
      c.fillStyle = 'white';
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
      c.fillStyle = 'black';
      c.font = '16px Arial';
      c.fillText(this.message, this.position.x + 10, this.position.y + this.height / 2);
    }
  
    checkForPlayerInteraction(playerHitbox) {
      if (
        this.isActive &&
        playerHitbox.position.x <= this.position.x + this.width &&
        playerHitbox.position.x + playerHitbox.width >= this.position.x &&
        playerHitbox.position.y + playerHitbox.height >= this.position.y &&
        playerHitbox.position.y <= this.position.y + this.height
      ) {
        return true;
      }
      return false;
    }
  }