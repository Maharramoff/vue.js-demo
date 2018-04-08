import firebase from 'firebase'

const firebaseConfig = {
    apiKey           : "AIzaSyAU86DDZcod-x37bueJuhIa0Kp9UJj_r_k",
    authDomain       : "gkeep-aze.firebaseapp.com",
    databaseURL      : "https://gkeep-aze.firebaseio.com",
    projectId        : "gkeep-aze",
    storageBucket    : "gkeep-aze.appspot.com",
    messagingSenderId: "946883729600"
};
// ...
const appConfig = {
    defaultLang: "az"
};

const fb = firebase.initializeApp(firebaseConfig);
const db  = fb.database();
export {
    firebaseConfig,
    appConfig,
    db,
    fb
}