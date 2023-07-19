class Enemy {
  constructor(x, y, imageSrc, message) {
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.onload = () => {
      console.log('Image loaded successfully:', imageSrc);
      this.draw();
    };
    this.image.onerror = (error) => {
      console.error('Error loading image:', imageSrc);
      console.error(error);
    };
    this.image.src = imageSrc;

    this.hasShownMessage = false;
    this.message = message || "Hey Amissa,\nthere has been some strange assurances around here.\nI was wondering if you could go check it out for me.\nI know its been a while\nbut im pretty sure you remember the ropes.";
  }

  update(player) {
    const dx = this.x - player.position.x;
    const dy = this.y - player.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If the player is close to the enemy
    if (distance < 100) {
      this.hasShownMessage = true;
    } else {
      this.hasShownMessage = false;
    }
  }

  draw() {
    c.drawImage(this.image, this.x, this.y);
    if (this.hasShownMessage) {
      this.drawText();
    }
  }

  drawText() {
    const lines = this.message.split('\n');
    const lineHeight = 15; // Height for each line, adjust as needed
    const totalHeight = lines.length * lineHeight;
    const startY = this.y - this.image.height / 2 - totalHeight / 2;
  
    c.save();
    c.fillStyle = 'white'; // White text
    c.font = '18px Arial';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.shadowColor = 'red'; // red shadow
    c.shadowOffsetX = 2; // Horizontal offset
    c.shadowOffsetY = 2; // Vertical offset
    c.shadowBlur = 2; // Blur amount
  
    for (let i = 0; i < lines.length; i++) {
      const y = startY + i * lineHeight;
      c.fillText(lines[i], this.x, y);
    }
  
    c.restore();
  }
  
  
}
