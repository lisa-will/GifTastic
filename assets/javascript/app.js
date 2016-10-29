// Emotional variables. 
var emotions = ["Happy", "Sad", "Sassy", "Hangry", "Frustrated", "Loved", "Excited", "Bored", "Sleepy", "Awkward", "Mind Blown", "Silly"];

// This function pulls the images using the giphyapi key + emotions index + limits results to 10! 
function displayInfo (){
		$('emoView').empty();
		var emo = $(this).attr("data-name");
		var api = "http://api.giphy.com/v1/gifs/search?q=" + emo + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({
				url: api,
				method: 'GET' 
			})
			.done(function(response) {
				var results = response.data;

				for (var i = 0; i < results.length; i++) {
					if (results[i].rating == "r" || results[i].rating == "pg-13") {

					}
					else {

						var gifDiv = $('<div class="item">');
						var rating = results[i].rating;
						var p = $('<p>').text("Rating: " + rating);

						var emoImage = $('<img class="gifImage">');
						emoImage.attr({
							src: results[i].images.fixed_height_still.url,
							"data-still": results[i].images.fixed_height_still.url,
							"data-animate": results[i].images.fixed_height.url,
							"data-state": "still",

						});

						gifDiv.append(p);
						gifDiv.append(emoImage);
						gifDiv.addClass("gifs");
						$('#emoView').prepend(gifDiv);
							}
						
						}
		// This on click function animates still gifs and vice-versa. 				
		$(".gifImage").on("click", function(){
				var state = $(this).attr('data-state');
					if (state == 'still'){
						$(this).attr('src', $(this).data('animate'));
						$(this).attr('data-state', 'animate');
					} else {
						$(this).attr('src', $(this).data('still'));
						$(this).attr('data-state', 'still');
					}
					console.log($(this).attr("src"));
					});


		});

}

function renderButtons(){
		$("#buttonsView").empty();

		for (var i = 0; i < emotions.length; i++) {
				var a = $('<button>');
				a.addClass('emo');
				a.attr('data-name', emotions[i]);
				a.text(emotions[i]);
				$('#buttonsView').append(a);

		}

}
// Adding New Emo-tion to index. 
$('#addEmo').on('click', function(){
		var emo = $("#emo-input").val().trim();
		emotions.push(emo);
		renderButtons();
		return false;

});

$(document).on('click', '.emo' , displayInfo);

renderButtons();




