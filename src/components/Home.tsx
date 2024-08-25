import axios from "axios";
import { useNavigate } from "react-router-dom";
import { config, server } from "../constants/constant";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
    <div className="w-full h-lvh">
      <div className="w-full flex justify-center h-lvh items-center flex-col">
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
      </div>
    </div>
  );
};

export default Home;
