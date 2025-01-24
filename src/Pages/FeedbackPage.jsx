import Container from "../Components/Container";
import Header from "../Components/Header";
import FeedbackDropDown from "../Components/FeedbackDropDown";
import {useRef, useState} from "react";
import FeedbackTextArea from "../Components/FeedbackTextArea";
import Button from "../Components/Button";
import Loader from "../Components/Loader";
import image from "../Assets/Images/catHappy.jpeg"
import image2 from "../Assets/Images/catSad.jpeg"
import{useNavigate} from "react-router-dom";

function FeedbackPage() {
    const [selectedOption, setSelectedOption] = useState(5); // State to store the selected option
    const [feedbackStatus, setFeedbackStatus] = useState("none");
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value); // Update state when option changes
    };
    const navigate = useNavigate();
    const API_URL = "http://localhost:5000";

    const [userFeedBack , setUserFeedback] = useState([useRef() , useRef() , useRef() , useRef()]);
    async function handleSubmit() {
       const data = [];
        await userFeedBack.forEach(element => {
            data.push(element.current.getData());
        })
        setFeedbackStatus("waiting")
        fetch(`${API_URL}/feedback`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if(response.status === 200) {
                    setFeedbackStatus("success")
                }else{
                    setFeedbackStatus("error")
                }
            })
            .catch(error => {
                setFeedbackStatus("error")
            });
    }
    function handleHome(){
        navigate("/");
    }
    return (
        <Container>
            {
                feedbackStatus === "none" ?
                    <>
                        <Header props = {{header : "Share your Thoughs !!!"}}/>
                        <div className="flex items-center justify-evenly flex-col h-[80%]">
                            <FeedbackDropDown props={{title : "Design"}} ref={userFeedBack[0]}/>
                            <FeedbackDropDown props={{title : "Game Difficulty"}} ref={userFeedBack[1]}/>
                            <FeedbackDropDown props={{title : "Overall Experience"}} ref={userFeedBack[2]}/>
                            <FeedbackTextArea ref={userFeedBack[3]}/>
                            <Button props={{content : "Submit" , clickFunction : handleSubmit}} />
                        </div>
                    </> : null
            }
            {
                feedbackStatus === "waiting" ?
                    <>
                        <div className="flex items-center justify-evenly flex-col h-[90%]">
                            <p className="text-wrap font-bold text-xl lg:text-2xl text-center">Submiting Your Feedback</p>
                            <Loader />
                        </div>
                    </> : null
            }
            {
                feedbackStatus === "success" ?
                    <>
                        <div className="flex items-center justify-evenly flex-col h-[90%]">
                            <p className="text-wrap font-bold text-xl lg:text-2xl text-center">Thks For Your Time</p>
                            <img src={image} className="w-[200px] "/>
                            <Button props={{content:"Home", clickFunction : handleHome}} />
                        </div>
                    </> : null
            }
            {
                feedbackStatus === "error" ?
                    <>
                        <div className="flex items-center justify-evenly flex-col h-[90%]">
                            <p className="text-wrap font-bold text-xl lg:text-2xl text-center">Network Issues...</p>
                            <img src={image2} className="w-[200px] "/>
                            <Button props={{content:"Home", clickFunction : handleHome}} />
                        </div>
                    </> : null
            }

        </Container>
    )
}

export default FeedbackPage;