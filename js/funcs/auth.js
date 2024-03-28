import { showSwal, saveIntoLocalStorage } from './utils.js'

const register = event => {
  const nameInput = document.querySelector('#name')
  const userNameInput = document.querySelector('#username')
  const emailInput = document.querySelector('#email')
  const phoneInput = document.querySelector('#phone')
  const passwordInput = document.querySelector('#password')

  const newUserInfos = {
    name: nameInput.value.trim(),
    username: userNameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
    confrimPassword: passwordInput.value.trim()
  }

  fetch(`http://localhost:4000/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUserInfos)
  })
    .then(res => {
      if (res.status === 201) {
        showSwal(
          'ثبت نام با موفقیت انجام شد قارداش',
          'success',
          'بریم صفحه اصلی',
          result => {
            location.href = 'index.html'
          }
        )
      } else if (res.status === 409) {
        showSwal(
          'مشکل داره اطلاعاتت ، جیگر',
          'error',
          'بریم درستش کنیم',
          () => {}
        )
      }
      return res.json()
    })
    .then(result => {
      saveIntoLocalStorage('user', { token: result.accessToken })
    })
}

export { register }
