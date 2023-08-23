import "./MessageInput.css";

const MessageInput = ({message,setMessage,handleMessage}) => {
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
