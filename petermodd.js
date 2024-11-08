document.addEventListener("DOMContentLoaded", function() {
    // Waits for the DOM to fully load before running the script

    const form = document.getElementById("quizForm"); // Accesses the form element
    const quizResult = document.getElementById("quizResult"); // Accesses the element to display quiz results

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents form from submitting and refreshing the page
        clearPreviousErrors(); // Clears any previous validation error messages

        if (!validateForm()) { // Validates form; if invalid, shows errors and stops
            showValidationErrors();
            return;
        }

        let score = calculateScore(); // Calculates the score based on answers
        displayScore(score); // Displays the score
        disableInputsAfterSubmission(); // Disables form inputs after submission
        showSuccessMessage(score); // Displays a success message along with the score
        showCorrectAnswers(); // Highlights correct answers for feedback
    });

    function clearPreviousErrors() {
        // Clears any previous error messages and invalid styling from inputs
        document.querySelectorAll('.invalid-feedback').forEach(error => {
            error.style.display = 'none'; // Hides all error messages
        });
        document.querySelectorAll('input, textarea').forEach(input => {
            input.classList.remove('is-invalid'); // Removes invalid styling from all inputs
        });
    }

    function validateForm() {
        let isValid = true;
        // Iterates through specific fields to check validity of first name, last name, and email
        ['firstName', 'lastName', 'email'].forEach(fieldId => {
            const input = document.getElementById(fieldId);
            if (!input.checkValidity()) { // Checks if input is valid according to HTML validation rules
                isValid = false; // Sets form as invalid if any field fails
                input.classList.add('is-invalid'); // Adds invalid styling
                const errorSpan = input.nextElementSibling; // Gets associated error message element
                if (errorSpan) {
                    errorSpan.style.display = 'block'; // Shows the error message
                }
            }
        });

        return isValid; // Returns true if all fields are valid, false otherwise
    }

    function calculateScore() {
        let score = 0;
        // Calculates score by checking each answer against the correct answer
        score += checkAnswer('aiApplication', 'Data Analysis');
        score += checkAnswer('aiTechnology', 'Natural Language Processing');
        score += checkCheckboxAnswers('aiImpact', ['Job Creation', 'Job Displacement', 'New Industries', 'Increased Efficiency']);
        score += checkAnswer('aiFather', 'John McCarthy');
        return score; // Returns total score
    }

    function checkAnswer(questionName, correctAnswer) {
        // Checks if the selected answer matches the correct answer for a question
        const selected = document.querySelector(`input[name="${questionName}"]:checked`);
        return selected && selected.value === correctAnswer ? 1 : 0; // Returns 1 if correct, 0 if incorrect
    }

    function checkCheckboxAnswers(questionName, correctAnswers) {
        // Checks if all correct options in a checkbox question are selected
        const selectedOptions = document.querySelectorAll(`input[name="${questionName}"]:checked`);
        let correctCount = 0;
        selectedOptions.forEach(option => {
            if (correctAnswers.includes(option.value)) {
                correctCount++; // Increments count for each correct selection
            }
        });
        return correctCount === correctAnswers.length ? 1 : 0; // Full point if all correct options are selected
    }

    function displayScore(score) {
        // Displays the score in the quiz result element
        quizResult.textContent = `Your score is ${score} out of a possible 4.`;
    }

    function showSuccessMessage(score) {
        // Appends a success message to the displayed score
        quizResult.textContent += ' Information entered correctly!';
        quizResult.classList.add('success-message'); // Adds a CSS class for styling
    }

    function disableInputsAfterSubmission() {
        // Disables all form inputs after the form is submitted
        document.querySelectorAll('input, textarea').forEach(input => {
            input.disabled = true;
        });
    }

    function showCorrectAnswers() {
        // Highlights the correct answers in green and adds a "Correct answer" label
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
                // Handles checkbox answers by iterating over correct values
                inputs.forEach(input => {
                    if (correctValue.includes(input.value)) {
                        const label = document.querySelector(`label[for="${input.id}"]`);
                        label.style.color = 'green'; // Changes label color to green for correct answers
                        label.textContent += ' (Correct answer)'; // Adds "Correct answer" text
                    }
                });
            } else {
                // Handles single-answer questions by setting color and text for correct answer
                inputs.forEach(input => {
                    if (input.value === correctValue) {
                        const label = document.querySelector(`label[for="${input.id}"]`);
                        label.style.color = 'green';
                        label.textContent += ' (Correct answer)';
                    }
                });
            }
        });
    }
});
