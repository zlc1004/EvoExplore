import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene
{
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameText: Phaser.GameObjects.Text;

    constructor ()
    {
        super('Game');
    }

    create ()
    {
        const { width, height } = this.scale;
        const centerX = width / 2;
        const centerY = height / 2;

        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x1a1a1a);

        // Create a simple background
        this.add.rectangle(0, 0, width, height, 0x1a1a1a).setOrigin(0, 0);

        this.gameText = this.add.text(centerX, centerY, 'EvoExplore Game Scene\n\nGame development in progress...', {
            fontFamily: 'Arial Black', fontSize: 32, color: '#00FF88',
            stroke: '#000000', strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const instructions = this.add.text(centerX, centerY + 100, 'This will be the Cell Arena (Phase 1)\nClick to return to Main Menu', {
            fontFamily: 'Arial', fontSize: 18, color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Click to return to main menu
        this.input.once('pointerdown', () => {
            this.changeScene();
        });

        // Handle window resize
        this.scale.on('resize', (gameSize: { width: number, height: number }) => {
            const newCenterX = gameSize.width / 2;
            const newCenterY = gameSize.height / 2;
            
            this.gameText.setPosition(newCenterX, newCenterY);
            instructions.setPosition(newCenterX, newCenterY + 100);
        });

        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
