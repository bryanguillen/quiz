//state mgmt
var questionsState = {
	quizQuestions: [
	{
		question: 'If you are in a car going 60' +
		' mph consistently, how long would it take you to' +
		' drive just about 60 miles?',
		answer: '60 minutes',
		choices: ['45 minutes', '2 hours', '60 minutes', '10 minutes']
	},
	{
		question: 'You are in an elevator with 3 other people.' + 
		' You weigh 150 lbs, the person next to you weighs the' +
		' same as you, and the two other people in front of you ' + 
		'weigh 100 pounds. The elevator\'s max capacity is 650 lbs.' + 
		' What weight should the person be, if you want to get stuck in the elevator as an excuse to miss work?',
		answer: '150 lbs',
		choices: ['145 lbs', '150 lbs', '170 lbs', '200 lbs']
	},
	{
		question: 'You walk west 3 miles and then south 4 miles. ' +
		'Instead of taking that long way, you realize that the quickest way from point ' + 
   		'A to point B is a straight line. If you take quickest way, how many miles would you then walk?',
   		answer: '5 miles',
   		choices: ['10 miles', '4 miles', '3 miles', '5 miles']
	},
	{
		question: 'You have 3 siblings. One is 5 foot 8 inches tall, ' +
		'another 6 foot tall, another 5 foot 5 tall, and you 6 foot tall. Your parents ' +
   		'are having another baby after 20 years. About how tall should you expect this new baby to be when its your age?',
   		answer: '5 foot 9 inches',
   		choices: ['5 foot 9 inches', '6 foot 2 inches', '5 foot 6 inches', '5 foot 7 inches']
	},
	{
		question: 'You weigh 180 lbs, and you need to be under 167 lbs, ' +
		'but over 160 lbs, to make weight for your big wrestling match. How many ' +
   		'pounds should you at least lose?',
   		answer: '14 lbs',
   		choices: ['14 lbs', '20 lbs', '17 lbs', '200 lbs']
	},
	{
		question: 'You have 10,000 dollars in the bank on the first day of the month. ' +
		'And now, you need to pay rent and other expenses. ' + 
   		'Your rent is 1500 dollars a month, you eat 200 $ worth of groceries a month, car insurance is 100 $ a month, car ' +
  		'payment 400$ a month, and at most 200$ for going out and having fun. How much should you budget for the month? ',
  		answer: '2400 dollars',
  		choices: ['1700 dollars', '2400 dollars', '2100 dollars', '2200 dollars']
	},
	{
		question: 'Your car can take 10 gallons of gas, in order to fill up. ' +
		'If your car is on E (empty) and gas is 2.50$, how much will it cost ' +
   		'to fill up your car?',
   		answer: '25.00 $',
   		choices: ['20.00 $', '15.00 $', '25.00 $', '30.00 $']
	},
	{
		question: 'At the grocery store you see fruits and vegetables on special. ' +
		'You zoom in on lemons because you need them. Good news, the lemons ' +
   		'are on special, 10 lemons for 3$. Is this really a special. How much is each lemon going to cost you?',
   		answer: '0.30 $',
   		choices: ['I HAVE NO CLUE', '0.03 $', '0.30 $', 'NONE OF THE ABOVE']
	},
	{
		question: 'How many degrees does a car tire roatate while driving?',
		answer: '360',
		choices: ['What? dk', '360', '180', '0']
	},
	{
		question: 'If you get two 90s and an 80 on tests, what must you get in order on the last test ' +
   		'in order to get a 90 average for the class.',
   		answer: '100',
   		choices: ['100', '95', '80', 'None Of The Above']
	}
	],
}

var statsState = {
	score: 0,
	questionNumber: 1
}

var answerState =  {
	currentAnswer: null,
	currentChoice: null
}

function getCurrentQuestion(state, secondState) {
	var index = state.quizQuestions[Math.floor(Math.random() * state.quizQuestions.length)];
	secondState.currentAnswer = index.answer;
	return createHTML(questionsState, index);
}

function currentChoice(state, choice) {
	state.currentChoice = choice
}

function checkQuestion(state, stateTwo) {
	state.questionNumber += 1;
	if(state.questionNumber > 5) {
		verifyChoice(state, stateTwo);
		return renderEndHTML(state.score, $('main'));
	} 
	else {
		verifyChoice(state, stateTwo)
	}
}

function verifyChoice(state, stateTwo) {
	if(stateTwo.currentChoice === stateTwo.currentAnswer) {
		state.score += 1;
		showCorrectMessage(stateTwo.currentChoice);
	}
	else {
		showIncorrectMessage(stateTwo.currentAnswer, stateTwo.currentChoice)
	}
}

function resetStats(state) {
	state.questionNumber = 1;
	state.score = 0;
}

//dom manipulation
function renderInstructions(element) {
	var instructions = '<main class="js-main">' +
						'<div class="container-welcome">' +
							'<div class="row">' +
								'<div class="col-12 header">' +
									'<h1 class="welcome">Quiz Rules</h1>' +
									'<span>Just Simply Click Answer And Scroll Down & Submit!</span>' +
								'</div>' +
							'</div>' +
							'<div class="row">' +
								'<div class="col-12 button-container">' +
									'<button class="js-got-it blue-button"><span>Got It!</span></button>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</main>'
	element.html(instructions)
}

function createHTML(state, index) {
	var question = index.question;
	var questionHTML = 
	'<div class="question-container">' +
		'<div class="row">' +
			'<div class="col-12 quiz-question">' +
				'<div class="question-header">Question: ' + statsState.questionNumber +' of 5'  + '</div>' +
					'<div class="question">' + question + 
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>'

	function choicesHTML(state, index) {
		var message = '<div class="result-message hide-result">' +
							'<div class="row">' +
								'<div class="col-12">' +
									'<span class="correct-message"></span>' +
									'<span class="incorrect-message"></span>' +
								'</div>' +
							'</div>' +
						'</div>'
		var buttons = '<div class="row button-container hide-submit js-submit-container">' +
							'<div class="col-12">' +
								'<button type="submit" class="blue-button js-submit-button">Submit</button>' +
							'</div>' +
						'</div>' +
						'<div class="row next-button-container hide-next">' +
							'<div class="col-12">' +
								'<button type="submit" class="black-button js-next-button">Next</button>' +
							'</div>' +
						'</div>'
		var html = '';
		for(var i = 0, length = index.choices.length; i < length; i++) {
			html += '<div class="choice-container js-choice"><div class="row"><div class="col-12 quiz-choice">\
			<span class="letter-choice choice">'+ 
			index.choices[i] + '</span> </div> </div> </div>';
		} 
		return renderQuestion($('main'), questionHTML  + '<div class="choices-container">' + message + html + '</div>' + buttons);
	}
	choicesHTML(state, index);
}

function renderQuestion(element, question) {
	element.html(question);
}

function showCorrectMessage(choice) {
	$('main').find('div.result-message').removeClass('hide-result');
	$('main').find('span.correct-message').text(choice + ' is correct!');
}

function showIncorrectMessage(answer, choice) {
	$('main').find('div.result-message').removeClass('hide-result');
	$('main').find('span.incorrect-message').text(choice + ' is wrong, the correct choice is ' + answer);
}

function renderEndHTML(score, element) {
	var end = '<main class="js-main">' +
				'<div class="container-end">' +
					'<div class="row">' +
						'<div class="col-12 header">' +
							'<h1 class="end">THE END</h1>' +
							'<span>You socred a ' + score + ' out of 5!</span>' +
						'</div>' +
					'</div>' +
					'<div class="row">' +
						'<div class="col-12 button-container">' +
							'<button class="js-restart-button blue-button"><span>Restart Quiz!</span></button>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</main>'
	element.html(end)
}

//listeners
function clickRestartHandler() {
	$('main').on('click', '.js-restart-button', function(event) {
		event.preventDefault();
		resetStats(statsState);
		getCurrentQuestion(questionsState, answerState);
	});
}

function clickNextHandler() {
	$('main').on('click', '.js-next-button', function(event) {
		event.preventDefault();
		getCurrentQuestion(questionsState, answerState);
	});
}

function clickSubmitHanlder() {
	$('main').on('click', '.js-submit-button', function(event) {
		event.preventDefault();
		$(this).addClass('hide-submit');
		checkQuestion(statsState, answerState);
		$(this).closest('main').find('div.next-button-container').removeClass('hide-next');
	});
}

function clickAnswerHandler() {
	$('main').on('click', '.js-choice', function(event) {
		event.preventDefault();
		//next five lines change css to highlight user answer and show submit button
		$(this).closest('main').find('div.js-submit-container').removeClass('hide-submit');
		$('.js-choice').removeClass('chosen');
		$(this).addClass('chosen');
		currentChoice(answerState, $(this).find('span.choice').text());
	});
}

function gotItHandler() {
	$('main').on('click', '.js-got-it', function(event) {
		event.preventDefault();
		getCurrentQuestion(questionsState, answerState);
	});	
}

function startQuizHandler() {
	$('main').on('click', '.js-start-button', function(event) {
		event.preventDefault();
		renderInstructions($('main'));
	});
}

$(function() {
	startQuizHandler();
	gotItHandler(); 
	clickAnswerHandler();
	clickSubmitHanlder();
	clickNextHandler();
	clickRestartHandler();
}) 