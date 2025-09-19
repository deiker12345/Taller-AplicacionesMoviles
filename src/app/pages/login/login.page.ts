import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  credentials = {
    email: '',
    password: ''
  };

  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) { }

  async login(): Promise<void> {
    if (!this.credentials.email || !this.credentials.password) {
      this.toastService.show('Por favor, completa todos los campos', 'warning');
      return;
    }

    if (!this.isValidEmail(this.credentials.email)) {
      this.toastService.show('Por favor, ingresa un email válido', 'warning');
      return;
    }

    this.isLoading = true;

    try {
      await this.authService.login(this.credentials.email, this.credentials.password);
      this.toastService.show('Inicio de sesión exitoso', 'success');
    } catch (error: any) {
      console.error('Error en el inicio de sesión:', error);
      
      let errorMessage = 'Error en el inicio de sesión';
      
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No existe una cuenta con este correo electrónico';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Esta cuenta ha sido deshabilitada';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos fallidos. Inténtalo más tarde';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Error de conexión. Verifica tu internet';
          break;
        default:
          errorMessage = error.message || 'Error desconocido';
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
}