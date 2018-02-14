import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

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
    reddit.search(searchTerm, searchLimit, sortBy).then
    (results => {
        let output = '<div class ="card-columns">';
        //Loop through posts
        results.forEach(post => {
            // Check for image
      let image = post.preview
      ? post.preview.images[0].source.url
      : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
    output += `
    <div class="card mb-2">
    <img class="card-img-top" src="${image}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${post.title}</h5>
      <p class="card-text">${truncateString(post.selftext, 100)}</p>
      <a href="${post.url}" target="_blank
      " class="btn btn-primary">Read More</a>
      <hr>
      <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span> 
      <span class="badge badge-dark">Score: ${post.score}</span>
    </div>
  </div>
    `;
  });
  output += '</div>';
  document.getElementById('results').innerHTML = output;
});
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

    // Truncate String Function
function truncateString(myString, limit) {
    const shortened = myString.indexOf(' ', limit);
    if (shortened == -1) return myString;
    return myString.substring(0, shortened);
  }