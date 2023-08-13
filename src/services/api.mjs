import { getDocs, collection, query, where, addDoc } from "firebase/firestore"; 
import { getDb } from "./db.mjs"

const collection_name = "products"

export const findAll = async () => {
    const doc_refs = await getDocs(collection(getDb(), collection_name))

    const res = []

    doc_refs.forEach(todo => {
        res.push({
            id: todo.id, 
            ...todo.data()
        })
    })

    return res
}

export const findSome = async () => {

    const collection_ref = collection(getDb(), collection_name)
    const q = query(collection_ref, where("name", "==", "martillo"))
    const doc_refs = await getDocs(q);

    const res = []

    doc_refs.forEach(country => {
        res.push({
            id: country.id, 
            ...country.data()
        })
    })

    return res
}

export const createProduct = args => {
    console.log("carlos")
    addDoc(collection(getDb(), collection_name), { name:"segueta", description:"Segueta marca Whal", price: 20000 })

}

