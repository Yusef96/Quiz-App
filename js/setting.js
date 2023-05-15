import { Quiz } from './Quiz.js'
export class Setting {
    constructor() {
        // {} = this
        //html
        this.categoryElement = document.getElementById('category');
        this.difficultyElements = Array.from(document.getElementsByName('difficulty'));
        this.numberElement = document.getElementById('Number');
        this.startBtn = document.getElementById('startBtn');



        //get value
        this.startBtn.addEventListener('click', this.startQuiz.bind(this))
        //    console.log(this.categoryElement , this.difficultyElements , this.numberElement , this.startBtn);
    }


    async startQuiz() {
        let category = this.categoryElement.value;
        let difficulty = this.difficultyElements.find((input) => input.checked).value;
        let numOfQues = this.numberElement.value;

        let url = `https://opentdb.com/api.php?amount=${numOfQues}&category=${category}&difficulty=${difficulty}`;

        const result = await this.fetchApi(url)

        // mostafa ==> then


        if (result.length === 0) {
            alert('pls enter num')
        } else {

            $('#setting').fadeOut(200, () => {
                $('#quiz').fadeIn(200)
                //
                new Quiz(result)


            })

        }

    }

    async fetchApi(url) {
        const response = await fetch(url)
        const result = await response.json();

        return result.results;
    }
}


