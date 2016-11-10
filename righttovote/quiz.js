
const runquiz = (questions, index) => {
    const question = questions[index];
    document.getElementById('question').innerText = question.q;
    const choices = document.getElementById('choices')
    if (question.t === 'str' || question.t == 'int') {
        const verify = "verify('" + question.a + "', " + index + 1 + ")";
        const formType = question.t === 'str' ? 'text' : 'number';
        choices.innerHTML = '<input type="' + formType + '" id="lookhere" placeholder="Your answer here" class="form-control"></input><br/><button class="btn btn-primary" id="submit" onclick="' + verify + '">Submit</button>';
        document.getElementById("lookhere")
            .addEventListener("keyup", function (event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    document.getElementById("submit").click();
                }
            });
    }
}

const verify = (answer, nextIndex) => {
    const userAnswer = document.getElementById('lookhere').value;
    if (userAnswer.toLowerCase() === answer.toLowerCase()) {
        explain.innerHTML = '<div class="alert alert-success">Correct!</div>';
        setTimeout(() => { explain.innerHTML = ""; runquiz(questions, nextIndex); }, 1000);
    } else {
        const explain = document.getElementById('explain');
        explain.innerHTML = '<div class="alert alert-danger">Wrong, Please try again!</div>';
        setTimeout(() => { explain.innerHTML = "" }, 1000);
    }
}

const questions = [
    { "q": "What is the full name of first American President?", "t": "str", "a": "George Washington" },
    { "q": "How many states does the United States have?", "t": "int", "a": 50 },
    { "q": "What are the two major parties in the United States?", "t": "cmc", "c": ["The Republican Party", "The Democratic Party", "The Green Party", "The Libertarian Party"], "a": [0, 1] },
    { "q": "Which President was the first and last to use nuclear weapons?", "t": "rmc", "c": ["Winston Churchill", "Harry Truman", "George H. Bush", "Franklin Roosevelt"], "a": 1 },
];

runquiz(questions, 0);