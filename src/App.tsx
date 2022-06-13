import React from 'react';
import { Route, Routes } from "react-router-dom"
import { ChatRoom } from "./components/ChatRoom/ChatRoom";
import { HomePage } from "./components/HomePage";
import './index.css'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="chat-room" element={<ChatRoom />} />
      </Routes>
    </>
  )
}

export default App;
