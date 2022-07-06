const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '28483362-313f04b4986d5508c9cd93d3a';
// const FILTER = '?fields=name,capital,population,flags,languages';
// // const FILTER ='?fields=name.official,capital,population,flags.svg,languages';
// // const FILTER = '';

let word = 'serbia';

function fetchImages(countryName) {
    return fetch(`${BASE_URL}/?key=${API_KEY}&q=${countryName}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => {
            console.log(response);
            return response.json();
        });
}



fetchImages(word).then(pok => {
    console.log(pok);
    console.log(pok.hits[8].webformatURL);
    
})

// fetch('https://pixabay.com/api/?key=28483362-313f04b4986d5508c9cd93d3a&q=blue+flowers&image_type=photo&pretty=true')
//     .then(response => { 
//         return response.json();
//     }).then(pok => {
//     console.log(pok);
// })