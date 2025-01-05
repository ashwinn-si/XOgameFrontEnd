import Container from "../../Components/Container";
import Header from "../../Components/Header";
import Radio from "../../Components/FeedbackStar";
import FeedbackStar from "../../Components/FeedbackStar";

function FeedbackPage() {

    return (
        <Container>
            <Header props = {{header : "Share your Thoughs !!!"}}/>
            <div>
                <FeedbackStar props={{content:"Design"}}/>
                <FeedbackStar props={{content:"Responsive"}}/>
                <FeedbackStar props={{content:"Design"}}/>
            </div>

        </Container>
    )
}
export default FeedbackPage;