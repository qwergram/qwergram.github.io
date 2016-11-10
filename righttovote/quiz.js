
const runquiz = (questions, index) => {
    if (index >= questions.length) {
        console.log(index);
        alert(index);
        location.href = '/righttovote/2.html'; 
    }
    const question = questions[index];
    document.getElementById('question').innerText = question.q;
    const choices = document.getElementById('choices')
    if (question.t === 'str' || question.t == 'int') {
        index++;
        const verify = "verify('" + question.a + "', " + index + ")";
        const formType = question.t === 'str' ? 'text' : 'number';
        choices.innerHTML = '<input type="' + formType + '" id="lookhere" placeholder="Your answer here" class="form-control"></input><br/><button class="btn btn-primary" id="submit" onclick="' + verify + '">Submit</button>';
        document.getElementById("lookhere")
            .addEventListener("keyup", function(event) {
                event.preventDefault();
                if (event.keyCode == 13) {
                    document.getElementById("submit").click();
                }
            });
    } else if (question.t === 'cmc') {
        let choiceHtml = '';
        for (const i in question.c) {
            const choice = question.c[i];
            choiceHtml += '<div class="choice"><input type="checkbox"  id="' + i.toString() + '">' + choice + '</div>'
        }
        index++;
        choices.innerHTML = choiceHtml + '<button id="submit" class="btn btn-primary" onclick="verifyCmc([' + question.a + '], ' + (index) + ')">Submit</button>';
    } else if (question.t === 'rmc') {
        let choiceHtml = '';
        for (const i in question.c) {
            const choice = question.c[i];
            choiceHtml += '<div class="choice"><input type="radio" name="selection" id="' + i.toString() + '">' + choice + '</div>'
        }
        index++;
        choices.innerHTML = choiceHtml + '<button id="submit" class="btn btn-primary" onclick="verifyRmc([' + question.a + '], ' + (index) + ')">Submit</button>';
    }
    
}

const verifyRmc = (answer, nextIndex) => {
    const all = document.getElementsByClassName('choice').length;
    let okay = document.getElementById(answer.toString()).checked;
    const explain = document.getElementById('explain');
    if (okay) {
        explain.innerHTML = '<div class="alert alert-success">Correct!</div>';
        setTimeout(() => { explain.innerHTML = ""; runquiz(questions, nextIndex); }, 1000);
    } else {
        explain.innerHTML = '<div class="alert alert-danger">Wrong, Please try again!</div>';
        setTimeout(() => { explain.innerHTML = "" }, 1000);
    }
}

const verifyCmc = (answers, nextIndex) => {
    const all = document.getElementsByClassName('choice').length;
    let okay = true;
    for (let i = 0; i < all; i++) {
        const checked = document.getElementById(i.toString()).checked;
        if (i in answers) {
            okay = okay && checked;
        } else {
            okay = okay && !checked;
        }
    }
    const explain = document.getElementById('explain');
    if (okay) {
        explain.innerHTML = '<div class="alert alert-success">Correct!</div>';
        setTimeout(() => { explain.innerHTML = ""; runquiz(questions, nextIndex); }, 1000);
    } else {
        explain.innerHTML = '<div class="alert alert-danger">Wrong, Please try again!</div>';
        setTimeout(() => { explain.innerHTML = "" }, 1000);
    }
}

const verify = (answer, nextIndex) => {
    const userAnswer = document.getElementById('lookhere').value;
    const explain = document.getElementById('explain');
    if (userAnswer.toLowerCase() === answer.toLowerCase()) {
        explain.innerHTML = '<div class="alert alert-success">Correct!</div>';
        setTimeout(() => { explain.innerHTML = ""; runquiz(questions, nextIndex); }, 1000);
    } else {
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