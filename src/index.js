import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

import 'notiflix/dist/notiflix-3.2.5.min.css';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.getElementById('search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

const markup = data => {
  const listMarkup = data
    .map(
      ({ name, flags }) =>
        `<li><img width='40' src=${flags.svg}><p>${name.official}</p></li>`
    )
    .join('');
  if (data.length === 1) {
    const markupItem = data
      .map(({ name, flags, population, capital, languages }) => {
        return `<div class="country-flag"><img src="${flags.svg}" alt="flag" width="30" height="30"/>
      <h1>${name.official}</h1></div>
      <ul>
        <li><h2 class="country-info">Capital:</h2><p>${capital}</p></li>
        <li><h2 class="country-info">Population:</h2><p>${population}</p></li>
        <li><h2 class="country-info">Languages:</h2><p>${languages}</p></li>
      </ul>`;
      })
      .join('');
    refs.list.innerHTML = '';
    refs.info.innerHTML = markupItem;
  } else {
    refs.info.innerHTML = '';
    refs.list.innerHTML = listMarkup;
  }

  if (data.length > 10) {
    refs.list.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
};

const inputHandler = evt => {
  const inputValue = evt.target.value.trim();
  if (inputValue.length > 0) {
    fetchCountries(inputValue)
      .then(data => {
        data.map(el => {
          el.languages = Object.values(el.languages);
        });

        markup(data);
      })
      .catch(error => {
        refs.info.innerHTML = '';

        Notify.failure('Oops, there is no country with that name');
      });
  } else {
    Notify.failure('Enter something');
    refs.list.innerHTML = '';
  }
};

refs.input.addEventListener('input', debounce(inputHandler, DEBOUNCE_DELAY));
