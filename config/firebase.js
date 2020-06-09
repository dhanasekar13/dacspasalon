import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyDMH9xJj9-DgrwF9J8ux7bgNTIB5dSfSvA',
    authDomain: 'dachspasalon.firebaseapp.com',
    databaseURL: 'https://dachspasalon.firebaseio.com',
    projectId: 'dachspasalon',
    storageBucket: 'dachspasalon.appspot.com',
    messagingSenderId: '423873860901',
    appId: '1:423873860901:web:62c829d7e41d649273f6cc',
    measurementId: "G-HJ8F780QB4"
}

const Firebase = firebase.initializeApp(firebaseConfig)

export default Firebase