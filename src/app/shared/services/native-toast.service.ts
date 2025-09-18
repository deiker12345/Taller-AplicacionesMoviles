import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NativeToastService {
  
  constructor(private toastController: ToastController) {}

  async show(
    message: string, 
    color: 'success' | 'warning' | 'danger' | 'primary' = 'primary',
    duration = 3000,
    position: 'top' | 'middle' | 'bottom' = 'bottom'
  ): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      color,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ],
      cssClass: 'custom-toast'
    });

    await toast.present();
  }

  async showSuccess(message: string): Promise<void> {
    await this.show(message, 'success');
  }

  async showError(message: string): Promise<void> {
    await this.show(message, 'danger');
  }

  async showWarning(message: string): Promise<void> {
    await this.show(message, 'warning');
  }
}