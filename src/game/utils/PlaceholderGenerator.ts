/**
 * Placeholder Asset Generator
 * Generates white PNG images with filename text overlaid
 */

export interface PlaceholderConfig {
  width: number;
  height: number;
  text: string;
  fontSize?: number;
  backgroundColor?: string;
  textColor?: string;
}

export class PlaceholderGenerator {
  /**
   * Generate a placeholder canvas for Phaser
   */
  static generateCanvas(config: PlaceholderConfig): HTMLCanvasElement {
    const {
      width,
      height,
      text,
      fontSize = 14,
      backgroundColor = '#FFFFFF',
      textColor = '#000000'
    } = config;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not get canvas context');
    }

    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);

    // Draw border
    ctx.strokeStyle = '#CCCCCC';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, width, height);

    // Draw text
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Word wrap for long text
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + ' ' + word;
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > width - 20) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    lines.push(currentLine);

    // Draw lines centered
    const lineHeight = fontSize + 4;
    const startY = (height - (lines.length * lineHeight)) / 2;
    
    lines.forEach((line, index) => {
      ctx.fillText(line, width / 2, startY + (index * lineHeight) + fontSize / 2);
    });

    return canvas;
  }

  /**
   * Generate placeholder texture for Phaser
   */
  static generateTexture(
    scene: Phaser.Scene,
    key: string,
    config: PlaceholderConfig
  ): void {
    const canvas = this.generateCanvas(config);
    scene.textures.addCanvas(key, canvas);
  }

  /**
   * Generate common placeholder assets for the game
   */
  static generateGameAssets(scene: Phaser.Scene): void {
    // Player core
    this.generateTexture(scene, 'player_core', {
      width: 60,
      height: 60,
      text: 'PLAYER_CORE'
    });

    // Petals by rarity
    this.generateTexture(scene, 'petal_common', {
      width: 40,
      height: 40,
      text: 'COMMON_PETAL'
    });

    this.generateTexture(scene, 'petal_rare', {
      width: 40,
      height: 40,
      text: 'RARE_PETAL',
      backgroundColor: '#0099FF'
    });

    this.generateTexture(scene, 'petal_ultra', {
      width: 40,
      height: 40,
      text: 'ULTRA_PETAL',
      backgroundColor: '#FF0000'
    });

    this.generateTexture(scene, 'petal_mythic', {
      width: 40,
      height: 40,
      text: 'MYTHIC_PETAL',
      backgroundColor: '#FFD700'
    });

    // Mobs
    this.generateTexture(scene, 'mob_cell', {
      width: 30,
      height: 30,
      text: 'CELL'
    });

    this.generateTexture(scene, 'mob_beetle', {
      width: 40,
      height: 40,
      text: 'BEETLE'
    });

    this.generateTexture(scene, 'mob_boss', {
      width: 80,
      height: 80,
      text: 'BOSS',
      backgroundColor: '#FF4444'
    });

    // UI Elements
    this.generateTexture(scene, 'button_normal', {
      width: 200,
      height: 50,
      text: 'BUTTON'
    });

    this.generateTexture(scene, 'ui_panel', {
      width: 400,
      height: 300,
      text: 'UI_PANEL',
      backgroundColor: '#1a1a1a',
      textColor: '#FFFFFF'
    });

    // Biome backgrounds
    const biomes = [
      'GRASSLAND', 'DESERT', 'OCEAN', 'JUNGLE', 
      'SAVANNA', 'MARINE', 'SEWERS', 'FACTORY',
      'SWAMP', 'ARCTIC', 'INDUSTRIAL'
    ];

    biomes.forEach(biome => {
      this.generateTexture(scene, `bg_${biome.toLowerCase()}`, {
        width: 800,
        height: 600,
        text: `${biome}_BIOME`,
        backgroundColor: '#EEEEEE'
      });
    });

    // Particles
    this.generateTexture(scene, 'particle_white', {
      width: 8,
      height: 8,
      text: '',
      backgroundColor: '#FFFFFF'
    });

    this.generateTexture(scene, 'particle_fire', {
      width: 8,
      height: 8,
      text: '',
      backgroundColor: '#FF4500'
    });

    this.generateTexture(scene, 'particle_ice', {
      width: 8,
      height: 8,
      text: '',
      backgroundColor: '#87CEEB'
    });

    // XP orb
    this.generateTexture(scene, 'xp_orb', {
      width: 16,
      height: 16,
      text: 'XP',
      fontSize: 8,
      backgroundColor: '#00FF00'
    });
  }
}
