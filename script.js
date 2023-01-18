'use strict'

const btn = document.querySelector('.login_btn');
const countriesContainer = document.querySelector('.countries');


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
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        const data = await res.json();
        console.log(data);
renderCountry(data[0]);
        countriesContainer.style.opacity = 1;
    } catch (err) {
        console.error('...something went wrong... Check your typing and try again!')
    }


};



loadCountryAndNeighbour('portugal');