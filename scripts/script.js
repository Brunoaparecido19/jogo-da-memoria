const fRONT = "card_front";
const BACK = "card_back";
const CARD = "card"
const ICON = "icon"



function start() {
    let gameStart = document.getElementById("gameOn").style.display;
    if (gameStart == "flex") {
        document.getElementById("gameOn").style.display = 'none';

    } else
        document.getElementById("gameOn").style.display = 'flex'
        
};

start()
startGame();

function startGame() {

    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {

    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";

    game.cards.forEach(card => {

        let cardElement = document.createElement("div")
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener("click", flipCard)
        gameBoard.appendChild(cardElement);

    })

}

function createCardContent(card, cardElement) {

    createCardFace(fRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement("div");
    cardElementFace.classList.add(face);

    if (face === fRONT) {

        let iconElement = document.createElement("img");
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);
    } else {
        cardElementFace.innerHTML = "&lt/&gt";

    }
    element.appendChild(cardElementFace);

}

//this.createCardsFromTechs(techs);

function flipCard() {


    if (game.setCard(this.id)) {

        this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if (game.checkGameOver()) {
                    let gameOverLayer = document.getElementById("gameOver")
                    gameOverLayer.style.display = 'flex';
                }
            }
            else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id)

                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, 1000);
            }
        }
    }
}


function restart() {
    setTimeout(() => {
        game.clearCards();
        startGame();
        let gameOverLayer = document.getElementById("gameOver");
        gameOverLayer.style.display = 'none';
    }, 1500);
}
