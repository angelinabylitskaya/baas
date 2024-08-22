import {
  collection as collectionRef,
  doc as docRef,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
  addDoc,
  setDoc,
  deleteDoc,
  deleteField,
  increment,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import {
  Auth,
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default class FirebaseFirestore {
  private readonly firestore: Firestore;
  private readonly auth: Auth;

  constructor() {
    try {
      initializeApp();
    } catch (e) {
      console.log(e);
    } finally {
      this.firestore = getFirestore();
      this.auth = getAuth();
    }
  }

  async getDocument<T>(collection: string, id: string): Promise<T> {
    const snapshot = await getDoc(
      docRef(this.firestore, `${collection}/${id}`)
    );
    return {
      id: snapshot.id,
      ...snapshot.data(),
    } as T;
  }

  async getDocuments<T>(collection: string): Promise<T[]> {
    const querySnapshot = await getDocs(
      collectionRef(this.firestore, collection)
    );
    const items: T[] = [];
    querySnapshot.forEach((doc) =>
      items.push({
        id: doc.id,
        ...doc.data(),
      } as T)
    );
    return items;
  }

  async createDocument<T>(collection: string, data: T): Promise<string> {
    const result = await addDoc(
      collectionRef(this.firestore, collection),
      data as Record<string, any>
    );
    return result.id;
  }

  async createDocumentById<T>(
    collection: string,
    data: T,
    id: string
  ): Promise<string> {
    await setDoc(
      docRef(this.firestore, `${collection}/${id}`),
      data as Record<string, any>
    );
    return id;
  }

  async updateDocumentById<T extends { [x: string]: any }>(
    collection: string,
    data: T,
    id: string
  ): Promise<string> {
    await updateDoc(docRef(this.firestore, `${collection}/${id}`), data);
    return id;
  }

  async deleteDocument<T>(collection: string, id: string): Promise<void> {
    await deleteDoc(docRef(this.firestore, `${collection}/${id}`));
  }

  async deleteField<T>(
    collection: string,
    id: string,
    field: string
  ): Promise<void> {
    await updateDoc(docRef(this.firestore, `${collection}/${id}`), {
      [field]: deleteField(),
    });
  }

  async increment<T>(
    collection: string,
    id: string,
    field: string,
    amount: number
  ): Promise<void> {
    await updateDoc(docRef(this.firestore, `${collection}/${id}`), {
      [field]: increment(amount),
    });
  }

  async setServerTimestamp<T>(
    collection: string,
    id: string,
    field: string
  ): Promise<void> {
    await updateDoc(docRef(this.firestore, `${collection}/${id}`), {
      [field]: serverTimestamp(),
    });
  }

  async pushToArrayField<T>(
    collection: string,
    id: string,
    field: string,
    value: string | number
  ): Promise<void> {
    await updateDoc(docRef(this.firestore, `${collection}/${id}`), {
      [field]: arrayUnion(value),
    });
  }

  async removeFromArrayField<T>(
    collection: string,
    id: string,
    field: string,
    value: string | number
  ): Promise<void> {
    await updateDoc(docRef(this.firestore, `${collection}/${id}`), {
      [field]: arrayRemove(value),
    });
  }
}
