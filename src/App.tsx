import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./components/Authentication";
import Home from "./components/Home";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import Signup from "./components/Signup";
import VerifyOtp from "./components/VerifyOtp";

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
