var arr = [1, 2, 3, 4, 5];
function shuffleArr(arr) {

    let randomIndex;
    let randomIndexArr = [];
    let newArr = [];
    for (let i = 0; i < arr.length; i++ ) {
        randomIndex = Math.floor(Math.random() * arr.length)
        if( !randomIndexArr.includes(randomIndex) ){
            newArr.push(arr[randomIndex]);
            randomIndexArr.push(randomIndex);
           
        }else {
            i--;
        }

    }



    return newArr;
}

console.log(shuffleArr(arr));