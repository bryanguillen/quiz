//dom manipulation
function renderInstructions(currentTarget) {
	//do this programatically TODO!!fix this!!
	//THINK about doing this as a loop using object.
	currentTarget.toggleClass('js-start-button').addClass('js-got-it')
	currentTarget.text('Got It!')
	currentTarget.closest('main').find('span').text('Just Simply Click Answer And Submit!');
	currentTarget.closest('main').find('h1').text('Quiz Rules');
}

//listeners
function gotItHandler() {
	$('.container-welcome').on('click', '.js-got-it', function(event) {
		event.preventDefault();
		console.log('hello world!')
	});	
}

function startQuizHandler() {
	$('.container-welcome').on('click', '.js-start-button', function(event) {
		event.preventDefault();
		var currentTarget = $(this)
		renderInstructions(currentTarget);
	});
}

$(function() {
	startQuizHandler();
	gotItHandler(); 
}) 