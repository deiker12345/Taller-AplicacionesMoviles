import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastNativeService } from 'src/app/shared/services/toast-native.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { UploaderService } from 'src/app/shared/services/uploader.service';
import { FilePickerService } from 'src/app/shared/services/file-picker.service';
import { AppTranslateService } from 'src/app/shared/services/translate.service';

export function HttpLoaderFactory() {
  return new TranslateHttpLoader();
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [],
      },
      defaultLanguage: 'en',
    }),
  ],
  providers: [
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        basePath: 'assets/i18n/',  
        suffix: '.json'
      },
    },
    AuthService,
    TranslateService,
    ToastNativeService,
    LoadingService,
    UploaderService,
    FilePickerService,
    AppTranslateService,
  ],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
  private appTranslate: AppTranslateService
) {
  if (parentModule) {
    throw new Error('CoreModule should only be imported in AppModule.');
  }
  
  this.appTranslate.initLanguage();
}


}          