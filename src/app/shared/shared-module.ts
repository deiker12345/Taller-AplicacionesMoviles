import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LinkComponentComponent } from './component/link-component/link-component.component';
import { ButtonComponent } from './component/button/button.component';
import { ToggleTranslateComponent } from './component/toggle-translate/toggle-translate.component';


const MODULE = [ CommonModule,FormsModule,ReactiveFormsModule, IonicModule, TranslateModule]
const COMPONENTS = [LinkComponentComponent , ButtonComponent , ToggleTranslateComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULE],
  exports: [...MODULE , ...COMPONENTS]
})
export class SharedModule {}
