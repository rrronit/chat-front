import "./MessageInput.css"



const MessageInput = () => {
  return (
    <div className="messageInput-container">
     <div className="input-container">
  <input required={true} placeholder="Text Message" type="text"/>

  <button className="sendText"  type="submit">
           SEND
            </button>
</div>
    </div>
  );
};

export default MessageInput;
