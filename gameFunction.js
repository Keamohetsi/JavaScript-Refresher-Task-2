// script.js

document.addEventListener('DOMContentLoaded', function () {
    const cardsArray = [
        { id: 1, letter: 'A' },  // Pair 1
        { id: 2, letter: 'A' },  // Pair 1
        { id: 3, letter: 'B' },  // Pair 2
        { id: 4, letter: 'B' },  // Pair 2
        { id: 5, letter: 'C' },  // Pair 3
        { id: 6, letter: 'C' },  // Pair 3
        { id: 7, letter: 'D' },  // Pair 4
        { id: 8, letter: 'D' },  // Pair 4
        { id: 9, letter: 'E' },  // Pair 5
        { id: 10, letter: 'E' }, // Pair 5
        { id: 11, letter: 'F' }, // Pair 6
        { id: 12, letter: 'F' }, // Pair 6
        { id: 13, letter: 'G' }, // Pair 7
        { id: 14, letter: 'G' }, // Pair 7
        { id: 15, letter: 'H' }, // Pair 8
        { id: 16, letter: 'H' }  // Pair 8
    ];

    const mgBoard = document.querySelector('.mg-board');
    let flippedCards = [];
    let matchedCards = [];

    // Function to shuffle the cards array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Function to create the board
    function createBoard() {
        shuffle(cardsArray);
        cardsArray.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            cardDiv.dataset.id = card.id;

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');
            cardDiv.appendChild(cardInner);

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.textContent = '?';
            cardInner.appendChild(cardFront);

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            cardBack.textContent = card.letter;
            cardInner.appendChild(cardBack);

            cardDiv.addEventListener('click', flipCard);
            mgBoard.appendChild(cardDiv);
        });
    }

    // Function to flip a card
    function flipCard() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                setTimeout(checkForMatch, 1000);
            }
        }
    }

    // Function to check if flipped cards match
    function checkForMatch() {
        const [card1, card2] = flippedCards;
        const letter1 = card1.querySelector('.card-back').textContent;
        const letter2 = card2.querySelector('.card-back').textContent;

        if (letter1 === letter2) {
            card1.removeEventListener('click', flipCard);
            card2.removeEventListener('click', flipCard);
            matchedCards.push(card1, card2);
            flippedCards = [];

            if (matchedCards.length === cardsArray.length) {
                setTimeout(() => {
                    alert('Congratulations! You won the game! You are smart');
                }, 500);
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    createBoard();
});
