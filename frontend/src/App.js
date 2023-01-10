import Login from "./component/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/homePage";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/home" exact element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
