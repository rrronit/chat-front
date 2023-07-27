import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer, toast } from "react-toastify";
import Loading from "../../Component/Loading";
import { userContext } from "../../main";

const Verification = ({ email }) => {
  const [loader, setLoader] = useState(false);
  const { User, setUser } = useContext(userContext);
  const Navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      Navigate("/signup");
    } else if (User) {
      // Redirect to another page if user is already logged in and verified
      Navigate("/chat");
    }
  }, [email, User, Navigate]);

  const [data, setData] = useState({
    Email: email,
    OTP: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.OTP.length < 4) {
      toast.error("Invalid OTP. Please enter a valid OTP.");
      return;
    }
    setLoader(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/verify`,
        { ...data },
        { withCredentials: true }
      );
      console.log(response.data.user)
      setUser(response.data.user);
      toast.success("OTP successfully verified!");
      Navigate("/chat");
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify OTP. Please try again.");
    }
    setData((data) => ({ ...data, ["OTP"]: "" }));
    setLoader(false);
  };

  const handleResend = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/OTPagain`,
        { ...data },
        { withCredentials: true }
      );
      toast("OTP sent");
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend OTP. Please try again.");
    }

  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="container">
          <div className="card">
            <p className="signup">Check OTP</p>
            <div className="inputBox">
              <input
                onChange={handleChange}
                name="OTP"
                type="text"
                minLength={4}
                maxLength={4}
                required
                autoComplete="off"
                autoFocus={true}
              />
              <span className="name">OTP</span>
            </div>

            <button className="enterSignup" disabled={loader} type="submit">
              {loader ? <Loading /> : "Enter"}
            </button>
            <span className="helperText">
              If you didn't receive an OTP! &nbsp;{" "}
              <span
                style={{ cursor: "pointer" }}
                onClick={handleResend}
                className="urlLink"
              >
                Resend
              </span>
            </span>
          </div>
        </div>
      </form>
      <ToastContainer
        position={"bottom-center"}
        autoClose={2000}
        transition={Bounce}
        theme="dark"
      />
    </div>
  );
};

export default Verification;
