import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText : Phaser.GameObjects.Text;

    constructor ()
    {
        super('GameOver');
    }

    create ()
    {
        const { width, height } = this.scale;
        const centerX = width / 2;
        const centerY = height / 2;

        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0x000000);

        this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0, 0);

        this.gameOverText = this.add.text(centerX, centerY, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#FF0000',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const subtitle = this.add.text(centerX, centerY + 100, 'Click to return to Main Menu', {
            fontFamily: 'Arial', fontSize: 24, color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.changeScene();
        });

        // Handle window resize
        this.scale.on('resize', (gameSize: { width: number, height: number }) => {
            const newCenterX = gameSize.width / 2;
            const newCenterY = gameSize.height / 2;
            
            this.gameOverText.setPosition(newCenterX, newCenterY);
            subtitle.setPosition(newCenterX, newCenterY + 100);
        });
        
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('MainMenu');
    }
}
