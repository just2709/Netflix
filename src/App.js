import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Movies from "./routes/Movies";
import TVs from "./routes/TVs";
import { ScrollToTop } from "./components/ScrollToTop";


function App() {
  return (
    <Router>
      <Header/>
      <ScrollToTop/>
      <Routes>
        <Route path="/:media_type/:id" element={<Detail />}/>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/series" element={<TVs />}/>
        <Route path="/Netflix" element={<Home />}/>

      </Routes>
    </Router>

  )
}
export default App;
