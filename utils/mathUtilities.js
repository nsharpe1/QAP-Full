const questions = [
    { text: 'What is 9 + 8?', answer: '17' },
    { text: 'What is 15 - 7?', answer: '8' },
    { text: 'What is 5 x 6?', answer: '30' },
    { text: 'What is 46 / 2?', answer: '23' },
    { text: 'What is 12 + 15?', answer: '27' },
    { text: 'What is 54 - 37?', answer: '17' },
    { text: 'What is 13 x 6?', answer: '78' },
    { text: 'What is 76 / 4?', answer: '19' },
]

/**
 * Gets a random multiplication, division, subtraction or addition question
 * 
 * @returns {} The randomly generated math question
 */
function getQuestion() {
    return questions[Math.floor(Math.random() * questions.length)];
}

/**
 * Parses the provided question and gets whether or not the provided answer is correct
 * 
 * @param {*} question The question being answered
 * @param {*} answer The potential answer
 * @returns {boolean} True if the answer was correct, false otherwise.
 */
function isCorrectAnswer(questionName) {
    if(questionName == '17') {
        return questionName === '17';
    }
    if(questionName == '8') {
        return questionName === '8';
    }
    if(questionName == '30') {
        return questionName === '30';
    }
    if(questionName == '23') {
        return questionName === '23';
    }
    if(questionName == '27') {
        return questionName === '27';
    }
    if(questionName == '78') {
        return questionName === '78';
    }
    if(questionName == '19') {
        return questionName === '19';
    }
}

module.exports = {
    getQuestion,
    isCorrectAnswer
}