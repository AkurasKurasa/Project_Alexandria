import { auth } from "./firebase.config.js"
import { setData, setUI } from "./functions.js"
import { db } from "./firebase.config.js"

export let CURRENT_USER

auth.onAuthStateChanged(user => {

    if (user) {

        CURRENT_USER = user

        db.collection('users').doc(CURRENT_USER.uid).collection('data').onSnapshot(() => {
        
        setUI(user)
        setData(user)

        })} else {

        setUI()
        setData(false)

    }

})

//signup

const signUpForm = document.querySelector('#signUpForm')
const signUpButton = document.querySelector('#signUp')
const signUpPop = document.querySelector('#signUpPop')

signUpButton.addEventListener('click', (e) => {
  
    e.preventDefault()

    const email = signUpForm['signUpEmail'].value
    const password = signUpForm['signUpPassword'].value

    auth.createUserWithEmailAndPassword(email, password)

    signUpForm.reset()
    signUpPop.style.display = 'none'
})

// log in

const logInForm = document.querySelector('#logInForm')
const logInButton = document.querySelector('#logIn')
const logInPop = document.querySelector('#logInPop')

logInButton.addEventListener('click', (e) => {

    e.preventDefault()

    const email = logInForm['logInEmail'].value
    const password = logInForm['logInPassword'].value

    auth.signInWithEmailAndPassword(email, password)

    logInForm.reset()
    logInPop.style.display = 'none'
})

//logout

const logOutButton = document.querySelector('#logOutButton')

logOutButton.addEventListener('click', (e) => {

    e.preventDefault()
    auth.signOut()

}) 