import axios from "axios";
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
// import { modernStyleElem } from "./js/modernStyleElem";
// import { getPictures } from "./js/getPictures";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getPictures, resetPage } from "./js/getPictures";
import { createPicturesCards } from "./js/createPicturesCards";
// import { page } from "./js/getPictures";

axios.defaults.baseURL = 'https://pixabay.com/api/';

const refs = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('input'),
    button: document.querySelector('button'),
    wrap: document.querySelector('.wrap-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more')
}

// modernStyleElem();

refs.wrap.style.backgroundColor = 'blue';
refs.form.style.display = 'flex';
refs.form.style.justifyContent = 'center';
refs.wrap.style.paddingTop = '5px';
refs.wrap.style.paddingBottom = '5px';
refs.button.borderLeft = 'none';

refs.loadMoreBtn.style.display = 'none';


let searchPictureToTrim = '';


refs.form.addEventListener('submit', (evnt) => {
    evnt.preventDefault();

    const searchPicture = evnt.target.elements.searchQuery.value;
    searchPictureToTrim = searchPicture.trim();

    console.log(searchPictureToTrim);
    

    //  else if (data.hits.length === 0) {
    //     refs.gallery.innerHTML = '';
    //     Notiflix.Notify.info(
    //         'Sorry, there are no images matching your search query. Please try again.'
    //     );
    // }
    resetPage();
    
    getPictures(searchPictureToTrim).then(data => {
        if (searchPictureToTrim === '') {
            refs.gallery.innerHTML = '';
            Notiflix.Notify.info(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        } else if (data.data.hits.length === 0) {
            refs.gallery.innerHTML = '';
            Notiflix.Notify.info(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        }

        refs.gallery.innerHTML = createPicturesCards(data.data.hits);
        refs.loadMoreBtn.style.display = 'flex';
        console.log('totalHits: ', data.data.totalHits);
        // console.log('page: ', page);
    });
})


refs.loadMoreBtn.addEventListener('click', () => {
    // page += 1;
    refs.loadMoreBtn.style.display = 'none';
    getPictures(searchPictureToTrim).then(data => {

        if (data.data.totalHits === page) {
            
        }

        refs.gallery.insertAdjacentHTML('beforeend',
            createPicturesCards(data.data.hits)
        )
        refs.loadMoreBtn.style.display = 'flex';
    });
});

// if (page === data.total_pages) {
//     Notiflix.Notify.info(
//         'Sorry, bud pictures is finished'
//     );
// }
