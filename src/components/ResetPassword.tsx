import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config, server } from "../constants/constant";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${server}/user/reset-password`, password, config);
      navigate("/");
      toast.success("Password is changed successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-lvh flex items-center justify-center">
      <div className="w-96 h-96 flex flex-col border rounded-2xl shadow-lg p-4 ">
        <h1 className="text-center m-3 text-2xl font-bold text-[#3A244A]">
          Reset Password
        </h1>
        <div className="h-full">
          <form
            className="h-full flex flex-col items-center"
            onSubmit={submitHandler}
          >
            <input
              type="password"
              placeholder="Enter Old Password"
              className="w-full px-4 py-2 border-b-2 focus:outline-none mt-4"
              value={password.oldPassword}
              onChange={(e) =>
                setPassword({ ...password, oldPassword: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Enter New Password"
              className="w-full px-4 py-2 border-b-2 focus:outline-none  mt-4"
              value={password.newPassword}
              onChange={(e) =>
                setPassword({ ...password, newPassword: e.target.value })
              }
            />
            <button
              type="submit"
              className="w-full bg-[#3A244A] text-white font-semibold px-4 py-2 rounded-md  mt-4"
              disabled={loading}
            >
              {loading ? "Loading..." : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
