//MODAL 

const modal = document.querySelector('.modal')
const modalOpenBtn = document.querySelector('#btn-get')
const modalCloseBtn = document.querySelector('.modal_close')

const openModal = () => {
    modal.style.display = 'block'
    document.body.style.overflow ='hidden'
}

const closeModal = () => {
    modal.style.display = 'none'
    document.body.style.overflow =''
}

modalOpenBtn.onclick = () => openModal()
modalCloseBtn.onclick = () => closeModal()
modal.onclick = (event) => {
    if (event.target.classList.contains('modal')) {
        closeModal() 
    }
}

setTimeout (openModal, 10000)

const scrollHandler = () => {
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 1) {
        openModal()

        window.removeEventListener('scroll', scrollHandler)
    }
}

window.addEventListener('scroll', scrollHandler)