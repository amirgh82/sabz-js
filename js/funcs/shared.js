import { getMe } from './auth.js'
import { isLogin } from './utils.js'

const showUserNameInNabar = () => {
  const isUserLogin = isLogin()
  const navbarProfileBox = document.querySelector('.main-header__profile')

  if (isUserLogin) {
    getMe().then(data => {
      navbarProfileBox.setAttribute('href', 'index.html')
      navbarProfileBox.innerHTML = `<span class="main-header__profile-text"
      >${data.name}</span`
    })
  } else {
    navbarProfileBox.setAttribute('href', 'login.html')
    navbarProfileBox.innerHTML = `<span class="main-header__profile-text"
    >ورود / ثبت نام </span`
  }
}

const renderTopbarMenus = async () => {
  const topBarList = document.querySelector('.top-bar__menu')

  let randomIndex = Math.floor(Math.random() * 10)

  const res = await fetch(`http://localhost:4000/v1/menus/topbar`)
    .then(res => res.json())
    .then(data => {
      data.slice(randomIndex, randomIndex + 5).map(topbar =>
        topBarList.insertAdjacentHTML(
          'beforeend',
          `<li class="top-bar__item">
        <a href="${topbar.href}" class="top-bar__link">${topbar.title}</a>
      </li>`
        )
      )
    })
}

export { showUserNameInNabar, renderTopbarMenus }
