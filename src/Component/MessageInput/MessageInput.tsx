import "./MessageInput.css";

const MessageInput = () => {
  return (
    <div className="input-container ">
      <input placeholder="Type here...." type="text" />
      <button className="invite-btn" type="submit">
        send
      </button>
    </div>
  );
};

export default MessageInput;
