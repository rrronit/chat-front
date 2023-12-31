import socketIO from "socket.io-client";
import "./Chat.css";
import { useEffect, useState, useContext, useRef } from "react";
import MessageInput from "../../Component/MessageInput/MessageInput";
import { userContext } from "../../main";
import axios from "axios";
import { MessageBox } from "react-chat-elements";
import Logout from "../../Component/Logout";

const Chat = () => {
  const chatRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const [allMessages, setAllMessages] = useState<Object[]>([]);

  const socket: any = useRef(null);

  useEffect(() => {
    if (User) {
      socket.current = socketIO(import.meta.env.VITE_BASE_URL, {
        transports: ["websocket"],
      });

      socket.current.on("connect", () => {
        console.log("Socket connected");
        fetchMessage();
      });

      socket.current.on("add-mess", (data: any) => {
        setAllMessages((prevMessages) => [...prevMessages, data]);
        setTimeout(() => scrollToBottom());
      });
    }
    return () => {
      socket.current.disconnect();
    };
  }, []);
  const { User }: any = useContext(userContext);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const fetchMessage = async () => {
    await axios
      .get(`${import.meta.env.VITE_BASE_URL}/message/all`)
      .then((res) => {
        setAllMessages(res.data.message);
        setTimeout(() => scrollToBottom());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const sendMessage = async () => {
    try {
      await Promise.resolve(
        socket.current.emit("message", {
          message,
          ID: User._id,
          name: User.Name,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleMessage = async (e: any) => {
    e.preventDefault();
    if (message.trim() !== "") {
      await sendMessage();
      setMessage("");
    }
  };

  return (
    <div className="chat-screen">
      <Logout />
      <div className="chat-container">
        <div className="allMessages" ref={chatRef}>
          {allMessages.map((data: any) => {
            return (
              <div key={data._id}>
                <MessageBox
                  id={data._id}
                  focus
                  
                  titleColor="black"
                  forwarded={false}
                  replyButton={false}
                  removeButton={false}
                  status="read"
                  notch={true}
                  retracted={false}
                  position={User._id === data.senderID ? "right" : "left"}
                  title={User._id === data.senderID ? "YOU" : data.senderName}
                  type="text"
                  text={data.message}
                  date={data.createdAt}
                />
              </div>
            );
          })}
        </div>
        <form className="MessageInput" onSubmit={(e: any) => handleMessage(e)}>
          <div className="messageBox">
            <MessageInput message={message} setMessage={setMessage} handleMessage={handleMessage} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
