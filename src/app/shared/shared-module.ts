import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { ToggleTranslateComponent } from 'src/app/shared/component/toggle-translate/toggle-translate.component';
import { ButtonComponent } from 'src/app/shared/component/button/button.component';

const COMPONENTS = [
  ToggleTranslateComponent,
  ButtonComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule
  ],
  declarations: [
    
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    
  ]
})
export class SharedModule {}
