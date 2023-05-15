export class Quiz {
    constructor(result) {
        //arr of ques 
        // console.log(result);
        this.currentElement = document.getElementById('current');
        this.totalAmountElement = document.getElementById('totalAmount');
        this.questionElement = document.getElementById('question');
        this.rowAnswerElement = document.getElementById('rowAnswer');
        this.nextBtn = document.getElementById('next');
        this.index = 0;
        this.score = 0;

        this.result = result;
        this.displayQues();
        //
        this.nextBtn.addEventListener('click', this.nextQues.bind(this))
        // console.log(this.currentElement , this.totalAmountElement , this.rowAnswerElement , this.questionElement);
    }

    displayQues() {


        this.currentElement.innerHTML = this.index + 1;
        this.totalAmountElement.innerHTML = this.result.length;
        this.questionElement.innerHTML = this.result[this.index].question;
        // logic
        let answers = [this.result[this.index].correct_answer, ...this.result[this.index].incorrect_answers];

        this.rowAnswerElement.innerHTML = this.getRowAnswers(this.shuffleArr(answers))

        console.log(answers);
        console.log(this.result[this.index].correct_answer);

        // this.rowAnswerElement.innerHTML = "answers";
    }

    getRowAnswers(answers) {
        let cartona = ``;
        for (let index = 0; index < answers.length; index++) {
            cartona += ` <div class="form-check">
                <label class="form-check-label">
                     <input type="radio" class="form-check-input" name="answer" id="q1" value="${answers[index]}">
                    ${answers[index]}
                </label>
            </div>`

        }

        return cartona;
    }

    nextQues() {
        if (!this.checkPrev()) {
            return;
        }







        this.index++;
        if (this.index >= this.result.length) {
            this.finish();
        } else {
            this.displayQues()
        }
    }

    checkPrev() {
        //user Answer === correct answer
        let userAnswer = [...document.getElementsByName('answer')].find((input) => input.checked)?.value
        let correctAnswer = this.result[this.index].correct_answer;

        //if userAnswer === undefinded 
        if (!userAnswer) {
            $('#choose').fadeIn(200)
            return false;
        }

        $('#choose').fadeOut(200)
        //if true
        if (userAnswer == correctAnswer) {
            //1 score = 0 => score + 1
            this.score++;
            //2 correct alert
            $('#Correct').fadeIn(200, () => {
                $('#Correct').fadeOut(200)
            })

        } else {
            //else
            //inCorrect
            $('#inCorrect').fadeIn(200, () => {
                $('#inCorrect').fadeOut(200)
            })
        }

        return true;
    }

    shuffleArr(arr) {

        let randomIndex;
        let randomIndexArr = [];
        let newArr = [];
        for (let i = 0; i < arr.length; i++) {
            randomIndex = Math.floor(Math.random() * arr.length)
            if (!randomIndexArr.includes(randomIndex)) {
                newArr.push(arr[randomIndex]);
                randomIndexArr.push(randomIndex);

            } else {
                i--;
            }

        }



        return newArr;
    }


    finish() {
        $('#quiz').fadeOut(200, () => {
            $('#finish').fadeIn(200);
            document.getElementById('score').innerHTML = this.score;
            document.getElementById('tryBtn').addEventListener('click', () => {
                $('#finish').fadeOut(200, () => {
                    $('#setting').fadeIn(200)
                })

            })

        })
    }
}