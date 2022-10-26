const gameContainer = document.getElementById("game");
let clickedCard;
console.log('clickedCard declared ', clickedCard);
let preventClick = false;
let combosFound = 0;
let target = 0;


const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
];


function shuffle(array) {
    let counter = array.length;

    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    console.log('what was shuffled ', array);
    return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
    for (let color of colorArray) {
        const newDiv = document.createElement("div");
        newDiv.classList.add(color);
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);

        createDivsForColors(shuffledColors);
    }
}



function onCardClicked(e) {
    console.log('card has been clicked ', e);
    target = e.currentTarget;

    console.log('value before card is clicked ', clickedCard);
    if (
        preventClick ||
        target === clickedCard ||
        target.className.includes('done')
    ) {
        console.log('value when card is clicked ', clickedCard);
        return;

    }
    {

        target.className = target.className
            .replace('color-hidden', '')
            .trim();
        target.classname += 'done';
    }

    console.log('what is my target ', target);
    console.log('what is my clicked card ', clickedCard);
    if (!clickedCard) {
        clickedCard = target;
    } else if (clickedCard) {
        preventClick = true;
        console.log(clickedCard.getAttribute('data-color'));
        if (
            clickedCard.getAttribute('data-color') !==
            target.getAttribute('data-color')
        ) {
            preventClick = true;
            console.log(preventClick);
            setTimeout(() => {
                clickedCard.className =
                    clickedCard.className.replace('done', '').trim() + 'color-hidden';
                target.className =
                    target.className.replace('done', '').trim() + 'color-hidden';
                clickedCard = null;
                preventClick = false;
                console.log(preventClick);

            }, 1000);
            console.log(target);
        } else {
            combosFound++;
            clickedCard = null;
            if (combosFound === 5) {
                alert('YOU WIN')
            }
            preventClick = false;
            console.log(preventClick);
        }
    }
}
