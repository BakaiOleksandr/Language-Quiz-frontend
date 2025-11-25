import { useEffect } from "react"

export default function Alert({alertWrong,alertGameOver,alertType}) {
    if(!alertWrong&&!alertGameOver&&!alertType)return null;
    
  return (
    <div className="alert">
      {alertWrong&&<div>Wrong!</div>}
      {alertGameOver&&<div>Game over!</div>}
      {alertType&&<div>Please type something!</div>}
    </div>
  )
}
