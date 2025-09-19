import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoadingService {
  private loader: HTMLIonLoadingElement | null = null;
  constructor(private loadingCtrl: LoadingController) {}

  async present(message = 'Loading...') {
    if (this.loader) return;
    this.loader = await this.loadingCtrl.create({ message });
    await this.loader.present();
  }

  async dismiss() {
    if (!this.loader) return;
    await this.loader.dismiss();
    this.loader = null;
  }
}
