import { Component, OnInit } from '@angular/core';
import { FilePickerService, PickedFile } from 'src/app/shared/services/file-picker.service';
import { UploaderService } from 'src/app/shared/services/uploader.service';
import { QueryService } from 'src/app/shared/services/query.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastNativeService } from 'src/app/shared/services/toast-native.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  images: string[] = [];
  loading = false;
  userId!: string;

  constructor(
    private filePicker: FilePickerService,
    private uploader: UploaderService,
    private query: QueryService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastService: ToastNativeService,
    private translate: TranslateService
  ) {}

  async ngOnInit() {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        this.userId = user.uid;
        await this.loadImages();
      }
    });
  }

  async loadImages() {
    this.loading = true;
    this.images = await this.query.listUserImages(this.userId);
    this.loading = false;
  }

  async addImage() {
    const picked: PickedFile | null = await this.filePicker.pickFile();
    if (!picked || !this.userId) return;

    this.loading = true;
    const url = await this.uploader.uploadFile(picked, this.userId);

    if (url) {
      this.images.unshift(url); 
    }

    this.loading = false;
  }

  async logout() {
    try {
      await this.afAuth.signOut();
      this.toastService.show(this.translate.instant('LOGOUT_SUCCESS'), 'success');
      await this.router.navigate(['/login']);
      console.log('Sesión cerrada');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      this.toastService.show(this.translate.instant('LOGOUT_ERROR'), 'danger');
    }
  }

  async setAsWallpaper(imageUrl: string) {
    try {
      console.log('Intentando establecer como fondo:', imageUrl);
    } catch (error) {
      console.error('Error al establecer fondo', error);
    }
  }
}
