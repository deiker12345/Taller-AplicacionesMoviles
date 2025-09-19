import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastNativeService } from 'src/app/shared/services/toast-native.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  userData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastNativeService,
    private translate: TranslateService
  ) {}

  async register(): Promise<void> {
    const { firstName, lastName, email, password } = this.userData;

    if (!firstName || !lastName || !email || !password) {
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

    this.isLoading = true;

    try {
      await this.authService.register(email, password, {
        displayName: `${firstName} ${lastName}`
      });

      this.toastService.show(this.translate.instant('REGISTER_SUCCESS'), 'success');
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Error en el registro:', error);

      let errorMessage = this.translate.instant('REGISTER_ERROR');

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = this.translate.instant('EMAIL_IN_USE');
          break;
        case 'auth/invalid-email':
          errorMessage = this.translate.instant('INVALID_EMAIL');
          break;
        case 'auth/operation-not-allowed':
          errorMessage = this.translate.instant('REGISTER_NOT_ALLOWED');
          break;
        case 'auth/weak-password':
          errorMessage = this.translate.instant('WEAK_PASSWORD');
          break;
        default:
          errorMessage = error.message || this.translate.instant('UNKNOWN_ERROR');
      }

      this.toastService.show(errorMessage, 'danger');
    } finally {
      this.isLoading = false;
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
