const loginButton = document.querySelector('#login')
console.assert(loginButton !== null, 'login button must be present')
loginButton.addEventListener('click', (event) => {
  console.log('Inside the click handler')
  console.log(event)
  let sum = 0
  setTimeout(() => console.log('Timer fired after 1 second'), 1000) // will enque the callback into the event queue
  //   for (let i = 0; i < Infinity; i++) {
  //     sum += Math.sqrt(i)
  //   }
  console.log(sum)
})
const registerButton = document.querySelector('#register')
console.assert(registerButton !== null, 'register button must be present')
