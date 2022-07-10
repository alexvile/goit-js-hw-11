import axios from "axios";
import debounce from "lodash.debounce"


import imgCardTpl from './template/imgCardTpl.hbs';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '28483362-313f04b4986d5508c9cd93d3a';


const galleryEl = document.querySelector('.gallery');
const formEl = document.getElementById('search-form');
const searchEl = formEl.elements["searchQuery"];
// const submitEl = formEl.elements["submit"];

// console.log(submitEl);

// const FILTER = '?fields=name,capital,population,flags,languages';
// // const FILTER ='?fields=name.official,capital,population,flags.svg,languages';
// // const FILTER = '';




// formEl.addEventListener('input', debounce());


// function onInputChange(e) { 

// } 



axios.get(BASE_URL, {
    params: {
        key: API_KEY,
        q: 'white flower',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true'
    }
})
    .then(function (response) {
        console.log(response);
        console.log(response.data);
        console.log(response.data.hits);
        const imagesFirst = response.data.hits;
        // console.log(response.data.hits[12].webformatURL);
        renderCards(imagesFirst);
    })
    .catch(function (error) {
        console.log(error);
    });



function renderCards(objects) {
    // console.log(countries);
    let markup = [];

    objects.map(object => {
            console.log(object);
            markup.push(imgCardTpl(object));
        });
    // refs.countryInfo.innerHTML = markup;
    
    galleryEl.innerHTML = markup.join('');
}

















// let word = 'serbia';



  
// function fetchImages(image) {
//     return fetch(`${BASE_URL}/?key=${API_KEY}&q=${image}&image_type=photo&orientation=horizontal&safesearch=true`)
//         .then(response => {
//             console.log(response);
//             return response.json();
//         });
// }



// fetchImages(word).then(data => {
//     console.log(data);
//     console.log(data.hits[8].webformatURL);
    
// })

