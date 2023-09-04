import { collection, getDocs, query, doc, getDoc, addDoc, where } from "firebase/firestore";
import { db } from '../../firebase';

// CREATE
export const createArticle = async(obj) => {
    const colRef = collection(db, 'articulos');
    const data = await addDoc(colRef, obj);
    return data.id;
}

// READ
export const getArticle = async ()  => {
    const colRef = collection(db, 'empresas');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

// READ WITH WHERE
// Tener en cuenta que el tipo de dato de la condición debe coincidir con el tipo de dato que hay en Firebase o no obtendré un dato de respuesta
export const getArticlesByCategory = async (IdTipo) => {
    const colRef = collection(db, 'articulos');
    const result = await getDocs(query(colRef, where('tipo', '==', IdTipo)));
    return getArrayFromCollection(result);
}

export const getArticleById = async (idArticulo) => {
    const colRef = collection(db, 'articulos');
    const result = await getDoc(doc(colRef, idArticulo));
    return result.data();
}

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}