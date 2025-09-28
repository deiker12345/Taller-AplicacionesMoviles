import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LinkComponentComponent } from './component/link-component/link-component.component';
import { ButtonComponent } from './component/button/button.component';
import { ToggleTranslateComponent } from './component/toggle-translate/toggle-translate.component';

const MODULES = [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, TranslateModule];
const COMPONENTS = [LinkComponentComponent, ButtonComponent, ToggleTranslateComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...MODULES, ...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class SharedModule {}
