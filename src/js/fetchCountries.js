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

refs.input.addEventListener(
  'input',
  debounce(inputChange, 300),
);

function inputChange (event) {
  const inputValue = event.target.value;

  refs.selectedCountry.innerHTML = '';

  fetchCountries(inputValue);
}

function fetchCountries(searchQuery) {
  const options = {
    headers: {
      Accept: 'application/json',
    },
  };

  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Ошибка по адресу ${url}, 
      статус ошибки ${response.status}!`);
    })
    .then(data => {
      if (data.length === 1) {
        updateCountryMarkup (data);
      }
      if (data.length > 1 && data.length < 11) {
        updateCountryListMarkup (data);
      }
      else {
        error({
          title: 'To many mathches found. Please enter a more specific query!',
        });
      }
    })
    .catch(pnError => {
      error({
        title: 'Wrong query! Please try again',
      });
    });
}

function updateCountryMarkup (data) {
  const counrtyMarkup = selectedCountryTemp(data);
  refs.selectedCountry.insertAdjacentHTML('beforeend', counrtyMarkup);
}

function updateCountryListMarkup (data) {
  const counrtyListMarkup = countryListTemp(data);
  refs.selectedCountry.insertAdjacentHTML('beforeend', counrtyListMarkup);
}