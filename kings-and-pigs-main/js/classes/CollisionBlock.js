class CollisionBlock {
  constructor({ position, symbol, isLethal }) {
    this.position = position
    this.width = 64
    this.height = 64
    this.symbol=symbol;
    this.isLethal= isLethal;
  }

  draw() {
    c.fillStyle = 'rgba(255, 0, 0, 0.5)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
