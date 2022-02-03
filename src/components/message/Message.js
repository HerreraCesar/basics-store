import React from "react";

const Message = ({ message }) => {
  return (
    <div className="message">
      <i className="fas fa-check"></i>
      <span>{message}</span>
    </div>
  );
};

export default Message;
