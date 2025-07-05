import {db} from '../data/data.js';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, where, query } from 'firebase/firestore';

const productsInformation = collection(db, 'sneakers');

// GET ALL PRODUCTS 
export async function getAllProducts(){
    const querySnapshot = await getDocs(productsInformation);
    const products = [];
    querySnapshot.forEach((doc) =>{
        products.push({id: doc.id, ...doc.data()});
    });
    return products;
}

//GET PRODUCT BY BRAND
export const getProductByBRAND = async (brand) => {
    const snapshot = await getDocs(collection(db, 'sneakers'));

    return snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(product =>
        product.brand.toLowerCase().includes(brand.toLowerCase())
    );
};

// GET PRODUCT BY ID 
export async function getProductById(id) {

    const docRef = doc(db, 'sneakers', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()){
        return null;
    }

    return { id: docSnap.id, ...docSnap.data() };
}

// POST PRODUCT 
export async function createProduct(newProduct) {
    const docRef = await addDoc(collection(db, 'sneakers'), newProduct);
    return { id: docRef.id, ...newProduct };
}

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

// DELETE PRODUCT 
export async function deleteProductById(id) {
    const docRef = doc(db, 'sneakers', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;

    await deleteDoc(docRef);
    return { id };
}
