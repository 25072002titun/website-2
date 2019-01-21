const navigation = document.querySelector('.c-header__navigation')
const dropdowns = document.querySelectorAll('[data-dropdown]')
const dropdownsContent = document.querySelectorAll('[data-dropdown-content]')
const container = document.querySelector('.c-header__navigation-dropdown-list')
const bg = document.querySelector('.c-header__navigation-bg')
const burger = document.querySelector('.c-hamburger-js')
const range = document.querySelector('.range--js');
const slider = document.querySelector('.slider--js');
const SECONDS_PRICE = 5;
const SECONDS_MAX = 20000000;
const SECONDS_MIN = 270000;

if (slider) {
  slider.oninput = ({target}) =>  {
    const value = parseInt(target.value, 10);
    range.style.setProperty("width", (value - SECONDS_MIN) / (SECONDS_MAX - SECONDS_MIN) * 100 + "%");
  }
}

const offset = (element) => {
  const rect = element.getBoundingClientRect()
  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  }
}

dropdowns.forEach((item) => {
  item.addEventListener('mouseenter', (event) => {
    const target = document.querySelector(`[data-dropdown-content=${item.getAttribute('data-dropdown')}]`)
    try {
      document.querySelector('[data-dropdown-content].--active').classList.remove('--active')
    }
    catch (e) {}
    navigation.classList.add('--dropdown')
    if (target){
      target.classList.add('--active')
      const targetWidth = target.offsetWidth
      const targetHeight = target.offsetHeight
      const left = offset(item).left + (item.offsetWidth / 2) - (targetWidth / 2)
      Object.assign(bg.style, {width: targetWidth+'px', height: targetHeight+'px', 'transform':  `translate(${left}px)`})
      Object.assign(container.style, {width: targetWidth+'px', height: targetHeight+'px', 'transform':  `translate(${left}px)`})
    } else {
      navigation.classList.remove('--dropdown')
    }
  })
})

navigation.addEventListener('mouseleave', (event) => {
  try {
    navigation.classList.remove('--dropdown')
    document.querySelector('[data-dropdown-content].--active').classList.remove('--active')
  }
  catch (e) {}
})

burger.addEventListener("click", () => {
  burger.classList.toggle("-active");
  activeMenu.classList.toggle("-mobile_active");
})




;(function() {
  const select = document.querySelector('[data-feature-select]')
  const features = document.querySelectorAll('[data-feature-list-item]')
  const demos = {
    hosting: (config) => hostingDemo(config).end(),
    database: (config) => databaseDemo(config).end(),
    users: (config) => usersDemo(config).end(),
    events: (config) => eventsDemo(config).end(),
  }

  createDemo(demos.hosting)

  select.addEventListener('change', handleChange)
  features.forEach(item => item.addEventListener('click', handleClick))

  function createDemo(callback) {
    const terminal = document.querySelector('[data-terminal]')
    const demo = new GDemo('[data-terminal]')
    terminal.innerHTML = ''
    setupDemo(demo)
    callback(demo)
  }

  function handleChange(event) {
    const value = event.currentTarget.value
    const selectedFeatureListItem = document.querySelector(`[data-feature-list-item="${value}"]`)

    Array.from(features).forEach(item => {
      item.classList.remove('is-active')
    })

    try {
      createDemo(demos[value])
    } catch(err) {}

    selectedFeatureListItem.classList.add('is-active')
  }

  function handleClick(event) {
    const target = event.currentTarget
    const value = target.dataset['featureListItem']

    Array.from(target.parentElement.children).forEach(item => {
      item.classList.remove('is-active')
    })

    select.value = value
    target.classList.add('is-active')

    try {
      createDemo(demos[value])
    } catch(err) {}
  }
})()
