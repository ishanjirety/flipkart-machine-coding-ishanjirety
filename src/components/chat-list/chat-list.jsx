import React from "react";
import './chat-list.css'
export const ChatList = ({chats,onSelect,searchQuery}) => {
  return (
    <>
      {chats.map(chat => {
       return ( 
        searchQuery.length <=0 ?
           ( <div className="wrapper" onClick={()=>onSelect(chat)}>
          <div className="chat-list">
           <img src={chat.imageURL} alt="" />
           <div className="content">
             <div className="content-heading">
              <h3>{chat.title}</h3>
               <h4>Order {chat.orderId}</h4>
             </div>
             <p>{chat.messageList[chat.messageList.length-1]?.message}</p>
           </div>
         </div>
           <p>{new Date(chat.latestMessageTimestamp).toLocaleDateString()}</p>
         </div>)
          :
         searchQuery.length > 0 && chat.title.toLowerCase().includes(searchQuery) ? (
          <div className="wrapper" onClick={()=>onSelect(chat)}>
          <div className="chat-list">
           <img src={chat.imageURL} alt="" />
           <div className="content">
             <div className="content-heading">
              <h3>{chat.title}</h3>
               <h4>Order {chat.orderId}</h4>
             </div>
             <p>{chat.messageList[chat.messageList.length-1]?.message}</p>
           </div>
         </div>
           <p>{new Date(chat.latestMessageTimestamp).toLocaleDateString()}</p>
         </div>
         ) : <></>
       )
      })}
    </>
  )
};
