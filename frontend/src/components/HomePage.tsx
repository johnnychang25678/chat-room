import { useNavigate } from "react-router-dom"

export const HomePage = () => {
  const navigate = useNavigate()
  const toChatRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate("/chat-room")
  }
  return (
    <div className="container flex items-center justify-center h-screen">
      <div className="border-solid border-[1px] p-10 border-gray-400 rounded">
        <p>Please enter your name:</p>
        <form onSubmit={toChatRoom}>
          <input type="text" name="name" placeholder="Johnny" className="outline outline-1 outline-cyan-500 mt-3 p-1.5" />
        </form>
      </div>
    </div>
  )
}