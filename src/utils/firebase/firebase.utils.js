import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyADjc15yEhP8eenGoR7CdNLKYQbuLURDTE",
    authDomain: "crown-clothing-db-ba122.firebaseapp.com",
    projectId: "crown-clothing-db-ba122",
    storageBucket: "crown-clothing-db-ba122.appspot.com",
    messagingSenderId: "527755948795",
    appId: "1:527755948795:web:650adc82fcd7346827f65e"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot.exists())

    // check if user data exists
    // if it does not exist, create/setDoc in collection
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error){
            console.log('Error creating the user', error.message)
        }
    }

    return userDocRef;
}