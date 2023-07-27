import React from "react";

const BacktoBottomButton = () => {
  return (
    <div>
      <div
        style={{
          height: "20px",
          width: "20px",
          borderRadius: "50%",
          translate: "rotate(90deg)",
          backgroundColor: "black",
          color: "white",
          position:"absolute",
          bottom:"100px",
          left:"200px"
        }}
      >
        {"->"}
      </div>
    </div>
  );
};

export default BacktoBottomButton;
