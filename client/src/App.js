import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home";
import ParticularJob from "./Components/ParticularJob/ParticularJob";
import AddJob from "./Components/AddJob/AddJob";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/job/:id" element={<ParticularJob />} />
      <Route path="/add-job" element={<AddJob />} />
    </Routes>
  );
}

export default App;
