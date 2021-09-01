console.log('Iam connected');

// search event
document.getElementById('search-button').addEventListener('click', () => {
    // get search text
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // dynamic url
    const url = `http://openlibrary.org/search.json?q=${searchText}`;

});
