import { ref, firebaseAuth } from '../config/constants'

export function auth (email, pw, admin) {
  return firebaseAuth().createUserWithEmailAndPassword(email, pw)
    .then((user)=>{saveUser(user,admin)})
}

export function logout () {
  return firebaseAuth().signOut()
}

export function login (email, pw) {
  return firebaseAuth().signInWithEmailAndPassword(email, pw)
}

export function resetPassword (email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}

export function saveUser (user,admin) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid,
        admin: admin
    })
    .then(() => user)
}