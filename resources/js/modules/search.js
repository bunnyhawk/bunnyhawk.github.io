import { namesService } from '@state/namesMachine';

const viewMoreButton = document.getElementById('viewMore');
const searchButton = document.getElementById('searchButton');
const loading = document.querySelector('.dots');

let hasValue = false;

if (viewMoreButton) {
  const fetchMoreData = () => {
    loading.classList.toggle('is-visible');
    namesService.send('FETCH');
  };
  viewMoreButton.addEventListener('click', fetchMoreData);
}

if (searchButton) {
  const searchInput = document.getElementById('search');

  const clearName = () => {
    hasValue = false;
    namesService.send('INITIALIZE');
    searchInput.value = null;
    searchButton.innerText = 'Search';
  };
  const searchForName = () => {
    if (hasValue) return clearName();

    hasValue = true;
    namesService.send('FETCH', { query: searchInput.value });
    searchButton.innerText = 'Clear';
    loading.classList.toggle('is-visible');
  };
  searchButton.addEventListener('click', searchForName);
}
