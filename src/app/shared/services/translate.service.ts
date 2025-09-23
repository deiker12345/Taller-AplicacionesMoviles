import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root' 
})
export class AppTranslateService {
  supported = ['en', 'es'];

  constructor(private translate: TranslateService, private platform: Platform) {}

  async initLanguage() {
    const saved = await Preferences.get({ key: 'app_language' });
    if (saved.value && this.supported.includes(saved.value)) {
      this.translate.use(saved.value);
    } else {
      const deviceLang = this.getDeviceLang();
      if (deviceLang && this.supported.includes(deviceLang)) {
        this.translate.use(deviceLang);
      } else {
        this.translate.use('en');
      }
    }
  }

  private getDeviceLang(): string | null {
    try {
      const navLang =
        (navigator && (navigator.languages && navigator.languages[0])) ||
        navigator.language ||
        (navigator as any).userLanguage;
      if (!navLang) return null;
      return navLang.split('-')[0];
    } catch {
      return null;
    }
  }

  async changeLanguage(lang: string) {
    if (!this.supported.includes(lang)) lang = 'en';
    this.translate.use(lang);
    await Preferences.set({ key: 'app_language', value: lang });
  }

  instant(key: string) {
    return this.translate.instant(key);
  }

  getCurrentLanguage() {
    return this.translate.currentLang || 'en';
  }

  async toggleLanguage(): Promise<string> {
    const newLang = this.getCurrentLanguage() === 'en' ? 'es' : 'en';
    await this.changeLanguage(newLang);
    return newLang;
  }
}
