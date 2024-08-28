import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config, server } from "../constants/constant";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import homeBackground from "../assets/bg.png";

const Home = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const logoutHandler = async () => {
    try {
      await axios.post(`${server}/user/logout`, {}, config);
      navigate("/login");
      toast.success("Logged out successfully!!");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${server}/user/me`, config);
        setUsername(data.firstName);
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
      <div className="w-full md:w-1/2 h-1/2 md:h-screen flex justify-center items-center p-6 ">
        <div className="w-full max-w-md flex flex-col justify-center items-center p-8 ">
          <h1 className="text-2xl md:text-5xl font-bold mb-6 text-white uppercase animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-[#3A244A] pr-5">{`Welcome, ${username}`}</h1>
          <div className="flex space-x-4">
            <button
              className="bg-[#3A244A] hover:bg-[#472c5b] text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
              onClick={() => navigate("/reset-password")}
            >
              Reset Password
            </button>
            <button
              className="bg-[#3A244A] hover:bg-[#472c5b] text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 h-1/2 md:h-screen flex justify-center items-center">
        <img
          src={homeBackground}
          alt="home"
          className="w-full h-full object-cover md:object-contain "
        />
      </div>
    </div>
  );
};

export default Home;

{
  // bg-gradient-to-r from-purple-600 to-indigo-600
  /* <div className="w-full flex justify-center h-lvh items-center flex-col">
  <h1 className="text-3xl">{`Welcome, ${username}`}</h1>
  <div className="m-5">
    <button
      className=" bg-[#3A244A] text-white font-semibold px-4 py-2 rounded-md mr-3 "
      onClick={() => navigate("/reset-password")}
    >
      Reset Password
    </button>
    <button
      className=" bg-[#3A244A] text-white font-semibold px-4 py-2 rounded-md ml-3"
      onClick={logoutHandler}
    >
      Logout
    </button>
  </div>
</div>;  */
}
