import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);

    if (credential.user) {
      const uid = credential.user.uid;
      await this.afs.collection('users').doc(uid).set({
        uid,
        email,
        name,
        createdAt: new Date()
      });
    }
  }

  async login(email: string, password: string): Promise<void> {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    await this.router.navigate(['/home']);
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    await this.router.navigate(['/login']);
  }
}
