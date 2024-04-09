/*
 * @Author: Hong.Zhang
 * @Date: 2024-04-03 17:16:51
 * @Description:
 */
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import * as serverAccount from './server-account.json';

export const initFirebase = () => {
  initializeApp({
    credential: cert({
      projectId: serverAccount.project_id,
      clientEmail: serverAccount.client_email,
      privateKey: serverAccount.private_key,
    }),
  });
  db = getFirestore();
};

export let db: Firestore;
