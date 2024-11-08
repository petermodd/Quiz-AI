document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("quizForm");
    const quizResult = document.getElementById("quizResult");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents form from submitting and refreshing the page
        clearPreviousErrors(); // Clears any previous validation error messages

        if (!validateForm()) {
            showValidationErrors();
            return;
        }

        if (!mandatoryQuestionsAnswered()) {
            showMandatoryQuestionsError();
            return;
        }

        let score = calculateScore(); // Calculates the score based on answers
        displayScore(score); // Displays the score
        disableInputsAfterSubmission(); // Disables form inputs after submission
        showSuccessMessage(score); // Displays a success message along with the score
        showCorrectAnswers(); // Highlights correct answers for feedback
    });
    
    function clearPreviousErrors() {
        document.querySelectorAll('.invalid-feedback').forEach(error => {
            error.style.display = 'none';
        });
        document.querySelectorAll('input, textarea').forEach(input => {
            input.classList.remove('is-invalid');
        });
    }

    function validateForm() {
        let isValid = true;
        ['firstName', 'lastName', 'email'].forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (!input.checkValidity()) {
                isValid = false;
                input.classList.add('is-invalid');
                const errorSpan = input.nextElementSibling;
                errorSpan.style.display = 'block';
            }
        });
        return isValid;
    }

    function mandatoryQuestionsAnswered() {
        let allAnswered = true;
        const requiredQuestions = ['aiTechnology', 'aiFather'];
        requiredQuestions.forEach(question => {
            if (!document.querySelector(`input[name="${question}"]:checked`)) {
                allAnswered = false;
                document.getElementById(question).nextElementSibling.style.display = 'block';
            }
        });
        return allAnswered;
    }

    function showMandatoryQuestionsError() {
        requiredQuestions.forEach(question => {
            const feedbackElement = document.getElementById(question).nextElementSibling;
            feedbackElement.style.display = 'block';
            feedbackElement.textContent = 'This question is mandatory.';
        });
    }

    function calculateScore() {
        let score = 0;
        score += checkAnswer('aiApplication', 'Data Analysis');
        score += checkAnswer('aiTechnology', 'Natural Language Processing');
        score += checkCheckboxAnswers('aiImpact', ['Job Creation', 'Job Displacement', 'New Industries', 'Increased Efficiency']);
        score += checkAnswer('aiFather', 'John McCarthy');
        return score;
    }

    function checkAnswer(questionName, correctAnswer) {
        const selected = document.querySelector(`input[name="${questionName}"]:checked`);
        return selected && selected.value === correctAnswer ? 1 : 0;
    }

    function checkCheckboxAnswers(questionName, correctAnswers) {
        const selectedOptions = document.querySelectorAll(`input[name="${questionName}"]:checked`);
        let correctCount = 0;
        selectedOptions.forEach(option => {
            if (correctAnswers.includes(option.value)) {
                correctCount++;
            }
        });
        return correctCount === correctAnswers.length ? 1 : 0;
    }

    function displayScore(score) {
        quizResult.textContent = `Your score is ${score} out of a possible 4.`;
    }

    function showSuccessMessage(score) {
        quizResult.textContent += ' Information entered correctly!';
        quizResult.classList.add('success-message');
    }

    function disableInputsAfterSubmission() {
        document.querySelectorAll('input, textarea').forEach(input => {
            input.disabled = true;
        });
    }

    function showCorrectAnswers() {
        const correctAnswers = {
            'aiApplication': 'Data Analysis',
            'aiTechnology': 'Natural Language Processing',
            'aiImpact': ['Job Creation', 'Job Displacement', 'New Industries', 'Increased Efficiency'],
            'aiFather': 'John McCarthy'
        };
        Object.keys(correctAnswers).forEach(key => {
            const correctValue = correctAnswers[key];
            const inputs = document.querySelectorAll(`input[name="${key}"]`);
            if (Array.isArray(correctValue)) {
                inputs.forEach(input => {
                    if (correctValue.includes(input.value)) {
                        const label = document.querySelector(`label[for="${input.id}"]`);
                        label.style.color = 'green';
                        label.textContent = input.value + ' (Correct answer)';
                    }
                });
            } else {
                inputs.forEach(input => {
                    if (input.value === correctValue) {
                        const label = document.querySelector(`label[for="${input.id}"]`);
                        label.style.color = 'green';
                        label.textContent = input.value + ' (Correct answer)';
                    }
                });
            }
        });
    }
});
