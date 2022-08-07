// Setup prime elements
const mainContainer = document.querySelector('.max-slider')
let sliderContainer = document.querySelector('.max-slider__images-container')
let myImages = document.querySelectorAll('.max-slider__image')
const dotsContainer = document.querySelector('.max-slider__dots-container')
const leftButton = document.querySelector('.max-slider__arrow-left')
const rightButton = document.querySelector('.max-slider__arrow-right')

let sliderLength = myImages.length
let containerWidth

let dragSensitivity = .2
let timer = 3000
// autoPlay(leftMove)

// Removing certain elements from the interface
// dotsContainer.style.display = 'none'
// leftButton.style.display = 'none'
// rightButton.style.display = 'none'

// Generate dots
myImages.forEach(elem => {
  let dot = document.createElement('div')
  dot.classList.add('max-slider__dot')
  dot.dataset.dot = elem.dataset.item
  if (elem.classList.contains('max-slider__image--active')) {
    dot.classList.add('max-slider__dot--active')
  }
  dotsContainer.appendChild(dot)
})

// Generate Slider
const sliderAppearing = () => {
  containerWidth = mainContainer.offsetWidth
  let checkIndex
  let myNewImages = document.querySelectorAll('.max-slider__image')

  myNewImages.forEach((elem) => elem.style.setProperty('width', `${containerWidth}px`))
  document.querySelectorAll('.max-slider__dot').forEach((elem, index) => {
    if (elem.classList.contains('max-slider__dot--active')) {
      checkIndex = index
    }
  })

  properWidth = containerWidth * (sliderLength + 4) // plus 4 clones
  sliderContainer.classList.remove('max-slider__images-container--transition')
  sliderContainer.style.setProperty('width', `${properWidth}px`)
  sliderContainer.style.setProperty('left', `${-containerWidth * (checkIndex + 2)}px`) // move 2 clones to the left
}
sliderAppearing()

// Watch resizing
window.addEventListener('resize', sliderAppearing)

// Creating clones for infinity
function kamino() {
  const firstSlide = myImages[0]
  const afterfirstSlide = myImages[1]
  const lastSlide = myImages[sliderLength - 1]
  const beforelastSlide = myImages[sliderLength - 2]

  const firstSlideClone = firstSlide.cloneNode(true)
  const secondSlideClone = afterfirstSlide.cloneNode(true)
  const lastSlideClone = lastSlide.cloneNode(true)
  const preLastSlideClone = beforelastSlide.cloneNode(true)

  firstSlideClone.classList.add('clone')
  secondSlideClone.classList.add('clone')
  lastSlideClone.classList.add('clone')
  preLastSlideClone.classList.add('clone')
  
  sliderContainer.appendChild(secondSlideClone)
  sliderContainer.insertBefore(firstSlideClone, secondSlideClone)
  sliderContainer.insertBefore(lastSlideClone, firstSlide)
  sliderContainer.insertBefore(preLastSlideClone, lastSlideClone)
}
kamino()

// Adding active classes
function addActive() {

  myImages.forEach((elem, index) => {
    sliderContainer.style.left === `${-containerWidth * (index + 2)}px`
      ?
      elem.classList.add('max-slider__image--active')
      :
      elem.classList.remove('max-slider__image--active')
  })

  dotsContainer.querySelectorAll('.max-slider__dot').forEach(elem => {
    if (document.querySelectorAll('.max-slider__image--active').length === 3) { // check if there only 2 slides
      elem.dataset.dot === document.querySelectorAll('.max-slider__image--active')[1].dataset.item
      ?
      elem.classList.add('max-slider__dot--active')
      :
      elem.classList.remove('max-slider__dot--active')
    } else {
      elem.dataset.dot === document.querySelector('.max-slider__image--active').dataset.item
      ?
      elem.classList.add('max-slider__dot--active')
      :
      elem.classList.remove('max-slider__dot--active')
    }
  })
}

// Set actions
leftButton.addEventListener('click', rightMove)
rightButton.addEventListener('click', leftMove)
dotsContainer.addEventListener('click', activateSlide)
sliderContainer.addEventListener('transitionend', checkSliderEnd)

// Check if slider ends for infinity
function checkSliderEnd() {
  if (sliderContainer.offsetLeft >= -containerWidth) {
    sliderContainer.classList.remove('max-slider__images-container--transition')

    sliderContainer.offsetLeft > -containerWidth
      ?
      sliderContainer.style.left = `${-containerWidth * (sliderLength)}px`
      :
      sliderContainer.style.left = `${-containerWidth * (sliderLength + 1)}px`

    addActive()
  }

  if (sliderContainer.offsetLeft <= -containerWidth * (sliderLength + 2)) {
    sliderContainer.classList.remove('max-slider__images-container--transition')
    sliderContainer.offsetLeft < -containerWidth * (sliderLength + 2)
      ?
      sliderContainer.style.left = `${-containerWidth * 3}px`
      :
      sliderContainer.style.left = `${-containerWidth * 2}px`

    addActive()
  }
}

// Arrows actions
function leftMove() {
  sliderContainer.classList.add('max-slider__images-container--transition')

  if (sliderContainer.offsetLeft % containerWidth === 0) {
    sliderContainer.style.left = `${sliderContainer.offsetLeft - containerWidth}px`
    addActive()
  }
}
function rightMove() {
  sliderContainer.classList.add('max-slider__images-container--transition')

  if (sliderContainer.offsetLeft % containerWidth === 0) {
    sliderContainer.style.left = `${sliderContainer.offsetLeft + containerWidth}px`
    addActive()
  }
}


// Dots actions
function activateSlide(e) {
  if (e.target.classList.value !== 'max-slider__dot') return

  sliderContainer.classList.add('max-slider__images-container--transition')

  e.target.parentElement.querySelectorAll('.max-slider__dot').forEach(elem => {
    elem.classList.remove('max-slider__dot--active')
  })

  myImages.forEach((elem, index) => {
    elem.dataset.item === e.target.dataset.dot
      ?
      elem.classList.add('max-slider__image--active')
      :
      elem.classList.remove('max-slider__image--active')

    if (elem.classList.contains('max-slider__image--active')) {
      sliderContainer.style.left = `${-containerWidth * (index + 2)}px`
      e.target.classList.add('max-slider__dot--active')
    }
  })
}

// Drag interface
let startXposition;
let nextXposition;
let initialSliderPosition;
let finalSliderPosition;
let position = 0

// Drag events
sliderContainer.addEventListener("mousedown", dragStart);
sliderContainer.addEventListener("touchstart", dragStart);
sliderContainer.addEventListener("touchmove", dragMove);
sliderContainer.addEventListener("touchend", dragEnd);

// Drag actions
function dragStart(e) {
  e.preventDefault()

  checkSliderEnd()

  sliderContainer.classList.remove('max-slider__images-container--transition')

  initialSliderPosition = sliderContainer.offsetLeft

  if (e.type === 'touchstart') {
    startXposition = e.touches[0].clientX
  } else {
    startXposition = e.clientX

    document.onmouseup = dragEnd
    document.onmousemove = dragMove
  }
}
function dragMove(e) {
  if (e.type === 'touchmove') {
    nextXposition = startXposition - e.touches[0].clientX
    startXposition = e.touches[0].clientX
  } else {
    nextXposition = startXposition - e.clientX
    startXposition = e.clientX
  }

  sliderContainer.style.left = `${sliderContainer.offsetLeft - nextXposition}px`

}
function dragEnd() {
  finalSliderPosition = sliderContainer.offsetLeft

  sliderContainer.classList.add('max-slider__images-container--transition')

  position = finalSliderPosition - initialSliderPosition

  if (position < containerWidth * -dragSensitivity) {
    sliderContainer.style.left = `${(sliderContainer.offsetLeft - position) - containerWidth}px`
    addActive()
  } else if (position > containerWidth * dragSensitivity) {
    sliderContainer.style.left = `${(sliderContainer.offsetLeft - position) + containerWidth}px`
    addActive()
  } else {
    sliderContainer.style.left = `${initialSliderPosition}px`
  }

  document.onmouseup = null
  document.onmousemove = null
}

// Autoplay function
function autoPlay(direction) {
  setInterval(direction, timer)
}