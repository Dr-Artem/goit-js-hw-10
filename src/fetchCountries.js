import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const countryNameInput = document.getElementById("search-box");

function fetchCountries(name) {
    fetch(`https://restcountries.com/v3.1/name/${name.target.value}?fields=name,capital,population,flags,languages`).then(
        response => {
            if (!response.ok) {
                throw new Error(response.status)
            }
    
            return response.json();
        })
}

countryNameInput.addEventListener("input", debounce(fetchCountries, DEBOUNCE_DELAY))

export {fetchCountries}