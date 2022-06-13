type OnlineChatterProps = {
  name: string
}

export const OnlineChatter = ({ name }: OnlineChatterProps) => {
  return (
    <div>{name}</div>
  )
}