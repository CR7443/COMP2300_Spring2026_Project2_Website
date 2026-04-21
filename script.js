const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");

// Update these values to match the correct choices for each question.
const correctAnswers = {
    question1: "b",
    question2: "b",
    question3: "c",
    question4: "b",
    question5: "a"
};

function getEncouragingMessage(score, totalQuestions) {
    if (score === totalQuestions) {
        return "Excellent work. You got every question correct.";
    }

    if (score >= totalQuestions - 1) {
        return "Great job. You clearly paid close attention.";
    }

    if (score >= Math.ceil(totalQuestions / 2)) {
        return "Nice effort. You picked up a lot from the site.";
    }

    return "Good try. Review the pages and give it another shot.";
}

if (quizForm && quizResult) {
    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const totalQuestions = Object.keys(correctAnswers).length;
        let score = 0;
        let answeredQuestions = 0;

        for (const [questionName, correctAnswer] of Object.entries(correctAnswers)) {
            const selectedChoice = quizForm.querySelector(`input[name="${questionName}"]:checked`);

            if (selectedChoice) {
                answeredQuestions += 1;

                if (selectedChoice.value === correctAnswer) {
                    score += 1;
                }
            }
        }

        if (answeredQuestions < totalQuestions) {
            quizResult.textContent = `Please answer all ${totalQuestions} questions before submitting the quiz.`;
            return;
        }

        const percentage = Math.round((score / totalQuestions) * 100);
        const message = getEncouragingMessage(score, totalQuestions);

        quizResult.textContent = `You scored ${score} out of ${totalQuestions} (${percentage}%). ${message}`;
    });

    quizForm.addEventListener("reset", function () {
        quizResult.textContent = "";
    });
}
