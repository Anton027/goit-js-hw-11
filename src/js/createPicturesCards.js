export function createPicturesCards(pictures) {
    return pictures.map(picture => `
            <div class="photo-card">
                <a href="${picture.largeImageURL}" class="thumb">
                    <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy"/>
                    <div class="info">
                        <p class="info-item">
                        <b>Likes: ${picture.likes}</b>
                        </p>
                        <p class="info-item">
                        <b>Views: ${picture.views}</b>
                        </p>
                        <p class="info-item">
                        <b>Comments: ${picture.comments}</b>
                        </p>
                        <p class="info-item">
                        <b>Downloads: ${picture.downloads}</b>
                        </p>
                    </div>
                </a>
            </div>`
    ).join('');
}
