import {useParams} from "react-router-dom";

function GameArea(props){
    const data = useParams();
    console.log(data);
    return (
        <container>
            <p>This is Game arena</p>
        </container>
    )
}
export default GameArea;