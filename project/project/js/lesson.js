const tabContentBlocks = document.querySelectorAll('.tab_content_block')
const tabs = document.querySelectorAll('.tab_content_item')
const tabsParent = document.querySelector('.tab_content_items')

let currentIndex = 0
let autoSwitchInterval

const hideTabContent = () => {
    tabContentBlocks.forEach((block) => {
        block.style.display = 'none'
    }) 
    tabs.forEach(tab => {
        tab.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (i = 0) => {
    tabContentBlocks[i].style.display = 'block'
    tabs[i].classList.add('tab_content_item_active')
    currentIndex = i 
}

const startAutoSwitch = () => {
    autoSwitchInterval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % tabs.length
        hideTabContent()
        showTabContent(nextIndex)
    }, 3000) 
}

const resetAutoSwitch = () => {
    clearInterval(autoSwitchInterval)
    startAutoSwitch()
}

hideTabContent()
showTabContent()
startAutoSwitch() 

tabsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabs.forEach((tab, tabIndex) => {
            if(tab.innerText === event.target.innerText) { 
                hideTabContent()
                showTabContent(tabIndex)
                resetAutoSwitch() 
            }        
        })
    }
}

// convertor 

const usdInput = document.querySelector('#usd')
const somInput = document.querySelector('#som')
const eurInput = document.querySelector('#eur')


const getCurrency = (element, targets) => {

    element.oninput = () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', '../data/convertor.json')
        xhr.setRequestHeader('Content-type', 'application/json')
        xhr.send()

        xhr.onload = () => {
            const data = JSON.parse(xhr.response)

            if (element.value === '') {
                targets.forEach(target => target.value = '')
                return
            }

            data.som = 1

            const valueInSom = element.id === 'som' ? element.value : element.value * data[element.id]

            targets.forEach(target => {
                target.value = (valueInSom / data[target.id]).toFixed(2)
            })
        }
    }
}
getCurrency(somInput, [usdInput, eurInput])
getCurrency(usdInput, [somInput, eurInput])
getCurrency(eurInput, [somInput, usdInput])


// card switcher 
 
const card = document.querySelector('.card')
const btnNext = document.querySelector('#btn-next')
const btnPrev = document.querySelector('#btn-prev')
let cardId = 1

const fetchCardData = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((response) => response.json())
        .then((data) => {
            const text = data.completed ? 'Completed' : 'In progress'
            const color = data.completed ? 'green' : 'red'

            card.innerHTML = `
            <p>${data.title}</p>
            <p style="color: ${color};">${text}</p>
            <span>${data.id}</span>
            `
    })
}
fetchCardData(cardId);

btnNext.onclick = () => {
    if (cardId === 200) {
        cardId = 1
    }else {
        cardId++
    }  
    fetchCardData(cardId)         
}

btnPrev.onclick = () => {
    if (cardId === 1) {
        cardId = 200
    }else {
        cardId--
    }  
    fetchCardData(cardId)         
}

// fetch запрос 
fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((data) => {
        console.log('Список постов:', data);
    });
