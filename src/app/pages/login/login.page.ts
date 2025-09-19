import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastNativeService } from 'src/app/shared/services/toast-native.service';
import { TranslateService } from '@ngx-translate/core';

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
    private translate: TranslateService
  ) {}

  async login(): Promise<void> {
    if (!this.credentials.email || !this.credentials.password) {
      this.toastService.show(this.translate.instant('FIELDS_REQUIRED'), 'warning');
      return;
    }

    if (!this.isValidEmail(this.credentials.email)) {
      this.toastService.show(this.translate.instant('INVALID_EMAIL'), 'warning');
      return;
    }

    this.isLoading = true;

    try {
      await this.authService.login(this.credentials.email, this.credentials.password);
      this.toastService.show(this.translate.instant('LOGIN_SUCCESS'), 'success');
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);

      let errorMessage = this.translate.instant('LOGIN_ERROR');

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = this.translate.instant('USER_NOT_FOUND');
          break;
        case 'auth/wrong-password':
          errorMessage = this.translate.instant('WRONG_PASSWORD');
          break;
        case 'auth/user-disabled':
          errorMessage = this.translate.instant('USER_DISABLED');
          break;
        case 'auth/too-many-requests':
          errorMessage = this.translate.instant('TOO_MANY_REQUESTS');
          break;
        case 'auth/network-request-failed':
          errorMessage = this.translate.instant('NETWORK_ERROR');
          break;
        default:
          errorMessage = error.message || this.translate.instant('UNKNOWN_ERROR');
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

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }
}
