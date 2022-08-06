import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

import { fetchCountries } from './js/fetchCountries';

import 'notiflix/dist/notiflix-3.2.5.min.css';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const inputHandler = evt => {
  const inputValue = evt.target.value.trim();
  if (inputValue.length > 0) {
    fetchCountries(inputValue)
      .then(data => {
        if (data.length > 10) {
          refs.list.innerHTML = '';
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
        const listMarkup = data
          .map(
            ({ name, flags }) =>
              `<li><img width='40' src=${flags.svg}><span>${name.official}</span></li>`
          )
          .join('');

        refs.list.insertAdjacentHTML('beforeend', listMarkup);
        console.log(listMarkup);
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
      });
  } else {
    Notify.failure('Enter something');
  }
};

refs.input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
