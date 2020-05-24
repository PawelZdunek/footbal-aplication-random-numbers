
const errorDetection = () => {
    const  minNumber = parseInt(document.querySelector("#min-number").value);
    const  maxNumber = parseInt(document.querySelector("#max-number").value);
    const  timeWork = Number(document.querySelector("#czas-trwania").value);
    const  timeOnScreen = Number(document.querySelector("#czas-wyświetlania").value);

    const colorMotyw1 = document.querySelector("#color-1").checked;
    const colorMotyw2 = document.querySelector("#color-2").checked;
    const colorMotyw3 = document.querySelector("#color-3").checked;
    const colorMotyw4 = document.querySelector("#color-4").checked;
    const colorMotyw5 = document.querySelector("#color-5").checked;
    const colorMotyw6 = document.querySelector("#color-6").checked;
    const colorMotyw7 = document.querySelector("#color-7").checked;
    const colorMotyw8 = document.querySelector("#color-8").checked;

    const textError = document.getElementById("text-error");


    if (!minNumber && minNumber != 0 || !maxNumber && maxNumber != 0 || !timeWork && timeWork != 0 || !timeOnScreen && timeOnScreen != 0 ) {
        textError.innerHTML = ("Wszystkie pola muszą być wypełnione");
    } else if (timeWork <= 0 || timeOnScreen <= 0){
        textError.innerHTML = ("Czas trwania programu ani czas wyświetlania jednej liczby nie mogą być zerowe lub ujemne");
    }else if (minNumber > maxNumber){
        textError.innerHTML = ("Min liczba nie może być mniejsza od Max liczby");
    }else if (minNumber > 99999 || maxNumber > 99999 || minNumber < -99999 || maxNumber < -99999){
        textError.innerHTML = ("Min liczba ani max liczba nie może mieć więcej niż 5 cyfr");
    }else if (!colorMotyw1 && !colorMotyw2 && !colorMotyw3 && !colorMotyw4 && !colorMotyw5 && !colorMotyw6 && !colorMotyw6 && !colorMotyw7 && !colorMotyw8 )  {
        textError.innerHTML = ("Musisz zaznaczyć przynajmniej jeden motyw");
    }else {
        textError.innerHTML = ("");
        
        startProgram(minNumber, maxNumber, timeWork, timeOnScreen, colorMotyw1, colorMotyw2, colorMotyw3, colorMotyw4, colorMotyw5, colorMotyw6, colorMotyw7, colorMotyw8);
    }
}

const buttonStart = document.querySelector("#start");

buttonStart.addEventListener('click', errorDetection)


function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const date = new Date();
const startTime = date.getTime();

const startProgram = (minNumber, maxNumber, timeWork, timeOnScreen, colorMotyw1, colorMotyw2, colorMotyw3, colorMotyw4, colorMotyw5, colorMotyw6, colorMotyw7, colorMotyw8) => {

    buttonStart.classList.add("button-unclick")

    const changingNumbers = document.querySelector("#box");
    
    changingNumbers.classList.add("numberbox-start");

    const initialColorTable = [colorMotyw1, colorMotyw2, colorMotyw3, colorMotyw4, colorMotyw5, colorMotyw6, colorMotyw7, colorMotyw8];

    const finalColorTableNumbers = [];

    initialColorTable.forEach((element, i) => {
        if (element){
            finalColorTableNumbers.push(i + 1)
        }
    })
    
    const theDraw = () => {

        const placeWithNumber = document.getElementById("liczba")

        const resultOfTheDraw = (getRandomNumber(minNumber, maxNumber));

        placeWithNumber.classList.remove('liczba-333', 'liczba-4444', 'liczba-55555')

        if (resultOfTheDraw > 9999){
            placeWithNumber.classList.add('liczba-55555')
        } else if (resultOfTheDraw > 999){
            placeWithNumber.classList.add('liczba-4444')
        } else if (resultOfTheDraw > 99){
            placeWithNumber.classList.add('liczba-333')
        }

        placeWithNumber.innerHTML = resultOfTheDraw;

        let randomNumber = getRandomNumber(1, finalColorTableNumbers.length);

        let randomColorNumber = finalColorTableNumbers[randomNumber - 1]

        document.getElementById("box").classList.remove(`color1`, `color2`, `color3`, `color4`, `color5`, `color6`, `color7`, `color8`)
    
        document.getElementById("box").classList.add(`color${randomColorNumber}`)

    }

    theDraw();

    let interval = setInterval(theDraw, timeOnScreen * 1000);


    const stopInterval = () => {
        clearInterval(interval);

        changingNumbers.classList.remove("numberbox-start");

        buttonStart.classList.remove("button-unclick")

        clearTimeout(timeStopInterval)
    };

    const stopButton = document.querySelector('.button-x')

    stopButton.addEventListener('click', stopInterval)

    let timeStopInterval = setTimeout(stopInterval, timeWork * 1000)

}


