

// search event
document.getElementById('search-button').addEventListener('click', () => {
    // get search text
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // dynamic url
    const url = `http://openlibrary.org/search.json?q=${searchText}`;

    // fetch data from api
    fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(data.docs));
});
