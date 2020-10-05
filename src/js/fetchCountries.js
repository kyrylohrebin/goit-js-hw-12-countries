import countryListTemp from '../templates/countryList.hbs';
import selectedCountryTemp from '../templates/searchResult.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';


const refs = {
    input: document.querySelector('.input-js'),
    selectedCountry: document.querySelector('.selected-country'),
    countryList: document.querySelector('.country-search__list'),
  };

const debounce = require('lodash.debounce');

/* refs.input.addEventListener(
  'input',
  debounce(tralalalala, 300),
); */

/* function fetchCountries (searchQuery) {
  const options = {
    headers: {
      Accept: 'application/json',
    },
  };

  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    fetch(url, options)
    .then(response => {
      return response.json();
    })
    .then(data => updateMarkup(data))
    .catch(error => {
      error({
        title: 'Wrong query! Please try again',
      });
    });
} */


const options = {
  headers: {
    Accept: 'application/json',
  },
};

const url = `https://restcountries.eu/rest/v2/name/ukraine`;

  fetch(url, options)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
    const markup = selectedCountryTemp(data);
    refs.selectedCountry.insertAdjacentHTML('beforeend', markup)
  })
  .catch(error => {
    error({
      title: 'Wrong query! Please try again',
    });
  });