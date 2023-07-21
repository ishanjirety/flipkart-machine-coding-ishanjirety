import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChatList } from "../components";
import { ChatPill, OptionMessage } from "../components/chat-pill/chat-pill";
import { SendIco } from "../svg-icons";
import {v4 as uuid} from 'uuid'
import './home-page.css'
export const HomePage = () => {

    const [chats,setChats] = useState([])
    const [isChatViewOpen,setIsChatViewOpen] = useState(false)
    const [selectedChat,setSelectedChat] = useState({})
    const [messageQuery,setMessageQuery] = useState("")
    const [searchInput,setSearchInput] = useState("")
    const [searchQuery,setSearchQuery] = useState("")
    const [timeOutRef,setTimeOutRef] =useState(null)

    useEffect(() => {
        (async function getChats(){
          try{
            const {data} = await axios.get(process.env.REACT_APP_API_URL)
            setChats(data)
          }catch(e){
            console.log("ERROR OCCURED WHILE FETCHING API",e)
          }
        })()
    }, []);
    

    useEffect(()=>{

      if(timeOutRef) clearTimeout(timeOutRef)
      let timeOut = setTimeout(()=>{
        setTimeOutRef(timeOut)
        setSearchInput(searchQuery)
      },300)

      return ()=> {}
    },[searchQuery])

    function sendMessage(query){
      const newMessage = {
        "messageId": uuid(),
        "message":query.query ||  messageQuery,
        "timestamp": new Date().getTime(),
        "sender": "USER",
        "messageType": "text"
        }

      setChats(chats => {
       return chats.map( chat => chat.id === selectedChat.id ? ({...chat, messageList : [...chat.messageList]} ) : chat)
      })
      setSelectedChat(selectedChat => ({...selectedChat, messageList: [...selectedChat.messageList,newMessage]}))
    }


  return( <div className="chat-parent">
        <div className="chat-list-parent">
        <div className="chat-view-header-filter">
              <h1>Filter By Title / Order Id</h1>
             <input className="search-filter" placeholder="Start typing to search" onChange={(e) => setSearchQuery(e.target.value)}></input>
          </div>
            <ChatList searchQuery={searchInput} chats={chats} onSelect={(selectedChat)=>{
              setIsChatViewOpen(true)
              setSelectedChat(selectedChat)
              }}/>
        </div>
        {isChatViewOpen && <div className="chat-view">
          <div>
          <div className="chat-view-header">
              <img src={selectedChat.imageURL} alt="" />
              <h3>{selectedChat.title}</h3>
          </div>
          <div className="messages">

              {selectedChat.messageList.length <=0 && <div className="no-state"><p>Send a message to start chatting</p> </div>}
                {selectedChat.messageList.map(message => {
                  return !message.messageType || message.messageType === "text" ? <ChatPill message={message}/> : <OptionMessage message={message} onRequest = {()=> {
                      sendMessage({query:"I want a callback"})
                  }}/>
                })}
          </div>
          </div>
          <div className="input-wrapper">
            <input onChange={(e) => setMessageQuery(e.target.value)} type="text" placeholder="Type a Message..." />
           <button onClick={sendMessage} className="send-btn"> <SendIco /></button>
          </div>
              </div>}
  </div>);
};
