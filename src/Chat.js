import React, { useState, useEffect } from 'react';
import { getAConversation } from "./services/backendServices";

const Chat = () => {

  const body = {
    message_sender: 1,
    message_reciever: 10
  }

  const [messages, setMessages] = useState([])
  const [sender, setSender] = useState({})
  const [reciever, setReciever] = useState({})

  useEffect(() => {
    getAConversation(body).then(r => {
      setMessages(r.conversation[0].sort((a, b) => a.created_at - b.created_at))
      setSender(r.sender[0])
      setReciever(r.reciever[0])
    })
  }, [])

  // function renderMessages() {
  //   {

  //   }
  // }

  console.log({messages, sender, reciever});
  
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default Chat;
