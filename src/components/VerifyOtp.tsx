import axios from "axios";
import signupIllustrator from "../assets/signupIllustrator.png";
import { useEffect, useRef, useState } from "react";
import { server } from "../constants/constant";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface OtpFormProps {
  length?: number;
}

const VerifyOtp: React.FC<OtpFormProps> = ({ length = 4 }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  const onChangeHandler = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (isNaN(Number(value))) return;

    const newOtp = [...otp];

    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < length - 1 && inputRef.current[index + 1]) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const onClickHandler = (index: number) => {
    const inputElement = inputRef.current[index];
    if (inputElement) {
      inputElement.setSelectionRange(1, 1);
    }

    if (index > 0 && !otp[index - 1]) {
      const firstEmptyIndex = otp.indexOf("");
      if (firstEmptyIndex !== -1) {
        inputRef.current[firstEmptyIndex]?.focus();
      }
    }
  };

  const onKeyDownHandler = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRef.current[index - 1]
    ) {
      inputRef.current[index - 1]?.focus();
    }
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const modifiedOtp = otp.join("");
      const verifyOtp = Number(modifiedOtp);

      await axios.post(`${server}/user/otp-verification`, {
        verifyOtp,
      });
      navigate("/");
      toast.success("User is verified successfully!!");
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
            src={signupIllustrator}
            alt="illustration"
            className="object-cover w-96"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 space-y-6 border rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-[#3A244A]">
            Let us know <span className=" text-[#D72638]">!</span>
          </h2>
          <h2 className="text-2xl  text-[#3A244A]">Enter OTP</h2>

          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="flex justify-center space-x-2">
              {otp.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  ref={(input) => (inputRef.current[index] = input)}
                  value={value}
                  onChange={(e) => onChangeHandler(index, e)}
                  onClick={() => onClickHandler(index)}
                  onKeyDown={(e) => onKeyDownHandler(index, e)}
                  className="text-center border-none bg-[#DBE2EF] w-12 h-12 md:w-16 md:h-16"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-[#3A244A] text-white font-semibold px-4 py-2 rounded-md "
              disabled={loading}
            >
              {loading ? "Loading..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
