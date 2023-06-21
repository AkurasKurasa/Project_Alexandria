import { auth } from "./firebase.config.js"
import { setUI } from "./events.js"
import { setData } from "./functions.js"
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

// temp func

// async function setData(user) {

//     const main = document.querySelector('#library')
    
//     let data = await db.collection('users').doc(user.uid).collection('data').get()
    
//     if (user) {
//         main.innerHTML = ""
//         data.forEach(x => {

//             const item = document.createElement('div')
//             item.classList.add('book')

//             const h1 = document.createElement('h1')
//             h1.innerText = x.data()['title']

//             if (x.data()['status'] == "null") {

//                 item.style.background = "lightgray"

//             } else if (x.data()['status'] == "Reading") {

//                 item.style.background = "lightgreen"

//             }

//             item.appendChild(h1)

//             const info = document.createElement('div')
//             info.classList.add('info')

//             const title = document.createElement('h6')
//             title.innerText = `Title: ${x.data()['title']}`
//             info.appendChild(title)

//             const author = document.createElement('h6')
//             author.innerText = `Author: ${x.data()['author']}`
//             info.appendChild(author)

//             const status = document.createElement('h6')
//             status.innerText = `Status: ${x.data()['status']}`
//             info.appendChild(status)

//             const pagesRead = document.createElement('h6')
//             pagesRead.innerText = `Pages Read: ${x.data()['read']}`
//             info.appendChild(pagesRead)

//             const pages = document.createElement('h6')
//             pages.innerText = `Pages: ${x.data()['pages']}`
//             info.appendChild(pages)

//             const rating = document.createElement('h6')
//             rating.innerText = `Rating: ${x.data()['rating']}`
//             info.appendChild(rating)

//             item.appendChild(info)

//             const button = document.createElement('div')
//             button.classList.add('button-wrapper')

//             const deleteButt = document.createElement('img')
//             deleteButt.classList.add('delete')

//             deleteButt.addEventListener('click', () => {

//                 db.collection('users').doc(CURRENT_USER.uid).collection('data').where('title', '==', x.data()['title'])
//                 .get().then(snapshot => {snapshot.forEach(doc => doc.ref.delete())})

//             })

//             button.appendChild(deleteButt)

//             const editButt = document.createElement('img')
//             editButt.classList.add('edit')
//             button.appendChild(editButt)

//             item.appendChild(button)

//             item.addEventListener('mouseover', () => {

//                 for (const child of item.children) {

//                     if (child.nodeName != "H1") {

//                         child.style.display = 'flex'

//                     }

//                 }

//             })

//             item.addEventListener('mouseout', () => {

//                 for (const child of item.children) {

//                     if (child.nodeName != "H1") {

//                         child.style.display = 'none'

//                     }

//                 }

//             })

//             main.appendChild(item)

//         })

//     } else {

//         main.innerHTML = ""

//     }

// }