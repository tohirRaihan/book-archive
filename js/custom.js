// load (fetch + display) all books --------------------------------------------
const loadBooks = (url) => {
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayBooks(data.docs));
};

// display books ---------------------------------------------------------------
const displayBooks = (books) => {
    const totalBooks = books.length;
    // get search result field and clear previous results
    const searchItemsField = document.getElementById('search-items');
    searchItemsField.textContent = '';

    // creating single item to append in search result field
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
                    <p><small class="text-muted">- Published by <em><strong>${book.publisher ? book.publisher.slice(0, 5).join(', ') : 'unknown publisher'}</strong></em></small></p>
                </div>
            </div>
        `;
        searchItemsField.appendChild(div);
    });
    displayResultCount(totalBooks);
    // hide loading spinner
    toggleSpinner('none');
    // show search result
    toggleSearchResult('block');
};

// display total result count --------------------------------------------------
const displayResultCount = (total) => {
    const resultCountInput = document.getElementById('result-count');
    resultCountInput.textContent = '';
        if (total === 0) {
            resultCountInput.innerHTML = `
                <div class="bg-danger p-3">
                    <h5 class="text-white text-center">No result found</h5>
                </div>
            `;
        } else {
            resultCountInput.innerHTML = `
                <p>Total <span class="h5 fw-bold">${total}</span> search results found</p>
            `;
        }
};

// toggle(show or hide) spinner ------------------------------------------------
const toggleSpinner = displayStyle => {
    document.getElementById('data-loader').style.display = displayStyle;
}

const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
    document.getElementById('search-result-count').style.display = displayStyle;
}

// search event
document.getElementById('search-button').addEventListener('click', () => {
    // get search text
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;
    searchInput.value = '';
    // dynamic url
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    // show loading spinner
    toggleSpinner('block');
    // hide search result
    toggleSearchResult('none');
    // load books
    loadBooks(url);

});
