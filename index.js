
class DynamicConnector {
    constructor(options) {
      const defaults = {
        container: document.body,
        pointCount: 10,
        pointSize: 5,
        lineColor: 'red',
        maxDistance: 100,
        pointSpeed: 1
      };
      this.options = { ...defaults, ...options };
      this.points = [];
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.options.container.appendChild(this.canvas);
      this.init();
    }
  
    init() {
      this.canvas.width = this.options.container.clientWidth;
      this.canvas.height = this.options.container.clientHeight;
      for (let i = 0; i < this.options.pointCount; i++) {
        this.points.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          vx: (Math.random() - 0.5) * this.options.pointSpeed,
          vy: (Math.random() - 0.5) * this.options.pointSpeed
        });
      }
      this.animate();
    }
  
    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // დახაზვა წერტილებისა და ხაზების
      this.drawPoints();
      this.drawLines();
      requestAnimationFrame(() => this.animate());
    }
  
    drawPoints() {
      this.ctx.fillStyle = this.options.lineColor;
      this.points.forEach(point => {
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, this.options.pointSize, 0, Math.PI * 2);
        this.ctx.fill();
        // მოძრაობა
        point.x += point.vx;
        point.y += point.vy;
        // საზღვრები
        if (point.x < 0 || point.x > this.canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > this.canvas.height) point.vy *= -1;
      });
    }
  
    drawLines() {
      this.ctx.strokeStyle = this.options.lineColor;
      for (let i = 0; i < this.points.length; i++) {
        for (let j = i + 1; j < this.points.length; j++) {
          const dx = this.points[i].x - this.points[j].x;
          const dy = this.points[i].y - this.points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < this.options.maxDistance) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.points[i].x, this.points[i].y);
            this.ctx.lineTo(this.points[j].x, this.points[j].y);
            this.ctx.stroke();
          }
        }
      }
    }
  }

  export default DynamicConnector;