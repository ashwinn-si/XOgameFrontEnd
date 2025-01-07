import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Button from "../../Components/Button";
import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    function handleCreate(){
        navigate("/onlineMode/UserDetailsPage/create");
    }
    function handleJoin(){
        navigate("/onlineMode/UserDetailsPage/join");
    }
    return (
        <Container>
            <Header props = {{header : "MultiPlayer !!"}}/>
            <div className="flex w-full h-[80%] justify-evenly  flex-col items-center ">
                <Button props={{content:"Create Game" , clickFunction : handleCreate}}/>
                <Button props={{content:"Join Game" , clickFunction : handleJoin}}/>
            </div>
        </Container>
    )
}
export default Home;