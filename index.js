const express = require('express');
const { getQuestion, isCorrectAnswer } = require('./utils/mathUtilities');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.use(express.static('public')); // To serve static files (e.g., CSS)

let numberOfQuestions = 0;
let savingStreak = 0;
let otherQuestions = 0;
let currentQuestion = null;
let leaderboard = [];

//Some routes required for full functionality are missing here. Only get routes should be required
app.get('/', (request, response) => {
    if(leaderboard && leaderboard.length >0){
        let lastStoredQuiz = leaderboard.at(-1);
        let lastStreak = lastStoredQuiz.numberOfQuestions;
        console.log(lastStoredQuiz)
        console.log(lastStreak)
        response.render('index',{lastStreak:lastStreak})
    } else{
        let lastStreak = 0;
        response.render('index', {lastStreak:lastStreak})
    }
});

app.get('/quiz', (request, response) => {
    currentQuestion = getQuestion();

    response.render('quiz', { numberOfQuestions: numberOfQuestions, currentQuestion: currentQuestion, otherQuestions: otherQuestions});
});

//Handles quiz submissions.
app.post('/quiz', (request, response) => {
    const { answer } = request.body;

    const userInput = answer;

    console.log(`Answer: ${userInput}`);

    if(isCorrectAnswer(currentQuestion,userInput)){
        console.log('Correct');
        numberOfQuestions++;
        console.log(numberOfQuestions)
        savingStreak = 0;
        response.redirect("/quiz")
    } else {
        console.log('Incorrect');
        leaderboard.push({ numberOfQuestions: numberOfQuestions, date:new Date()});
        savingStreak = numberOfQuestions;
        numberOfQuestions = 0;
        console.log(otherQuestions);
        console.log(numberOfQuestions);
        console.log(savingStreak)
        response.redirect('/completion');
    }

    //answer will contain the value the user entered on the quiz page
    //Logic must be added here to check if the answer is correct, then track the streak and redirect properly
    //By default we'll just redirect to the homepage again.
});

app.get('/leaderboard', (request, response) => {
    const topStreak = leaderboard.sort((a, b) => b.numberOfQuestions - a.numberOfQuestions).slice(0, 10);
    
    response.render('leaderboard', { leaderboard: topStreak });
})


app.get('/completion', (request, response) => {
    response.render('completion', { otherQuestions: otherQuestions, numberOfQuestions: numberOfQuestions, savingStreak:savingStreak });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});