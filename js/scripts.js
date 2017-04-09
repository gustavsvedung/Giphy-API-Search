$(document).ready(function(){    
    
    // Main search function
    var getResult = function(){ 
        var searchPhrase = $("#term").val();
        if(searchPhrase == ''){ 
            $('main').html("<p>Please type something in the search field above.</p>");  
        } else {
            $('main').html("<p style='color: white;'><span class='fa fa-cog fa-spin fa-3x fa-fw'></span><span class='sr-only'>Searching...</span></p>");
            var giphyAPI = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC";
            var giphyOptions = {
                q: searchPhrase,
                rating: "g",
                limit: "24"
            };
            function displayGIFs(json) {
                var resultHTML = '';
                if(json.pagination.total_count == 0){
                    $('main').html('<p>Nothing found.</p><p class="bigicon"><span class="fa fa-frown-o" aria-hidden="true"></span></p>');
                } else {
                    $.each(json.data, function(i, gif) {
                        resultHTML += '<a class="test-popup-link" href="' + gif.images.downsized_large.url + '">';
                        resultHTML += '<img class="thumbnail" src="' + gif.images.fixed_width_downsampled.url + '"></a>';
                    });
                    $("main").html(resultHTML);
                    $('.test-popup-link').magnificPopup({
                        type: 'image'
                    }); 
                }       
            }
            $.getJSON(giphyAPI, giphyOptions, displayGIFs);
        }
    }

    // Event starters
    $('#search').click(getResult);
    $('#term').keyup(function(event){ 
        if(event.keyCode == 13){ 
            getResult(); 
        }
    });

    // Modal window plugin loader
    $('.image-link').magnificPopup({type:'image'});

});