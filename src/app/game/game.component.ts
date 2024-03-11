import { Component, HostListener, OnInit   } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Enemy } from './enemy';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  pacmanPositionX: number = 0;
  pacmanPositionY: number = 0;
  pacmanSpeed: number = 10;
  gameAreaWidth: number = 450;
  gameAreaHeight: number = 450;
  score: number = 0;
  diamonds: any[] = [];

  comecocosArriba = '../../assets/come-cocos-arriba.png';
  comecocosAbajo = '../../assets/come-cocos-abajo.png';
  comecocosDerecha = '../../assets/come-cocos-der.png';
  comecocosIzquierda = '../../assets/come-cocos-izq.png';

  comecocosImagen = this.comecocosDerecha;

  enemies: Enemy[] = [
    new Enemy(20, 20, '../../assets/monster.png')
  ];
  gameInterval: any;
  gameOver: boolean = false;

  constructor() {
    this.generateDiamonds();
  }

  ngOnInit() {
    setInterval(() => {
      if (!this.gameOver) {
        this.enemies.push(new Enemy(20, 20, '../../assets/monster.png'));
      }
    }, 5000);
  
    setInterval(() => {
      if (!this.gameOver) {
        this.moveEnemies();
        this.checkCollisions();
      }
    }, 50);
  }

  startGame() {
    this.gameOver = false;
    this.gameInterval = setInterval(() => {
    }, 50);
  }

  stopGame() {
    this.gameOver = true;
    clearInterval(this.gameInterval);
  }

  checkCollisions() {
    for (const enemy of this.enemies) {
      if (
        this.pacmanPositionX < enemy.x + enemy.width &&
        this.pacmanPositionX + 20 > enemy.x &&
        this.pacmanPositionY < enemy.y + enemy.height &&
        this.pacmanPositionY + 20 > enemy.y
      ) {
        this.gameOver = true;
        setTimeout(() => {
          this.restartGame();
        }, 2000);
      }
    }
  }

  restartGame() {
    this.pacmanPositionX = 0;
    this.pacmanPositionY = 0;
    this.enemies = [];
    this.gameOver = false;
  }

  movePacman(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowUp':
        if (this.pacmanPositionY - this.pacmanSpeed >= 0) {
          this.comecocosImagen = this.comecocosArriba;
          this.pacmanPositionY -= this.pacmanSpeed;
        }
        break;
      case 'ArrowDown':
        if (this.pacmanPositionY + this.pacmanSpeed <= this.gameAreaHeight) {
          this.pacmanPositionY += this.pacmanSpeed;
          this.comecocosImagen = this.comecocosAbajo;
        }
        break;
      case 'ArrowLeft':
        if (this.pacmanPositionX - this.pacmanSpeed >= 0) {
          this.pacmanPositionX -= this.pacmanSpeed;
          this.comecocosImagen = this.comecocosIzquierda;
        }
        break;
      case 'ArrowRight':
        if (this.pacmanPositionX + this.pacmanSpeed <= this.gameAreaWidth) {
          this.pacmanPositionX += this.pacmanSpeed;
          this.comecocosImagen = this.comecocosDerecha;
        }
        break;
    }

    this.checkCollision();
  }

  generateDiamonds() {
    for (let i = 0; i < 5; i++) {
      let x = Math.floor(Math.random() * this.gameAreaWidth);
      let y = Math.floor(Math.random() * this.gameAreaHeight);
      this.diamonds.push({ x: x, y: y });
    }
  }

  checkVictory() {
    if (this.diamonds.length === 0) {
      setTimeout(() => {
        alert('¡Has ganado!');
        this.restartGame();
      }, 500);
    }
  }
  

  eatDiamond(index: number) {
    this.diamonds.splice(index, 1);
    this.checkVictory();
  }

  moveEnemies() {
    for (const enemy of this.enemies) {
      enemy.move();
    }
  }

  checkCollision() {
    let i = 0;
    while (i < this.diamonds.length) {
      if (
        this.pacmanPositionX < this.diamonds[i].x + 30 &&
        this.pacmanPositionX + 30 > this.diamonds[i].x &&
        this.pacmanPositionY < this.diamonds[i].y + 30 &&
        this.pacmanPositionY + 30 > this.diamonds[i].y
      ) {
        this.diamonds.splice(i, 1);
        this.score += 10;
        this.checkVictory();
      } else {
        i++;
      }
    }
  }
  
}
