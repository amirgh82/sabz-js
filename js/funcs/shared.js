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

  console.log(popularCourses)

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

export {
  showUserNameInNabar,
  renderTopbarMenus,
  getAndShowAllCourses,
  getPopularCourses
}
