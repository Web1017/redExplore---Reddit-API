import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Form Event Listener
searchForm.addEventListener('submit', e => {
    //Get Search Term
    const searchTerm = searchInput.value;

    //Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    //Get Limit
    const searchLimit = document.getElementById('limit').value;

    //Check input
    if(searchTerm === ''){
        //Show message
        showMessage('Please add a search Term', 'alert-danger');
    }

    //Clear Input
    searchInput.value = '';

    //Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy);

    e.preventDefault();

});

    //Show Message
    function showMessage(message, className){
        //Create div
        const div = document.createElement('div');

        //Add classes
        div.className = `alert ${className}`;

        //Add Text
        div.appendChild(document.createTextNode(message));

        //Get parent 
        const searchContainer = document.getElementById('search-container');

        //Get Search
        const search = document.getElementById('search');

        //Insert the message
        searchContainer.insertBefore(div, search);

        //Timeout alert after 3 sec
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }