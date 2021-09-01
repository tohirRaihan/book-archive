// load (fetch + display) all books
const loadBooks = (url) => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayBooks(data.docs));
};

// display books
const displayBooks = (books) => {
    // get search resuld field and clear previous results
    const searchItemsField = document.getElementById('search-items');
    searchItemsField.textContent = '';

    // creating single item to display in search result
    books.forEach((book) => {
        // console.log(book);
        const div = document.createElement('div');
        div.classList.add('col-md-3', 'search-item');
        div.innerHTML = `
            <div class="card">
                <img src="..." class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">Card title</h5>
                    <p class="lead"><strong>by </strong> Gary B. Shelly, Thomas J. Cashman, William J. Dorin, Jeffrey J. Quasney</p>
                    <p class="mb-0"><small class="text-muted">- First published in 2000</small></p>
                    <p><small class="text-muted">- Published by <em><strong>Computer Step</strong></em></small></p>
                </div>
            </div>
        `;
        searchItemsField.appendChild(div);
    });
};

// search event
document.getElementById('search-button').addEventListener('click', () => {
    // get search text
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    // dynamic url
    const url = `http://openlibrary.org/search.json?q=${searchText}`;

    // load books
    loadBooks(url);
});
