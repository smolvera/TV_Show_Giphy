// function to start once the page loads
$(function(){
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    console.log("Page Loaded");
})


// array of search topics
var searchArray = ["How to Get Away with Murder", "Game of Thrones", "The Walking Dead"];

// funtion to add buttons to page after submitting input in the search area
function populateButtons(searchArray, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();
    for(var i = 0; i < searchArray.length; i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on('click', '.searchButton', function(){
    $('#searches').empty();
    var type = $(this).data('type');
    var searchInput = $("#search-input").val();
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+ type +'&api_key=Gmh4rAeYGlr3eyrP2DJeSonGzjASMHkH&limit=10';
    $.ajax({
        url: queryURL,
        method: 'GET',
    })

    .done(function(response){
        console.log(response.data);
        for(var i = 0; i < response.data.length; i++){
            var searchDiv = $('<div class="search-item">');
            var rating = response.data[i].rating;
            var p = $("<p>").text('Rating: ' + rating);
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $('<img>');
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            image.attr('data-state', 'still');
            image.addClass('searchImage');
            // append the rating and image to the page
            searchDiv.append(p);
            searchDiv.append(image);
            $('#searches').append(searchDiv);
        }
        
    })
})

$(document).on('click', '.searchImage', function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

$('#addSearch').on('click', function(){
    var newSearch = $('input').eq(0).val();
    searchArray.push(newSearch);
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    return false;
})
