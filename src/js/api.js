import { db } from './firebase.config.js'
import { CURRENT_USER } from './authentication.js'
let randomstring = require('randomstring')


// https://www.googleapis.com/books/v1/volumes?q=${eve.target.value}t&key=AIzaSyD_kkx-KG5rWVyayJbDISTX2fzILT6QtU8&maxResults=5


async function getData(value) {
    
    let response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}t&key=AIzaSyD_kkx-KG5rWVyayJbDISTX2fzILT6QtU8&maxResults=5`)
    let data = await response.json()
    let res = []

    for (let i = 0; i < data["items"].length; i++) {
        res.push({ "title" : data["items"][i]["volumeInfo"]["title"],
        "author" : data["items"][i]["volumeInfo"]["authors"][0],
        "pages": data["items"][i]["volumeInfo"]["pageCount"]}) }

    return res
}  

const searchBar = document.querySelector('#searchBar')
const resultWrapper = document.querySelector('.result_wrapper')

searchBar.addEventListener('keyup', (eve) => {

    if (eve.target.value == "") {

        resultWrapper.style.display = 'none'

    } else {

        resultWrapper.style.display = 'flex'

    }

    getData(eve.target.value).then(x => {

        resultWrapper.innerHTML = ""

        for (let i = 0; i < x.length; i++) {
            
            let item = document.createElement('li')

            item.classList.add('result')

            item.innerText = x[i]['title']

            item.addEventListener('click', () => {

                db.collection('users').doc(CURRENT_USER.uid).collection('data').add({

                    status: "no status",
                    title: x[i]['title'],
                    author: x[i]['author'],
                    pages: x[i]['pages'],
                    read: 0,
                    rating: 0,
                    id: randomstring.generate()

                })
                

            })

            resultWrapper.appendChild(item)

        }

    })   

})


const star1 = document.querySelector('#star1')
const star2 = document.querySelector('#star2')
const star3 = document.querySelector('#star3')
const star4 = document.querySelector('#star4')
const star5 = document.querySelector('#star5')

let rating = 0

star1.addEventListener('click', () => {

    star1.style.content = "url('./assets/icons/yellow_star.png')"
    star2.style.content = "url('./assets/icons/star.png')"
    star3.style.content = "url('./assets/icons/star.png')"
    star4.style.content = "url('./assets/icons/star.png')"
    star5.style.content = "url('./assets/icons/star.png')"

    rating = 1

})

star2.addEventListener('click', () => {

    star1.style.content = "url('./assets/icons/yellow_star.png')"
    star2.style.content = "url('./assets/icons/yellow_star.png')"
    star3.style.content = "url('./assets/icons/star.png')"
    star4.style.content = "url('./assets/icons/star.png')"
    star5.style.content = "url('./assets/icons/star.png')"

    rating = 2

})

star3.addEventListener('click', () => {

    star1.style.content = "url('./assets/icons/yellow_star.png')"
    star2.style.content = "url('./assets/icons/yellow_star.png')"
    star3.style.content = "url('./assets/icons/yellow_star.png')"
    star4.style.content = "url('./assets/icons/star.png')"
    star5.style.content = "url('./assets/icons/star.png')"

    rating = 3

})

star4.addEventListener('click', () => {

    star1.style.content = "url('./assets/icons/yellow_star.png')"
    star2.style.content = "url('./assets/icons/yellow_star.png')"
    star3.style.content = "url('./assets/icons/yellow_star.png')"
    star4.style.content = "url('./assets/icons/yellow_star.png')"
    star5.style.content = "url('./assets/icons/star.png')"

    rating = 4

})

star5.addEventListener('click', () => {

    star1.style.content = "url('./assets/icons/yellow_star.png')"
    star2.style.content = "url('./assets/icons/yellow_star.png')"
    star3.style.content = "url('./assets/icons/yellow_star.png')"
    star4.style.content = "url('./assets/icons/yellow_star.png')"
    star5.style.content = "url('./assets/icons/yellow_star.png')"

    rating = 5

})

const customInput = document.querySelector('#customInput')

customInput['customAdd'].addEventListener('click', (e) => {

    e.preventDefault()

    db.collection('users')
    .doc(CURRENT_USER.uid).collection('data')
    .add({

        title : customInput['customTitle'].value,
        author : customInput['customAuthor'].value,
        read : customInput['read'].value,
        pages : customInput['pages'].value,
        status : customInput['customStatus'].value,
        rating : `${rating}`,
        id: randomstring.generate()

    })

    customInput.reset()

    star1.style.content = "url('assets/icons/star.png')"
    star2.style.content = "url('assets/icons/star.png')"
    star3.style.content = "url('assets/icons/star.png')"
    star4.style.content = "url('assets/icons/star.png')"
    star5.style.content = "url('assets/icons/star.png')"

    rating = 0


})