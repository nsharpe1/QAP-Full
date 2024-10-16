const express = require('express');
const { getQuestion, isCorrectAnswer } = require('./utils/mathUtilities');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public')); // To serve static files (e.g., CSS)

let numberOfQuestions = 0;
let otherQuestions = 0;
let currentQuestion = null;
let leaderboard = [];

//Some routes required for full functionality are missing here. Only get routes should be required
app.get('/', (request, response) => {
    response.render('index');
});

app.get('/quiz', (request, response) => {
    currentQuestion = getQuestion();
    if(isCorrectAnswer(currentQuestion)){
        numberOfQuestions++;
    } else {
        numberOfQuestions = 0;
    }
    response.render('quiz', { numberOfQuestions: numberOfQuestions, currentQuestion: currentQuestion, otherQuestions: otherQuestions});
});

//Handles quiz submissions.
app.post('/quiz', (request, response) => {
    const { answer } = request.body;

    const userInput = answer;
    
    console.log(`Answer: ${userInput}`);

    if(isCorrectAnswer(userInput)){
        console.log('Correct');
        numberOfQuestions++;
        console.log(numberOfQuestions);
    } else {
        console.log('Incorrect');
        otherQuestions++;
        leaderboard.push({otherQuestions: otherQuestions, date: new Date()});
        console.log(otherQuestions);
        response.redirect('/completion');

    }

    //answer will contain the value the user entered on the quiz page
    //Logic must be added here to check if the answer is correct, then track the streak and redirect properly
    //By default we'll just redirect to the homepage again.
});

app.get('/leaderboard', (request, response) => {
    const topStreak = leaderboard.sort((a, b) => b.otherQuestions - a.otherQuestions).slice(0, 10);
    response.render('leaderboard', { leaderboard: topStreak });
})


app.get('/completion', (request, response) => {
    response.render('completion', { otherQuestions: otherQuestions });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});