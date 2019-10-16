// RJ Pupunu
// Ajax and API homework - Giphy Search API


var gifys = ['Happy', 'WTF', 'Yummy', 'Hair Toss', 'Smile', 'Seriously', 'Piss Off', 'Creepy', "How you doin?", "Wasssup" ];
var stilGifs = [];
var activeGifs = [];

// Create the buttons when the window loads.
function renderButtons() {
    //Delete the buttons prior to ddding new buttons
    $('.gif-btn-container').empty();
    //Loop through the array of gifys.
    for (var i = 0;  i < gifys.length; i++) {
        //Dynamically generate buttons for each item in the array.
        var a = $('<button>');
        //Add a class to the button.
        a.addClass('gif-btn');
        //Add a data-attribute with a value of the athlete index i.
        a.attr('data-name', gifys[i]);
        //Adding the text to the button from the index value i of the athlete array.
        a.text(gifys[i]);
        //Add buttons to the HTML.
        $('.gif-btn-container').append(a);
    }
}

function displayGifs() {
    //Grab the users data input an place it in a variable.
    var gif = $(this).attr('data-name');
    //My API key.
    var key = "wAqzD99SQU38lFUb0owpTDMvt8QDe5bo&q="
    // https://api.giphy.com/v1/gifs/search?api_key=wAqzD99SQU38lFUb0owpTDMvt8QDe5bo&q=gif&limit=25&offset=0&rating=R&lang=en
    //Concatenating the query URL for the AJAX call using the URL, key, gif variable. 
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + gif + "&limit=25&offset=0&rating=R&lang=en";
    //Console logging the search term and URL 
    console.log("gif: " + gif);
    console.log("-------------------");
    console.log(queryURL);
    //Clear all previous content for div containing the search gif results and the arrays.
    $('.gif-container').empty();
    stillGifs = [];
    activeGifs = [];

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {

        var results = response.data;
        // Add the DOM elements to display the still gifs, and load the URLs into separate arrays.
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $('<div>');
            var pDiv = $('<p>');

            var stillGifURL = results[i].images.fixed_height_still.url;
            var gifStillImage = $('<img>').addClass('still-gif');
            gifStillImage.attr('data-name', i);
            gifStillImage.attr('src', stillGifURL);

            var activeGifURL = results[i].images.fixed_height.url;
            var gifActiveImage = $('<img>').addClass('active-gif');
            gifActiveImage.attr('data-name', i);
            gifActiveImage.attr('src', activeGifURL);

            var ratingURL = response.data[i].rating.toUpperCase();
            var gifRating = 'Rated: ' + ratingURL;
            pDiv.append(gifRating);
            gifDiv.append(gifStillImage);
            gifDiv.append(pDiv);
            $('.gif-container').append(gifDiv);

            stillGifs.push(stillGifURL);
            activeGifs.push(activeGifURL);
        }
    });
 
}

//Called when the user clicks Submit button in the nav bar.
$('.btn-search').on('click', function (event) {

    event.preventDefault();
    //Capture users input into the search field in the nav bar.
    var input = $('.search-field').val().trim();
    //Push new search input into the althetes array
    gifys.push(input);
    //Render the buttons
    renderButtons();
    //Clear the search field in the nav bar.
    $('.search-field').val('');
});

// Call when the user clicks on  gif image.
function activeGif() {

    // Get the data-name of the gif.
    var id = $(this).attr('data-name');
    console.log(this);
    // Check to see if the gif is active.
    if ($(this).hasClass('active-gif')) {

        $(this).attr('class', 'still-gif');
        $(this).attr('src', stillGifs[id]);
    }
    else {

        $(this).attr('class', 'active-gif');
        $(this).attr('src', activeGifs[id]);
    }
}

renderButtons();
$(document).on('click', 'img', activeGif);
$(document).on('click', '.gif-btn', displayGifs);

