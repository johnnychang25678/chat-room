export enum MessageFrom {
  Self,
  Others
}

type MessagBoxProps = {
  from: MessageFrom
  name: string
}

export const MessageBox = ({ from, name }: MessagBoxProps) => {

  let childAlign: string = "justify-end"
  let nameAlign: string = "text-right"
  if (from === MessageFrom.Others) {
    childAlign = "justify-start"
    nameAlign = "text-left"
  }

  return (
    <div className={`p-2 my-1.5  w-full flex ${childAlign}`}>
      <div>
        <div className="border-solid border-[1px] p-2 w-[100px] rounded-xl inline-block">
          hihihi
        </div>
        <span className={`block text-xs text-gray-400 ${nameAlign}`}>
          {name}
        </span>
      </div>
    </div>
  )
}