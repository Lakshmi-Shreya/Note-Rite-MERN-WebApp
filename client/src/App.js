import "./App.css";
import Footer from "./components/Footer";

import LandingPage from "./screens/landingPage/LandingPage";
import { BrowserRouter, Route } from "react-router-dom";
import MyNotes from "./screens/myNotes/MyNotes";
import Login from "./screens/userRegisteration/Login";
import Signup from "./screens/userRegisteration/Signup";
import CreateNote from "./screens/myNotes/CreateNote";
import Header from "./components/Header";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/myNotes">
          <MyNotes />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/createNote">
          <CreateNote />
        </Route>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
