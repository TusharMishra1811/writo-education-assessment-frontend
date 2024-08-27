import { Link, useNavigate } from "react-router-dom";
import signinIllustrator from "../assets/signinillustrator.png";
import { useState } from "react";
import { config, server } from "../constants/constant";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("password");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${server}/user/login`, user, config);
      navigate("/");
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 flex max-w-5xl">
        <div className="hidden md:flex flex-col justify-center p-6">
          <img
            src={signinIllustrator}
            alt="illustration"
            className="object-cover w-96"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 space-y-6">
          <h2 className="text-3xl font-extrabold text-[#3A244A]">
            Fill what we know <span className=" text-[#D72638]">!</span>
          </h2>
          <h2 className="text-2xl  text-[#3A244A] underline">
            <Link to={"/signup"}>
              Sign <span className=" text-[#D72638] underline">Up</span>
            </Link>
          </h2>
          <form className="space-y-4" onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border-b-2 focus:outline-none "
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <div className="relative w-full">
              <input
                type={type}
                placeholder="Password"
                className="w-full px-4 py-2 border-b-2 focus:outline-none pr-10" // Add padding-right to avoid text overlap
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <span
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              >
                {type === "password" ? (
                  <FaEye className="text-[#3A244A]" />
                ) : (
                  <FaEyeSlash className="text-[#3A244A]" />
                )}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#3A244A] text-white font-semibold px-4 py-2 rounded-md "
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
