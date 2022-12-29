import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import createListOfCountry from "./templates/createListOfCountry.hbs";
import createCountryMarkup from "./templates/createCountryMarkup.hbs";

const DEBOUNCE_DELAY = 300;
const countryNameInput = document.getElementById("search-box");
const listOfCountries = document.querySelector(".country-list");
const oneCountry = document.querySelector(".country-info");

function handleInput(event) {
	let searchValue = event.target.value.trim()
	fetchCountries(searchValue).then(data => {
	if (data.length > 10) {
		(oneCountry.innerHTML = "") || (listOfCountries.innerHTML = "");
		Notiflix.Notify.warning("Too many matches found. Please enter a more specific name.")
        return
    }
    if (data.length >= 2) {
        oneCountry.innerHTML = "";
		listOfCountries.innerHTML = createListOfCountry(data);
		Notiflix.Notify.info("Hmmm! What exactly you are looking for..")
    }
    if (data.length === 1) {
        listOfCountries.innerHTML = "";
		oneCountry.innerHTML = createCountryMarkup(data);
		Notiflix.Notify.success("We find it!")
    }
    
	}).catch(err => {
		if (!searchValue) {
			(oneCountry.innerHTML = "") || (listOfCountries.innerHTML = "");
			return
		}
		Notiflix.Notify.failure("Oops, there is no country with that name")
	})
};


countryNameInput.addEventListener("input", debounce(handleInput, DEBOUNCE_DELAY))