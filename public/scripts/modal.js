export function Modal() {

    const modalWrapper = document.querySelector('.modal__wrapper')
    const cancelButton = document.querySelector('[data-cancel]')

    cancelButton.addEventListener('click', close)

    function open(){
        modalWrapper.classList.add('modal__wrapper--active')
    }
    function close(){
        
        modalWrapper.classList.remove('modal__wrapper--active')
        
    }

    return {
        open,
        close
    }
}