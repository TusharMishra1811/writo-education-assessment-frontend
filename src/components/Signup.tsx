import { Link, useNavigate } from "react-router-dom";
import signupIllustrator from "../assets/signupIllustrator.png";
import { useState } from "react";
import axios from "axios";
import { config, server } from "../constants/constant";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

interface VisibilityState {
  password: boolean;
  confirmPassword: boolean;
}

const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    contactMode: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState<VisibilityState>({
    password: false,
    confirmPassword: false,
  });

  const submitHandler = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${server}/user/signup`, user, config);
      navigate("/otp-verification");
      toast.success("User is signed up successfully!!");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = (field: keyof VisibilityState) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 flex max-w-5xl">
        <div className="hidden md:flex flex-col justify-center p-6">
          <img
            src={signupIllustrator}
            alt="illustration"
            className="object-cover w-96"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 space-y-6">
          <div className="flex space-x-24">
            <h2 className="text-3xl font-extrabold text-[#3A244A]">
              Let us know <span className=" text-[#D72638]">!</span>
            </h2>
            <h2 className="text-2xl  text-[#3A244A] underline">
              <Link to={"/login"}>
                Sign <span className=" text-[#D72638] underline">In</span>
              </Link>
            </h2>
          </div>
          <form className="space-y-4" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="First Name"
              className="w-full px-4 py-2 border-b-2 focus:outline-none "
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 border-b-2 focus:outline-none"
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />

            <div className="relative w-full">
              <input
                type={visibility.password ? "text" : "password"}
                placeholder="Set Password"
                className="w-full px-4 py-2 border-b-2 focus:outline-none pr-10"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <span
                onClick={() => togglePassword("password")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              >
                {visibility.password ? (
                  <FaEyeSlash className="text-[#3A244A]" />
                ) : (
                  <FaEye className="text-[#3A244A]" />
                )}
              </span>
            </div>
            <div className="relative w-full">
              <input
                type={visibility.confirmPassword ? "text" : "password"}
                placeholder="Retype Password"
                className="w-full px-4 py-2 border-b-2 focus:outline-none"
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
              />
              <span
                onClick={() => togglePassword("confirmPassword")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              >
                {visibility.confirmPassword ? (
                  <FaEyeSlash className="text-[#3A244A]" />
                ) : (
                  <FaEye className="text-[#3A244A]" />
                )}
              </span>
            </div>
            <div>
              <select
                className="w-full px-4 py-2 border-b-2 focus:outline-none"
                value={user.contactMode}
                onChange={(e) =>
                  setUser({ ...user, contactMode: e.target.value })
                }
              >
                <option value="" disabled hidden>
                  Contact Mode
                </option>
                <option value="Email">Email</option>
              </select>
            </div>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full px-4 py-2 border-b-2 focus:outline-none"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <button
              type="submit"
              className="w-full bg-[#3A244A] text-white font-semibold px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
