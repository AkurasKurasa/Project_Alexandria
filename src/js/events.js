// navbar appearing, disappearing, and color change
const navBar = document.querySelector('nav')
let lastScroll = 0
window.addEventListener('scroll', () => {
    let curScroll = window.scrollY
    if (curScroll > lastScroll) {
        navBar.style.top = '-50px'
    } else { navBar.style.top = '0'}
    lastScroll = curScroll

    // if (curScroll > 300) {
    //     navBar.style.backgroundColor = "#5d1717"
    // } else {
    //     navBar.style.backgroundColor = 'rgb(93, 23, 23, 0.35)'
    // }

})

// sign up button in navbar
const signUpButton = document.querySelector("#signUpButton")
const signUpPop = document.querySelector('#signUpPop')

signUpButton.addEventListener('click', () => {
    
    signUpPop.style.display = 'flex'
    logInPop.style.display = 'none'

})

// log in button in navbar
const logInButton = document.querySelector('#logInButton')
const logInPop = document.querySelector('#logInPop')

logInButton.addEventListener('click', () => {

    logInPop.style.display = 'flex'
    signUpPop.style.display = 'none'

})

// close buttons for pop ups
const closeButton = document.querySelectorAll(".close_button")

closeButton.forEach(item => {item.addEventListener('click', () => {item.parentElement.style.display = 'none'})})

// const loggedInUI = document.querySelectorAll('.authentications_loggedOut')
// const loggedOutUI = document.querySelectorAll('.authentications_loggedIn')

// // logged in vs logged out authentication buttons
// export const setUI = (user) => {

//     if (user) {
//     loggedInUI.forEach(item => item.style.display = "none")
//     loggedOutUI.forEach(item => item.style.display = "block")
//     } else {
//     loggedInUI.forEach(item => item.style.display = "block")
//     loggedOutUI.forEach(item => item.style.display = "none")
//     }
// }