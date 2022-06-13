import { MessageBox, MessageFrom } from "./MessageBox"
import { NavBar } from "./Navbar"
import { OnlineChatter } from "./OnlineChatter"


export const ChatRoom = () => {
  return (
    <>
      <div className="flex-col h-screen">
        <NavBar />
        <div className="flex h-[83%]">
          <div className="w-[30%] max-w-[300px] bg-blue-500 hidden md:block">
            <OnlineChatter name="Johnny Chang" />
            <OnlineChatter name="Sarah Pan" />
          </div>

          <div className="grow flex-col bg-green-200">
            {/* scrollable wrapper */}
            <div className="overflow-auto h-[80%] bg-white px-2">
              <MessageBox from={MessageFrom.Self} />
              <MessageBox from={MessageFrom.Others} />
              <MessageBox from={MessageFrom.Others} />
              <MessageBox from={MessageFrom.Others} />
              <MessageBox from={MessageFrom.Others} />
              <MessageBox from={MessageFrom.Self} />
              <MessageBox from={MessageFrom.Self} />
              <MessageBox from={MessageFrom.Self} />
              <MessageBox from={MessageFrom.Others} />
              <MessageBox from={MessageFrom.Self} />
              <MessageBox from={MessageFrom.Others} />
              <MessageBox from={MessageFrom.Self} />
              <MessageBox from={MessageFrom.Others} />
              <MessageBox from={MessageFrom.Self} />
              <MessageBox from={MessageFrom.Others} />
              <MessageBox from={MessageFrom.Self} />
              <MessageBox from={MessageFrom.Others} />
              <MessageBox from={MessageFrom.Self} />
            </div>
            <div >Here input text</div>
          </div>

        </div>
        <footer className="h-[7%] w-full text-center text-gray-500 bg-slate-400 pt-2 ">Footer</footer>
      </div>

    </>

  )
}