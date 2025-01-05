import Container from "../../Components/Container";
import Header from "../../Components/Header";
import {useEffect, useRef, useState} from "react";
import Button from "../../Components/Button";
import LoadingHeader from "../../Components/LoadingHeader";
import SubHeading from "../../Components/SubHeading";
import {useNavigate} from "react-router-dom";
import userDetailsError from "../../Scripts/UserDetailsError";
import ErrorMessage from "../../Components/ErrorMessage";
import GameArea from "./GameArea";

function UserDetailsPage(props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [difficulty, setDifficulty] = useState("Select Difficulty");
    const [symbol,setSymbol] = useState("");
    const[gameStartFlag, setGameStartFlag] = useState(false);
    const[time,setTime] = useState(3);
    const[errorFlag,setErrorFlag] = useState(false);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleClick(event){
        setDifficulty(event.target.innerText);
        setIsOpen(false);
    }

    function startGame(){
        if(userDetailsError(symbol,difficulty)){
            setGameStartFlag(true);
            const timeHelper = setInterval(() => {
                setTime(prevState => prevState - 1);
            }, 1000);
            setTimeout(() => {
                clearInterval(timeHelper);
                setTime("loading...!")
                navigate(`/offlineMode/GameArena/${symbol}/${difficulty}`);
            }, 3000);
        }else{
            setErrorFlag(true)
            setTimeout(() => {
                setErrorFlag(false);
            },5000)
        }

    }
    return (
        <Container>
            <Header props={{header: "Offline Mode"}}/>
            {
                (gameStartFlag) ?
                    <LoadingHeader props={{time: time}}/> :
                    <>
                        <div
                            className="flex items-center justify-evenly w-full h-[100px] lg:h-[175px] flex-col overflow-visible">
                            <SubHeading props={{content : "Select the Symbol"}}/>
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
                                        className="px-[5px] py-[2.5px] lg:px-[10px] lg:py-[5px] text-button lg:text-button-lg mt-[10px] border-[3px] border-borderColor shadow-[3px_3px_0_#000000] font-[750] bg-primarybtn transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_#000000] hover:bg-primarybtnHover active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0_0_0_#000000] peer-checked:bg-primarybtnHover peer-checked:border-black peer-checked:shadow-[1.5px_1.5px_0_#000000]">
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
                                        className="px-[5px] py-[2.5px] lg:px-[10px] lg:py-[5px] text-button lg:text-button-lg mt-[10px] border-[3px] border-borderColor shadow-[3px_3px_0_#000000] font-[750] bg-primarybtn transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_#000000] hover:bg-primarybtnHover active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0_0_0_#000000] peer-checked:bg-primarybtnHover peer-checked:border-black peer-checked:shadow-[1.5px_1.5px_0_#000000]">
                                        <p className="lg:text-2xl text-xl">O</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div
                            className="flex items-center justify-evenly w-full h-[150px] lg:h-[150px] flex-row overflow-visible">
                            <div className="relative inline-block text-left mt-4 w-full max-w-[200px]"
                                 ref={dropdownRef}>
                                {/* Dropdown Button */}
                                <button
                                    onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
                                    className="px-[10px] py-[5px] text-xl font-[750] border-[3px] border-black shadow-[3px_3px_0_#000000] bg-primarybtn transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_#000000] hover:bg-primarybtnHover active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0_0_0_#000000] w-full">
                                    {difficulty}
                                </button>

                                {/* Dropdown Menu */}
                                {isOpen && (
                                    <div
                                        className="absolute mt-2 w-full bg-white border-[3px] border-black shadow-[3px_3px_0_#000000] z-[9999]">
                                        <ul className="text-black z-[9999]">
                                            <li
                                                className="px-[10px] py-[5px] hover:bg-primarybtnHover hover:text-white cursor-pointer transition-all duration-200 z-[9999]"
                                                value="Easy"
                                                onClick={(e) => handleClick(e)} // Close dropdown on selection
                                            >
                                                Easy
                                            </li>
                                            <li
                                                className="px-[10px] py-[5px] hover:bg-primarybtnHover hover:text-white cursor-pointer transition-all duration-200 "
                                                value="Medium"
                                                onClick={(e) => handleClick(e)}
                                            >
                                                Medium
                                            </li>
                                            <li
                                                className="px-[10px] py-[5px] hover:bg-primarybtnHover hover:text-white cursor-pointer transition-all duration-200 "
                                                value="Hard"
                                                onClick={(e) => handleClick(e)}
                                            >
                                                Hard
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={"flex justify-center items-center"}>
                            <Button props={{content: "Start" , clickFunction : startGame}}/>
                        </div>

                        {
                            errorFlag ? <ErrorMessage props={{content : "Input Missing"}}> </ErrorMessage> : null
                        }

                    </>

            }


        </Container>
    )
}

export default UserDetailsPage;
