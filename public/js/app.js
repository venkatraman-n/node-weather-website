console.log('Client side javascript file loaded')

const weatherForm = document.querySelector('form');
const searchText = document.querySelector('input')
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
weatherForm.addEventListener('submit',(e)=> {
    e.preventDefault();
    messageOne.textContent='Loading...'
    fetch('http://localhost:3000/weather?address='+searchText.value).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
        } else {
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast;
            // console.log(data.location)
            // console.log(data.forecast)
        }
        
    })
}).catch((error) => {
    console.log(error)
})
})
console.log(searchText.value)