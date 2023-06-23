import { db } from "./firebase.config.js"
import { CURRENT_USER } from "./authentication.js"

const loggedInUI = document.querySelectorAll('.authentications_loggedOut')
const loggedOutUI = document.querySelectorAll('.authentications_loggedIn')

export const setUI = (user) => {

    if (user) {
    loggedInUI.forEach(item => item.style.display = "none")
    loggedOutUI.forEach(item => item.style.display = "block")
    } else {
    loggedInUI.forEach(item => item.style.display = "block")
    loggedOutUI.forEach(item => item.style.display = "none")
    }
}

export async function setData(user) {

    const library = document.querySelector('#library')
    
    let userData = await db.collection('users').doc(user.uid).collection('data').get()
    
    if (user) {
        library.textContent = ""
        
        userData.forEach(data => {

            // create, color books, and events
            const item = __createBook(data)
            __identifyBookColor(data, item)
            __bookEvents(item)

            //create book title
            const bookTitle = __createBookTitle(data)
            item.appendChild(bookTitle)

            //create information section
            const informationSection = __createInformationSection(data)
            item.appendChild(informationSection)

            //create button wrapper
            const buttonWrapper = __createButtonWrapper(data)
            item.appendChild(buttonWrapper)



            library.appendChild(item)

    })  } else {

        library.textContent = ""

    }

}

// helpers

function __createBook(data) {

    let item = document.createElement('div')
    item.classList.add('book')

    return item

}

function __identifyBookColor(data, item) {

    switch (data.data()['status']) {
        case "Reading":
            item.style.background = '#9E7BB3'
            break;
        case "Completed":
            item.style.background = '#486856'
            break;
        case "Paused":
            item.style.background = '#D16002'
            break;
        case "Dropped":
            item.style.background = '#A24857'
            break;
        case "Planning":
            item.style.background = '#4E5180'
            break;
        default:
            item.style.background = "lightgray"
            break;
    }

}

function __bookEvents(item) {

    item.addEventListener('mouseover', () => {

        for (const child of item.children) { if (child.nodeName != "H1") { child.style.display = 'flex' } } 

    })

    item.addEventListener( 'mouseout', () => { 
        for ( const child of item.children ) { 
            if (child.nodeName != "H1") { 
                child.style.display = 'none'}
            }
        })
}

function __createBookTitle(data) {

    const h1 = document.createElement('h1')
    h1.innerText = data.data()['title']

    return h1

}

function __createInformationSection(data) {

    const infoSection = document.createElement('div')
    infoSection.classList.add('info')

    const h6_author = document.createElement('h6')
    h6_author.innerText = data.data()['author']
    infoSection.appendChild(h6_author)

    const h6_status = document.createElement('h6')
    h6_status.innerText = data.data()['status']
    infoSection.appendChild(h6_status)

    const h6_pages = document.createElement('h6')
    h6_pages.innerText = `${data.data()['read']} / ${data.data()['pages']} pages`
    infoSection.appendChild(h6_pages)

    const h6_rating = document.createElement('h6')
    h6_rating.innerText = `${data.data()['rating']} stars`
    infoSection.appendChild(h6_rating)

    return infoSection
}

function __createButtonWrapper(data) {

    const buttonWrapper = document.createElement('div')
    buttonWrapper.classList.add('button-wrapper')

    const deleteButton = __createDeleteButton(data)
    buttonWrapper.appendChild(deleteButton)

    const editButton = __createEditButton(data)
    buttonWrapper.appendChild(editButton)

    return buttonWrapper

}

function __createDeleteButton(data) {

    const deleteButton = document.createElement('img')
    deleteButton.classList.add('delete')

    deleteButton.addEventListener('click', () => {

        db.collection('users')
        .doc(CURRENT_USER.uid).collection('data')
        .where('id', '==', data.data()['id'])
        .get()
        .then(snapshot => {snapshot.forEach(doc => doc.ref.delete())})

    })

    return deleteButton;

}

const updateInput = document.querySelector('#updateInput')

function __createEditButton(data) {

    const editButton = document.createElement('img')
    editButton.classList.add('edit')

    editButton.addEventListener('click', () => {

        updateInput.style.display = 'flex'

        __editButtonEvents()

        updateInput['bookTitle'].value = data.data()['title']
        updateInput['bookAuthor'].value = data.data()['author']
        updateInput['pagesRead'].value = data.data()['read']
        updateInput['pages'].value = data.data()['pages']
        updateInput['bookStatus'].value = data.data()['status']

        updateInput['updateButton'].addEventListener('click', (e) => {
            e.preventDefault()
            db.collection('users')
            .doc(CURRENT_USER.uid).collection('data')
            .where('title', '==', data.data()['title'])
            .get()
            .then(snapshot => {snapshot.forEach(doc => doc.ref.update({

            title : updateInput['bookTitle'].value,
            author : updateInput['bookAuthor'].value,
            read : updateInput['pagesRead'].value,
            pages : updateInput['pages'].value,
            status : updateInput['bookStatus'].value,
            rating: __ratingUpdate


            }))})
            
            updateInput.style.display = 'none'

        })
    })

    return editButton
}

let __ratingUpdate = 0

function __editButtonEvents() {

    const star1Update = document.querySelector('#star1Update')
    const star2Update = document.querySelector('#star2Update')
    const star3Update = document.querySelector('#star3Update')
    const star4Update = document.querySelector('#star4Update')
    const star5Update = document.querySelector('#star5Update')

    star1Update.addEventListener('click', () => {

        star1Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star2Update.style.content = "url('../../assets/icons/star.png')"
        star3Update.style.content = "url('../../assets/icons/star.png')"
        star4Update.style.content = "url('../../assets/icons/star.png')"
        star5Update.style.content = "url('../../assets/icons/star.png')"

        __ratingUpdate = 1

    })

    star2Update.addEventListener('click', () => {

        star1Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star2Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star3Update.style.content = "url('../../assets/icons/star.png')"
        star4Update.style.content = "url('../../assets/icons/star.png')"
        star5Update.style.content = "url('../../assets/icons/star.png')"

        __ratingUpdate = 2

    })

    star3Update.addEventListener('click', () => {

        star1Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star2Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star3Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star4Update.style.content = "url('../../assets/icons/star.png')"
        star5Update.style.content = "url('../../assets/icons/star.png')"

        __ratingUpdate = 3

    })

    star4Update.addEventListener('click', () => {

        star1Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star2Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star3Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star4Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star5Update.style.content = "url('../../assets/icons/star.png')"

        __ratingUpdate = 4

    })

    star5Update.addEventListener('click', () => {

        star1Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star2Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star3Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star4Update.style.content = "url('../../assets/icons/yellow_star.png')"
        star5Update.style.content = "url('../../assets/icons/yellow_star.png')"

        __ratingUpdate = 5

    })

}
