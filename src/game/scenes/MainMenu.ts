import { GameObjects, Scene } from 'phaser';

import { EventBus } from '../EventBus';

export class MainMenu extends Scene
{
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        const { width, height } = this.scale;
        const centerX = width / 2;
        const centerY = height / 2;

        // Create a simple background
        this.add.rectangle(0, 0, width, height, 0x000000).setOrigin(0, 0);

        // Only add logo if it exists
        if (this.textures.exists('logo')) {
            this.logo = this.add.image(centerX, centerY - 100, 'logo').setDepth(100);
        }

        this.title = this.add.text(centerX, centerY + 100, 'EvoExplore - Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#00FF88',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const subtitle = this.add.text(centerX, centerY + 160, 'Press anywhere to start', {
            fontFamily: 'Arial', fontSize: 24, color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);

        // Click anywhere to start game
        this.input.once('pointerdown', () => {
            this.scene.start('Game');
        });

        // Handle window resize
        this.scale.on('resize', (gameSize: { width: number, height: number }) => {
            const newCenterX = gameSize.width / 2;
            const newCenterY = gameSize.height / 2;
            
            if (this.logo) {
                this.logo.setPosition(newCenterX, newCenterY - 100);
            }
            this.title.setPosition(newCenterX, newCenterY + 100);
            subtitle.setPosition(newCenterX, newCenterY + 160);
        });

        EventBus.emit('current-scene-ready', this);
    }
    
    changeScene ()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start('Game');
    }

    moveLogo (reactCallback: ({ x, y }: { x: number, y: number }) => void)
    {
        if (this.logoTween)
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        } 
        else
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (reactCallback)
                    {
                        reactCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}
