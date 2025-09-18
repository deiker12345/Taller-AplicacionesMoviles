import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {
  private readonly LANGUAGE_KEY = 'app_language';
  private readonly SUPPORTED_LANGUAGES = ['en', 'es'];
  private readonly DEFAULT_LANGUAGE = 'en';

  constructor(private translate: TranslateService) {
    this.initTranslate();
  }

  private async initTranslate(): Promise<void> {
    // Set supported languages
    this.translate.addLangs(this.SUPPORTED_LANGUAGES);
    
    // Set default language
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    
    // Get saved language or detect device language
    const savedLanguage = await this.getSavedLanguage();
    const deviceLanguage = this.getDeviceLanguage();
    
    const languageToUse = savedLanguage || deviceLanguage || this.DEFAULT_LANGUAGE;
    
    await this.setLanguage(languageToUse);
  }

  async setLanguage(language: string): Promise<void> {
    const langToSet = this.SUPPORTED_LANGUAGES.includes(language) 
      ? language 
      : this.DEFAULT_LANGUAGE;
    
    this.translate.use(langToSet);
    await this.saveLanguage(langToSet);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.DEFAULT_LANGUAGE;
  }

  getSupportedLanguages(): string[] {
    return [...this.SUPPORTED_LANGUAGES];
  }

  async toggleLanguage(): Promise<string> {
    const currentLang = this.getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'es' : 'en';
    await this.setLanguage(newLang);
    return newLang;
  }

  private getDeviceLanguage(): string {
    const deviceLang = navigator.language.split('-')[0];
    return this.SUPPORTED_LANGUAGES.includes(deviceLang) 
      ? deviceLang 
      : this.DEFAULT_LANGUAGE;
  }

  private async getSavedLanguage(): Promise<string | null> {
    try {
      const { value } = await Preferences.get({ key: this.LANGUAGE_KEY });
      return value;
    } catch (error) {
      console.error('Error getting saved language:', error);
      return null;
    }
  }

  private async saveLanguage(language: string): Promise<void> {
    try {
      await Preferences.set({ 
        key: this.LANGUAGE_KEY, 
        value: language 
      });
    } catch (error) {
      console.error('Error saving language:', error);
    }
  }
}