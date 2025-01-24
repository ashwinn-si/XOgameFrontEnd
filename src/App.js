import {BrowserRouter , Route ,Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserDetailsPage from "./Pages/OfflineMode/UserDetailsPage";
import Home from "./Pages/OnlineMode/Home";
import GameArea from "./Pages/OfflineMode/GameArea";
import GameAreaOnline from "./Pages/OnlineMode/GameArea"
import EndPage from "./Pages/OfflineMode/EndPage";
import FeedbackPage from "./Pages/FeedbackPage";
import SurrenderPage from "./Pages/OfflineMode/SurrenderPage";
import UserInputPage from "./Pages/OnlineMode/UserInputPage";
import PlayerWaitingPage from "./Pages/OnlineMode/PlayerWaitingPage";
import SocketProvider from "./SocketProvider";
import EndPageOnline from "./Pages/OnlineMode/EndPage"

function App(){
  return (
      <SocketProvider>
          <div>
              <BrowserRouter>
                  <Routes>
                      <Route index path="/" element={<HomePage/>}/>
                      <Route path="/offlineMode">
                          <Route path="UserDetailsPage" element={<UserDetailsPage/>}/>
                          <Route path="GameArena/:PlayerSymbol/:mode" element={<GameArea/>}/>
                          <Route path="EndPage/:winner" element={<EndPage/>}/>
                          <Route path="Surrender" element={<SurrenderPage/>}/>
                      </Route>
                      <Route path="/FeedBack" element={<FeedbackPage/>}/>
                      <Route path="/onlineMode">
                          <Route path="Home" element={<Home/>}></Route>
                          <Route path="UserDetailsPage/:mode" element={<UserInputPage/>}></Route>
                          <Route path="PlayerWaitingPage/:mode/:roomID/:playerSymbol" element={<PlayerWaitingPage/>}></Route>
                          <Route path="GameArena/:mode/:roomID" element={<GameAreaOnline />}></Route>
                          <Route path="EndPage/:winner" element={<EndPageOnline/>}></Route>
                      </Route>
                  </Routes>
              </BrowserRouter>
          </div>
      </SocketProvider>
  );
}

export default App;
