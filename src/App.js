import {BrowserRouter , Route ,Routes} from "react-router-dom";
import HomePage from "./Components/HomePage";

function App() {
  return (
    <BrowserRouter>
        <HomePage/>
      <Routes>
            <Route path="/" component={App} />
            {/*<Route path="/offlineMode">*/}
            {/*    <Route path="UserDetails" component={} />*/}
            {/*    <Route path="PlayerArena" component={} />*/}
            {/*    <Route path="ThankYou" component={} />*/}
            {/*    <Route path="FeedBack" compoent={} />*/}
            {/*</Route>*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
