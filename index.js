let input = document.querySelector('#input')
let ul = document.querySelector('ul')
let activeBtn = document.querySelector('.active-btn')
let allBtn = document.querySelector('.all-btn')
let completedBtn = document.querySelector('.comlited-btn')
let clearcomplitedBtn = document.querySelector('.clear-complited')

let allData = JSON.parse(localStorage.getItem('todos')) || []
let value

// handleInput
function handleInput(e) {
  value = e.target.value
  if (value) {
    if (e.keyCode === 13) {
      let todo = {
        name: value,
        isDone: false,
      }
      allData.push(todo)
      e.target.value = ''

      createUi()
    }
  }
  localStorage.setItem('todos', JSON.stringify(allData))
}
let li = ''
// createUi
function createUi() {
  ul.innerHTML = ''
  allData.forEach((elm, index) => {
    let div = document.createElement('div')
    li = document.createElement('li')
    li.setAttribute('id', index)
    let input = document.createElement('input')
    input.classList.add('checkbox')
    input.setAttribute('type', 'checkBox')
    input.setAttribute('id', index)
    let p = document.createElement('p')
    p.innerText = elm.name
    let span = document.createElement('span')
    let icon = document.createElement('i')
    icon.setAttribute('id', index)
    icon.classList.add('fa-solid', 'fa-trash')
    span.append(icon)
    div.append(input, p)
    li.append(div, span)
    ul.append(li)
    input.addEventListener('click', handleCkecked)
    span.addEventListener('click', handleDelet)
  })
}
createUi()
// handleDelet

function handleDelet(e) {
  allData.splice(e.target.id, 1)
  localStorage.setItem('todos', JSON.stringify(allData))
  createUi()
}

// handleCkecked

function handleCkecked(e) {
  if (e.target.checked == true) {
    e.target.nextElementSibling.classList.add('addline')

    allData[e.target.id].isDone = e.target.checked
    localStorage.setItem('todos', JSON.stringify(allData))
  }
  if (e.target.checked == false) {
    e.target.nextElementSibling.classList.remove('addline')
    allData[e.target.id].isDone = e.target.checked
    localStorage.setItem('todos', JSON.stringify(allData))
  }
}

// completed

function completed(e) {
  allData = allData = JSON.parse(localStorage.getItem('todos'))
  let ccc = allData.filter((elm) => {
    return elm.isDone == true
  })
  allData = ccc
  createUi()
}

// all
function all(e) {
  allData = JSON.parse(localStorage.getItem('todos'))
  createUi()
}

// active
function active(e) {
  allData = JSON.parse(localStorage.getItem('todos'))
  let act = allData.filter((elm) => {
    return elm.isDone == false
  })
  allData = act
  createUi()
}

// clear-complete

function ccomplete(e) {
  allData = JSON.parse(localStorage.getItem('todos'))
  let comp = allData.filter((elm) => {
    return elm.isDone == true
  })
  let unChecked = allData.filter((elm) => {
    return !comp.includes(elm)
  })
  allData = unChecked
  createUi()
}

new Sortable(ul, {
  animation: 200,
})

clearcomplitedBtn.addEventListener('click', ccomplete)
activeBtn.addEventListener('click', active)
completedBtn.addEventListener('click', completed)
allBtn.addEventListener('click', all)
input.addEventListener('keyup', handleInput)
