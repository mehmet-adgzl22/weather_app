const url = 'https://api.openweathermap.org/data/2.5/';
const key = '86cc1af45ba0dae4c862a0bd6e620087';

const setQuery = (e) => {
    if (e.keyCode === 13) { // Enter tuşu kontrolü
        const value = searchBar.value; // Input alanının değerini alıyoruz
        getResult(value); // Şehir adını getResult'a gönderiyoruz
    }
};

const getResult = (cityName) => {
    let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;
    fetch(query)
        .then(weather => {
            if (!weather.ok) {
                throw new Error('Şehir bulunamadı');
            }
            return weather.json();
        })
        .then(displayResult)
        .catch(error => {
            displayError(error);
        });
};

const displayResult = (result) => {
    let city = document.querySelector('.city');
    city.innerText = `${result.name}, ${result.sys.country}`;

    let temp = document.querySelector('.temp');
    temp.innerText = `${Math.round(result.main.temp)}°C`;

    let desc = document.querySelector('.desc');
    desc.innerText = result.weather[0].description;

    let minmax = document.querySelector('.minmax');
    minmax.innerText = `${Math.round(result.main.temp_min)}°c / ${Math.round(result.main.temp_max)}°c`;
};

const displayError = (error) => {
    let city = document.querySelector('.city');
    city.innerText = "Şehir Bulunamadı !";

    let temp = document.querySelector('.temp');
    temp.innerText = "";

    let desc = document.querySelector('.desc');
    desc.innerText = "";

    let minmax = document.querySelector('.minmax');
    minmax.innerText = "";
};

const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keypress', setQuery);
