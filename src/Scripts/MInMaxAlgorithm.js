import evaluateChoice from "./HelperMinMax";

function checkWinner(board, isSimulated = false) {
    for (let i = 0; i < winPosition.length; i++) {
        let [posA, posB, posC] = winPosition[i];

        if (board[posA] === "" || board[posB] === "" || board[posC] === "") {
            continue;
        }
        if (board[posA] === board[posB] && board[posB] === board[posC]) {
            if (!isSimulated) {
                // Update the real board if this is not a simulation
                gameOver = true;
            }
            return board[posA];
        }
    }
    return false; // no winner found
}

function checkTie(board, isSimulated = false) {  // similar flag of checkWinner method
    if (board.includes('')) return false;       // game cannot have ended in a tie, when there's an empty cell

    if (!isSimulated) {
        gameOver = true;
    }
    return true;
}

function getRemainingMoves(board) {
    // returns the indices of empty cells in the given board
    let legalMoves = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            legalMoves.push(i);
        }
    }
    return legalMoves;
}

function aiMove(board, currentDifficulty) {
    // implements minimax algorithm
    return new Promise(resolve => {
        setTimeout(() => {
            let aiIndex = '';                    // hold the cellIndex, in which AI will make its move
            let choiceList = findMoves(board);   // choiceList will have three possible moves that depend upon difficulty chosen.
            //[hard, medium, easy]

            if (currentDifficulty === "Easy") {
                aiIndex = choiceList[2];
            } else if (currentDifficulty === "Medium") {
                aiIndex = choiceList[1];
            } else {
                aiIndex = choiceList[0];
            }
            resolve(aiIndex);
        }, 750); // Add a delay for more natural play
    });
}

function findMoves(board) {
    // returns an array of 3 possible moves where each move depends on the difficulty chosen by user.
    let legalMoves = getRemainingMoves(board);
    let cellScore = {};

    for (let index of legalMoves) {
        board[index] = ai;  // Simulate AI's move
        let thisMove = minimax(board, 0, false);  // Evaluate the move

        cellScore[index] = thisMove;             // store the score for this simulated move
        board[index] = ''; // Undo the move
    }
    cellScore = evaluateChoice(cellScore);            // get the top 3 moves of all possible moves
    return cellScore;
}

function minimax(board, depth, isMax) {
    let winner = checkWinner(board, true);  // check if this simulated board has a winner
    if (winner === ai) return 10 - depth;   // subtracting depth, so that the best move is obtained in least number of steps

    if (winner === human) return -10 + depth;

    if (checkTie(board, true)) {
        return 0;   // neutral score if the game ends in a tie
    }

    if (isMax) {
        // maximise AI's turn
        let best = -Infinity;
        let legalMoves = getRemainingMoves(board);
        for (let index of legalMoves) {
            // evaluating every possible move
            board[index] = ai;
            best = Math.max(best, minimax(board, depth + 1, false)); // compare current move with best move, recursively
            board[index] = ''; // undo the move
        }
        return best;
    } else {
        // minimise opponent's turn
        let best = Infinity;
        let legalMoves = getRemainingMoves(board);
        for (let index of legalMoves) {
            // simulate human's moves
            board[index] = human;
            best = Math.min(best, minimax(board, depth + 1, true));
            board[index] = '';  // undo the move
        }
        return best;
    }
}

export default aiMove;