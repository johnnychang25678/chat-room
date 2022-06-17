import { MessageBox, MessageFrom } from "./MessageBox"
import { NavBar } from "./Navbar"
import { OnlineChatter } from "./OnlineChatter"
import io from "socket.io-client"
import React, { useEffect, useMemo, useState } from "react"
import { Link, useLocation } from "react-router-dom"

type LocationData = {
  data: string
}

// TODO: when component unmount, should close the connection with ws and clear the name list

export const ChatRoom = () => {
  const [socket, setSocket] = useState<any>(null);
  const [name, setName] = useState<string>("");
  const [chatInput, setChatInput] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);

  const location = useLocation()
  console.log(location)
  const isLocationStateExist = location.state !== null
  console.log(isLocationStateExist)
  // connect to ws  
  useEffect(() => {
    if (isLocationStateExist) {
      const socket = io("http://localhost:8080")
      socket.on("reply", (message: any) => {
        console.log(message)
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
      console.log(locState.data)
      setName(locState.data)
    }
  }, []);

  function emitName(name: string) {
    if (name !== "") {
      socket.emit("names", name)
    }
  }

  useMemo(() => {
    emitName(name)
  }, [socket, name])

  function handleInputChange(input: string) {
    setChatInput(input)
  }

  function handleKeydown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter") {
      // sendMessage(chatInput)
      handleInputChange("")
    }
  }

  // function sendMessage(message: string) {
  //   if (socket !== null) {
  //     socket.emit("notice", message)
  //   }
  // }

  function genMessageBoxes(): JSX.Element[] {
    const boxes: JSX.Element[] = []
    for (let i = 0; i < 10; i++) {
      if (i % 2 === 0) {
        boxes.push(<MessageBox from={MessageFrom.Self} name={"You"} />)
      } else {
        boxes.push(<MessageBox from={MessageFrom.Others} name={"Sarah"} />)
      }
    }
    return boxes
  }



  return (
    <>
      {name === "" ?
        <div>
          Please go to {<Link to="/" className="text-blue-500"> home</Link>} and enter your name to join
        </div> :
        <div className="flex-col h-screen">
          <NavBar />
          <div className="flex h-[83%]">
            <div className="w-[30%] max-w-[300px] bg-blue-500 hidden md:block">
              {names.map(name => <OnlineChatter name={name} />)}
            </div>

            <div className="grow flex-col bg-green-200">
              {/* scrollable wrapper */}
              <div className="overflow-auto h-[90%] bg-white px-2">
                {
                  genMessageBoxes()
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