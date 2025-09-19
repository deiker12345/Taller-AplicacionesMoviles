import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  getUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.initAuthState();
  }

  private initAuthState(): void {
    this.afAuth.authState.subscribe(async (user) => {
      if (user) {
        const userData = await this.getUserData(user.uid);
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
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(map(user => !!user));
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  private async getUserData(uid: string): Promise<User | null> {
    try {
      const doc = await this.firestore.collection('users').doc(uid).get().toPromise();
      return doc?.exists ? (doc.data() as User) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  private async createUserDocument(uid: string, userData: Partial<User>): Promise<void> {
    return this.firestore.collection('users').doc(uid).set(userData);
  }
}