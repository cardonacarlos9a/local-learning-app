// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

let db = false;

export const getDb = () => {
    if(!db){
      const firebaseConfig = {
        apiKey: "AIzaSyB5ZNyYyVOzgfCHagmkO4X06zsoaYCW7LE",
        authDomain: "react-1c922.firebaseapp.com",
        projectId: "react-1c922",
        storageBucket: "react-1c922.appspot.com",
        messagingSenderId: "883317735861",
        appId: "1:883317735861:web:4bc26a132719f049f999fc"
      };

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}

