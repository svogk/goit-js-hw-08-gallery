import galleryItems from './gallery-items.js';

const linkRef = galleryItems.map(galleryItem => {
    const itemRef = document.createElement('li');
    itemRef.classList.add('gallery__item');

    const aRef = document.createElement('a');
    aRef.classList.add('gallery__link');
    aRef.href = galleryItem.original;

    const imgRef = document.createElement('img');
    imgRef.classList.add('gallery__image');
    imgRef.src = galleryItem.preview;
    imgRef.alt = galleryItem.description;
    imgRef.dataset.source = galleryItem.original;

    aRef.appendChild(imgRef);
    itemRef.appendChild(aRef);
    return itemRef;
});

const listRef = document.querySelector('.gallery');
listRef.append(...linkRef);

const openModalBtn = document.querySelector('.lightbox');
const closeModalBtn = document.querySelector(
    'button[data-action="close-lightbox"]',
);
const backdropRef = document.querySelector('.lightbox__content');

const galleryRef = document.querySelector('.js-gallery');
galleryRef.addEventListener('click', onImgClick);

function onImgClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const fotoItem = event.target.dataset.source;
    openModalBtn.classList.add('is-open');
    window.addEventListener('keydown', onPressEscape);
    const addUrl = document.querySelector('.lightbox__image');
    addUrl.setAttribute('src', fotoItem);
};

closeModalBtn.addEventListener('click', onCloseModal);
backdropRef.addEventListener('click', onBackDropClick);
window.addEventListener('keydown', onPressEscape);

function onCloseModal() {
    window.removeEventListener('keydown', onPressEscape);
    openModalBtn.classList.remove('is-open');
    const removeUrl = document.querySelector('.lightbox__image');
    removeUrl.setAttribute('src', '');
};

function onBackDropClick(event) {
    if (event.target === event.currentTarget) {
        onCloseModal();
    }
};

function onPressEscape(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
};