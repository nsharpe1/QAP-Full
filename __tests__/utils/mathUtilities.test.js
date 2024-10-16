const { isCorrectAnswer, getQuestion } = require("../../utils/mathUtilities");
const { describe, test, expect} = require('@jest/globals');

describe("Test for getQuestion", () => {
    test('Question is properly generated', () => {
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
        const randomQuestion = getQuestion();
        expect(questions).toContainEqual(randomQuestion);
    })
});

describe('Test 1 for isCorrectAnswer', () => {
    test('Correct answer', () => {
        expect(isCorrectAnswer('17')).toBe(true);
    });
});

describe('Test 2 for isCorrectAnswer', () => {
    test('Incorrect answer', () => {
        expect(isCorrectAnswer('8')).toBe(false);
    });
});

