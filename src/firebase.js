import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Substitua pelos valores do seu projeto Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAar_y83cuaqVTGiEyrNt-yAl0ZLGfzNC0",
    authDomain: "frontendproject2.firebaseapp.com",
    projectId: "frontendproject2",
    storageBucket: "frontendproject2.appspot.com",
    messagingSenderId: "394653908767",
    appId: "1:394653908767:web:d84d6217eaa9cf0204ba2a"
  };

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar os serviços de autenticação e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
