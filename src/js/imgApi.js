import axios from "axios";
const BASE_URL = `https://pixabay.com/api`;
const API_KEY = '28483362-313f04b4986d5508c9cd93d3a';

export default class ImgApi {
    constructor() {
        this.searchQuerry = '';
        this.page = 1;
    }

  async fetchPictures() {
// console.log(this);
    
    
const options = new URLSearchParams ({
        key: API_KEY,
        q: this.searchQuerry,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        per_page: '40',
        page: this.page,
    });
    const url  = `${BASE_URL}?${options}`;
    const response = await axios.get(url);
    
  this.incrementPage();
  // console.log(response);
  // console.log(response.data);
  return response.data;
  }

  incrementPage() {
      this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
    
    get query() {
        return this.searchQuerry;
    }
    set query(newQuerry) {
        this.searchQuerry = newQuerry;
    }
}


