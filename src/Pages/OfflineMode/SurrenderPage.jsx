import Container from "../../Components/Container";
import Header from "../../Components/Header";
import imgae from "../../Assets/Images/catCry.jpeg"  ;
import Button from "../../Components/Button";
import {useNavigate} from "react-router-dom";

function SurrenderPage(props) {
    const navigate = useNavigate();
    function handleHome(){
        navigate("/FeedBack")
    }
    return (
        <Container>
            <Header props = {{header : "Well Played !!"}}/>
            <div className="flex justify-center items-center  w-full h-[60%]">
                <img src={imgae} className="w-[200px] "/>
            </div>
            <div className="flex justify-center items-center ">
                <Button props={{content:"Feedback" , clickFunction:handleHome}}/>
            </div>

        </Container>
    )
}
export default SurrenderPage;