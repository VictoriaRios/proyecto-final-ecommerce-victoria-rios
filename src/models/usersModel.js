import {db} from '../data/data.js';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, where, query } from 'firebase/firestore';

import bcrypt from 'bcrypt';

export async function findUserByDni(dni) {
    const userRef = collection(db, 'users');
    const q = query(userRef, where('dni', '==', dni));
    const snapshot = await getDocs(q);

    if(snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
}

export async function registerNewUser({dni, email, password}) {
    const userRef = collection(db, 'users');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        dni,
        email,
        password : hashedPassword,
    };
    
    const docRef = await addDoc(userRef, newUser);
    return { id: docRef.id, ...newUser };
}
