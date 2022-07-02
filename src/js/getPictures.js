import axios from "axios";
import Notiflix from "notiflix";

const DEFAULT_PAGE = 1;
let page = DEFAULT_PAGE;
export const resetPage = () => {
    page = DEFAULT_PAGE
}

export async function getPictures(searchPicture) {

    const searchParams = new URLSearchParams({
        key: '28335791-424c8601599ee033f1407bf36',
        page,
        per_page: 40,
        safesearch: true,
        q: searchPicture
    });
    try {
        const response = await axios.get(
            `?${searchParams}&image_type=photo&orientation=horizontal`
        );
        page += 1;
        return response;
    } catch {
        Notiflix.Notify.failure('Ups... page confuse...do not find :( ');
    }
}
