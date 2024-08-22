import { initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export type UserInfo = {
  displayName: string | null;
  email: string | null;
  uid: string;
};

export default class FirebaseAuth {
  private readonly auth: Auth;

  constructor() {
    try {
      initializeApp();
    } catch (e) {
      console.log(e);
    } finally {
      this.auth = getAuth();
    }
  }

  async signInAnonymously(): Promise<UserInfo> {
    const userInfo = await signInAnonymously(this.auth);
    return {
      displayName: userInfo.user.displayName,
      email: userInfo.user.email,
      uid: userInfo.user.uid,
    };
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<UserInfo> {
    const userInfo = await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
    return {
      displayName: userInfo.user.displayName,
      email: userInfo.user.email,
      uid: userInfo.user.uid,
    };
  }

  async signInWithCustomToken(token: string): Promise<UserInfo> {
    const userInfo = await signInWithCustomToken(this.auth, token);
    return {
      displayName: userInfo.user.displayName,
      email: userInfo.user.email,
      uid: userInfo.user.uid,
    };
  }
}
