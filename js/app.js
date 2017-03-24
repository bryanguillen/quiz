//state mgmt
var quizState = {
	quizQuestions: [
	{
		question: "If you are in a car going 60 \
		mph consistently, how long would it take you to\
		 drive just about 60 miles?",
		answer: "60 mph",
		choices: ["45 minutes", "2 hours", "60 minutes", "10 minutes"],
		rendered: false
	}
	]
}

var preQuizState = {

}

//dom manipulation
function getCurrentQuestion(state) {
	for (var i = 0, length = state.quizQuestions.length; i >= 0; i++) {
		var rendered = state.quizQuestions[i].rendered;
		if(!rendered) {
			return createHTML(quizState, i);
		}
	}
}

function createHTML(state, index) {
	var question = 
	'<div class="question-container">\
		<div class="row">\
			<div class="col-12 quiz-question">\
				<div class="question-header">Question:</div>\
					<div class="question">' + state.quizQuestions[index].question +
					'</div>\
				</div>\
			</div>\
		</div>'

	function choicesHTML(state, index) {
		var letters = ['A', 'B', 'C', 'D'];
		var html = '';
		for(var i = 0, length = state.quizQuestions[index].choices.length; i < length; i++) {
			html += '<div class="choice-container"><div class="row"><div class="col-12 quiz-choice">\
			<span class="letter-choice letter">' + letters[i] + '</span><span class="letter-choice">'+ 
			state.quizQuestions[index].choices[i] + '</span> </div> </div> </div>';
		} 
		return renderQuestion($('main'), question + '<div class="choices-container">' + html + '</div>');
	}
	choicesHTML(state, index);
}

function renderQuestion(element, question) {
	element.html(question);
}

function renderInstructions(currentTarget) {
	//do this programatically TODO!!fix this!!
	currentTarget.toggleClass('js-start-button').addClass('js-got-it');
	currentTarget.text('Got It!');
	currentTarget.closest('main').find('span').text('Just Simply Click Answer And Submit!');
	currentTarget.closest('main').find('h1').text('Quiz Rules');
}

//listeners
function gotItHandler() {
	$('.container-welcome').on('click', '.js-got-it', function(event) {
		event.preventDefault();
		getCurrentQuestion(quizState);
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