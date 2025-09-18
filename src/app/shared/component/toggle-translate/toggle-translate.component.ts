import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'app-toggle-translate',
  templateUrl: './toggle-translate.component.html',
  styleUrls: ['./toggle-translate.component.scss']
})
export class ToggleTranslateComponent implements OnInit {
  currentLanguage = 'en';
  
  constructor(private translateService: TranslateConfigService) {}

  ngOnInit(): void {
    this.currentLanguage = this.translateService.getCurrentLanguage();
  }

  async toggleLanguage(): Promise<void> {
    this.currentLanguage = await this.translateService.toggleLanguage();
  }
}