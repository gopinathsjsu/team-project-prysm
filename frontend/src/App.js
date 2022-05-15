import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminPage from "./components/login/AdminPage";
import LoginForm from "./components/login/loginForm";
import { MyTrips } from "./components/MyTrips";
import Navbar from "./components/Navbar";

import "./index.css";
function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: "url(/Background.jpg)",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/myTrips" element={<MyTrips />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
