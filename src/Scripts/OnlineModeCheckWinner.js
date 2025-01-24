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

function OnlineModeCheckWinner(board , player1Symbol, player2Symbol){
    for (let i = 0; i < winPosition.length; i++) {
        let [posA, posB, posC] = winPosition[i];

        if (board[posA] === "" || board[posB] === "" || board[posC] === "") {
            continue;
        }
        if (board[posA] === board[posB] && board[posB] === board[posC]) {
            if(board[posA] === player1Symbol){
                return "Player1"
            }else{
                return "Player2"
            }
        }
    }
    if(! board.includes('')) return "Tie"
    return false
}

export default OnlineModeCheckWinner;