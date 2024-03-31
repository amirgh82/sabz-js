import { showSwal, saveIntoLocalStorage, getToken } from './utils.js'

const register = () => {
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

const login = () => {
  const identifierInput = document.querySelector('#identifier')
  const passwordInput = document.querySelector('#password')

  const userInfo = {
    identifier: identifierInput.value.trim(),
    password: passwordInput.value.trim()
  }

  console.log(userInfo)

  fetch(`http://localhost:4000/v1/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo)
  })
    .then(res => {
      if (res.status === 401) {
        showSwal(
          'اطلاعات کاربر یافت نشد',
          'error',
          'بریم واسه درست کردن',
          () => {}
        )
      } else if (res.status === 200) {
        showSwal('وارد شدی قد عسل', 'success', 'بریم صفحه اصلی', () => {
          location.href = 'index.html'
        })
      }
      return res.json()
    })
    .then(result => {
      saveIntoLocalStorage('user', { token: result.accessToken })
    })
}

const getMe = async () => {
  const token = getToken()
  if (!token) {
    return false
  } else {
    const res = await fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()
    return data
  }
}

export { register, login, getMe }
