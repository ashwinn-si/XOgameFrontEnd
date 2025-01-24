import Container from "../Components/Container";
import Header from "../Components/Header";
import Button from "../Components/Button";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();
    function offlineModeClick(){
        navigate("/offlineMode/UserDetailsPage");
    }
    function onlineModeClick(){
        navigate("/onlineMode/Home");
    }
    return(
            <Container>
                <Header props = {{header : "Welcome !!"}}/>
                <div className="flex items-center justify-evenly w-full h-[70%] lg:h-[350px] flex-col ">
                    <p className="text-[1.1rem] lg:text-[1.4rem] font-extrabold text-center">
                        Tic-Tac-Toe
                    </p>
                    <Button props={{content: "Offline Mode",clickFunction : offlineModeClick}}/>
                    <Button props={{content: "Online Mode" , clickFunction : onlineModeClick}}/>
                </div>

            </Container>

    )
}

export default HomePage;