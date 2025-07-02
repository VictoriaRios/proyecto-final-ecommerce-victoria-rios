import {db} from '../data/data.js';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const productsInformation = collection(db, 'products');

// GET ALL PRODUCTS
export async function getAllProducts(){
    const querySnapshot = await getDocs(productsInformation);
    const products = [];
    querySnapshot.forEach((doc) =>{
        products.push({id: doc.id, ...doc.data()});
    });
    return products;
}

// GET PRODUCT BY ID
export async function getProductById(id) {
    const ref = doc(db, 'sneakers', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;

    return { id: snap.id, ...snap.data() };
}

// POST PRODUCT
export async function createProduct(product) {
    const docRef = await addDoc(productsInformation, product);
    return { id: docRef.id, ...product };
};

// PATCH PRODUCT
export async function patchProductById(id, updates) {
    const ref = doc(productsInformation, id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;

    await updateDoc(ref, updates);
    return { id, ...updates };
}

// UPDATE PRODUCT
export async function updateProduct(id, product) {
    const productRef = doc(productsInformation, id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
        return null;
    }

    await updateDoc(productRef, product);
    return { id, ...product };
}

export async function deleteProductById(id) {
    const ref = doc(db, 'sneakers', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;

    await deleteDoc(ref);
    return { id };
}
