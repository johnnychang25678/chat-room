import { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { ChatRoom } from "./ChatRoom/ChatRoom"

export const HomePage = () => {
  const [name, setName] = useState<string>("");
  function handleChange(input: string) {
    setName(input)
  }

  const navigate = useNavigate()
  function handleKeydown(e: React.KeyboardEvent<HTMLElement>) {
    if (e.key === "Enter") {
      navigate("/chat-room", { state: { data: name } })
    }
  }

  return (
    <div className="container flex items-center justify-center h-screen">
      <div className="border-solid border-[1px] p-10 border-gray-400 rounded">
        <p>Please enter your name:</p>
        <input
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeydown}
          value={name}
          placeholder="Johnny"
          className="outline outline-1 outline-cyan-500 mt-3 p-1.5" />
      </div>
    </div>
  )
}