import "./MessageInput.css";
import { Dispatch, SetStateAction } from "react";

const MessageInput = ({message,setMessage,handleMessage}:{message:string,setMessage:Dispatch<SetStateAction<string>>,handleMessage:(e: any) => Promise<void>}) => {
 
  return (
    <div className="input-container ">
      <input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Type here...." type="text" />
      <button className="invite-btn" onClick={handleMessage} type="submit">
        send
      </button>
    </div>
  );
};

export default MessageInput;
