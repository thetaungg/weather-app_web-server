console.log('Client side javascript is loaded');


const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location = searchInput.value;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${encodeURIComponent(location)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error){
                 messageOne.textContent = data.error;
                 messageTwo.textContent = '';
            }else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        }).catch(error => console.log(error));});