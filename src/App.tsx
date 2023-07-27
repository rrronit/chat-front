import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import Verification from "./Pages/Verification/Verification";
import Chat from "./Pages/Chat/Chat";
import { useEffect, useState } from "react";
import axios from "axios";
import PageLoading from "./Pages/PageLoading/PageLoading";
import { userContext } from "./main";

function App() {
  const navigator = useNavigate();
  const [User, setUser] = useState(null);

  const [userEmail, setuserEmail] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);
  useEffect(() => {
  
    axios({
      url: `${import.meta.env.VITE_BASE_URL}/user/verifyuser`,
      withCredentials:true,
      method:"get"
    })
      .then((res) => {
        setUser(res.data.user);
        setIsDataFetched(true);
        navigator("/chat");
      })
      .catch((err) => {
        console.log(err);
        setIsDataFetched(true);
      });
  }, []);

  if (!isDataFetched) {
    return <PageLoading />;
  }
  return (
    <>
      <userContext.Provider value={{ User, setUser }}>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to={User ? "/chat" : "/login"} />}
          />
          <Route
            path="/signup"
            element={User ? <Chat /> : <Signup setEmail={setuserEmail} />}
          />
          <Route path="/login" element={User ? <Chat /> : <Login />} />
          <Route
            path="/verify"
            element={User ? <Chat /> : <Verification email={userEmail} />}
          />
          <Route path="/chat" element={User ? <Chat /> : <Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </userContext.Provider>
    </>
  );
}

export default App;
