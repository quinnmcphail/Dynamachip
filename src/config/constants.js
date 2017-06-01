import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDhfWGbqTmcr9u8XyBML02SFeClkoo62VM",
    authDomain: "dynamachip.firebaseapp.com",
    databaseURL: "https://dynamachip.firebaseio.com",
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth