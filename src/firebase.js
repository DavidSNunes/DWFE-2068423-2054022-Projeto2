import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Substitua pelos valores do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAAYL5d0unpuNoJeMCuq5Ar8w5whNWyByw",
  authDomain: "finalfinalfront.firebaseapp.com",
  projectId: "finalfinalfront",
  storageBucket: "finalfinalfront.appspot.com",
  messagingSenderId: "1093268062304",
  appId: "1:1093268062304:web:cdba478074958114344305"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Inicializar os serviços de autenticação e Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
