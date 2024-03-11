export class Enemy {
    x: number;
    y: number;
    width: number;
    height: number;
    speed: number;
    directionX: number;
    directionY: number;
    imageSrc: string;
  
    constructor(width: number, height: number, imageSrc: string) {
      this.width = width;
      this.height = height;
      this.speed = 1;
      this.directionX = Math.random() < 0.5 ? -1 : 1;
      this.directionY = Math.random() < 0.5 ? -1 : 1;
      this.x = Math.floor(Math.random() * (500 - this.width));
      this.y = Math.floor(Math.random() * (500 - this.height));
      this.imageSrc = imageSrc;
    }
  
    move() {
        this.x += this.speed * this.directionX;
        this.y += this.speed * this.directionY;
        if (this.x <= 0 || this.x + this.width >= 500) {
          this.directionX *= -1;
        }
        if (this.y <= 0 || this.y + this.height >= 500) {
          this.directionY *= -1;
        }
      }
      
  }
  