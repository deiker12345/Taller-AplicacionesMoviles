import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';

@Injectable()
export class AppTranslateService {
  supported = ['en', 'es', 'de'];

  constructor(private translate: TranslateService, private platform: Platform) {
    translate.addLangs(this.supported);
    translate.setDefaultLang('en');

    const deviceLang = this.getDeviceLang();
    if (deviceLang && this.supported.includes(deviceLang)) {
      translate.use(deviceLang);
    } else {
      translate.use('en');
    }
  }

  private getDeviceLang(): string | null {
    try {
      const navLang =
        (navigator && (navigator.languages && navigator.languages[0])) ||
        navigator.language ||
        (navigator as any).userLanguage;
      if (!navLang) return null;
      const code = navLang.split('-')[0];
      return code;
    } catch {
      return null;
    }
  }

  changeLanguage(lang: string) {
    if (!this.supported.includes(lang)) lang = 'en';
    this.translate.use(lang);
  }

  instant(key: string) {
    return this.translate.instant(key);
  }

  getCurrentLanguage() {
    return this.translate.currentLang || 'en';
  }

  async toggleLanguage(): Promise<string> {
    const newLang = this.getCurrentLanguage() === 'en' ? 'es' : 'en';
    this.changeLanguage(newLang);
    return newLang;
  }
}
