import { namesService } from '@state/namesMachine';

const viewMoreButton = document.getElementById('viewMore');
const searchButton = document.getElementById('searchButton');

let hasValue = false;

if (viewMoreButton) {
  const fetchMoreData = () => namesService.send('FETCH');
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
  };
  searchButton.addEventListener('click', searchForName);
}
