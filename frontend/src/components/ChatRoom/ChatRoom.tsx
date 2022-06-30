import { MessageBox, MessageFrom } from "./MessageBox"
import { NavBar } from "./Navbar"
import { OnlineChatter } from "./OnlineChatter"
import io from "socket.io-client"
import React, { useEffect, useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"

type LocationData = {
  data: string
}

class Message {
  from: string;
  content: string;
  constructor(from: string, content: string) {
    this.from = from;
    this.content = content;
  }
  static fromJson(json: any) {
    const { from, content } = json
    return new Message(from, content)
  }
  isSelf(name: string): boolean {
    return name === this.from;
  }
}

// TODO: when component unmount, should close the connection with ws and clear the name list

export const ChatRoom = () => {
  const [socket, setSocket] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [chatInput, setChatInput] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const location = useLocation()
  const isLocationStateExist = location.state !== null

  // connect to ws  
  useEffect(() => {
    if (isLocationStateExist) {
      const socket = io("http://localhost:8080")
      socket.on("chat", (message: string) => {
        const m = Message.fromJson(JSON.parse(message))
        setMessages(prevState => [...prevState, m])
      })

      socket.on("names-list", (namesFromServer: string[]) => {
        console.log(namesFromServer)
        setNames([...names, ...namesFromServer])
      })

      setSocket(socket)
    }

  }, []);

  // get the data passed from router useNavigate  
  useEffect(() => {
    if (isLocationStateExist) {
      const locState = location.state as LocationData
      setName(locState.data)
    }
  }, []);

  useEffect(() => {
    emitName(name)
  }, [name, socket]);

  function emitName(name: string) {
    if (name !== "" && socket) {
      socket.emit("names", name)
    }
  }

  // when user is typing
  function handleInputChange(input: string) {
    setChatInput(input)
  }
  // when user hit enter
  function handleKeydown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter") {
      if (chatInput !== "") {
        sendMessage(name, chatInput)
        handleInputChange("")
      }
    }
  }

  function sendMessage(from: string, message: string) {
    if (socket !== null) {
      // const m: Message = { from: from, content: message }
      const m: Message = new Message(from, message)
      socket.emit("chat", JSON.stringify(m))
    }
  }

  // TODO: implement when new message should move to the bottom of scrollable
  return (
    <>
      {/* name can only come from previous page through navigate() */}
      {name === "" ?
        <div>
          Please go to {<Link to="/" className="text-blue-500"> home</Link>} and enter your name to join
        </div> :
        <div className="flex-col h-screen">
          <NavBar />
          <div className="flex h-[83%]">
            <div className="w-[30%] max-w-[300px] bg-blue-500 hidden md:block">
              {names.map((name, i) => <OnlineChatter key={i} name={name} />)}
            </div>

            <div className="grow flex-col bg-green-200">
              {/* scrollable wrapper */}
              <div className="overflow-auto h-[90%] bg-white px-2">
                {
                  messages.map((message, i) =>
                    <MessageBox
                      key={i}
                      from={message.isSelf(name) ? MessageFrom.Self : MessageFrom.Others}
                      name={message.isSelf(name) ? "You" : message.from}
                      message={message.content} />)
                }
              </div>
              <div className="flex items-center h-[10%]">
                <input
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={(e) => handleKeydown(e)}
                  value={chatInput}
                  type="text"
                  placeholder="Say Something..."
                  className="outline outline-1 outline-cyan-500 ml-2 w-4/5 p-1 rounded" />
              </div>
            </div>

          </div>
          <footer className="h-[7%] w-full text-center text-gray-500 bg-slate-400 pt-2 ">Footer</footer>
        </div>}
    </>

  )
}