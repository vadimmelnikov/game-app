import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./component/Navigation";
import useFullHeight from "./hooks/useFullHeight";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
function App() {
  useFullHeight();
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/post" exact element={<SinglePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
