import Container from "../../Components/Container";
import Header from "../../Components/Header";
import FeedbackDropDown from "../../Components/FeedbackDropDown";
import {useRef, useState} from "react";
import FeedbackTextArea from "../../Components/FeedbackTextArea";
import Button from "../../Components/Button";

function FeedbackPage() {
    const [selectedOption, setSelectedOption] = useState(5); // State to store the selected option

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value); // Update state when option changes
    };
    const [userFeedBack , setUserFeedback] = useState([useRef() , useRef() , useRef() , useRef()]);
    async function handleSubmit() {
       const data = [];
        await userFeedBack.forEach(element => {
            data.push(element.current.getData());
        })
        fetch("http://localhost:5000/feedback", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if(response.status === 200){
                    console.log("all done")
                }else{
                    console.log("something went wrong")
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
    return (
        <Container>
            <Header props = {{header : "Share your Thoughs !!!"}}/>
            <div className="flex items-center justify-evenly flex-col h-[80%]">
                <FeedbackDropDown props={{title : "Design"}} ref={userFeedBack[0]}/>
                <FeedbackDropDown props={{title : "About Game"}} ref={userFeedBack[1]}/>
                <FeedbackDropDown props={{title : "Overall Experience"}} ref={userFeedBack[2]}/>
                <FeedbackTextArea ref={userFeedBack[3]}/>
                <Button props={{content : "Submit" , clickFunction : handleSubmit}} />
            </div>

        </Container>
    )
}
export default FeedbackPage;