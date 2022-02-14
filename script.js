let ids = [], openCards, flagClick, openedCard, score, wins = 0;

if (!localStorage.wins){
    localStorage.setItem("wins", wins);
} else {
    wins = localStorage.wins;
}

function startGame(){
    ids = [];
    openCards = 0;
    flagClick = true;
    score = 0;
    document.getElementById("score").innerHTML = "Your score is " + score + "/8!";
    document.getElementById("restart").classList.add("d-none");
    document.getElementById("wins").innerHTML = "All time wins: " + wins;
    createIds();
    createTable();
}
startGame();

function createTable(){
    let canvas = document.getElementById("canvas");
    const buttonsIds = [...ids];
    canvas.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        const id1 = buttonsIds.shift(), id2 = buttonsIds.shift(), id3 = buttonsIds.shift(), id4 = buttonsIds.shift();
        canvas.innerHTML += "<div class='row justify-content-center'>" +
        "<div class='col-3 col-md-1 p-1'><button id='" + id1 + "' type='button' class='btn btn-secondary shadow-lg' style='width: 100%' onclick='openCard(" + id1 + ")'></button></div>" +
        "<div class='col-3 col-md-1 p-1'><button id='" + id2 + "' type='button' class='btn btn-secondary shadow-lg' style='width: 100%' onclick='openCard(" + id2 + ")'></button></div>" +
        "<div class='col-3 col-md-1 p-1'><button id='" + id3 + "' type='button' class='btn btn-secondary shadow-lg' style='width: 100%' onclick='openCard(" + id3 + ")'></button></div>" +
        "<div class='col-3 col-md-1 p-1'><button id='" + id4 + "' type='button' class='btn btn-secondary shadow-lg' style='width: 100%' onclick='openCard(" + id4 + ")'></button></div>" +
        "</div>"
    }
}

function createIds(){
    if (ids.length === 0){
        const id = Math.floor(Math.random() * 16) + 1;
        ids.push(id);
    }
    while (ids.length < 16){
        let flag = true;
        const id = Math.floor(Math.random() * 16) + 1;
        ids.forEach(elem => {
            if (id === elem){
                flag = false;
            }
        });
        if (flag){
            ids.push(id);
        }
    }
}

function fixTable(){
    let buttons = document.getElementsByClassName("btn-secondary");
    buttons = [...buttons];
    buttons.forEach(elem => {
        elem.style.height = elem.offsetWidth + "px";
        elem.style.backgroundSize = elem.offsetWidth + "px " + elem.offsetWidth + "px";
    });
}
setInterval(fixTable, 100);

function openCard(id){
    if(!document.getElementById(id).classList.contains("matched") && flagClick && !document.getElementById(id).classList.contains("opened")){
        const button = document.getElementById(id);
        openCards++;
        const cardsName = ["arryn", "baratheon", "greyjoy", "lannister", "stark", "targaryen", "tully", "tyrell"];
        
        for (let i = 1; i <= 16; i = i+2) {
            if (id === i || id === i+1){
                cardName = cardsName[Math.floor(i/2)];
                button.classList.add(cardName);
                button.classList.add("opened");
                if (openCards === 1){
                    openedCard = button;
                } else if (openCards === 2){
                    if (document.getElementById(i).classList.contains(cardName) && document.getElementById(i+1).classList.contains(cardName)){
                        console.log("Destapo las dos!");
                        document.getElementById(i).classList.remove("opened");
                        document.getElementById(i+1).classList.remove("opened");
                        document.getElementById(i).classList.add("matched");
                        document.getElementById(i+1).classList.add("matched");
                        score++;
                        openCards = 0;
                        if (score < 8){
                            document.getElementById("score").innerHTML = "Your score is " + score + "/8!";
                        } else {
                            document.getElementById("score").innerHTML = "You've won!";
                            document.getElementById("restart").classList.remove("d-none");
                            wins++;
                            localStorage.wins = wins;
                            document.getElementById("wins").innerHTML = "All time wins: " + wins;
                        }
                    } else {
                        flagClick = false;
                        setTimeout(closeCards, 1000, cardsName, cardName, i, id);
                    }
                }
            }
        }
    }
}

function closeCards(cardsName, cardName, i, id){
    const openedCards = [...document.getElementsByClassName("opened")];
    openedCards.forEach(elem => {
        cardsName.forEach(elemName => {
            elem.classList.remove(elemName);
        });
    });
    document.getElementById(i).classList.remove(cardName);
    document.getElementById(i+1).classList.remove(cardName);
    openCards = 0;
    flagClick = true;
    openedCard.classList.remove("opened");
    document.getElementById(id).classList.remove("opened");
}