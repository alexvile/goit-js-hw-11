
// import debounce from "lodash.debounce"

import ImgApi from './js/imgApi';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import imgCardTpl from './template/imgCardTpl.hbs';


// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryEl = document.querySelector('.gallery');
const formEl = document.getElementById('search-form');
const loadMoreEl = document.querySelector('.load-more');

const imgApi = new ImgApi();

formEl.addEventListener('submit', onFormSubmit);
loadMoreEl.addEventListener('click', onLoadMore);

let gallery = new SimpleLightbox('.gallery a');
// console.log(gallery);

function onFormSubmit(e) {
    e.preventDefault();
    clearGallery()

    const searchValue = e.target.elements["searchQuery"].value.trim();
    if (searchValue === '') {
        loadMoreEl.classList.remove('visible');
        return Notify.warning('The input is empty');
    }
    imgApi.query = searchValue;
    loadMoreEl.classList.add('visible');
    loadMoreEl.classList.add('loading');
    loadMoreEl.setAttribute("disabled", "true");
    imgApi.resetPage();

   
    imgApi.fetchPictures()
        .then(data => {
            // console.log(data);
            
             if (data.totalHits == 0) {
                 loadMoreEl.classList.remove('loading');
                 loadMoreEl.classList.remove('visible');
                 loadMoreEl.removeAttribute("disabled", "true");
                 return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            }
           
            loadMoreEl.classList.remove('loading');
            loadMoreEl.removeAttribute("disabled", "true");

            Notify.success(`Hooray! We found ${data.totalHits} images`);

            const imagesGroup = data.hits;
            renderCards(imagesGroup);
                
            gallery.refresh();
        })
     .catch(function (error) {
        console.log(error);
    });
    
    
};



function onLoadMore() {
     if (imgApi.query === '') {
        return 
    }
    loadMoreEl.setAttribute("disabled", "true");
    imgApi.fetchPictures()
        .then(data => {
            // console.log(data);
            loadMoreEl.classList.remove('loading');
            loadMoreEl.removeAttribute("disabled", "true");
            const imagesGroup = data.hits;
            renderCards(imagesGroup);
            gallery.refresh();
        })
     .catch(function (error) {
        console.log(error);
    });
  loadMoreEl.classList.add('loading');
}



function renderCards(objects) {
    // console.log(objects);
    galleryEl.insertAdjacentHTML('beforeend', imgCardTpl(objects));
}
function clearGallery() {
     galleryEl.innerHTML = '';
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

