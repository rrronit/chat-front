import "./Signup.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import Loading from "../../Component/Loading";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";

const Signup = ({
  setEmail,
}: {
  setEmail: Dispatch<SetStateAction<string>>;
}) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is Required.")
      .min(3, "Name is Too Short."),

    email: Yup.string()
      .email("Email must be valid.")
      .required("Email is Required."),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
  });

  const [loader, setLoader] = useState(false);

  const Navigate = useNavigate();
  const SignupForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoader(true);
      await axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/user/signup`,
          {
            ...values,
          },
          { withCredentials: true }
        )
        .then(() => {
          setEmail(values.email);
          Navigate("/verify");
        })
        .catch((err) => console.log(err));

      setLoader(false);
    },
  });

  const handleErrors = () => {
    if (SignupForm.touched.name && SignupForm.errors.name) {
      toast.error(SignupForm.errors.name, { theme: "dark", autoClose: 2000 });
    }
    if (SignupForm.touched.email && SignupForm.errors.email) {
      toast.error(SignupForm.errors.email, { theme: "dark", autoClose: 2000 });
    }
    if (SignupForm.touched.password && SignupForm.errors.password) {
      toast.error(SignupForm.errors.password, {
        theme: "dark",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={SignupForm.handleSubmit} className="Signupform">
        <div className="container">
          <div className="card">
            <p className="signup">Sign Up</p>
            <div className="inputBox">
              <input
                style={
                  SignupForm.touched.name && SignupForm.errors.name
                    ? { border: "2px solid red" }
                    : {}
                }
                name="name"
                type="text"
                required
                onChange={SignupForm.handleChange}
                onBlur={SignupForm.handleBlur}
                autoComplete="off"
              />
              <span className="name">Name</span>
            </div>

            <div className="inputBox">
              <input
                style={
                  SignupForm.touched.email && SignupForm.errors.email
                    ? { border: "2px solid red" }
                    : {}
                }
                name="email"
                type="text"
                required
                onChange={SignupForm.handleChange}
                onBlur={SignupForm.handleBlur}
                autoComplete="off"
              />
              <span>Email</span>
            </div>

            <div className="inputBox">
              <input
                style={
                  SignupForm.touched.password && SignupForm.errors.password
                    ? { border: "2px solid red" }
                    : {}
                }
                name="password"
                type="password"
                required
                onChange={SignupForm.handleChange}
                onBlur={SignupForm.handleBlur}
                autoComplete="off"
              />
              <span>Password</span>
            </div>

            <button
              className="enterSignup"
              onClick={() => {
                SignupForm.errors ? handleErrors() : SignupForm.handleSubmit;
              }}
              disabled={loader}
              type="submit"
            >
              {loader ? <Loading /> : "Enter"}
            </button>

            <p className="helperText">
              Already have an account? &nbsp;{" "}
              <Link className="urlLink" to={"/login"}>
                Log in
              </Link>
            </p>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
