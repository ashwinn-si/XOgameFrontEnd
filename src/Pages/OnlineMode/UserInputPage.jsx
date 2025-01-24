import Container from "../../Components/Container";
import Header from "../../Components/Header";
import {useParams} from "react-router-dom";
import UserNameField from "../../Components/UserNameField";
import Button from "../../Components/Button";
import{useNavigate} from "react-router-dom";
import AlertMessage from "../../Components/AlertMessage";
import Loader from "../../Components/Loader";
import {useContext, useRef, useState} from "react";
import { SocketContext } from "../../SocketProvider";
import roomIDGeneration from "../../Scripts/RoomIDGeneration";

function UserInputPage(props) {
    const mode = useParams().mode;
    const socket = useContext(SocketContext);
    const playerName = useRef(null);
    const roomID = useRef(null);
    const navigate = useNavigate();
    const [errorFlag,setErrorFlag] = useState(false);
    const[errorMessage,setErrorMsg] = useState("");
    const [loaderFlag,setLoaderFlag] = useState(false);
    const[loaderMessage,setLoaderMessage] = useState("");
    const [symbol,setSymbol] = useState("X");

    async function handleCreate() {
        const roomID = roomIDGeneration();
        const userName = playerName.current.getData();
        setLoaderMessage("Creating Room");
        setLoaderFlag(true);
        await socket.emit("player1joined", ({roomID, player1Name: userName, player1Symbol: symbol}));
        socket.on("message",(data)=>{
            if(data === "room created"){
                setLoaderFlag(false)
                console.log("hello");
                navigate(`/onlineMode/PlayerWaitingPage/create/${roomID}/${symbol}`);
            }
        })


    }

    function handleJoin(){
        const userName = playerName.current.getData();
        const enteredRoomID = roomID.current.getData();
        socket.emit("findRoom",({
            roomID : enteredRoomID,
            player2Name : userName
        }))
        socket.on("message", (data) => {
            if(data.message === "room found"){
                const player2Symbol = data.player1Symbol === 'X' ? 'O' : 'X';
                navigate(`/onlineMode/PlayerWaitingPage/join/${enteredRoomID}/${player2Symbol}`);
            }
            if(data ==="room not found"){
                setErrorMsg("Room not found")
                setErrorFlag(true);
                setTimeout(() => {
                    setErrorFlag(false);
                },2000)
            }

        });
    }
    return (
        <>
            <Container>
                <Header props={{header: "Fill Details"}}/>
                {
                    errorFlag ? <AlertMessage props={{content: errorMessage}}/> :
                        <>
                            {
                                loaderFlag ? <div className="w-[100%] h-[80%] flex items-center justify-evenly flex-col">
                                    <p className="text-xl font-semibold text-borderColor">{loaderMessage}</p>
                                    <Loader/>
                                </div> : null
                            }
                            {
                                loaderFlag ? null :
                                    <div className="w-[100%] h-[80%] flex items-center justify-evenly flex-col">

                                        <UserNameField props={{content: "Name"}} ref={playerName}/>

                                        {
                                            mode === "create" ? null : <UserNameField props={{content: "Room Id"}} ref={roomID}/>
                                        }
                                        {
                                            mode === "create" ?
                                                <div className="flex items-center justify-evenly w-full">
                                                    <label className="flex items-center cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="options"
                                                            value="X"
                                                            className="hidden peer text-2xl"
                                                            onClick={(e) => setSymbol("X")}
                                                        />
                                                        <div
                                                            className="px-[5px] py-[2.5px] lg:px-[10px] lg:py-[5px] text-button font-[500] lg:text-button-lg mt-[10px] border-[3px] border-borderColor shadow-[3px_3px_0_#000000]  bg-primarybtn transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_#000000] hover:bg-primarybtnHover active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0_0_0_#000000] peer-checked:bg-white peer-checked:border-black  peer-checked:font-black peer-checked:shadow-[1.5px_1.5px_0_#000000]">
                                                            <p className="lg:text-2xl text-xl">X</p>
                                                        </div>
                                                    </label>
                                                    <label className="flex items-center cursor-pointer">

                                                        <input
                                                            type="radio"
                                                            name="options"
                                                            value="O"
                                                            className="hidden peer"
                                                            onClick={(e) => setSymbol("O")}
                                                        />

                                                        <div
                                                            className="px-[5px] py-[2.5px] lg:px-[10px] lg:py-[5px] text-button lg:text-button-lg mt-[10px] border-[3px] border-borderColor shadow-[3px_3px_0_#000000] font-[500] bg-primarybtn transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_#000000] hover:bg-primarybtnHover active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0_0_0_#000000] peer-checked:bg-white peer-checked:border-black  peer-checked:font-black peer-checked:shadow-[1.5px_1.5px_0_#000000]">
                                                            <p className="lg:text-2xl text-xl">O</p>
                                                        </div>
                                                    </label>
                                                </div> : null
                                        }
                                        {
                                            mode === "create" ?
                                                <Button props={{content: "Create Room", clickFunction: handleCreate}}/>
                                                :
                                                <Button props={{content: "Join Room", clickFunction: handleJoin}}/>
                                        }

                                    </div>
                            }
                        </>
                }

            </Container>
        </>
    )
}

export default UserInputPage;