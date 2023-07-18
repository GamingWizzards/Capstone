class Enemy {
    constructor(x, y, imageSrc) {
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
    }
  
    draw() {
      c.drawImage(this.image, this.x, this.y);
    }
  }
  