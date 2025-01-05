import {BrowserRouter , Route ,Routes} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import UserDetailsPage from "./Pages/OfflineMode/UserDetailsPage";
import Home from "./Pages/OnlineMode/Home";
import GameArea from "./Pages/OfflineMode/GameArea";
import EndPage from "./Pages/OfflineMode/EndPage";
import FeedbackPage from "./Pages/OfflineMode/FeedbackPage";


function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route index path="/" element={<HomePage />} />
                  <Route path="/offlineMode">
                      <Route path="UserDetailsPage" element={<UserDetailsPage />} />
                      <Route path="GameArena/:PlayerSymbol/:mode" element={<GameArea />}  />
                      <Route path="EndPage/:winner" element={<EndPage />}  />
                      <Route path="FeedBack" element={<FeedbackPage />}  />
                  </Route>
                  <Route path="/onlineMode">
                      <Route path="home" element={<Home />}></Route>
                  </Route>
              </Routes>
          </BrowserRouter>
      </div>

  );
}

export default App;
