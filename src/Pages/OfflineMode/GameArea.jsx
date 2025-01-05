import {useParams} from "react-router-dom";
import Container from "../../Components/Container";
import {useState} from "react";
import ScoreCard from "../../Components/ScoreCard";
import WinnerAnnoument from "../../Components/WinnerAnnoument";
import MoveAnnounment from "../../Components/MoveAnnounment";
import {useNavigate} from "react-router-dom";

function GameArea(props){
    const navigate = useNavigate();
    const [playerSymbol,setPlayerSymbol] = useState(useParams().PlayerSymbol)
    const[cmpSymbol,setCmpSymbol] = useState(playerSymbol ==="X" ? "O" : "X")
    const[playerScore,setPlayerScore] = useState(0)
    const[cmpScore,setCmpScore] = useState(0)
    const [mode , setMode] = useState(useParams().mode);
    const [winnerAnnoument, setWinnerAnnoument] = useState(false);
    const[winner,setWinner] = useState(null);
    const[time,setTime] = useState(3);
    const [Move,setMove] = useState("Player"); //says who should make the move
    const[stMove,setStMove] = useState("Player"); //says who is starting the game
    //board
    const [board,setBoard] = useState(['','','','','','','','','']);
    function onClickHandler(event,key){
        if(Move === "Player" && board[key] === ""){
            setBoard(prevBoard =>
                prevBoard.map((element, index) =>
                    index === key ? playerSymbol : element
                )
            );
            setMove("Computer");
            //calling the min max function
            // let res =
            let res = null;
            if(res ==="Player" || res ==="Computer" || res === "Tie"){
                setWinnerAnnoument(true);
                if(res === "tie"){
                    setWinner("Tie !!!")
                }else{
                    setWinner(`${res} Wins !!!`)
                }
                if(res === "Player"){
                    setPlayerScore(prevPlayerScore => prevPlayerScore + 1);
                }else if(res === "Computer"){
                    setCmpScore(prevCmpScore => prevCmpScore + 1);
                }
                if(playerScore === 3 || cmpScore === 3){
                    if(playerScore === 3){
                        navigate("/offlineMode/EndPage/Player")
                    }else{
                        navigate("/offlineMode/EndPage/Computer")
                    }

                }
                const timeHelper = setInterval(()=>{
                    setTime(prevTime => prevTime - 1);
                },1000)
                setTimeout(() => {
                    setWinnerAnnoument(false);
                    clearInterval(timeHelper);
                    setBoard(['','','','','','','','',''])
                },3000)
            }else{
                setTimeout(
                    ()=>{
                        setBoard(prevBoard =>
                            prevBoard.map((element, index) =>
                                index === res ? cmpSymbol : element
                            )
                        );
                        setMove("Player");
                    }
                ,1000);

            }
        }

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
                winnerAnnoument ? <WinnerAnnoument props={{text: {winner}, time: time}}/> : null
            }
            <div className="w-[80%] h-[60%] grid grid-cols-3 gap-4 p-4 mx-auto">
                {Array(9).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className="font-main w-[100%] h-[100%] -translate-x-[3px] -translate-y-[3px] bg-neutral border-[3px] border-borderColor shadow-[12px_12px_0_#000000] overflow-hidden transition-all duration-300 ease-linear hover:-translate-x-[6px] hover:-translate-y-[6px] flex items-center justify-center" onClick={(e) => onClickHandler(e,index)}>
                        <p className="font-black text-2xl lg:text-3xl">{board[index]}</p>
                    </div>
                ))}
            </div>
            <MoveAnnounment props={{player:Move}} />


        </Container>
    )
}

export default GameArea;