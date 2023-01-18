'use strict'

const btn = document.querySelector('.login_btn');
const countriesContainer = document.querySelector('.countries');
const message = document.querySelector('.message');

const inputCountry = document.querySelector('.login_input');


const renderCountry = function (data, className = '') {
    const html = `
    <article class="country ${className}">
    <img class="country_img" src="${data.flags.png}" />
    <div class="country_data">
    <h3 class="country_name">${data.name.common}</h3>
    <h4 class="country_region">${data.region}</h4>
    <p class="country_row"><span>👫</span>${(+data.population / 1000000).toFixed(2)} mln people</p>
    <p class="country_row"><span>🗣️</span>${Object.values(data.languages)[0]}</p>
    <p class="country_row"><span>🌇</span>${data.capital}</p>
    <p class="country_row"><span>💰</span>${Object.values(data.currencies)[0].name}</p>
    <p class="country_row"><span>💸</span>${data.gini ? Object.values(data.gini) : 'No'} Gini Index</p>
    <p class="country_row"><span>🌎</span>${data.borders ? data.borders.length : 0} neighbours</p>
</div>
    </article>
`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
};

const loadCountryAndNeighbour = async function (country) {
    try {
        clearMessage();
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const data = await res.json();
        console.log(data);
renderCountry(data[0]);
        countriesContainer.style.opacity = 1;

    //    Get neighbour country 2
        const neighboursArr = data[0].borders;
        if (neighboursArr) {
            console.log(neighboursArr);
            neighboursArr.forEach(async (neighbour, i) => {
                await wait(i * 300);
                const neighbourRes = await fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
                const neighbourData = await neighbourRes.json();
                renderCountry(neighbourData[0], 'neighbour');
            });
        } else {
renderMessage('It is lonely island!');
        }



    } catch (err) {
        renderMessage('...something went wrong... Check your typing and try again!')
    }


};


const renderMessage = function (msg) {
    message.innerHTML = msg;
    message.classList.add('message--visible');
}

const clearMessage = function () {
    message.innerHTML = '';
    message.classList.remove('message--visible');
}

const wait = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

btn.addEventListener('click', function (e) {
    e.preventDefault();
       const countries = document.querySelectorAll('.country');
    countries.forEach(country => country.remove());

    loadCountryAndNeighbour(`${inputCountry.value}`);
    inputCountry.value = '';
})


