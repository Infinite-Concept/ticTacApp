// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDBXMUoF66136vMhGfROErDsmMq6u1va50",
  authDomain: "tictac-game-c13f1.firebaseapp.com",
  projectId: "tictac-game-c13f1",
  storageBucket: "tictac-game-c13f1.appspot.com",
  messagingSenderId: "51069941907",
  appId: "1:51069941907:web:3ae05c67c53f80b246f566",
  measurementId: "G-HSZY9GQEL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

//IOS: 513074944576-4uuqr4crrvq2i6djhd392ft4o9c5bd8q.apps.googleusercontent.com

//Android : 513074944576-k1lf33gs35ggqfajn81888vpjud92fqg.apps.googleusercontent.com