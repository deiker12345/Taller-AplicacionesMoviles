import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastNativeService } from 'src/app/shared/services/toast-native.service';
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  userData = {
    name: '',
    email: '',
    password: ''
  };

  isLoading = false; // 🔹 Para el botón y el spinner

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastNativeService,
    private translate: TranslateService,
    private loadingService: LoadingService
  ) {}

  async register(): Promise<void> {
    const { name, email, password } = this.userData;

    if (!name || !email || !password) {
      this.toastService.show(this.translate.instant('FIELDS_REQUIRED'), 'warning');
      return;
    }

    if (!this.isValidEmail(email)) {
      this.toastService.show(this.translate.instant('INVALID_EMAIL'), 'warning');
      return;
    }

    if (password.length < 6) {
      this.toastService.show(this.translate.instant('WEAK_PASSWORD'), 'warning');
      return;
    }

    this.isLoading = true; // 🔹 Activa el spinner
    await this.loadingService.show(this.translate.instant('REGISTERING'));

    try {
      await this.authService.register(email, password, name);
      this.toastService.show(this.translate.instant('REGISTER_SUCCESS'), 'success');
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Error en el registro:', error);
      this.toastService.show(error.message || this.translate.instant('REGISTER_ERROR'), 'danger');
    } finally {
      this.isLoading = false; // 🔹 Desactiva el spinner
      await this.loadingService.hide();
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}