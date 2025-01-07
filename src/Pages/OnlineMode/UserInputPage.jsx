import Container from "../../Components/Container";
import Header from "../../Components/Header";
import {useParams} from "react-router-dom";
import UserNameField from "../../Components/UserNameField";
import Button from "../../Components/Button";

//erroring handling for name and id
//erroring handle for room id not found

function UserInputPage(props) {
    const mode = useParams().mode;
    function handleCreate(){
        console.log("create")
    }
    function handleJoin(){
        console.log("join")
    }
    return (
        <Container>
            <Header props = {{header : "Fill Details"}}/>
            <div className="w-[100%] h-[90%] flex items-center justify-evenly flex-col">
                <UserNameField props={{content : "Name"}}/>
                {
                    mode ==="create" ? null : <UserNameField props={{content : "Room Id"}}/>
                }
                {
                    mode ==="create"? <Button props={{content : "Create Room", clickFunction : handleCreate}}/> :  <Button props={{content : "Join Room", clickFunction : handleJoin}}/>
                }

            </div>
        </Container>
    )
}
export default UserInputPage;