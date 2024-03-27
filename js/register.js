import { register } from './funcs/auth.js'

const registerBtn = document.querySelector('#register-btn')

console.log('register')

registerBtn.addEventListener('click', event => {
  event.preventDefault()
  console.log('click')

  register()
})
