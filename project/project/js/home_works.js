// Валидатор почты Gmail
const gmailInput = document.querySelector('#gmail_input');
const gmailButton = document.querySelector('#gmail_button');
const gmailResult = document.querySelector('#gmail_result');

const regExp = /^[a-z0-9](\.?[a-z0-9]){4,29}@gmail\.com$/

gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.textContent = 'Success';
        gmailInput.style.borderColor = 'green';
    } else {
        gmailResult.textContent = 'Error';
        gmailInput.style.borderColor = 'red';
    }
}

// Красный квадрат

const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');

let posX = 0;
let posY = 0;

let direction = 'right'; 

function move() {
  const maxW = parentBlock.clientWidth - childBlock.clientWidth;
  const maxH = parentBlock.clientHeight - childBlock.clientHeight;

  if (direction === 'right') {
   posX++
    if (posX >= maxW) {
      posX = maxW;       
      direction = 'down'; 
    }
  } else if (direction === 'down') {
    posY++
    if (posY >= maxH) {
      posY = maxH;      
      direction = 'left';
    }
  } else if (direction === 'left') {
    posX--
    if (posX <= 0) {
      posX = 0;          
      direction = 'up';  
    }
    } else if (direction === 'up') {
    posY--
    if (posY <= 0) {
      posY = 0;          
      direction = 'right'; 
    }
  }

    childBlock.style.left = `${posX}px`;
    childBlock.style.top = `${posY}px`;

  requestAnimationFrame(move);
}

move();

//
const counterDisplay = document.querySelector('#seconds');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const resetBtn = document.querySelector('#reset');

let count = 0;
let timerId = null;

function increment() {
    count++
    counterDisplay.textContent = count;
}

startBtn.addEventListener('click', () => {
    if (timerId !== null) {
        return
    }

    timerId = setInterval(increment, 1000)
});

stopBtn.addEventListener('click', () => {
 
  clearInterval(timerId);

  timerId = null;
});


resetBtn.addEventListener('click', () => {
    clearInterval(timerId)
    timerId = null

    count = 0;

    counterDisplay.textContent = count
});

//characters

const charactersList = document.querySelector(".characters-list")

const getData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/characters.json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        if (xhr.status === 200) {
            const characters = JSON.parse(xhr.response);

        charactersList.innerHTML = '';

        characters.forEach ((character) => {
            const card = document.createElement('div');
            card.setAttribute('class', 'character-card');

            card.innerHTML = `
            <div class="character-image">
               <img src="${character.image}" alt="${character.name}">
            </div>
               <h3>${character.name}</h3>
               <p>age:${character.age}</p>`

            charactersList.append(card);
        })
        } else {
            console.error('Ошибка загрузки данных:', xhr.status);
        }
    }

    xhr.send()
}

getData();

//запрос на json файл any

const anyData = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/any.json');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        if (xhr.status === 200) {
            const any = JSON.parse(xhr.response);
            console.log(any);
        }
    }
    xhr.send()
}
anyData()
