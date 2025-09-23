import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastNativeService {
  constructor(private toast: ToastController) {}

  async show(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const t = await this.toast.create({
      message,
      duration: 2500,
      color
    });
    t.present();
  }
}
