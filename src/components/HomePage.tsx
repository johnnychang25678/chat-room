
export const HomePage = () => {
  return (
    <div className="container flex items-center justify-center h-screen">
      <div className="border-solid border-[1px] p-10 border-gray-400 rounded">
        <p>Please enter your name:</p>
        <input type="text" name="name" placeholder="Johnny" className="outline outline-1 outline-cyan-500 mt-3 p-1.5" />
      </div>
    </div>
  )
}