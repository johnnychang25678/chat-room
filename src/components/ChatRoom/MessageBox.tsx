export enum MessageFrom {
  Self,
  Others
}

type MessagBoxProps = {
  from: MessageFrom
}

export const MessageBox = ({ from }: MessagBoxProps) => {

  const childAlign: string = from == MessageFrom.Self ? "justify-end" : "justify-start"

  return (
    <div className={"p-3 border-solid border-[1px] w-full flex " + childAlign}>
      <div>
        hihihi
      </div>
    </div>
  )
}