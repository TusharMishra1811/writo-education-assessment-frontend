import { Link, useNavigate } from "react-router-dom";
import signinIllustrator from "../assets/signinillustrator.png";
import { useState } from "react";
import { config, server } from "../constants/constant";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

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
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border-b-2 focus:outline-none"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

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
