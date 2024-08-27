import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config, server } from "../constants/constant";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface VisibilityState {
  oldPassword: boolean;
  newPassword: boolean;
}

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState<VisibilityState>({
    oldPassword: false,
    newPassword: false,
  });

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

  const togglePassword = (field: keyof VisibilityState) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
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
            <div className="relative w-full">
              <input
                type={visibility.oldPassword ? "text" : "password"}
                placeholder="Enter Old Password"
                className="w-full px-4 py-2 border-b-2 focus:outline-none mt-4 pr-10"
                value={password.oldPassword}
                onChange={(e) =>
                  setPassword({ ...password, oldPassword: e.target.value })
                }
              />
              <span
                onClick={() => togglePassword("oldPassword")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              >
                {visibility.oldPassword ? (
                  <FaEyeSlash className="text-[#3A244A]" />
                ) : (
                  <FaEye className="text-[#3A244A]" />
                )}
              </span>
            </div>
            <div className="relative w-full">
              <input
                type={visibility.newPassword ? "text" : "password"}
                placeholder="Enter New Password"
                className="w-full px-4 py-2 border-b-2 focus:outline-none mt-4 pr-10"
                value={password.newPassword}
                onChange={(e) =>
                  setPassword({ ...password, newPassword: e.target.value })
                }
              />
              <span
                onClick={() => togglePassword("newPassword")}
                className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer"
              >
                {visibility.newPassword ? (
                  <FaEyeSlash className="text-[#3A244A]" />
                ) : (
                  <FaEye className="text-[#3A244A]" />
                )}
              </span>
            </div>

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
