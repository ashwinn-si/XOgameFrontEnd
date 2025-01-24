import {useParams} from "react-router-dom";
import Container from "../../Components/Container";
import {useContext, useEffect, useState} from "react";
import ScoreCard from "../../Components/ScoreCard";
import WinnerAnnoument from "../../Components/WinnerAnnoument";
import MoveAnnounment from "../../Components/MoveAnnounment";
import {useNavigate} from "react-router-dom";
import main from "../../Scripts/MinMaxAlgorithm";
import checkWinner from "../../Scripts/CheckWinnerHelper";
import Button from "../../Components/Button";
import SurrenderButton from "../../Components/Surrender Button";
import {SocketContext} from "../../SocketProvider";
import onlineModeWinner from "./../../Scripts/OnlineModeCheckWinner";

function GameArea(props){
    const navigate = useNavigate();
    const roomID = useParams().roomID;
    const socket = useContext(SocketContext);
    const [player1Symbol,setPlayer1Symbol] = useState(null)
    const[player2Symbol,setPlayer2Symbol] = useState(null)
    const[player1Score,setPlayer1Score] = useState(0)
    const[player2Score,setPlayer2Score] = useState(0)
    const mode  = useParams().mode;
    const[allowMove, setAllowMove] = useState(null);
    const [winnerAnnoument, setWinnerAnnoument] = useState(false);
    const[winner,setWinner] = useState(null);
    const[time,setTime] = useState(5);
    const [Move,setMove] = useState("X"); //says who should make the move
    const [resultWinner , setResultWinner] = useState(null);

    const [board,setBoard] = useState(['','','','','','','','','']);
    async function onClickHandler(event, key) {
        const playerSymbol = mode === "create" ? player1Symbol : player2Symbol;
        if (allowMove) {
            setBoard(prevBoard =>
                prevBoard.map((element, index) =>
                    index === key ? playerSymbol : element
                )
            )
            if(mode === "create"){
                await socket.emit("player1MoveSend", ({move: key, roomID: roomID}));
                setMove(player2Symbol);
            }else{
                await socket.emit("player2MoveSend", ({move: key, roomID: roomID}));
                setMove(player1Symbol);
            }
            setAllowMove(false)
        }
    }

    socket.on("player1MoveRecieve",(data)=>{
        const move = parseInt(data.move);
        const playerSymbol = mode === "create" ?  player2Symbol : player1Symbol;
        setBoard(prevBoard =>
            prevBoard.map((element, index) =>
                index === move ? playerSymbol : element
            )
        )
        setMove(player2Symbol)
        setAllowMove(true)
    })
    socket.on("player2MoveRecieve",(data)=>{
        const move = parseInt(data.move);
        const playerSymbol = mode === "create" ?  player2Symbol : player1Symbol;
        setBoard(prevBoard =>
            prevBoard.map((element, index) =>
                index === move ? playerSymbol : element
            )
        )
        setMove(player1Symbol)
        setAllowMove(true)
    })

    socket.on("player1player2Symbol",(data) => {
        setPlayer1Symbol(data.player1Symbol)
        setPlayer2Symbol(data.player1Symbol === 'X' ? 'O' : 'X');
    })

    socket.on("sendPlayerName",(data)=>{
        setTimeout(()=>{
            navigate(`/onlineMode/EndPage/${data.name}`)
        },[5000])
    })

    useEffect(()=>{
        if(player1Score === 3 || player2Score === 3){
            if(player1Score === 3){
                socket.emit("getPlayer1Name",{roomID : roomID});

            }else{
                socket.emit("getPlayer2Name",{roomID : roomID});
            }
        }
    },[player1Score,player2Score])

    useEffect(() => {
        const result = onlineModeWinner(board,player1Symbol,player2Symbol)
        if(result === "Player1") {
            setPlayer1Score(prevState => prevState+1);
            setWinner(player1Symbol+" Wins !!!")
            const timeHelper = setInterval(() =>{
                setTime(prevTime => prevTime - 1);
            },1000);
            setWinnerAnnoument(true)
            setTimeout(()=>{
                setWinnerAnnoument(false);
                clearInterval(timeHelper);
                setTime(5)
                setBoard(['','','','','','','','',''])
            },[5000])
            // console.log("player1win")
        }else if(result === "Player2"){
            setWinner(player2Symbol+" Wins !!!")
            setPlayer2Score(prevState => prevState+1);
            const timeHelper = setInterval(() =>{
                setTime(prevTime => prevTime - 1);
            },1000);
            setWinnerAnnoument(true)
            setTimeout(()=>{
                setWinnerAnnoument(false);
                clearInterval(timeHelper);
                setTime(5)
                setBoard(['','','','','','','','',''])
            },[5000])
        }else if(result === "Tie"){
            setWinner("Tie Wins !!!")
            setWinnerAnnoument(true)
            const timeHelper = setInterval(() =>{
                setTime(prevTime => prevTime - 1);
            },1000);
            setTimeout(()=>{
                setWinnerAnnoument(false);
                clearInterval(timeHelper);
                setTime(5)
                setBoard(['','','','','','','','',''])
            },[5000])
        }
    }, [board]);

    useEffect(()=>{
        socket.emit("getPlayer1Player2Symbol",({roomID : roomID}));
    },[])
    useEffect(()=>{
        setMove(player1Symbol)
    },[player1Symbol])
    useEffect(()=>{

        setAllowMove(mode === "create" ? true : false)

    },[mode])

    return (
        <Container>
            <ScoreCard props={{
                player1Symbol: player1Symbol,
                player2Symbol: player2Symbol,
                player1Score: player1Score,
                player2Score: player2Score
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

        </Container>
    )
}

export default GameArea;