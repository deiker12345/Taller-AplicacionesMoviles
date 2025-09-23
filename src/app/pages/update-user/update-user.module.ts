import { NgModule } from '@angular/core';
import { UpdateUserPageRoutingModule } from './update-user-routing.module';
import { UpdateUserPage } from './update-user.page';
import { SharedModule } from 'src/app/shared/shared-module';

@NgModule({
  imports: [
    UpdateUserPageRoutingModule,
    SharedModule
  ],
  declarations: [UpdateUserPage]
})
export class UpdateUserPageModule {}