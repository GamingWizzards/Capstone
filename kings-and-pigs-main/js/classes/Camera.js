class Camera {
    constructor(subject, viewport) {
      this.subject = subject;
      this.viewport = viewport;
      this.offset = { x: 0, y: 0 };
    }
  
    update() {
      this.offset.x = this.subject.position.x - this.viewport.width / 2;
      this.offset.y = this.subject.position.y - this.viewport.height / 2;
    }
  }
  
  window.Camera = Camera;
  