import axios from "axios";
import "./Login.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState,useContext } from "react";
import Loading from "../../Component/Loading";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { userContext } from "../../main";

const Login = () => {
  const validationSchema = Yup.object().shape({


    email: Yup.string().email().required("Email is Required."),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/(?=.*[0-9])/, "Password must contain a number."),
  });
  
const [loader, setLoader] = useState(false)
const {setUser}=useContext(userContext)
  const Navigate = useNavigate();
  const LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoader(true)
      await axios({
        method:"post",
        data:{...values},
        withCredentials:true,
        url:`${import.meta.env.VITE_BASE_URL}/user/login`

      }).then((res) => {
     
        setUser(res.data.user)
       Navigate("/login")
      })
      .catch((err) => {
        console.log(err)
       
        LoginForm.values.password=""
        toast.error("Invalid Email or Password")
       
        
      });
       
setLoader(false)
    },
  });
  
  const handleErrors = () => {
   
    if (LoginForm.errors.email){
      toast.error(LoginForm.errors.email,{theme:"dark", autoClose:2000});
    }
    if (LoginForm.errors.password){
      toast.error(LoginForm.errors.password,{theme:"dark", autoClose:2000});
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={LoginForm.handleSubmit} className="form">
        <div className="container">
          <div className="card">
            <p className="login">Login</p>

            <div className="inputBox">
            <input style={LoginForm.touched.email && LoginForm.errors.email ? {border:"2px solid red"}:{}}
                name="email"
                type="text"
                required
                onChange={LoginForm.handleChange}
                onBlur={LoginForm.handleBlur}
                autoComplete="off"
              />
              <span>Email</span>
            </div>

            <div className="inputBox">
            <input style={LoginForm.touched.password && LoginForm.errors.password ? {border:"2px solid red"}:{}}

                name="password"
                type="password"
                required
                onChange={LoginForm.handleChange}
                onBlur={LoginForm.handleBlur}
                autoComplete="off"
              />
              <span>Password</span>
            </div>
            <div className="error_message"></div>

           
            <button className="enterSignup" onClick={()=>{LoginForm.errors ? handleErrors() : LoginForm.handleSubmit}} disabled={loader} type="submit">
             {loader ?  <Loading/>: "Enter"} 
            </button>

          <p className="helperText">Need an account? &nbsp; <Link className="urlLink" to={"/signup"}>Sign up</Link></p>

          </div>
        </div>
      </form>
      <ToastContainer/>
    </div>
  );
};

export default Login;
