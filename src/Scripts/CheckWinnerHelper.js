let winPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function checkWinner(board,PlayerSymbol , CmpSymbol) {
    for (let i = 0; i < winPosition.length; i++) {
        let [posA, posB, posC] = winPosition[i];

        if (board[posA] === "" || board[posB] === "" || board[posC] === "") {
            continue;
        }
        if (board[posA] === board[posB] && board[posB] === board[posC]) {
            if(board[posA] === PlayerSymbol){
                return "Player"
            }else{
                return"Computer"
            }
        }
    }
    let isTie = checkTie(board);
    if(isTie){
        return "Tie"
    }else{
        return "No Winner";
    }
    // no winner found
}

function checkTie(board) {  // similar flag of checkWinner method
    if (board.includes('')) return false;       // game cannot have ended in a tie, when there's an empty cell

    return true;
}

export default checkWinner;