import Container from "../../Components/Container";
import {useParams} from "react-router-dom";
import Header from "../../Components/Header";
import SubHeading from "../../Components/SubHeading";
import Button from "../../Components/Button";
import {useNavigate} from "react-router-dom";

function EndPage() {
    const winner = useParams().winner;
    const navigate = useNavigate();
    function handlePlayAgain(){
        navigate("/offlineMode/UserDetailsPage");
    }
    function handleHome(){
        navigate("/")
    }
    function handleFeedBack(){
        navigate("/FeedBack");
    }
    return (
        <Container>
            <Header props = {{header : "Thanks For Playing :)"}} />
            <div className="flex items-center justify-evenly flex-col h-[80%]">
                <SubHeading props={{content : `${winner} wins !!!`}}/>
                <Button props={{content : "Play Again" , clickFunction : handlePlayAgain}}/>
                <Button props={{content : "Home" , clickFunction : handleHome}}/>
                <Button props={{content : "FeedBack" , clickFunction : handleFeedBack}}/>
            </div>

        </Container>
    )
}
export default EndPage;