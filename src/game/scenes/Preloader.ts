import { Scene } from 'phaser';
import { PlaceholderGenerator } from '../utils/PlaceholderGenerator';
import i18n from '@/lib/localization';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        const { width, height } = this.scale;
        const centerX = width / 2;
        const centerY = height / 2;

        //  We loaded this image in our Boot Scene, so we can display it here
        // Only show background if it exists
        if (this.textures.exists('background')) {
            this.add.image(centerX, centerY, 'background');
        }

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(centerX, centerY, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(centerX - 230, centerY, 4, 28, 0xffffff);

        //  Loading text
        const loadingText = this.add.text(centerX, centerY - 50, i18n.getText('text.loading', 'Loading...'), {
            fontFamily: 'Arial',
            fontSize: '20px',
            color: '#ffffff'
        }).setOrigin(0.5);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress: number) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);
        });
    }

    preload ()
    {
        //  Load localization first
        this.load.json('locale_en_us', 'assets/locales/en-us.json');

        //  Load any real assets here in the future
        //  For now, we'll generate placeholder assets in create()
        
        // Example: this.load.image('player_core', 'assets/images/player_core.png');
    }

    create ()
    {
        //  Load localization data
        const localeData = this.cache.json.get('locale_en_us');
        if (localeData) {
            // Store in game registry for access across scenes
            this.registry.set('locale_data', localeData);
        }

        //  Generate placeholder assets
        PlaceholderGenerator.generateGameAssets(this);

        //  Move to the MainMenu
        this.scene.start('MainMenu');
    }
}
