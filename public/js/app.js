
const searchElement = document.querySelector('input');
const weatherForm = document.querySelector("form");
const dataPara = document.querySelector("#dataPara");
const errorPara = document.querySelector('#errorPara');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchElement.value;

    dataPara.textContent = 'Loading...';
    errorPara.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            dataPara.textContent = '';
            errorPara.textContent = data.error;
        } else {
            var apiResponse = 'Weather update of ' + data.location + ': ' + data.forecast;
            errorPara.textContent = '';
            dataPara.textContent = apiResponse;
        }
    });
});
});

