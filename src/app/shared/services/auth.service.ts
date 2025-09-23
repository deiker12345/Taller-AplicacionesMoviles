import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  async register(email: string, password: string, name: string): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);

      if (credential.user) {
        const uid = credential.user.uid;

        const newUser: User = {
          uid,
          email,
          name,
          createdAt: new Date()
        };

        await this.afs.collection('users').doc(uid).set(newUser);
        console.log('Usuario guardado en Firestore:', newUser);
      }
    } catch (error: any) {
      console.error('Error en register:', error);
      throw error; 
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Login exitoso');
      await this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error en login:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Sesión cerrada');
      await this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Error cerrando sesión:', error);
      throw error;
    }
  }
}
