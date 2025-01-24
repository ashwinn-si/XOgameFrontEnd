import Container from "../../Components/Container";
import {data, useParams} from "react-router-dom";
import Header from "../../Components/Header";
import RoomIDHeader from "../../Components/RoomIDHeader";
import AlertMessage from "../../Components/AlertMessage";
import {useContext, useEffect, useState} from "react";
import SubHeading from "../../Components/SubHeading";
import {SocketContext} from "../../SocketProvider";
import PlayerNameDisplayer from "../../Components/PlayerNameDisplayer";
import Loader from "../../Components/Loader";
import Button from "../../Components/Button";
import LoadingHeader from "../../Components/LoadingHeader";
import {useNavigate} from "react-router-dom";

function PlayerWaitingPage() {
    const roomID = useParams().roomID;
    const mode = useParams().mode;
    const socket = useContext(SocketContext);
    const [alertMessage, setAlertMessage] = useState("");
    const symbol = useParams().playerSymbol;
    const [alertMessageFlag , setAlertMessageFlag] = useState(false);
    const[player2WaitingFlag , setPlayer2WaitingFlag] = useState(true);
    const[player1Name , setPlayer1Name] = useState("");
    const [player2Name , setPlayer2Name] = useState("");
    const[startGameFlag , setStartGameFlag] = useState(false);
    const [player1Symbol, setPlayer1Symbol] = useState("");
    const [player2Symbol, setPlayer2Symbol] = useState("");
    const[time,setTime] = useState(3);
    const navigate = useNavigate();

    useEffect(()=>{
        if(mode === "create"){
            socket.emit("getPlayer1Name",({roomID}));
            socket.on("player1NameGetter",(data)=>{
                setPlayer1Name(data.player1Name)
            })
            socket.on("player2Joined",(data)=>{
                setPlayer2WaitingFlag(false);
                setPlayer2Name(data.player2Name)
            })
            setPlayer1Symbol(symbol);
            setPlayer2Symbol(symbol === 'X' ? 'O' : 'X');
        }else{
            socket.emit("getPlayer2Name",({roomID}));
            socket.on("player2NameGetter",(data)=>{
                setPlayer1Name(data.player1Name)
                setPlayer2Name(data.player2Name)
                setPlayer2WaitingFlag(false);
            })
            setPlayer2Symbol(symbol);
            setPlayer1Symbol(symbol === 'X' ? 'O' : 'X');
        }
    },[mode])

    function startGame(){
        socket.emit("startGame" , ({roomID}));
        setStartGameFlag(true)
        const timehelper = setInterval(() => {
            setTime(prevState => prevState - 1);
        },[1000])
        setTimeout(() => {
            clearInterval(timehelper);
            setTime(3);
            navigate(`/onlineMode/GameArena/${mode}/${roomID}`)
        },[3000])
    }

    //signaling the player 2 that the game has started
    socket.on("player1GameStarted",()=>{
        setStartGameFlag(true)
        const timehelper = setInterval(() => {
            setTime(prevState => prevState - 1);
        },[1000])
        setTimeout(() => {
            clearInterval(timehelper);
            setTime(3);
            navigate(`/onlineMode/GameArena/${mode}/${roomID}`)
        },[3000])
    })


    function handleCpy(){
        navigator.clipboard.writeText(roomID).then(()=>{
            setAlertMessage("ID copied")
            setAlertMessageFlag(true)
            setTimeout(()=>{
                setAlertMessageFlag(false)
            },[2000])
        });
    }

    return (
        <Container>
            <RoomIDHeader props = {{roomID : roomID, handleClickFunction : handleCpy}} />\
            <div className="flex items-center justify-evenly flex-col w-full h-[80%]">
                {
                    alertMessageFlag ? <AlertMessage props={{content:alertMessage}} /> : null
                }
                {
                    (startGameFlag) ?
                        <LoadingHeader props={{time: time}}/> :
                    player2WaitingFlag ?
                        <>
                            <div>
                                <SubHeading props={{content: "Available Players..!"}}/>
                                <PlayerNameDisplayer props={{names: [player1Name], symbol : [player1Symbol]}} />
                            </div>
                            <div className="w-[100%] h-[80%] flex items-center justify-evenly flex-col">
                                <p className="text-xl font-semibold text-borderColor">Waiting For Player</p>
                                <Loader/>
                            </div>
                        </>
                        :
                        <>
                            <div>
                                <SubHeading props={{content: "Available Players..!"}}/>
                                <PlayerNameDisplayer props={{names: [player1Name,player2Name], symbol : [player1Symbol,player2Symbol]}} />
                            </div>
                            {
                                mode === "create" ? <Button props={{content: "Start Game", clickFunction : startGame}}/> : null
                            }
                        </>
                }
            </div>
        </Container>
    )
}
export default PlayerWaitingPage;