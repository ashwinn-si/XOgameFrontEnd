import {useParams} from "react-router-dom";
import Container from "../../Components/Container";
import {useEffect, useState} from "react";
import ScoreCard from "../../Components/ScoreCard";
import WinnerAnnoument from "../../Components/WinnerAnnoument";
import MoveAnnounment from "../../Components/MoveAnnounment";
import {useNavigate} from "react-router-dom";
import main from "../../Scripts/MinMaxAlgorithm";
import checkWinner from "../../Scripts/CheckWinnerHelper";
import Button from "../../Components/Button";
import SurrenderButton from "../../Components/Surrender Button";

function GameArea(props){
    const navigate = useNavigate();
    const [playerSymbol,setPlayerSymbol] = useState(useParams().PlayerSymbol)
    const[cmpSymbol,setCmpSymbol] = useState(playerSymbol ==="X" ? "O" : "X")
    const[playerScore,setPlayerScore] = useState(0)
    const[cmpScore,setCmpScore] = useState(0)
    const [mode , setMode] = useState(useParams().mode);
    if(mode === "Impossible"){
        setMode("hard")
    }
    const [winnerAnnoument, setWinnerAnnoument] = useState(false);
    const[winner,setWinner] = useState(null);
    const[time,setTime] = useState(5);
    const [Move,setMove] = useState("Player"); //says who should make the move
    const[stMove,setStMove] = useState("Player"); //says who is starting the game
    //board
    const [board,setBoard] = useState(['','','','','','','','','']);
    const [aiMove,setAiMove] = useState(null);

    useEffect(() => {
        if (playerScore === 3 || cmpScore === 3) {
            setTimeout(()=>{
                if (playerScore === 3) {
                    navigate("/offlineMode/EndPage/Player")
                } else {
                    navigate("/offlineMode/EndPage/Computer")
                }
            },3000)
        }
    }, [playerScore,cmpScore]);
    useEffect(()=>{
        if (aiMove === "Player" || aiMove === "Computer" || aiMove === "Tie") {
            setWinnerAnnoument(true);
            if (aiMove === "tie") {
                setWinner("Tie !!!")
            } else {
                setWinner(`${aiMove} Wins !!!`)
            }
            if (aiMove === "Player") {
                setPlayerScore(prevPlayerScore => prevPlayerScore + 1);
            } else if (aiMove === "Computer") {
                setCmpScore(prevCmpScore => prevCmpScore + 1);
            }

            const timeHelper = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000)
            setTimeout(() => {
                setWinnerAnnoument(false);
                setTime(5)
                clearInterval(timeHelper);
                setBoard(['', '', '', '', '', '', '', '', ''])
            }, 5000)
        } else if(aiMove !== "No Winner") {
            setTimeout(
                () => {
                    setBoard(prevBoard =>
                        prevBoard.map((element, index) =>
                            index === aiMove ? cmpSymbol : element
                        )
                    );
                    setMove("Player");
                }
                , 1000);

        }
    },[aiMove]);

    useEffect(()=>{
        if(Move === "Computer"){
            let res = checkWinner(board);
            setAiMove(res);
            res = main(board, playerSymbol, mode);
            setAiMove(res);
        }else{
            let res = checkWinner(board);
            setAiMove(res);

        }
    },[board])

    async function onClickHandler(event, key) {
        if (Move === "Player" && board[key] === "" && !winnerAnnoument) {
            setBoard(prevBoard =>
                prevBoard.map((element, index) =>
                    index === key ? playerSymbol : element
                )
            )
            setMove("Computer");
            //calling the min max function
        }

    }

    function handleSurrender(){
        navigate("/offlineMode/Surrender");
    }
    return (
        <Container>
            <ScoreCard props={{
                player1Symbol: playerSymbol,
                player2Symbol: cmpSymbol,
                player1Score: playerScore,
                player2Score: cmpScore
            }}/>
            {
                winnerAnnoument ? <WinnerAnnoument props={{text: winner, time: time}}/> : null
            }
            <div className="w-[80%] h-[60%] grid grid-cols-3 gap-0 p-4 mx-auto">
                {Array(9).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className={`font-main w-[50px] h-[50px] lg:w-[100px] lg:h-[70px] box-border -translate-x-[1px] -translate-y-[1px]
                        lg:-translate-x-[3px] lg:-translate-y-[3px]
                        bg-neutral border-[3px] border-borderColor shadow-[12px_12px_0_#000000]
                         lg:shadow-[6px_6px_0_#000000]
                         overflow-hidden transition-all duration-300 ease-linear hover:-translate-x-[6px] hover:-translate-y-[6px] flex items-center justify-center ${board[index] === 'X' ? 'text-Xcolor' : null} ${board[index] === 'O' ? 'text-Ocolor' : null}`} onClick={(e) => onClickHandler(e,index)}>
                        <p className="font-black text-2xl lg:text-3xl p-0">{board[index]}</p>
                    </div>
                ))}
            </div>
            {
                ! winnerAnnoument ? <MoveAnnounment props={{player:Move}} /> : null
            }
            <div className="flex justify-center items-center ">
                <SurrenderButton props={{clickFunction : handleSurrender}}/>
            </div>




        </Container>
    )
}

export default GameArea;