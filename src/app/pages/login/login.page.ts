import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastNativeService } from 'src/app/shared/services/toast-native.service';
import { AppTranslateService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  credentials = { email: '', password: '' };
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastNativeService,
    private appTranslate: AppTranslateService
  ) {}

  async login(): Promise<void> {
    if (!this.credentials.email || !this.credentials.password) {
      this.toastService.show(this.appTranslate.instant('FIELDS_REQUIRED'), 'warning');
      return;
    }

    if (!this.isValidEmail(this.credentials.email)) {
      this.toastService.show(this.appTranslate.instant('INVALID_EMAIL'), 'warning');
      return;
    }

    this.isLoading = true;

    try {
      await this.authService.login(this.credentials.email, this.credentials.password);
      this.toastService.show(this.appTranslate.instant('LOGIN_SUCCESS'), 'success');
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);

      let errorMessage = this.appTranslate.instant('LOGIN_ERROR');

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = this.appTranslate.instant('USER_NOT_FOUND');
          break;
        case 'auth/wrong-password':
          errorMessage = this.appTranslate.instant('WRONG_PASSWORD');
          break;
        case 'auth/user-disabled':
          errorMessage = this.appTranslate.instant('USER_DISABLED');
          break;
        case 'auth/too-many-requests':
          errorMessage = this.appTranslate.instant('TOO_MANY_REQUESTS');
          break;
        case 'auth/network-request-failed':
          errorMessage = this.appTranslate.instant('NETWORK_ERROR');
          break;
        default:
          errorMessage = error.message || this.appTranslate.instant('UNKNOWN_ERROR');
      }

      this.toastService.show(errorMessage, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async changeLanguage(lang: string) {
    await this.appTranslate.changeLanguage(lang);
  }
}
