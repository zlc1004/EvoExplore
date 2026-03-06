/**
 * Localization System
 */

type LocaleData = Record<string, string>;

class Localization {
  private currentLocale: string = 'en-us';
  private localeData: LocaleData = {};
  private loaded: boolean = false;

  async loadLocale(locale: string = 'en-us'): Promise<void> {
    try {
      const response = await fetch(`/assets/locales/${locale}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load locale: ${locale}`);
      }
      this.localeData = await response.json();
      this.currentLocale = locale;
      this.loaded = true;
    } catch (error) {
      console.error('Error loading locale:', error);
      // Fallback to en-us if other locale fails
      if (locale !== 'en-us') {
        await this.loadLocale('en-us');
      }
    }
  }

  getText(key: string, fallback?: string): string {
    if (!this.loaded) {
      console.warn('Localization not loaded yet');
      return fallback || key;
    }
    return this.localeData[key] || fallback || key;
  }

  t(key: string, fallback?: string): string {
    return this.getText(key, fallback);
  }

  // Get text with variable substitution
  format(key: string, variables: Record<string, string | number>): string {
    let text = this.getText(key);
    
    Object.keys(variables).forEach(varKey => {
      text = text.replace(`{${varKey}}`, String(variables[varKey]));
    });
    
    return text;
  }

  getCurrentLocale(): string {
    return this.currentLocale;
  }

  isLoaded(): boolean {
    return this.loaded;
  }
}

// Singleton instance
export const i18n = new Localization();

// Helper function for ease of use
export function t(key: string, fallback?: string): string {
  return i18n.getText(key, fallback);
}

export function tFormat(key: string, variables: Record<string, string | number>): string {
  return i18n.format(key, variables);
}

export default i18n;
