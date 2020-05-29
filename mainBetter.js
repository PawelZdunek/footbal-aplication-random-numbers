const errorDetection = () => {
    const  minNumber = parseInt(document.querySelector("#min-number").value);
    const  maxNumber = parseInt(document.querySelector("#max-number").value);
    const  timeWork = Number(document.querySelector("#czas-trwania").value);
    const  timeOnScreen = Number(document.querySelector("#czas-wyświetlania").value);

    const colorMotywy = document.querySelectorAll(".color-input");
    const colorMotywyArr = Array.from(colorMotywy);
    const haveMotyw = colorMotywyArr.find(item => item.checked === true) 

    const textError = document.getElementById("text-error");

    if (!minNumber && minNumber != 0 || !maxNumber && maxNumber != 0 || !timeWork && timeWork != 0 || !timeOnScreen && timeOnScreen != 0 ) {
        textError.innerHTML = ("Wszystkie pola muszą być wypełnione");
    } else if (timeWork <= 0 || timeOnScreen <= 0){
        textError.innerHTML = ("Czas trwania programu ani czas wyświetlania jednej liczby nie mogą być zerowe lub ujemne");
    }else if (minNumber > maxNumber){
        textError.innerHTML = ("Min liczba nie może być mniejsza od Max liczby");
    }else if (minNumber > 99999 || maxNumber > 99999 || minNumber < -99999 || maxNumber < -99999){
        textError.innerHTML = ("Min liczba ani max liczba nie może mieć więcej niż 5 cyfr");
    }else if (!haveMotyw)  {
        textError.innerHTML = ("Musisz zaznaczyć przynajmniej jeden motyw");
    }else {
        textError.innerHTML = ("");
        
        startProgram(minNumber, maxNumber, timeWork, timeOnScreen, colorMotywyArr);
    }
}
const buttonStart = document.querySelector("#start");

buttonStart.addEventListener('click', errorDetection);


const startProgram = (minNumber, maxNumber, timeWork, timeOnScreen, colorMotywyArr) => {

    buttonStart.classList.add("button-unclick")

    const changingNumbers = document.querySelector("#box");
    
    changingNumbers.classList.add("numberbox-start");
    
    const finalNumber = [];

    colorMotywyArr.forEach((element, i) => {
        if (element.checked){
            finalNumber.push(i + 1)
        }
    })

    const theDraw = () => {

        const getRandomNumber = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const placeWithNumber = document.getElementById("liczba")

        const resultOfTheDraw = (getRandomNumber(minNumber, maxNumber));

        placeWithNumber.classList.remove('liczba-333', 'liczba-4444', 'liczba-55555')

        if (resultOfTheDraw > 9999 || resultOfTheDraw < -9999){
            placeWithNumber.classList.add('liczba-55555')
        } else if (resultOfTheDraw > 999 || resultOfTheDraw < -999){
            placeWithNumber.classList.add('liczba-4444')
        } else if (resultOfTheDraw > 99 || resultOfTheDraw < -99){
            placeWithNumber.classList.add('liczba-333')
        } else if (resultOfTheDraw < -9){
            placeWithNumber.classList.add('liczba-minus-22')
        }

        placeWithNumber.innerHTML = resultOfTheDraw;

        const randomNumber = getRandomNumber(1, finalNumber.length);

        const randomColorNumber = finalNumber[randomNumber - 1]

        changingNumbers.classList.remove(`color1`, `color2`, `color3`, `color4`, `color5`, `color6`, `color7`, `color8`)
    
        changingNumbers.classList.add(`color${randomColorNumber}`)
    }

    theDraw(); // To start instantly the draw and not wait 1000ms for interval
    const interval = setInterval(theDraw, timeOnScreen * 1000);

    const stopInterval = () => {
        clearInterval(interval);

        changingNumbers.classList.remove("numberbox-start");

        buttonStart.classList.remove("button-unclick")

        clearTimeout(timeStopInterval)
    };

    const stopButton = document.querySelector('.button-x')

    stopButton.addEventListener('click', stopInterval)

    const timeStopInterval = setTimeout(stopInterval, timeWork * 1000)
}



