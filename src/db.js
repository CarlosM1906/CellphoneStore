// Conveniently import this file anywhere to use db

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

const fireBaseConfig = {
  apiKey: "AIzaSyAT-g4BLhqQODNncfF98wJ76UxjTy4-uKs",
  authDomain: "cellphone-store-93f17.firebaseapp.com",
  projectId: "cellphone-store-93f17",
  storageBucket: "cellphone-store-93f17.appspot.com",
  messagingSenderId: "994870783262",
  appId: "1:994870783262:web:5390d684d60b9e67ee6d0f"
}

const app = firebase.initializeApp(fireBaseConfig)

export const db = app.firestore()
export const storage = app.storage()




// Export types that exists in Firestore - Uncomment if you need them in your app
// const { Timestamp, GeoPoint } = firebase.firestore
// export { Timestamp, GeoPoint }
