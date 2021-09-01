// load (fetch + display) all books --------------------------------------------
const loadBooks = (url) => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayBooks(data.docs));
};

// display books ---------------------------------------------------------------
const displayBooks = (books) => {
    console.log(books);
    // get search result field and clear previous results
    const searchItemsField = document.getElementById('search-items');
    searchItemsField.textContent = '';

    // creating single item to display in search result
    books.forEach((book) => {
        // setting image url
        const imgUrl = book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : 'images/avatar_book-sm.png';
        // preparing the search item div
        const div = document.createElement('div');
        div.classList.add('col-md-3', 'search-item');
        div.innerHTML = `
            <div class="card h-100">
                <img height="250" src="${imgUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${book.title}</h5>
                    <p class="lead"><strong>by </strong>${book.author_name ? book.author_name.join(', ') : 'Unknown'}</p>
                    <p class="mb-0"><small class="text-muted">- First published in <em>${book.first_publish_year ? book.first_publish_year : 'year unknown'}</em></small></p>
                    <p><small class="text-muted">- Published by <em><strong>${book.publisher ? book.publisher.join(', ') : 'unknown publisher'}</strong></em></small></p>
                </div>
            </div>
        `;
        searchItemsField.appendChild(div);
    });
    displayResultCount(books.length);
};

// display total result count --------------------------------------------------
const displayResultCount = (total) => {
    const resultCountInput = document.getElementsByClassName('result-count');
    for (const resultCount of resultCountInput) {
        console.log(resultCount);
        resultCount.textContent = '';
        const p = document.createElement('p');
        p.innerHTML = `
            <p>Total <span class="h5 fw-bold">${total}</span> search results found</p>
        `;
        resultCount.appendChild(p);
    }
};

// search event
document.getElementById('search-button').addEventListener('click', () => {
    // get search text
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';
    // dynamic url
    const url = `http://openlibrary.org/search.json?q=${searchText}`;

    // load books
    loadBooks(url);
});
