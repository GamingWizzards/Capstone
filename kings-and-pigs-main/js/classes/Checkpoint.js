class Checkpoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;  // Adjust size as needed
        this.height = 32; // Adjust size as needed
    }

    draw(ctx) {
        // Draw your checkpoint. This is just a placeholder.
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
