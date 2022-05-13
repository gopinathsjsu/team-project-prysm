import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AdminPage from "./components/login/AdminPage";
import LoginForm from "./components/login/loginForm";
import { MyTrips } from "./components/MyTrips";
import Navbar from "./components/Navbar";
function App() {
  
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/myTrips" element={<MyTrips />} />
        </Routes>
    </div>
  );
}

export default App;
