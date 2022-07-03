import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import InfiniteScroll from "infinite-scroll";
import { getPictures, resetPage, valuePage } from "./js/getPictures";
import { createPicturesCards } from "./js/createPicturesCards";
import { smooshScroll } from "./js/smooshScroll";
import "simplelightbox/dist/simple-lightbox.min.css";


axios.defaults.baseURL = 'https://pixabay.com/api/';

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    button: document.querySelector('button'),
    wrap: document.querySelector('.wrap-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    linkImages: document.querySelectorAll('a')
}
refs.wrap.style.backgroundColor = 'blue';
refs.form.style.display = 'flex';
refs.form.style.justifyContent = 'center';
refs.wrap.style.paddingTop = '5px';
refs.wrap.style.paddingBottom = '5px';
refs.button.borderLeft = 'none';

refs.loadMoreBtn.style.display = 'none';

// let gallery = new SimpleLightbox('.gallery a');
// console.log(gallery);


let searchPictureToTrim = '';

refs.form.addEventListener('submit', (evnt) => {
    evnt.preventDefault();
    
    const searchPicture = evnt.target.elements.searchQuery.value;
    searchPictureToTrim = searchPicture.trim();

    // console.log(searchPictureToTrim);
    
    resetPage();
    
    getPictures(searchPictureToTrim).then(data => {
        
        if (searchPictureToTrim === '' || data.data.hits.length === 0) {
            refs.gallery.innerHTML = ' ';
            refs.loadMoreBtn.style.display = 'none';
            Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        } else {
            refs.gallery.innerHTML = createPicturesCards(data.data.hits);
            Notiflix.Notify.info(
                `Hooray! We found ${data.data.totalHits} images.`
            );
            refs.loadMoreBtn.style.display = 'flex';
        }
    });
})


// window.addEventListener('scroll', () => {
//     console.log(window.innerHeight);
//     if (window.scrollY + window.innerHeight > document.documentElement.scrollHeight) {
//         getPictures(searchPictureToTrim).then(data => {
//             refs.gallery.insertAdjacentHTML('beforeend',
//                 createPicturesCards(data.data.hits)
//             )
//         });
//     }
// });

refs.loadMoreBtn.addEventListener('click', () => {
    refs.loadMoreBtn.style.display = 'none';
    getPictures(searchPictureToTrim).then(data => {
        if (data.data.totalHits === valuePage().page - 1) {
            refs.loadMoreBtn.style.display = 'none';
            Notiflix.Notify.warning(
                `We're sorry, but you've reached the end of search results.`
            );
        }

        refs.gallery.insertAdjacentHTML('beforeend',
            createPicturesCards(data.data.hits)
        )
        smooshScroll();
        refs.loadMoreBtn.style.display = 'flex';
    });
});
refs.gallery.addEventListener('click', (e) => {
    e.preventDefault();
})

let gallery1 = new SimpleLightbox('.gallery a', {close: true, overlayOpacity: 0.9});


