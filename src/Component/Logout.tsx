import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../main";
import { useContext } from "react";

const Logout = () => {
    const Navigate=useNavigate()
    const {setUser}=useContext(userContext)

  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
      withCredentials: true,
    }).then(()=>{
        setUser(null)
        Navigate("/")
    });
    
    
    
  };
  return (
    <div>
      <button
        onClick={() => handleLogout()}
        style={{
          backgroundColor: "white",
          padding: "2px 10px",
          position: "absolute",
          zIndex: 4,
          top: "40px",
          left: "10px",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
