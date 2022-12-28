import './css/styles.css';

import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import createCountryMarkup from "./templates/createCountryMarkup.hbs"


const listOfCountries = document.querySelector(".country-list");
const oneCountry = document.querySelector(".country-info");


fetchCountries().then(data => {
    if (data.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
        return
    }
    if (data.length >= 2) {
        const handleCountry = data
            .map((country) => {
            return `<li class="country__item"><img class="country__flag" src=${country.flags.svg} alt=${country.name.official}></img>${country.name.official}</li>`}).join("")
        oneCountry.innerHTML = "";
        listOfCountries.innerHTML = handleCountry;
        


        listOfCountries.style.display = 'flex';
        listOfCountries.style.flexDirection = 'column';
        listOfCountries.style.gap = '20px'

        const liEls = listOfCountries.querySelectorAll(".country__item");
        liEls.forEach((li) => {
            li.style.listStyle = 'none';
            li.style.display = 'flex';
            li.style.alignItems = 'center'
            li.style.gap = '20px'
        })
        const imgEls = listOfCountries.querySelectorAll(".country__flag");
        imgEls.forEach((img) => {
            img.style.display = 'block';
            img.style.height = 'auto';
            img.style.maxWidth = '50px';
        })
        console.log(data);
    }
    if (data.length === 1) {
        
        // const handleCountry = data
        //     .map((country) => {
        //     return })

        listOfCountries.innerHTML = "";
        // oneCountry.innerHTML = createCountryMarkup(data);        
    }
    
}).catch(err => {
    Notiflix.Notify.failure("Oops, there is no country with that name")
})


