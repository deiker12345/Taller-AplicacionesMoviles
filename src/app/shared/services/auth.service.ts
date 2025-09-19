import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.initAuthState();
  }
  private initAuthState(): void {
    this.afAuth.authState.subscribe(async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await this.getUserData(firebaseUser.uid);
        this.userSubject.next(userData);
      } else {
        this.userSubject.next(null);
      }
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async register(email: string, password: string, userData: Partial<User>): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      if (credential.user) {
        await this.createUserDocument(credential.user.uid, {
          ...userData,
          email,
          uid: credential.user.uid,
          createdAt: new Date()
        });
      }
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  private async getUserData(uid: string): Promise<User | null> {
    try {
      const doc = await this.firestore.collection<User>('users').doc(uid).ref.get();
      return doc.exists ? (doc.data() as User) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  private async createUserDocument(uid: string, userData: Partial<User>): Promise<void> {
    try {
      await this.firestore.collection('users').doc(uid).set(userData, { merge: true });
    } catch (error) {
      console.error('Error creating user document:', error);
      throw error;
    }
  }
}
