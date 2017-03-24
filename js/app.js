//state mgmt
var quizState = {
	quizQuestions: [
	{
		question: "If you are in a car going 60 \
		mph consistently, how long would it take you to\
		 drive just about 60 miles?",
		answer: "60 minutes",
		choices: ["45 minutes", "2 hours", "60 minutes", "10 minutes"],
		rendered: false
	}
	],
	//default value of the question number
	questionCounter: 1
}

var answerState =  {
		currentAnswer: null,
		currentChoice: null
}

var resultState = {
	result: false
}

function verifyChoice(state) {
	//add html of wrong or right here. 
	return answerState.currentChoice === answerState.currentAnswer;
}

function currentChoice(state, choice) {
	state.currentChoice = choice
}

//dom manipulation
function getCurrentQuestion(state, secondState) {
	for (var i = 0, length = state.quizQuestions.length; i >= 0; i++) {
		var rendered = state.quizQuestions[i].rendered;
		if(!rendered) {
			rendered = true;
			secondState.currentAnswer = state.quizQuestions[i].answer;
			return createHTML(quizState, i);
		}
	}
}

function createHTML(state, index) {
	var question = state.quizQuestions[index].question;
	var questionHTML = 
	'<div class="question-container">\
		<div class="row">\
			<div class="col-12 quiz-question">\
				<div class="question-header">Question:</div>\
					<div class="question">' + question +
					'</div>\
				</div>\
			</div>\
		</div>'

	function choicesHTML(state, index) {
		var letters = ['A ', 'B ', 'C ', 'D '];
		var buttons = '<div class="row button-container hide-submit js-submit-container">\
							<div class="col-12">\
								<button type="submit" class="blue-button js-submit-button">Submit</button>\
							</div>\
						</div>\
						<div class="row next-button-container js-next-button hide-next">\
							<div class="col-12">\
								<button type="submit" class="black-button">Next</button>\
							</div>\
						</div>'
		var html = '';
		for(var i = 0, length = state.quizQuestions[index].choices.length; i < length; i++) {
			html += '<div class="choice-container js-choice"><div class="row"><div class="col-12 quiz-choice">\
			<span class="letter-choice letter">' + letters[i] + '</span><span class="letter-choice choice">'+ 
			state.quizQuestions[index].choices[i] + '</span> </div> </div> </div>';
		} 
		return renderQuestion($('.js-main'), questionHTML + '<div class="choices-container">' + html + '</div>' + buttons);
	}
	choicesHTML(state, index);
}

function renderQuestion(element, question) {
	element.html(question);
}

function renderInstructions(currentTarget) {
	currentTarget.toggleClass('js-start-button').addClass('js-got-it');
	currentTarget.text('Got It!');
	currentTarget.closest('main').find('span').text('Just Simply Click Answer And Submit!');
	currentTarget.closest('main').find('h1').text('Quiz Rules');
}

//listeners
function clickSubmit() {
	$('main').on('click', '.js-submit-button', function(event) {
		event.preventDefault();
		$(this).addClass('hide-submit');
		//this is where answer gets checked!
		verifyChoice(answerState);
		var nextButton = $(this).closest('main').find('div.js-next-button');
		nextButton.removeClass('hide-next');
	});
}

function clickAnswerHandler() {
	$('main').on('click', '.js-choice', function(event) {
		event.preventDefault();
		//next five lines change css to highlight user answer and show submit button
		var submitButton = $(this).closest('main').find('div.js-submit-container');
		submitButton.removeClass('hide-submit');
		$('.js-choice').removeClass('chosen');
		$(this).addClass('chosen');
		///
		currentChoice(answerState, $(this).find('span.choice').text());
	});
}

function gotItHandler() {
	$('main').on('click', '.js-got-it', function(event) {
		event.preventDefault();
		getCurrentQuestion(quizState, answerState);
	});	
}

function startQuizHandler() {
	$('main').on('click', '.js-start-button', function(event) {
		event.preventDefault();
		var currentTarget = $(this)
		renderInstructions(currentTarget);
	});
}

$(function() {
	startQuizHandler();
	gotItHandler(); 
	clickAnswerHandler();
	clickSubmit();
}) 