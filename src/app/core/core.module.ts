import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { environment } from 'src/environments/environment';


import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastNativeService } from 'src/app/shared/services/toast-native.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UploaderService } from 'src/app/shared/services/uploader.service';
import { FilePickerService } from 'src/app/shared/services/file-picker.service';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
// }

@NgModule({
  imports: [
    CommonModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    TranslateModule.forRoot({
      // loader: {
      //   provide: TranslateLoader,
      //   useFactory: HttpLoaderFactory,
      //   deps: [HttpClient],
      // },
      defaultLanguage: 'en',
    }),
  ],
  providers: [
    AuthService,
    TranslateService,
    ToastNativeService,
    LoadingService,
    UploaderService,
    FilePickerService,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule should only be imported in AppModule.');
    }
  }
}
