import { MessageBox, MessageFrom } from "./MessageBox"
import { NavBar } from "./Navbar"
import { OnlineChatter } from "./OnlineChatter"


export const ChatRoom = () => {
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
      <div className="flex-col h-screen">
        <NavBar />
        <div className="flex h-[83%]">
          <div className="w-[30%] max-w-[300px] bg-blue-500 hidden md:block">
            <OnlineChatter name="Johnny Chang" />
            <OnlineChatter name="Sarah Pan" />
          </div>

          <div className="grow flex-col bg-green-200">
            {/* scrollable wrapper */}
            <div className="overflow-auto h-[90%] bg-white px-2">
              {
                genMessageBoxes()
              }
            </div>
            <div className="flex items-center h-[10%]">
              <input type="text" placeholder="Say Something..." className="outline outline-1 outline-cyan-500 ml-2 w-4/5 p-1 rounded" />
            </div>
          </div>

        </div>
        <footer className="h-[7%] w-full text-center text-gray-500 bg-slate-400 pt-2 ">Footer</footer>
      </div>

    </>

  )
}