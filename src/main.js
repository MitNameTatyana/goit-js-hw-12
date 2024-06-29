import { getImages } from './js/pixabay-api';
import { createGalleryMarkup } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more-button'),
  loader: document.querySelector('.loader'),
};

let searchQuery = '';
let currentPage = 1;
let maxPage = 1;
const perPages = 15;

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

refs.form.addEventListener('submit', onSubmit);
refs.btnLoadMore.addEventListener('click', onLoadMore);

async function onSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';

  searchQuery = e.target.elements['search-input'].value.trim().toLowerCase();

  if (!searchQuery) {
    showInfo('Please enter a search query');
    return;
  }

  currentPage = 1;
  hideBtnLoadMore();
  showLoader();

  try {
    const data = await getImages(searchQuery, currentPage);
    maxPage = Math.ceil(data.totalHits / perPages);

    if (maxPage === 0) {
      showNotFound(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      hideLoader();
      e.target.reset();
      return;
    }

    const markup = createGalleryMarkup(data.hits);
    refs.gallery.innerHTML = markup;
    lightbox.refresh();
  } catch {
    error => {
      showError(error);
    };
  }

  hideLoader();
  updateBtnStatus();
  e.target.reset();
}

async function onLoadMore(e) {
  e.preventDefault();

  currentPage++;
  hideBtnLoadMore();
  showLoader();

  try {
    const data = await getImages(searchQuery, currentPage);
    const markup = createGalleryMarkup(data.hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    skipOldElement();
  } catch {
    error => {
      showError(error);
    };
  }

  hideLoader();
  updateBtnStatus();
}

function updateBtnStatus() {
  if (currentPage >= maxPage) {
    hideBtnLoadMore();
    if (maxPage) {
      showNotFound("We're sorry, but you've reached the end of search results");
    }
  } else {
    showBtnLoadMore();
  }
}

function skipOldElement() {
  const liElem = refs.gallery.children[0];
  const height = liElem.getBoundingClientRect().height;

  scrollBy({
    top: height * 3,
    behavior: 'smooth',
  });
}

function showBtnLoadMore() {
  refs.btnLoadMore.classList.remove('hidden');
}
function hideBtnLoadMore() {
  refs.btnLoadMore.classList.add('hidden');
}

function showLoader() {
  refs.loader.classList.remove('hidden');
}
function hideLoader() {
  refs.loader.classList.add('hidden');
}

const iziToastConfig = {
  position: 'center',
  backgroundColor: 'rgb(78, 117, 255)',
  theme: 'dark',
  messageSize: '16',
  messageColor: 'white',
  messageLineHeight: '1,5',
  progressBar: false,
  pauseOnHover: true,
  timeout: 3000,
};

function showInfo(message) {
  iziToast.info({
    message,
    ...iziToastConfig,
  });
}
function showNotFound(message) {
  iziToast.error({
    message,
    maxWidth: '432',
    ...iziToastConfig,
  });
}
function showError(message) {
  iziToast.error({
    title: 'Error',
    message,
    maxWidth: '432',
    position: 'center',
    backgroundColor: 'red',
    messageSize: '16',
    messageLineHeight: '1,5',
    progressBar: false,
    pauseOnHover: true,
  });
}
