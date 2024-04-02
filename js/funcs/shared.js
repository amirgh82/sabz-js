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

const getAndShowAllCourses = async () => {
  const coursesContainer = document.querySelector('#courses-container')

  const res = await fetch(`http://localhost:4000/v1/courses`)
  const courses = await res.json()

  courses.slice(0, 6).map(course => {
    coursesContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="col-4">
  <div class="course-box">
    <a href="${course.shortName}">
      <img src="images/courses/fareelancer.png" alt="Course img" class="course-box__img" />
    </a>
    <div class="course-box__main">
      <a href="${course.shortName}" class="course-box__title">${course.name}</a>

      <div class="course-box__rating-teacher">
        <div class="course-box__teacher">
          <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
          <a href="#" class="course-box__teacher-link">${course.creator}</a>
        </div>
        <div class="course-box__rating">
        ${Array(5 - course.courseAverageScore)
          .fill(0)
          .map(
            score =>
              `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`
          )
          .join('')}
        ${Array(course.courseAverageScore)
          .fill(0)
          .map(
            score =>
              `<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`
          )
          .join('')}
        </div>
      </div>

      <div class="course-box__status">
        <div class="course-box__users">
          <i class="fas fa-users course-box__users-icon"></i>
          <span class="course-box__users-text">${course.registers}</span>
        </div>
        <span class="course-box__price">${
          course.price === 0 ? 'رایگان' : course.price.toLocaleString()
        }</span>
      </div>
    </div>

    <div class="course-box__footer">
      <a href="${course.shortName}" class="course-box__footer-link">
        مشاهده اطلاعات
        <i class="fas fa-arrow-left course-box__footer-icon"></i>
      </a>
    </div>

  </div>
  </div>`
    )
  })
}

const getPopularCourses = async () => {
  const popularCourseWrapper = document.querySelector('.swiper-wrapper')

  const res = await fetch(`http://localhost:4000/v1/courses/popular`)
  const popularCourses = await res.json()

  popularCourses.map(course => {
    popularCourseWrapper.insertAdjacentHTML(
      'beforeend',
      `<div class="swiper-slide">
    <div class="course-box">
      <a href="${course.shortName}">
        <img
          src="images/courses/fareelancer.png"
          alt="Course img"
          class="course-box__img"
        />
      </a>
      <div class="course-box__main">
        <a href="${course.shortName}" class="course-box__title"
          >${course.name}</a
        >

        <div class="course-box__rating-teacher">
          <div class="course-box__teacher">
            <i
              class="fas fa-chalkboard-teacher course-box__teacher-icon"
            ></i>
            <a href="#" class="course-box__teacher-link"
              >${course.creator}</a
            >
          </div>
          <div class="course-box__rating">
          ${Array(5 - course.courseAverageScore)
            .fill(0)
            .map(
              score =>
                `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`
            )
            .join('')}
          ${Array(course.courseAverageScore)
            .fill(0)
            .map(
              score =>
                `<img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`
            )
            .join('')}
          </div>
        </div>

        <div class="course-box__status">
          <div class="course-box__users">
            <i class="fas fa-users course-box__users-icon"></i>
            <span class="course-box__users-text">${course.registers}</span>
          </div>
          <span class="course-box__price">${
            !course.price ? 'رایگان' : course.price.toLocaleString()
          }</span>
        </div>
      </div>

      <div class="course-box__footer">
        <a href="#" class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>
    </div>
  </div>`
    )
  })
}

const getPresellCourses = async () => {
  const presellCoursesWrapper = document.querySelector('#swiper-wrapper')

  const res = await fetch(`http://localhost:4000/v1/courses/presell`)
  const presellCourses = await res.json()

  presellCourses.map(course => {
    presellCoursesWrapper.insertAdjacentHTML(
      'beforeend',
      `<div class="swiper-slide">
    <div class="course-box">
      <a href="${course.shortName}">
        <img
          src="images/courses/fareelancer.png"
          alt="Course img"
          class="course-box__img"
        />
      </a>
      <div class="course-box__main">
        <a href="${course.shortName}" class="course-box__title">${
        course.name
      }</a>
        <div class="course-box__rating-teacher">
          <div class="course-box__teacher">
            <i
              class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
            <a href="#" class="course-box__teacher-link">${course.creator}</a>
          </div>
          <div class="course-box__rating">
            <img
              src="images/svgs/star.svg"
              alt="rating"
              class="course-box__star"
            />
            <img
              src="images/svgs/star_fill.svg"
              alt="rating"
              class="course-box__star"
            />
            <img
              src="images/svgs/star_fill.svg"
              alt="rating"
              class="course-box__star"
            />
            <img
              src="images/svgs/star_fill.svg"
              alt="rating"
              class="course-box__star"
            />
            <img
              src="images/svgs/star_fill.svg"
              alt="rating"
              class="course-box__star"
            />
          </div>
        </div>

        <div class="course-box__status">
          <div class="course-box__users">
            <i class="fas fa-users course-box__users-icon"></i>
            <span class="course-box__users-text">${course.registers}</span>
          </div>
          <span class="course-box__price">${
            !course.price ? 'رایگان' : course.price.toLocaleString()
          }</span>
        </div>
      </div>

      <div class="course-box__footer">
        <a href="#" class="course-box__footer-link">
          مشاهده اطلاعات
          <i class="fas fa-arrow-left course-box__footer-icon"></i>
        </a>
      </div>
    </div>
  </div>`
    )
  })
}

const getAndShowAllArticles = async () => {
  const articlesWrapper = document.querySelector('#article-wrapper')

  const res = await fetch(`http://localhost:4000/v1/articles`)
  const allArticles = await res.json()

  allArticles.slice(0, 3).map(article => {
    articlesWrapper.insertAdjacentHTML(
      'beforeend',
      `<div class="col-4">
    <div class="article-card">
      <div class="article-card__header">
      <img src=http://localhost:4000/courses/covers/${article.cover} class="article-card__img" alt="تصاویر مقاله"/>
      </div>
      <div class="article-card__content">
        <a href="${article.shortName}" class="article-card__link">
          ${article.title}
        </a>
        <p class="article-card__text">
      ${article.description}
        </p>
        <a href="${article.shortName}" class="article-card__btn">بیشتر بخوانید</a>
      </div>
    </div>
  </div>`
    )
  })
}

const getAndShowAllMenus = async () => {
  const menusWrapper = document.querySelector('#menu-wrapper')

  const res = await fetch(`http://localhost:4000/v1/menus`)
  const allMenus = await res.json()

  allMenus.map(menu => {
    menusWrapper.insertAdjacentHTML(
      'beforeend',
      `<li class="main-header__item">
        <a href="${menu.href}" class="main-header__link">${menu.title}
        ${
          menu.submenus.length !== 0
            ? `<i class="fas fa-angle-down main-header__link-icon"></i>
          <ul class="main-header__dropdown">
          ${menu.submenus.map(
            submenu => `<li class="main-header__dropdown-item">
            <a href="${submenu.href}" class="main-header__dropdown-link">${submenu.title}</a>
          </li>`
          )}
            </ul>`
            : ''
        }

       </a>
      </li>`
    )
  })
}

export {
  showUserNameInNabar,
  renderTopbarMenus,
  getAndShowAllCourses,
  getPopularCourses,
  getPresellCourses,
  getAndShowAllArticles,
  getAndShowAllMenus
}
