import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Home from "./components/Home";
import VerifyOtp from "./components/VerifyOtp";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import { Toaster } from "react-hot-toast";
import Authentication from "./components/Authentication";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <Authentication>
              <Home />
            </Authentication>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp-verification" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/reset-password"
          element={
            <Authentication>
              <ResetPassword />
            </Authentication>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
