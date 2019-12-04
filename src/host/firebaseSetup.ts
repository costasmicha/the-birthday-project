import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import { history } from "./history"
const config = {
  apiKey: "AIzaSyAK-JgMLpzYkcayZXVkSiv6MMqMjweQXQY",
  authDomain: "bday-59dee.firebaseapp.com",
  databaseURL: "https://bday-59dee.firebaseio.com",
  projectId: "bday-59dee",
  storageBucket: "bday-59dee.appspot.com",
  messagingSenderId: "97098174516",
  appId: "1:97098174516:web:5ad5377529da8f77747a61",
}
export type AuthStateListenerNext = (a: firebase.User) => void
export type AuthStateListenerFallback = () => void
export class Frbs {
  auth: firebase.auth.Auth
  db: firebase.firestore.Firestore
  constructor() {
    firebase.initializeApp(config)
    this.auth = firebase.auth()
    this.db = firebase.firestore()

    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        //
        authUser
          .getIdToken()
          .then(token => {
            localStorage.setItem("accessToken", token)
            return true
          })
          .then(() => {
            // history.replace("/")
          })
      } else {
        localStorage.removeItem("accessToken")
        // history.replace("/auth")
      }
    })
  }
  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email: string, password: string) => {
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        history.replace("/")
        return null
      })
      .then(() => {
        this.doSendEmailVerification()
      })
  }
  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password).then(() => {
      history.replace("/")
    })
  doSignOut = () => this.auth.signOut()
  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email)
  doSendEmailVerification = () => {
    if (this.auth.currentUser) {
      this.auth.currentUser.sendEmailVerification()
    }
  }
  doPasswordUpdate = (password: string) => {
    if (this.auth.currentUser) {
      return this.auth.currentUser.updatePassword(password)
    } else {
      return Promise.resolve()
    }
  }
  doUpdateDisplayName = (displayName: string) => {
    if (this.auth.currentUser) {
      return this.auth.currentUser.updateProfile({
        displayName,
      })
    } else {
      return Promise.resolve()
    }
  }
  doUpdatePhotoUrl = (photoURL: string) => {
    if (this.auth.currentUser) {
      this.auth.currentUser.updateProfile({
        photoURL,
      })
    }
  }
  onAuthUserListener = (
    next: AuthStateListenerNext,
    fallback: AuthStateListenerFallback
  ) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        next(authUser)
      } else {
        fallback()
      }
    })
}
export const frbs = new Frbs()
