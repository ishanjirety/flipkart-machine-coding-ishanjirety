import React from "react";
import './chat-pill.css'
export const ChatPill = ({message}) => {
    console.log(message)
    function checkIfSenderIsBot(message){
        return message.sender.toLowerCase() === "bot"
    }

  return <div className="chat-pill-wrapper" style={{justifyContent:checkIfSenderIsBot(message) ? "flex-start" : "flex-end"}} >
    <div style={{backgroundColor:checkIfSenderIsBot(message) ? "#fff" : "#027CD5", color:checkIfSenderIsBot(message) ? "#000" : "#fff"}}><p>{message.message}</p>
<p className="timestamp">{new Date(message.timestamp).toLocaleTimeString()}</p></div></div>;
};


export const OptionMessage = ({message,onRequest} ) => {
    console.log(message)
    return <div  className="chat-pill-wrapper">
        <div className="option-message">
        <p>{message.message}</p>
        <div className="option-button-wrapper">
            {message.options?.map(option => {
               return <div className="option-button">
                <button onClick={option.optionText.toLowerCase() === "request a call" && onRequest}>{option.optionText}</button>
                <p>{option.optionSubText}</p>
                </div>
            })}
        </div>
        </div>
    </div>
}
